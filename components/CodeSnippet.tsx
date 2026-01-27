"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

interface CodeSnippetProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeSnippet({
  code,
  language,
  showLineNumbers = false,
  className = "",
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 p-2 rounded-md bg-muted/80 hover:bg-muted border border-border opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none backdrop-blur-sm"
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        )}
      </button>

      {/* Code Block with Horizontal Scroll */}
      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          showLineNumbers={showLineNumbers}
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            padding: "1rem",
            background: isDark ? "oklch(0.205 0 0)" : "oklch(0.985 0 0)",
            minWidth: "max-content",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
