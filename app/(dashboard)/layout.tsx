import DashLayout from "@/components/DashBoard-layout";




export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
   
     <DashLayout>

 
      {children}
     </DashLayout>
    
      
     
    </>
  )
}
