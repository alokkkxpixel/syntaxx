

import DashLayout from '@/components/DashBoard-layout'
import StaticDocs from '@/components/HardCodedDocs'
import { notFound } from 'next/navigation';
import React from 'react'
import Doc from "@/components/Docs";
 
interface PageProps {
  params: {
    dashboard: string;
  };
}

let docs:any;

export default async function Page ({ params }: PageProps) {
     const {dashboard} = await params;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
   const res = await fetch(`${baseUrl}/api/docs/${dashboard}`, {
     cache: 'no-cache'
   });
   
   if (!res.ok) {
     notFound();
   }

 docs = await res.json();

  return (
    <div className='mx-auto max-w-7xl'>
  
  



 <Doc tech={docs} />


    </div>
  )
}

 