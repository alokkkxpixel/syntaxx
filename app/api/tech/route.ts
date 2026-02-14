import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";

// GET all techs
export async function GET() {
  try {
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
        docs: true,
      },
    });

    
       console.log(techs)
    return NextResponse.json(techs);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create new tech
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Missing required field: name" },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    // Check if tech already exists
    const existing = await prisma.tech.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: "Tech with this name already exists" },
        { status: 409 }
      );
    }

    const tech = await prisma.tech.create({
      data: { name, slug, title: name, description: name }
    });

    return NextResponse.json(tech, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
