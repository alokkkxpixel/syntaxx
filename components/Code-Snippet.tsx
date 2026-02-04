"use client";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from "react-hot-toast"
interface CodeSnippetProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function SnippetsCode({ 
  code, 
  language = 'javascript', 
  filename = 'code.js',
  showLineNumbers = true 
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return <div className="w-full h-40 animate-pulse bg-muted rounded-lg" />;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard")
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    const icons: Record<string, string> = {
      js: '📄',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      html: '🌐',
      css: '🎨',
      json: '📋',
      md: '📝',
      py: '🐍',
      java: '☕',
      cpp: '⚙️',
      c: '⚙️',
      go: '🔷',
      rs: '🦀',
      php: '🐘',
      rb: '💎',
      sh: '🔧',
      yml: '📄',
      yaml: '📄',
    };

    return icons[ext || ''] || '📄';
  };

  return (
    <div className="w-full rounded-lg overflow-hidden transition-all duration-300 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10">
      {/* Terminal Header - Compact */}
      <div className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2 border-b bg-gray-100 dark:bg-[#2d2d2d] border-gray-200 dark:border-white/10">
        {/* Left side - Mac dots and filename */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mac traffic lights - smaller on mobile */}
          <div className="flex gap-1 sm:gap-1.5 flex-shrink-0">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          
          {/* Filename with icon */}
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs sm:text-sm flex-shrink-0">{getFileIcon(filename)}</span>
            <span className="text-[10px] sm:text-xs font-medium truncate text-gray-700 dark:text-gray-300">
              {filename}
            </span>
          </div>
        </div>

        {/* Right side - Copy button */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-1.5 py-1 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-medium transition-all duration-200 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content with minimal scrollbar inside */}
      <div 
        className="overflow-x-auto custom-scrollbar-light dark:custom-scrollbar-dark"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: isDark ? '#4a4a4a transparent' : '#aaa transparent',
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '0.5rem',
            paddingBottom: '0.5rem',
            ...(isDark ? { backgroundColor: 'transparent' } : { background: 'transparent' }),
            fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
            lineHeight: '1.4',
          }}
          lineNumberStyle={{
            minWidth: '2em',
            paddingRight: '0.5em',
            color: isDark ? '#4a4a4a' : '#bbb',
            userSelect: 'none',
            fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)',
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}