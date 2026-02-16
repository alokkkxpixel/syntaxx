import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cacheKey = "techs:all";

    // 1️⃣ Try Redis
    const cached = await redis.get(cacheKey);

if (cached) {
  console.log("⚡ REDIS HIT", cacheKey);
  return NextResponse.json(cached);
}

console.log("🐌 DB HIT", cacheKey);


    // 2️⃣ Fetch from DB
    const techs = await prisma.tech.findMany();

    // 3️⃣ Store in Redis (object, not string)
    await redis.set(cacheKey, techs, { ex: 3000 });

    return NextResponse.json(techs);

  } catch (error) {
    console.error("TECH API ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
