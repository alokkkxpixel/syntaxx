"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CodeSnippet } from "@/components/CodeSnippet";

import { useState, useEffect } from "react";

interface Snippet {
  id: string;
  language: string;
  code: string;
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

interface StaticDocProps {
  doc: Doc;
}

export default function StaticDoc({ doc }: StaticDocProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay to prevent "millisecond glitch" and show smooth transition
    return () => clearTimeout(timer);
  }, [doc.id]);

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

  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-hidden transition-all duration-500 ease-in-out">
      {/* Header */}
      <header className="space-y-3 w-full overflow-hidden">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance break-words">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
            {doc.description}
          </p>
        )}
      </header>

      <Separator className="my-6 sm:my-8" />


      {/* Snippets and Content */}
      <div className="space-y-8">
        {doc.snippets.map((snippet, index) => (
          <section key={snippet.id} className="space-y-4 w-full overflow-hidden">
            {snippet.title && (
              <h2 className="text-2xl sm:text-3xl font-medium scroll-mt-20 break-words text-pretty">
                {snippet.title}
              </h2>
            )}
            
            <CodeSnippet
              language={snippet.language}
              code={snippet.code}
            />
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
          {snippet.description}
        </p>
          </section>
        ))}
      </div>
      {/* Tags & Topics */}
      {doc.tags.length > 0 && (
        <div className="flex justify-start items-center flex-wrap gap-2 pt-10 border-t border-border/40">
          <span className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mr-2">Tags:</span>
          {doc.tags.map((tag,idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground/80 text-xs font-medium border border-transparent hover:border-border/60 hover:bg-secondary/50 hover:text-foreground transition-all duration-300 cursor-default"
            >
              <span className="mr-1 text-muted-foreground/30 font-mono">#</span>
              {tag.name}
            </span>
          ))}
        </div>
      )}
      {/* Additional Tips / Next Steps (Keep static for now or can be dynamic later) */}
      <section className="space-y-4 pt-4 w-full overflow-hidden" aria-labelledby="tips">
        <h2 id="tips" className="text-2xl sm:text-3xl font-medium scroll-mt-20 break-words text-pretty">
          Next Steps
        </h2>
        
        <Card className="border-l-4 border-l-blue-500 overflow-hidden">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-base sm:text-lg text-muted-foreground">
              <li className="flex gap-2 sm:gap-3 break-words overflow-wrap-anywhere">
                <span className="text-blue-500 font-bold flex-shrink-0" aria-hidden="true">•</span>
                <span className="break-words overflow-wrap-anywhere">Explore more examples in the documentation</span>
              </li>
              <li className="flex gap-2 sm:gap-3 break-words overflow-wrap-anywhere">
                <span className="text-blue-500 font-bold flex-shrink-0" aria-hidden="true">•</span>
                <span className="break-words overflow-wrap-anywhere">Try implementing these concepts in your project</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}
