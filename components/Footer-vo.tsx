import Image from "next/image";
import { Tooltip } from "./ui/tooltip-card";

export function Footer() {
  return (
    <footer className=" dark:bg-black/80 border-t border-border" >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="mb-16 text-left md:text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Syntaxx</h2>
          <p className="mt-4 text-muted-foreground max-w-md md:mx-auto">
            Your one-stop resource for finding syntax, documentation, and code snippets across all popular tech stacks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 text-left md:text-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-start md:items-center justify-center gap-2 text-left md:text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Syntaxx. All rights reserved.
            </p>
            <Tooltip
          containerClassName="text-neutral-600 dark:text-neutral-400"
          content={<TestimonialCard />}
        >

            <a href="https://x.com/AlokkxPithale_?s=20">
            <p className="text-muted-foreground text-sm">
              Made by <span className="text-foreground font-medium">@AlokkxPithale_</span>
            </p>
            </a>

        </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  )
}


export const TestimonialCard = () => {
  return (
    <div className="">
      <blockquote className="mb-4 text-neutral-700 dark:text-neutral-300">
        This product is absolutely, grade A horse shit.
      </blockquote>
      <div className="flex items-center gap-2">
        <Image
          height={40}
          width={40}
          src="/Alok.jpg"
          alt="Alokk Pithale"
          className="size-6 rounded-full object-cover"
        />
        <div>
          <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            Alokk Pithale
          </p>
          <p className="text-[10px] text-neutral-600 dark:text-neutral-400">
          Freelance Developer
          </p>
        </div>
      </div>
    </div>
  );
};