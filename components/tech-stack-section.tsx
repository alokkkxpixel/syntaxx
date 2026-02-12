"use client";

import React, { useState, useEffect } from "react"
import { ICONS } from "./icon"
import { TechStackCard } from "./tech-stack-card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TechStack {
  title: string
  slug: string
  description: string
  icon: React.ReactNode
}

const techStacks: TechStack[] = [
  {
    title: "React",
    slug: "react",
    description: "Modern UI library for building scalable web applications with components.",
    icon: <ICONS.react className="w-10 h-10 text-[#61DAFB]" />,
  },
  {
    title: "Next.js",
    slug: "nextjs",
    description: "The React framework for production-grade applications with SSR and more.",
    icon: <ICONS.nextjs className="w-10 h-10" />,
  },
  {
    title: "TypeScript",
    slug: "typescript",
    description: "Typed JavaScript for better developer experience and code reliability.",
    icon: <ICONS.typescript className="w-10 h-10 text-[#3178C6]" />,
  },
  {
    title: "Node.js",
    slug: "nodejs",
    description: "Cross-platform JavaScript runtime environment for backend development.",
    icon: <ICONS.node className="w-10 h-10 text-[#339933]" />,
  },
  {
    title: "Tailwind CSS",
    slug: "tailwind",
    description: "Utility-first CSS framework for rapid and responsive UI development.",
    icon: <ICONS.tailwind className="w-10 h-10 text-[#06B6D4]" />,
  },
  {
    title: "PostgreSQL",
    slug: "postgresql",
    description: "Powerful, open-source object-relational database system.",
    icon: <ICONS.postgresql className="w-10 h-10 text-[#4169E1]" />,
  },
  {
    title: "Python",
    slug: "python",
    description: "Versatile programming language for web, data science, and more.",
    icon: <ICONS.python className="w-10 h-10 text-[#3776AB]" />,
  },
  {
    title: "Django",
    slug: "django",
    description: "High-level Python web framework for rapid development and clean design.",
    icon: <ICONS.django className="w-10 h-10 text-[#092E20]" />,
  },
  {
    title: "MongoDB",
    slug: "mongodb",
    description: "Flexible and scalable NoSQL document-oriented database system.",
    icon: <ICONS.mongodb className="w-10 h-10 text-[#47A248]" />,
  }
]


export function TechStacksSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // On mobile, show 2 items. On desktop, show 6 items.
  const limit = isMobile ? 2 : 6
  const visibleStacks = isExpanded ? techStacks : techStacks.slice(0, limit)

  return (
    <section id="Tech" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <span>Documentation Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
            Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80">
              Tech Stacks
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Choose your tool and get instant access to ready-to-use syntax and production-ready code snippets.
          </p>
        </div>

        {/* Grid for all devices: Mobile (1-2 cols) | Desktop (3 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleStacks.map((stack) => (
            <TechStackCard
              key={stack.title}
              title={stack.title}
              slug={stack.slug}
              description={stack.description}
              icon={stack.icon}
            />
          ))}
        </div>

        {techStacks.length > (isMobile ? 2 : 6) && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-bold tracking-wide uppercase transition-all hover:border-primary/50 hover:bg-white dark:hover:bg-black shadow-sm"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  <span>Show All Stacks</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
