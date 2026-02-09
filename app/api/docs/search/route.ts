import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    // Prisma's search operator for PostgreSQL
    // The query needs to be formatted for tsquery (e.g., 'word1 & word2')
    // or we can use the 'search' property if fullTextSearchPostgres is enabled.
    // Note: search operator expects words separated by & | ! etc or just words.
    // We can join words with '&' for a 'contains all' behavior.
    // Sanitize query
    const rawQuery = query.trim();
    // 1. Version with spaces: "node.js" -> "node js"
    const withSpaces = rawQuery.replace(/[.+_-]/g, ' ').replace(/\s+/g, ' ');
    // 2. Version without spaces: "node js" -> "nodejs"
    const combined = rawQuery.replace(/[.+_\-\s]/g, '');

    const terms = withSpaces.split(' ').filter(Boolean);
    
    let searchTerms = "";
    if (terms.length > 1) {
      // If multi-word, search for (word1 & word2) OR combinedWord
      // Example: (node:* & js:*) | nodejs:*
      const splitPart = terms.map(t => `${t}:*`).join(" & ");
      searchTerms = `(${splitPart}) | ${combined}:*`;
    } else {
      // Single word search
      searchTerms = `${terms[0]}:*`;
    }

    // Search both Tech and Doc models in parallel
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

    return NextResponse.json({
      techs,
      docs,
      totalTechs: techs.length,
      totalDocs: docs.length,
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
