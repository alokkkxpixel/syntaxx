

import  {getTechWithDocs}  from "@/lib/docs";
import Doc from "@/components/Docs";
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import SkeletonDoc from "@/components/SkeletonDoc";
 
interface PageProps {
  params: Promise<{
    dashboard: string;
  }>;
}


export default async function Page ({ params }: PageProps) {
  const { dashboard } = await params;
  
  // Fetch directly from database
  const tech = await getTechWithDocs(dashboard);

  if (!tech) {
    notFound();
  }

  return (
    <div className='mx-auto max-w-7xl'>
      <Suspense fallback={<SkeletonDoc />}>
        <Doc tech={tech} />
      </Suspense>
    </div>
  )
}

 