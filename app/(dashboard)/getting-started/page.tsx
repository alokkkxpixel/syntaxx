"use client";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Rocket, Search, Terminal, BookOpen, Layers, Zap } from "lucide-react";
import Link from "next/link";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { AnimatePresence } from "motion/react";

export default function GettingStartedDoc() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const techStacks = [
    { name: "React", category: "Frontend", status: "Available", slug: "react" },
    { name: "Next.js", category: "Fullstack", status: "Available", slug: "next-js" },
    { name: "Node.js", category: "Backend", status: "Available", slug: "node-js" },
    { name: "Prisma", category: "ORM", status: "Available", slug: "prisma" },
    { name: "PostgreSQL", category: "Database", status: "Available", slug: "postgresql" },
    { name: "Tailwind CSS", category: "Styling", status: "Available", slug: "tailwind-css" },
    { name: "TypeScript", category: "Language", status: "Available", slug: "typescript" },
    { name: "Docker", category: "DevOps", status: "Coming Soon", slug: "docker" },
  ];

  return (
    <div className="w-full">
      <AnimatePresence>
        {isBannerVisible && (
          <StickyBanner 
            className="bg-blue-600 w-full py-3 mb-6"
            onClose={() => setIsBannerVisible(false)}
          >
            <p className="text-white text-sm sm:text-base font-medium text-center px-10">
              AThis project is in early access.{" "}
              <a href="https://x.com/AlokkxPithale_" className="underline underline-offset-4 hover:text-white/80 transition-colors">
                 More docs coming soon.
              </a>
            </p>
          </StickyBanner>
        )}
      </AnimatePresence>
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs">
          <Rocket className="w-4 h-4" />
          <span>Getting Started</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
          Welcome to Syntaxx
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4 py-1">
          Syntaxx is your unified documentation hub, designed to keep you in the flow by providing instant access to syntax, patterns, and best practices across all major tech stacks.
        </p>
      </header>

      <Separator className="opacity-40" />

      {/* Introduction Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-500" />
          What is Syntaxx?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          The goal of Syntaxx is simple: <strong>Eliminate documentation fatigue.</strong> Instead of jumping between multiple official sites, Syntaxx brings the most critical information into one place with a consistent, fast, and beautiful interface.
        </p>
      </section>

      {/* How to use */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Search className="w-6 h-6 text-blue-500" />
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-secondary/10 border-border/40">
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span>Command Bar</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">⌘ K</kbd> anywhere to trigger the global search and find technologies or specific docs instantly.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/10 border-border/40">
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Sidebar Explorer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the sidebar on the left to browse available technologies and deep-dive into specific categories like Hooks, APIs, or Setup guides.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack List */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Zap className="w-6 h-6 text-blue-500" />
          Supported Tech Stacks
        </h2>
        <p className="text-muted-foreground">
          We are constantly expanding our library. Here is the current state of supported technologies:
        </p>
        <div className="rounded-xl border border-border/40 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border/40">
              <tr>
                <th className="px-4 py-3 font-bold">Technology</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {techStacks.map((tech) => (
                <tr key={tech.name} className="hover:bg-secondary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    {tech.status === 'Available' ? (
                      <Link href={`/${tech.slug}`} className="text-blue-500 hover:underline">
                        {tech.name}
                      </Link>
                    ) : (
                      tech.name
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{tech.category}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      tech.status === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {tech.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Integration Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Example Reference</h2>
        <p className="text-muted-foreground">
          Every document in Syntaxx includes high-quality, copy-pasteable snippets. Here is how a typical doc reference looks:
        </p>
        <CodeSnippet
        //   title="Typical Implementation"
          filename="example.ts"
          icon="typescript"
          language="typescript"
          code={`// Welcome to Syntaxx
const greeting = "Hello Developers!";
console.log(greeting);

export const SyntaxxInfo = {
  mission: "Unified Reference",
  focus: "Speed & Accuracy"
};`}
        />
      </section>

      <Separator className="opacity-40" />

      {/* Footer Meta */}
      <footer className="pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Found something missing? Keep building. <br />
          <span className="text-foreground font-bold italic">Syntaxx v1.0.0</span>
        </p>
      </footer>
      </article>
    </div>
  );
}


