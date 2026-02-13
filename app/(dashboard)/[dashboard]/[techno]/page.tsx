
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
  const doc = await getDocByTechAndSlug(dashboard, techno);

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