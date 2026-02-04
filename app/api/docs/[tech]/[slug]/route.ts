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
const formattedDoc = {
  ...doc,
  tags: doc.tags.map((dt) => dt.tag),
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