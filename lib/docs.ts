import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

// type DocWithRelations = {
//   id: string;
//   title: string;
//   slug: string;
//   description: string;
//   techId: string;
//   tech: {
//     id: string;
//     name: string;
//     slug: string;
//   };
//   snippets: any[];
//   tags: any[];
//   relatedDocs: any[];
// };
 
export interface DocWithRelations {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  techId: string;

  tech: {
    id: string;
  name: string;
  slug: string;
  title?: string;
  description?: string;
  icon?: string;
  };

  snippets: {
    id: string;
    code: string;
    language: string;
    filename?: string;
    createdAt: Date;
  }[];

  tags: {
    id: string;
    name: string;
    slug: string;
  }[];

  relatedDocs: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    tech: {
      slug: string;
    };
  }[];
}

interface Snippet {
  id: string;
  language: string;
  code: string;
  icon: string;
  title?: string;
  filename?: string;
  description: string;
}

interface Tag {
  id: string;
  name: string;
}
interface Doc {
  id: string;
  title: string;
  slug: string;
  description?: string; // ✅ UI-safe
  content?: string;
  snippets: Snippet[];
  tags: Tag[];
  relatedDocs?: {
    id: string;
    title: string;
    slug: string;
    description?: string;
    tech: {
      slug: string;
    };
  }[];
}



export async function getDocByTechAndSlug(techSlug: string, docSlug: string): Promise<Doc | null> {
  // 1. Find the tech by slug or name
  const cacheKey = `doc:${techSlug}:${docSlug}`;

  const cached  = await redis.get<Doc>(cacheKey);
  if (cached) {
    console.log("⚡ REDIS HIT", cacheKey);
    return cached;
  }

  console.log("🐌 DB HIT", cacheKey);
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


const response: Doc = {
  id: doc.id,
  title: doc.title,
  slug: doc.slug,
  description: doc.description ?? undefined, // 🔑 FIX
  snippets: doc.snippets.map((s: any) => ({
    id: s.id,
    language: s.language,
    code: s.code,
    icon: s.icon,
    title: s.title ?? undefined,
    filename: s.filename ?? undefined,
    description: s.description ?? "",
  })),
  tags: tags.map((t: any) => ({
    id: t.id,
    name: t.name,
  })),
  relatedDocs: relatedDocs.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    description: r.description ?? undefined,
    tech: {
      slug: r.tech.slug,
    },
  })),
};

 
  await redis.set(cacheKey, response,  { ex: 300 });
 return response;
  
}
    

type TechWithDocs = {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  createdAt: Date;
  docs: any[];
};

export async function getTechWithDocs(techSlug: string): Promise<TechWithDocs | null> {

   const cacheKey = `tech:${techSlug}`;

  const cached  = await redis.get<TechWithDocs>(cacheKey);
  if (cached) {
    console.log("⚡ REDIS HIT", cacheKey);
    return cached
  }

  console.log("🐌 DB HIT", cacheKey);

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

   const response: TechWithDocs = {
    ...tech,
    docs: tech.docs.map((doc: any) => ({
      ...doc,
      snippets: [],
      tags: [],
    })),
  };

  await redis.set(cacheKey, response, { ex: 100 });

  return response;

}
