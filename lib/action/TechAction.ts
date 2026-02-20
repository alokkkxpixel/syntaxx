// lib/action/TechAction.ts
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import type { Tech } from "@/types/tech";

const CACHE_KEY = "techs:all";
const CACHE_TTL = 3600; // 1 hour

export async function getTechs(): Promise<Tech[]> {
  try {
    // 1️⃣ Try Redis
    const cached = await redis.get<string>(CACHE_KEY);

    if (cached) {
      console.log("⚡ REDIS HIT", CACHE_KEY);
      return cached as unknown as Tech[];
    }

    console.log("🐌 DB HIT", CACHE_KEY);

    // 2️⃣ DB fetch
    const techs = await prisma.tech.findMany({
      where: {
        docs: {
          some: {},
        },
      },
      orderBy: {
        docs: {
          _count: "desc",
        },
      },
      include: {
        docs: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    // 3️⃣ Save to Redis
    await redis.set(CACHE_KEY, techs, {
      ex: CACHE_TTL,
    });

    return techs;
  } catch (error) {
    console.error("getTechs failed:", error);
    return []; // ✅ always return Tech[]
  }
}