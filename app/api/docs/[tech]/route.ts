import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}:{params:{tech:string}}) {
    try {
         const { tech} = await params;
         console.log(tech)
         const findTech = await prisma.tech.findUnique({
            where:{
                slug:tech
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