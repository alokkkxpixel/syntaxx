import { NavbarDemo } from "@/components/Navbar";
import Image from "next/image";
import Prism from "@/components/Prism";
import { HeroSection } from "@/components/hero-section";
import { TechStacksSection } from "@/components/tech-stack-section";
import { Footer } from "@/components/Footer-vo";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Prism Background */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        {/* <Prism
         animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={2}
    hueShift={0}
    colorFrequency={3.75}
    noise={0}
    glow={.5}
        /> */}
      </div>
    
      <NavbarDemo className="bg-white/10 flex justify-center  items-center  p-4 dark:bg-black/10 backdrop-blur-md border-b border-white/5" />

     <main>
      <HeroSection />
      <TechStacksSection />
    </main>

     
    </div>
  );
}
