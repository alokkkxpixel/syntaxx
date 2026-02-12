import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Prism from "@/components/Prism";
export function HeroSection() {
  return (
    <>
     <div className="fixed inset-0 -z-20 h-full w-full pointer-events-none overflow-hidden">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={2}
          hueShift={0}
          colorFrequency={3.75}
          noise={0}
          glow={0.3}
          bloom={0.5}
        />
      </div>
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-tight">
          Find Every Tech Stack Syntax in One Place
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Your one-stop resource for finding syntax, documentation, and code snippets across all popular tech stacks.
        </p>
        
        <div className="mt-10 sm:mb-5 mb-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Learn More
          </Button>
        </div>
        <Link href="#Tech">
          <Button variant="secondary" size="lg" className="px-8 dark:bg-white/10 bg-black/20">
            Explore Popular Tech Stacks <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
    </>

  )
}
