import { prisma } from "@/lib/prisma";

export async function getDocByTechAndSlug(techSlug: string, docSlug: string) {
  // 1. Find the tech by slug or name
  const techRecord = await prisma.tech.findFirst({
    where: {
      slug: techSlug
    }
  });

  if (!techRecord) {
    return null;
  }

  // 2. Find the doc using compound unique key
  const doc = await prisma.doc.findUnique({
    where: {
      techId_slug: {
        techId: techRecord.id,
        slug: docSlug,
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
    return null;
  }

  // Flatten the tags to return just the tag records
  const tags = doc.tags.map((dt: any) => dt.tag);
  const tagIds = tags.map((t: any) => t.id);

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
        id: { not: doc.id, notIn: relatedDocs.map((d: any) => d.id) },
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

  return {
    ...doc,
    snippets: doc.snippets.map(s => ({
      ...s,
      filename: s.filename || undefined
    })),
    tags,
    relatedDocs,
  };
}

export async function getTechWithDocs(techSlug: string) {
  const tech = await prisma.tech.findUnique({
    where: {
      slug: techSlug
    },
    include: {
      docs: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
        },
        take: 6
      }
    }
  });

  if (!tech) return null;

  return {
    ...tech,
    docs: tech.docs.map(doc => ({
      ...doc,
      snippets: [],
      tags: []
    }))
  };
}
