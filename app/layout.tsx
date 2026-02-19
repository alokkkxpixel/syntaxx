import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/app/providers/Provider";
import { Footer } from "@/components/Footer-vo";
import {Toaster} from "react-hot-toast";
import { StickyBanner } from "@/components/ui/sticky-banner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Syntaxx - Find Every Tech Stack Syntax in One Place',
  description: 'Your one-stop resource for finding syntax, documentation, and code snippets across all popular tech stacks.',
  generator: 'v0.app',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
   
  // },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        
        <Provider>  
          <Toaster/>

                  
          {children}
        </Provider>
         <Footer />
          
      </body>
    </html>
  );
}
