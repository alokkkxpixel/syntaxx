import { AppSidebar } from "@/components/app-sidebar"
import FooterSection from "@/components/FooterSection"
import { ModeToggle } from "@/components/ThemeToggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useTech } from "@/context/TechContext"
import { Children } from "react"
import { NavbarDemo } from "./Navbar"

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
    
    <SidebarProvider className="relative ">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b  bg-red-500 flex items-center gap-2 px-4 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         
         {/* <div className="flex items-center justify-between w-60 mx-auto px-3 sticky  z-50">
           
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/react">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <ModeToggle />
          </div> */}
          <NavbarDemo showSidebarTrigger={true} />
        </header>
    

         {children}
      </SidebarInset>

    
    </SidebarProvider>
  
    </>
  )
}
