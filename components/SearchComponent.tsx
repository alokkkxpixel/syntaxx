"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { BookOpen, Laptop, Home, Settings, Search, Layout } from "lucide-react"

interface SearchResult {
  techs: any[]
  docs: any[]
  totalTechs: number
  totalDocs: number
}

export function DocSearch({ open, setOpen }: { open: boolean, setOpen: (open: boolean | ((prev: boolean) => boolean)) => void }) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    const controller = new AbortController()
    
    const search = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/docs/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal
        })
        const data = await res.json()
        
        setResults(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(search, 500)

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }

    return () => controller.abort()
  }, [query])

  const onSelect = (url: string) => {
    router.push(url)
    setOpen(false)
    setQuery("") // Reset query on selection
  }

  if (!mounted) return null

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={setOpen} 
      shouldFilter={false}
      className="sm:top-24 sm:translate-y-0 top-auto bottom-0 translate-y-0 left-0 translate-x-0 sm:left-[50%] sm:translate-x-[-50%] max-w-full sm:max-w-2xl h-[70vh] min-h-[70vh] sm:min-h-0 sm:h-auto duration-300 rounded-b-none sm:rounded-xl data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-top-8 sm:data-[state=open]:zoom-in-95 group"
    >
      <CommandInput 
        placeholder="Type a command or search documentation..." 
        value={query}
        onValueChange={setQuery}
        className="text-base sm:text-lg"
      />
      <CommandList className="flex-1 h-full max-h-none sm:max-h-[600px] overflow-y-auto">
        {loading && <div className="p-4 text-sm text-center text-muted-foreground">Searching...</div>}
        
        {/* Default Suggestions displayed when query is empty */}
        {!query && (
          <>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => onSelect("/")}>
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => onSelect("/#Tech")}>
                <Layout className="mr-2 h-4 w-4" />
                <span>Browse Technologies</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => onSelect("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {query && (!results || (results.totalTechs === 0 && results.totalDocs === 0)) && !loading && (
          <CommandEmpty>No results found for "{query}".</CommandEmpty>
        )}
        
        {/* Dynamic Search Results */}
        {results?.techs && results.techs.length > 0 && (
          <CommandGroup heading="Technologies">
            {results.techs.map((tech: any) => (
              <CommandItem
                key={`tech-${tech.id}`}
                onSelect={() => onSelect(`/${tech.slug}`)}
                className="cursor-pointer"
              >
                <Laptop className="mr-2 h-4 w-4" />
                <span>{tech.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {results?.docs && results.docs.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Documentation">
              {results.docs.map((doc: any) => (
                <CommandItem
                  key={`doc-${doc.id}`}
                  onSelect={() => onSelect(`/${doc.tech.slug}/${doc.slug}`)}
                  className="cursor-pointer"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{doc.title}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{doc.tech.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
