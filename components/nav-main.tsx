// "use client"

import { BookOpen, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import * as React from "react"
import Link from "next/link"
import { Tech } from "@/context/TechContext"
import { fetchTech } from "@/lib/fetchTech"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/redux/store/store"

export function NavMain() {

  const { techs, loading } = useSelector(
    (state: RootState) => state.tech
  );

  // Map technologies from the database
  const techItems = techs.map((tech) => ({
    title: tech.name,
    url: `#`,
    techSlug: tech.slug,
    icon: BookOpen,
    isActive: false,
    items: tech.docs?.map((doc) => ({
      title: doc.title,
      url: `/${tech.slug}/${doc.slug}`,
    })),
  }))
   
     

  if (loading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Technologies</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            {[1,2].map((_, idx) => (
              <div key={idx} className="px-4 py-2 text-sm text-muted-foreground bg-muted/50 h-12 rounded-xl animate-pulse my-1">
              </div>
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Technologies</SidebarGroupLabel>
      <SidebarMenu>
        {techItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link prefetch href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
