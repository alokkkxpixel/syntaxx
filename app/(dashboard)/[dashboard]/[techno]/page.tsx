
import Doc from "@/components/Docs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    dashboard: string;
    techno: string;
    
  };
}


let doc:any;

export default async function DocPage({ params }: PageProps) {
  const { dashboard , techno} = await params;
  // Use absolute URL for server-side fetch if necessary, 
  // though it's better to call the database/logic directly in server components.
  // For now, let's fix the response parsing.
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/docs/${dashboard}/${techno}`, {
    cache: 'no-cache'
  });
  
  if (!res.ok) {
    notFound();
  }

   doc = await res.json();

  if (!doc) notFound();


  

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