import React from "react";
import { Compare } from "@/components/ui/compare";
import { CheckCircle2, Sparkles, Zap, GraduationCap } from "lucide-react";

function CompareDemo() {
  return (
    <div className="relative group p-2 sm:p-4 border rounded-[2rem] dark:bg-neutral-900/50 bg-neutral-100/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 transition-all duration-500 hover:border-primary/30 shadow-2xl overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <Compare
        firstImage="https://assets.aceternity.com/code-problem.png"
        secondImage="https://assets.aceternity.com/code-solution.png"
        firstImageClassName="object-cover object-left-top rounded-2xl"
        secondImageClassname="object-cover object-left-top rounded-2xl"
        className="h-[250px] w-full aspect-square md:h-[500px] lg:h-[450px] xl:h-[500px]"
        slideMode="hover"
      />
    </div>
  );
}

const CompareDemoSection = () => {
  return (
    <section className="relative mt-24 mb-10 sm:mt-28 px-6 py-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
        {/* Top Centered Legend */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-6 px-5 py-2.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all hover:border-primary/20">
            <span className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" /> 
              <span className="text-muted-foreground">Example</span>
            </span>
            <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
            <span className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> 
              <span className="text-muted-foreground">Standard</span>
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">
            Visual Code Comparison
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8 order-2 lg:order-1 mt-4 lg:mt-0">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                <span>Ready to Ship</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-tight">
                Stop Searching, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80">
                  Start Shipping
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Whatever stack you&apos;re using, Syntaxx gives you ready-to-use code you can copy, paste, and watch it work instantly.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Universal Support */}
              <div className="group space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">Universal Syntax Support</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground pl-10">
                  From React and Node to SQL and Python. Find the exact syntax for any stack without digging through technical docs.
                </p>
              </div>

              {/* Copy, Paste, Ship */}
              <div className="group space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">Copy, Paste, Ship</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground pl-10">
                  Zero boilerplate. Just grab the code snippets you need and drop them into your project to get your app ready to start.
                </p>
              </div>

              {/* Beginner Friendly */}
              <div className="group space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">Purely Beginner Friendly</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground pl-10">
                  Clean code examples designed with beginners in mind, providing a clear path from documentation to production.
                </p>
              </div>
            </div>
          </div>

          {/* Right demo */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-6 -right-6 text-[8rem] font-bold text-primary/5 select-none pointer-events-none -z-10">
              01
            </div>
            <div className="relative z-10">
              <CompareDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareDemoSection;



