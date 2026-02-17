"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";

export interface CodeSnippet {
  id: string;
  code: string;
  language: string;
  filename?: string | null;
  description: string;
  docId: string;
  createdAt: string;
}

export interface Doc {
  id: string;
  title: string;
  slug: string;
  description: string;
  techId: string;
  createdAt: string;
  snippets?: CodeSnippet[];
}

export interface Tech {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  docs?: Doc[];
}

interface TechContextType {
  techs: Tech[];
  loading: boolean;
  error: string | null;
  refreshTechs: () => Promise<void>;
}

const TechContext = createContext<TechContextType | null>(null);

export function TechProvider({ children }: { children: ReactNode }) {
  const cacheRef = useRef<Tech[] | null>(null);

  const [techs, setTechs] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTechs = async () => {
    if (cacheRef.current) return; // ✅ fetch once

    setLoading(true);
    try {
      
      const res = await fetch("/api/tech",{
    cache: 'no-store'
  });
      if (!res.ok) throw new Error("Failed to fetch technologies");

      const data: Tech[] = await res.json();
      cacheRef.current = data;
      setTechs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechs();
  }, []);

  const value = useMemo(
    () => ({
      techs,
      loading,
      error,
      refreshTechs: async () => {
        cacheRef.current = null;
        await fetchTechs();
      },
    }),
    [techs, loading, error]
  );

  return <TechContext.Provider value={value}>{children}</TechContext.Provider>;
}

export function useTech() {
  const ctx = useContext(TechContext);
  if (!ctx) {
    throw new Error("useTech must be used within TechProvider");
  }
  return ctx;
}
