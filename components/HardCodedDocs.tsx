"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CodeSnippet } from "@/components/CodeSnippet";

export default function HardCodedDocs() {
  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Header */}
      <header className="space-y-3 w-full overflow-hidden">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance break-words">
          Routing in React
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
          Learn how routing works in React using react-router-dom.
        </p>
      </header>

      <Separator className="my-6 sm:my-8" />

      {/* Step 1 */}
      <section className="space-y-4 w-full overflow-hidden" aria-labelledby="step-1">
        <h2 id="step-1" className="text-2xl sm:text-3xl font-medium scroll-mt-20 break-words">
          1. Create Vite App
        </h2>
        
        <CodeSnippet
          language="bash"
          code={`npm create vite@latest my-app
cd my-app
npm install
npm run dev`}
        />

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
          create-vite is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome Vite for community maintained templates that include other tools or target different frameworks.
        </p>
      </section>

      {/* Step 2 */}
      <section className="space-y-4 w-full overflow-hidden" aria-labelledby="step-2">
        <h2 id="step-2" className="text-2xl sm:text-3xl font-medium scroll-mt-20 break-words">
          2. Install React Router
        </h2>

        <CodeSnippet
          language="bash"
          code="npm install react-router-dom"
        />

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
          React Router enables client-side routing in your React application, allowing you to create single-page applications with navigation.
        </p>
      </section>

      {/* Step 3 */}
      <section className="space-y-4 w-full overflow-hidden" aria-labelledby="step-3">
        <h2 id="step-3" className="text-2xl sm:text-3xl font-medium scroll-mt-20 break-words">
          3. Basic Routing Setup
        </h2>

        <CodeSnippet
          language="jsx"
          showLineNumbers
          code={`import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}
        />

        <div className="space-y-3 w-full overflow-hidden">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
            The <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs sm:text-sm break-all">BrowserRouter</code> component wraps your application and enables routing functionality.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words overflow-wrap-anywhere">
            Each <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs sm:text-sm break-all">Route</code> defines a path and the component to render when that path matches.
          </p>
        </div>
      </section>

      {/* Additional Tips */}
      <section className="space-y-4 pt-4 w-full overflow-hidden" aria-labelledby="tips">
        <h2 id="tips" className="text-2xl sm:text-3xl font-medium scroll-mt-20 break-words">
          Next Steps
        </h2>
        
        <Card className="border-l-4 border-l-blue-500 overflow-hidden">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-base sm:text-lg text-muted-foreground">
              <li className="flex gap-2 sm:gap-3 break-words overflow-wrap-anywhere">
                <span className="text-blue-500 font-bold flex-shrink-0" aria-hidden="true">•</span>
                <span className="break-words overflow-wrap-anywhere">Explore nested routes for complex layouts</span>
              </li>
              <li className="flex gap-2 sm:gap-3 break-words overflow-wrap-anywhere">
                <span className="text-blue-500 font-bold flex-shrink-0" aria-hidden="true">•</span>
                <span className="break-words overflow-wrap-anywhere">Learn about route parameters and query strings</span>
              </li>
              <li className="flex gap-2 sm:gap-3 break-words overflow-wrap-anywhere">
                <span className="text-blue-500 font-bold flex-shrink-0" aria-hidden="true">•</span>
                <span className="break-words overflow-wrap-anywhere">Implement navigation with the Link component</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}