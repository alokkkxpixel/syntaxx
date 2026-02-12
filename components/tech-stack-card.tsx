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
      <Card className="h-full border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col h-full space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-2 sm:p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 transition-colors group-hover:bg-primary/10">
                <div className="scale-90 sm:scale-100">
                  {icon}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
