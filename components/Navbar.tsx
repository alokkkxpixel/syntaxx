"use client";
import { cn } from "@/lib/utils";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { Activity, useState } from "react";
import { ModeToggle } from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { DocSearch } from "./SearchComponent";
import { Search } from "lucide-react";

export function NavbarDemo({ showSidebarTrigger = false, className }: { showSidebarTrigger?: boolean, className?: string }) {
  const navItems = [
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Explore Techs",
      link: "#Tech",
    },
    {
      name: "Connect with us",
      link: "https://x.com/AlokkxPithale_",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className={cn("fixed", className)}>
        {/* Desktop Navigation */}
        <NavBody visible={true}>
    

          <div className="flex-1">
            <NavbarLogo />
          </div>

          <NavItems items={navItems} />

          <div className="flex-1 flex justify-end items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border rounded-md hover:bg-accent transition-colors hidden md:flex lg:min-w-[150px] xl:min-w-[230px]"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="hidden lg:inline-block">Search docs...</span>
              <kbd className="ml-auto pointer-events-none hidden xl:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
            <NavbarButton variant="secondary" className="font-bold">Login</NavbarButton>
            <NavbarButton variant="secondary" className="p-0"><ModeToggle /></NavbarButton>
          </div>
         
        </NavBody>
      </Navbar>
      <DocSearch open={isSearchOpen} setOpen={setIsSearchOpen} />


        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Activity mode={ showSidebarTrigger ? "visible" : "hidden"} >
<SidebarTrigger />
            </Activity>
          
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-muted-foreground hover:bg-accent rounded-md lg:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                variant="secondary"
                className="w-full flex items-center justify-start gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </NavbarButton> */}
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
               <ModeToggle />
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      {/* <DummyContent /> */}

      {/* Navbar */}
    </div>
  );
}

const DummyContent = () => {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Check the navbar at the top of the container
      </h1>
      <p className="mb-10 text-center text-sm text-zinc-500">
        For demo purpose we have kept the position as{" "}
        <span className="font-medium">Sticky</span>. Keep in mind that this
        component is <span className="font-medium">fixed</span> and will not
        move when scrolling.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            title: "The",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 2,
            title: "First",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 3,
            title: "Rule",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 4,
            title: "Of",
            width: "md:col-span-3",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 5,
            title: "F",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 6,
            title: "Club",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 7,
            title: "Is",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 8,
            title: "You",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 9,
            title: "Do NOT TALK about",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 10,
            title: "F Club",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
        ].map((box) => (
          <div
            key={box.id}
            className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
          >
            <h2 className="text-xl font-medium">{box.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
