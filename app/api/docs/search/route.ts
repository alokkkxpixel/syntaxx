import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    // Normalize query for cache key
    const normalizedQuery = query.trim().toLowerCase();
    const cacheKey = `search:tech-docs:q=${normalizedQuery}`;

    // 1️⃣ Redis first
    const cached = await redis.get(cacheKey);
    if (cached) {
      // console.log("⚡ REDIS HIT", cacheKey);
      return NextResponse.json(cached);
    }
    // console.log("🐌 DB HIT", cacheKey);
    // -------------------------------
    // 🔍 Your existing search logic
    // -------------------------------
    const rawQuery = query.trim();

    const withSpaces = rawQuery
      .replace(/[.+_-]/g, " ")
      .replace(/\s+/g, " ");

    const combined = rawQuery.replace(/[.+_\-\s]/g, "");

    const terms = withSpaces.split(" ").filter(Boolean);

    let searchTerms = "";
    if (terms.length > 1) {
      const splitPart = terms.map((t) => `${t}:*`).join(" & ");
      searchTerms = `(${splitPart}) | ${combined}:*`;
    } else {
      searchTerms = `${terms[0]}:*`;
    }

    // 2️⃣ Prisma search (parallel)
    const [techs, docs] = await Promise.all([
      prisma.tech.findMany({
        where: {
          OR: [
            { name: { search: searchTerms } },
            { title: { search: searchTerms } },
            { description: { search: searchTerms } },
          ],
        },
        include: {
          docs: {
            select: {
              title: true,
              slug: true,
              description: true,
            },
          },
        },
        take: 5,
      }),

      prisma.doc.findMany({
        where: {
          OR: [
            { title: { search: searchTerms } },
            { description: { search: searchTerms } },
          ],
        },
        include: {
          tech: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        take: 10,
      }),
    ]);

    const response = {
      techs,
      docs,
      totalTechs: techs.length,
      totalDocs: docs.length,
    };

    // 3️⃣ Cache ONLY if results exist
    if (techs.length > 0 || docs.length > 0) {
      await redis.set(cacheKey, response, { ex: 300 }); // 5 minutes
    }

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
