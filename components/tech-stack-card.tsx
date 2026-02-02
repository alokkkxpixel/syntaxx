import Link from "next/link"
import React from "react"
interface TechStackCardProps {
  title: string
  slug:string
  description: string
  icon: React.ReactNode
}

export function TechStackCard({ title,slug, description, icon,  }: TechStackCardProps) {
  return (
    <Link href={`/${slug}`}>
    <div className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 transition-all hover:bg-card/80 hover:border-muted-foreground/30">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
    </Link>
  )
}
