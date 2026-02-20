
"use client"


import React from 'react'



import { NavbarDemo } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink, 
  Users, 
  Target, 
  Heart,
  Code2,
  Cpu,
  Globe,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
const AboutCom = () => {
  const stats = [
    { label: "Active Techs", value: "10+" },
    { label: "Open Source", value: "100%" },
    { label: "Developer", value: "1" },
  ];

  const technologies = [
    "Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion"
  ];

  return (
    <div className="relative min-h-screen">
      <NavbarDemo className="bg-white/10 flex justify-center items-center p-4 dark:bg-black/10 backdrop-blur-md border-b border-white/5" />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24">
        {/* Project Vision Hero */}
        <section className="text-center space-y-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Mission</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40 leading-[1.1]">
              One Hub. <br /> Every <span className="text-blue-500 text-shadow-glow">Syntax.</span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Syntaxx was born out of a simple frustration: the constant context-switching between dozens of tabs just to find simple implementation patterns. We're building the ultimate unified reference for the modern developer.
            </p>
          </motion.div>

        </section>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-12 pt-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-foreground">{stat.value}</div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Vision Image Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl"
        >
           <Image
             src="/vision.png"
             alt="Syntaxx Vision"
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 sm:p-12">
              <div className="space-y-2">
                 <h2 className="text-2xl sm:text-3xl font-bold text-white">Unified Knowledge & Speed</h2>
                 <p className="text-white/70 max-w-lg text-sm sm:text-base">Empowering developers to build faster by bridging the gap between documentation and implementation.</p>
              </div>
           </div>
        </motion.section>

        {/* The Creator Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-white/5 shadow-2xl group">
               <Image
                 src="/Alok.jpg"
                 alt="Alokk Pithale"
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white text-sm font-medium italic">"Building the tools I wish I had when I started."</p>
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 blur-[60px] -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Meet the Architect</h2>
              <div className="flex flex-wrap items-center gap-3">
                 <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest">Full Stack Developer</span>
                 <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest">Freelancer</span>
                 <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-widest border border-blue-500/20">18 Years Old</span>
              </div>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Hey there! I'm <span className="text-foreground font-bold italic">Alokk Pithale</span>. I'm an 18-year-old developer obsessed with creating clean, efficient, and beautiful web experiences. 
              </p>
              <p>
                I started Syntaxx as a personal tool to organize the snippets and patterns I use daily. It quickly grew into a project dedicated to helping other freelancers and developers spend less time searching and more time shipping.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="https://github.com/alokkkxpixel/Syntaxx" prefetch target="_blank">
                <Button size="lg" className="rounded-full bg-foreground text-background hover:opacity-90 font-bold px-8">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub Repo
                </Button>
              </Link>
              <Link href="https://x.com/AlokkxPithale_" target="_blank">
                <Button size="lg" variant="outline" className="rounded-full border-foreground/20 font-bold px-8">
                  <Twitter className="w-5 h-5 mr-2" />
                  Follow Updates
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Project Details */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="bg-secondary/10 border-border/40 hover:bg-secondary/20 transition-all duration-300 group">
              <CardContent className="pt-8 space-y-4">
                 <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold">The Goal</h3>
                 <p className="text-muted-foreground leading-relaxed">
                    To provide a zero-friction reference for syntax and logic patterns that actually work in production environments.
                 </p>
              </CardContent>
           </Card>

           <Card className="bg-secondary/10 border-border/40 hover:bg-secondary/20 transition-all duration-300 group">
              <CardContent className="pt-8 space-y-4">
                 <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold">Tech Stack</h3>
                 <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded border border-border/20">
                         {tech}
                      </span>
                    ))}
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-secondary/10 border-border/40 hover:bg-secondary/20 transition-all duration-300 group">
              <CardContent className="pt-8 space-y-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold">Community</h3>
                 <p className="text-muted-foreground leading-relaxed">
                    Syntaxx is open-source. We welcome contributors who want to help expand our library. 
                 </p>
                 <Link href="https://github.com/alokkkxpixel/Syntaxx/graphs/contributors" target="_blank" className="inline-flex items-center text-xs font-bold text-blue-500 hover:gap-2 transition-all">
                    View Contributors <ExternalLink className="w-3 h-3 ml-1" />
                 </Link>
              </CardContent>
           </Card>
        </section>

        {/* Join Us CTA */}
        <section className="bg-blue-600 rounded-[3rem] p-12 sm:p-20 text-center space-y-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
           <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Support the Project</h2>
              <p className="text-blue-100 max-w-xl mx-auto text-lg">
                If Syntaxx has helped you save time, consider starring the repo or following if for new tech stack updates!
              </p>
              <div className="flex justify-center gap-4">
                 <Link href="https://github.com/alokkkxpixel/Syntaxx" target="_blank">
                    <Button size="lg" className="rounded-full bg-white text-blue-600 hover:bg-blue-50 font-black px-12 h-14 text-lg">
                       Star on GitHub
                    </Button>
                 </Link>
              </div>
           </div>
        </section>

        <footer className="text-center pt-8">
           <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-widest">Built with passion by Alokk</span>
           </div>
        </footer>
      </main>
    </div>
  )
}
export default AboutCom