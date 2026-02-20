// "use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { CodeSnippet } from "@/components/CodeSnippet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";





// import { useState, useEffect } from "react";
import { Metadata } from "next";
import { CopyBlock,CodeBlock,dracula  } from "react-code-blocks";
import SkeletonDoc from "./SkeletonDoc";
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
  slug: string;
  description?: string; // ✅ UI-safe
  content?: string;
  snippets: Snippet[];
  tags: Tag[];
  relatedDocs?: {
    id: string;
    title: string;
    slug: string;
    description?: string;
    tech: {
      slug: string;
    };
  }[];
}


interface Tech {
  id: string;
  name: string;
  slug: string;
  title?: string;
  description?: string;
  icon?: string;
  docs?: Doc[];
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
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 300); // Short delay to prevent "millisecond glitch" and show smooth transition
  //   return () => clearTimeout(timer);
  // }, [doc?.id, tech?.id]);

  // if (isLoading) {
  //   return <SkeletonDoc />
  // }



  if (doc && !Array.isArray(doc) && doc.snippets) {
    return (
      <article className="w-full max-w-3xl   mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 overflow-hidden transition-all duration-500 ease-in-out">
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
               
                <CodeSnippet
                  filename={snippet.filename || undefined}
                  icon={snippet.icon}
                  language={snippet.language}
                  code={snippet.code}
                  showLineNumbers={true}
                />
                 
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
          <div className="pt-10 border-t border-border/40 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground/50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {doc.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-[11px] sm:text-xs font-medium border border-border/50 hover:bg-secondary hover:border-border transition-all cursor-default"
                >
                  <span className="mr-1.5 text-muted-foreground/40 font-mono">#</span>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Documents / Next Steps */}
        <section className="space-y-6 pt-8" aria-labelledby="related-docs">
          <div className="flex items-center justify-between">
            <h2 id="related-docs" className="text-2xl font-bold tracking-tight">
              {doc.relatedDocs && doc.relatedDocs.length > 0 ? "Related Documents" : "Next Steps"}
            </h2>
            {doc.relatedDocs && doc.relatedDocs.length > 0 && (
              <div className="h-px flex-1 mx-4 bg-border/40 hidden sm:block" />
            )}
          </div>

          {doc.relatedDocs && doc.relatedDocs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doc.relatedDocs.map((related) => (
                <Link
                  key={related.id}
                  href={`/${related.tech.slug}/${related.slug}`}
                  className="group block"
                >
                  <Card className="h-full border-border/40 bg-secondary/10 hover:bg-secondary/20 hover:border-blue-500/50 transition-all duration-300 shadow-sm overflow-hidden">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-blue-500">
                          <FileText className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                            {related.tech.slug}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-blue-500 transition-colors line-clamp-1 mb-1">
                        {related.title}
                      </h3>
                      {related.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {related.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
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
          )}
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

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Documentation Guides</h2>
            <p className="text-muted-foreground text-lg">
              Quickly jump into {activeTech.name} guides and best practices.
            </p>
          </div>
          
          {activeTech.docs && activeTech.docs.length > 0 ? (
            <>
              {/* Desktop Grid View */}
              <div className="hidden sm:grid grid-cols-2 gap-4">
                {activeTech.docs.slice(0, 5).map((d) => (
                  <Link 
                    key={d.id} 
                    href={`/${activeTech.slug}/${d.slug}`}
                    className="group relative p-5 rounded-xl border border-border/40 bg-secondary/10 hover:bg-secondary/20 hover:border-primary/30 transition-all duration-300 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{d.title}</h4>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </div>
                    {d.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {d.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Accordion View */}
              <div className="sm:hidden border rounded-xl overflow-hidden bg-secondary/5">
                <Accordion type="single" collapsible className="w-full">
                  {activeTech.docs.slice(0, 5).map((d, i) => (
                    <AccordionItem key={d.id} value={`item-${i}`} className="px-4 border-b-border/40 last:border-0">
                      <AccordionTrigger className="hover:no-underline py-5 group">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-left">{d.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5">
                        <div className="space-y-4">
                          {d.description && (
                            <p className="text-muted-foreground leading-relaxed">
                              {d.description}
                            </p>
                          )}
                          <Link 
                            href={`/${activeTech.slug}/${d.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-border/60 bg-muted/30 text-center space-y-3">
              <p className="text-muted-foreground">Select a topic from the sidebar to start learning</p>
            </div>
          )}
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
