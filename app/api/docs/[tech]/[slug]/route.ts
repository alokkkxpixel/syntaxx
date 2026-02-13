import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}:{params:{tech:string,slug:string}}) {
    try {
        // /api/docs/[tech]/[slug].ts

const { tech, slug } = await params;

// 1. Find the tech by slug or name
const techRecord = await prisma.tech.findFirst({
  where: {
    slug: tech // or name: tech
  }
});

if (!techRecord) {
  return NextResponse.json({ message: "Tech not found" }, { status: 404 });
}

// 2. Find the doc using compound unique key
const doc = await prisma.doc.findUnique({
  where: {
    techId_slug: {
      techId: techRecord.id,
      slug,
    },
  },
  include: {
    snippets: true,
    tags: {
      include: {
        tag: true,
      },
    },
    tech: true,
  },
});

if (!doc) {
  return NextResponse.json({ message: "Doc not found" }, { status: 404 });
}

// Flatten the tags to return just the tag records
const tags = doc.tags.map((dt) => dt.tag);
const tagIds = tags.map((t) => t.id);

// 3. Find related documents based on shared tags
let relatedDocs = await prisma.doc.findMany({
  where: {
    id: { not: doc.id },
    tags: {
      some: {
        tagId: { in: tagIds },
      },
    },
  },
  take: 4,
  select: {
    id: true,
    title: true,
    slug: true,
    description: true,
    tech: {
      select: {
        slug: true,
      },
    },
  },
});

// 4. If few related docs found by tags, fallback to same tech
if (relatedDocs.length < 2) {
  const moreDocs = await prisma.doc.findMany({
    where: {
      id: { not: doc.id, notIn: relatedDocs.map(d => d.id) },
      techId: doc.techId,
    },
    take: 4 - relatedDocs.length,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      tech: {
        select: {
          slug: true,
        },
      },
    },
  });
  relatedDocs = [...relatedDocs, ...moreDocs];
}

const formattedDoc = {
  ...doc,
  tags,
  relatedDocs,
};

return NextResponse.json(formattedDoc);

    } catch (err) {
        console.error(err);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
}