import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { CreateDocSchema } from "@/lib/schemas";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validation = CreateDocSchema.safeParse(json);

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validation.error.format() 
        },
        { status: 400 }
      );
    }

    const { title, description, tech, snippets, tags } = validation.data;

    // 1️⃣ Find tech first (needed for unique slug check)
    const normalizedTech = generateSlug(tech);
    const techRow = await prisma.tech.findUnique({
      where: { slug: normalizedTech }
    });

    if (!techRow) {
      return NextResponse.json(
        { error: "Invalid tech" },
        { status: 400 }
      );
    }
    

    // 2️⃣ Generate unique slug from TITLE (unique per tech)
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let count = 1;

    while (await prisma.doc.findUnique({ 
      where: { 
        techId_slug: {
          techId: techRow.id,
          slug: slug
        }
      } 
    })) {
      slug = `${baseSlug}-${count++}`;
    }

const normalizedTags = tags.map((t: string) => ({
  name: t,
  slug: generateSlug(t)
}));

    // 3️⃣ Create doc
    const doc = await prisma.doc.create({
      data: {
        title,
        slug,
        description,
        techId: techRow.id,

        snippets: {
          create: snippets.map((s: any) => ({
            language: s.lang,
            code: s.code,
            description: s.description,
            filename: s.filename
          }))
        },

        tags: {
          create: tags.map((tag: string) => {
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

    return NextResponse.json(doc, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

