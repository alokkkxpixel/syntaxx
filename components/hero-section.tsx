"use client"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Prism from "@/components/Prism";
import SplitText from "./SplitText";
export function HeroSection() {
  return (
    <>
     <div className="fixed inset-0 -z-20 h-full w-full pointer-events-none overflow-hidden">
        {/* Subtle background for light theme */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1),transparent)] dark:hidden" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:hidden" />
        
        {/* Previous Prism background (commented out by user) */}
        {/* <Prism ... /> */}
      </div>
       
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-6 animate-fade-in">
          <span>Production Ready Code</span>
        </div> */}
        <div className="mx-auto flex justify-center items-center text-lg max-w-lg py-5">
          <SplitText
            text="Welcome to Syntaxx, coders.👋"
            className="text-2xl font-semibold text-center"
            delay={30}
            duration={0.8}

          />
        </div>
         
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-foreground text-balance leading-[1.1] mb-6">
          Find Every Tech Stack <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-primary/80">
            Syntax in One Place
          </span>
        </h1>
        
        <p className="mt-6 text-sm sm:text-lg  tracking-tighter  text-black dark:text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed sm:font-medium">
          Your one-stop resource for finding syntax, documentation, and code snippets across all popular tech stacks. Professional, efficient, and ready to ship.
        </p>
        
        <div className="mt-10 sm:mb-8 mb-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="px-8 h-12 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="px-8 h-12 rounded-full bg-white dark:bg-transparent border-neutral-200 dark:border-neutral-800 font-bold hover:bg-neutral-50 dark:hover:bg-white/5 transition-all">
            Learn More
          </Button>
        </div>
        
        <Link href="#Tech">
          <Button variant="secondary" size="lg" className="px-8 h-12 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white border border-neutral-200 dark:border-transparent hover:bg-neutral-200 dark:hover:bg-white/20 transition-all font-semibold">
            Explore Popular Tech Stacks <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
    </>

  )
}
