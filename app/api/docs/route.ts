import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { CreateDocBulkSchema, CreateSnippetSchema } from "@/lib/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";

interface PreparedDoc {
  title: string;
  baseSlug: string;
  description: string;
  techId: string;
  snippets: z.infer<typeof CreateSnippetSchema>[];
  tags: string[];
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validation = CreateDocBulkSchema.safeParse(json);

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validation.error.format() 
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const docsToCreate = Array.isArray(data) ? data : [data];

    // Map through documents to handle logic before the transaction
    // This avoids long-running transactions and potential async issues inside them
    const preparedDocs: PreparedDoc[] = [];

    for (const item of docsToCreate) {
      const { title, description, tech, snippets, tags } = item;
      const normalizedTech = generateSlug(tech);
      
      const techRow = await prisma.tech.findUnique({
        where: { slug: normalizedTech }
      });

      if (!techRow) {
        return NextResponse.json(
          { error: `Invalid tech: ${tech}` },
          { status: 400 }
        );
      }

      // Generate base slug
      let baseSlug = generateSlug(title);
      preparedDocs.push({
        title,
        baseSlug,
        description,
        techId: techRow.id,
        snippets,
        tags
      });
    }

    // Now run the creation in a transaction
    const createdDocs = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const results = [];

      for (const item of preparedDocs) {
        // Unique slug check inside transaction to prevent race conditions
        let slug = item.baseSlug;
        let count = 1;

        while (await tx.doc.findUnique({ 
          where: { 
            techId_slug: {
              techId: item.techId,
              slug: slug
            }
          } 
        })) {
          slug = `${item.baseSlug}-${count++}`;
        }

        const doc = await tx.doc.create({
          data: {
            title: item.title,
            slug,
            description: item.description,
            techId: item.techId,
            snippets: {
              create: item.snippets.map((s: any) => ({
                title: s.title,
                language: s.lang,
                code: s.code,
                icon: s.icon,
                description: s.description,
                filename: s.filename
              }))
            },
            tags: {
              create: item.tags.map((tag: string) => {
                const tagSlug = generateSlug(tag);
                return {
                  tag: {
                    connectOrCreate: {
                      where: { slug: tagSlug },
                      create: {
                        name: tag,
                        slug: tagSlug
                      }
                    }
                  }
                };
              })
            }
          },
          include: {
            tech: true,
            snippets: true,
            tags: { include: { tag: true } }
          }
        });

        results.push({
          ...doc,
          tags: doc.tags.map((dt: any) => dt.tag)
        });
      }

      return results;
    }, {
      timeout: 15000 // Increase timeout to 15s for bulk operations
    });

    return NextResponse.json(
      Array.isArray(data) ? createdDocs : createdDocs[0], 
      { status: 201 }
    );

  } catch (err: any) {
    console.error("Bulk Creation Error:", err);
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    );
  }
}
