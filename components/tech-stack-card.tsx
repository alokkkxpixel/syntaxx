"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { ArrowUpRight } from "lucide-react";

interface TechStack {
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

export function TechStackCard({ title, slug, description, icon }: TechStack) {
  return (
    <Link href={`/${slug}`} className="block h-full cursor-pointer">
      <Card className="h-full border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:hover:shadow-none group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col h-full space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-2 sm:p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
                <div className="scale-90 sm:scale-100 transition-transform group-hover:scale-110">
                  {icon}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 dark:text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-black dark:text-muted-foreground line-clamp-2 leading-relaxed font-semibold">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
