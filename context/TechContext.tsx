"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const TechContext = createContext<TechContextType | undefined>(undefined);

export function TechProvider({ children }: { children: ReactNode }) {
  const [techs, setTechs] = useState<Tech[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTechs = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tech");
      if (!res.ok) throw new Error("Failed to fetch technologies");
      const data = await res.json();
      setTechs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechs();
  }, []);

  const value = React.useMemo(() => ({
    techs,
    loading,
    error,
    refreshTechs: fetchTechs
  }), [techs, loading, error, fetchTechs]);

  return (
    <TechContext.Provider value={value}>
      {children}
    </TechContext.Provider>
  );
}

export function useTech() {
  const context = useContext(TechContext);
  if (context === undefined) {
    throw new Error("useTech must be used within a TechProvider");
  }
  return context;
}
