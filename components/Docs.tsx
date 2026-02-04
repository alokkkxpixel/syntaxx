"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {SnippetsCode }  from "@/components/Code-Snippet";





import { useState, useEffect } from "react";
import { Metadata } from "next";
import { CopyBlock,CodeBlock,dracula  } from "react-code-blocks";
interface Snippet {
  id: string;
  language: string;
  code: string;
  icon: string;
  title?: string;
  filename?: string;
  description: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Doc {
  id: string;
  title: string;
  description?: string;
  content?: string;
  snippets: Snippet[];
  tags: Tag[];
}

interface Tech {
  id: string;
  name: string;
  slug: string;
  title?: string;
  description?: string;
  icon?: string;
}


interface PageProps {
  params: {
    dashboard: string;
    techno: string;
    
  };
}
interface StaticDocProps {
  doc?: Doc;
  tech?: Tech;
}

export default function StaticDoc({ doc,tech }: StaticDocProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay to prevent "millisecond glitch" and show smooth transition
    return () => clearTimeout(timer);
  }, [doc?.id, tech?.id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-3 animate-pulse">
          <div className="h-10 w-3/4 bg-muted rounded-lg" />
          <div className="h-4 w-full bg-muted rounded-md" />
          <div className="h-4 w-2/3 bg-muted rounded-md" />
        </div>
        
        <div className="h-px w-full bg-border/40 my-6" />

        {/* Content Skeleton */}
        <div className="space-y-10">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="h-8 w-1/2 bg-muted rounded-md" />
              <div className="h-48 w-full bg-muted rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded-md" />
                <div className="h-4 w-5/6 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }



  if (doc && !Array.isArray(doc) && doc.snippets) {
    return (
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 overflow-hidden transition-all duration-500 ease-in-out">
        {/* Header */}
        <header className="space-y-4 w-full overflow-hidden">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance break-words bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words border-l-2 border-primary/20 pl-4 py-1">
              {doc.description}
            </p>
          )}
        </header>

        <Separator className="my-6 opacity-40" />

        {/* Snippets and Content */}
        <div className="space-y-12">
          {doc.snippets.map((snippet) => (
            <section key={snippet.id} className="space-y-4 w-full overflow-hidden group">
              {snippet.title && (
                <h2 className="text-2xl sm:text-3xl font-semibold scroll-mt-20 break-words flex items-center gap-3">
                  <span className="h-6 w-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {snippet.title}
                </h2>
              )}
              
              <div className="relative">
               
                <SnippetsCode  filename={snippet.filename} icon={snippet.icon} language={snippet.language}
                  code={snippet.code} showLineNumbers={true} />
                 
              </div>
              
              {snippet.description && (
                <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed break-words">
                  {snippet.description}
                </p>
              )}
            </section>
          ))}
        </div>
        
        {/* Tags */}
        {doc.tags.length > 0 && (
          <div className="flex justify-start items-center flex-wrap gap-2 pt-10 border-t border-border/40">
            <span className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mr-2">Tags:</span>
            {doc.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground/80 text-xs font-medium border border-transparent hover:border-border/60 hover:bg-secondary/50 transition-all cursor-default"
              >
                <span className="mr-1 text-muted-foreground/30 font-mono">#</span>
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Next Steps */}
        <section className="space-y-4 pt-4" aria-labelledby="tips">
          <h2 id="tips" className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <Card className="border-l-4 border-l-blue-500 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
            <CardContent className="pt-6">
              <ul className="space-y-3 text-base sm:text-lg text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Explore more examples in the documentation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Try implementing these concepts in your project</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </article>
    );
  }

  // Handle tech layout if doc is not a single doc or if tech is explicitly passed
  const activeTech = tech || (doc && !Array.isArray(doc) ? (doc as unknown as Tech) : null);

  if (activeTech && activeTech.name) {
    return (
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 overflow-hidden transition-all duration-500 ease-in-out">
        <header className="space-y-6 text-left">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance break-words bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/40">
              {activeTech.title || activeTech.name}
            </h1>
            <div className="h-1.5 w-24 bg-blue-500 rounded-full" />
          </div>
          
          {activeTech.description && (
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl break-words font-light">
              {activeTech.description}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card className="bg-secondary/20 border-border/40 hover:border-border/80 hover:bg-secondary/30 transition-all duration-300 shadow-sm group">
            <CardContent className="pt-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <span className="text-blue-500 font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">Core Concepts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Master the fundamental building blocks of {activeTech.name} to build robust applications.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-border/40 hover:border-border/80 hover:bg-secondary/30 transition-all duration-300 shadow-sm group">
            <CardContent className="pt-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <span className="text-cyan-500 font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">Best Practices</h3>
              <p className="text-muted-foreground leading-relaxed">
                Follow industry-standard patterns and performance optimizations tailored for {activeTech.name}.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 opacity-30" />

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Available Documentation</h2>
            <p className="text-muted-foreground text-lg">
              Explore the detailed guides and examples for {activeTech.name} from the sidebar navigation.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-dashed border-border/60 bg-muted/30 text-center space-y-3">
            <p className="text-muted-foreground">Select a topic to start learning</p>
          </div>
        </section>
      </article>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 space-y-4">
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
        <span className="text-2xl">🔍</span>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">No Content Found</h3>
        <p className="text-muted-foreground max-w-xs">
          We couldn't find any documentation or technology details for your current selection.
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dashboard, techno } = await params;
  return {
    title: `${dashboard.toUpperCase()} Docs | ${techno || 'Reference'}`,
    description: `Documentation and guides for ${techno || dashboard}`,
  };
}
