
import { getDocByTechAndSlug } from "@/lib/docs";
import Doc from "@/components/Docs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    dashboard: string;
    techno: string;
    
  }>;
}

export default async function DocPage({ params }: PageProps) {
  const { dashboard , techno} = await params;
  
  // Fetch directly from database (works during build time)
  // const doc = await getDocByTechAndSlug(dashboard, techno);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/docs/${dashboard}/${techno}`,{
      cache: 'no-store'
    });
    const doc = await res.json();

  if (!doc) {
    notFound();
  }

  return (
    <Doc doc={doc} />
  );
}


export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { dashboard, techno } = await params;

  return {
    title: `${dashboard.toUpperCase()} Docs | ${techno}`,
    description: `Documentation for ${techno} in ${dashboard}`,
  };
}