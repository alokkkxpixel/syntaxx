import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ tech: string }> }
) {
    try {
         const { tech} = await params;
         console.log(tech)
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
     
         return NextResponse.json(findTech)
    } catch (err) {
        console.error(err);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
}