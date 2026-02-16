import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ tech: string }> }
) {
    try {
         const { tech} = await params;

         const cacheKey = `tech:${tech}`;

// 1️⃣ Try Redis
const cached = await redis.get(cacheKey);

if (cached) {
  // console.log("⚡ REDIS HIT", cacheKey);
  return NextResponse.json(cached);
}

// console.log("🐌 DB HIT", cacheKey);

        //  console.log(tech)
         const findTech = await prisma.tech.findUnique({
            where:{
                slug:tech
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
            })

            await redis.set(cacheKey, findTech, { ex: 60 });
     
         return NextResponse.json(findTech)
    } catch (err) {
        console.error(err);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
}