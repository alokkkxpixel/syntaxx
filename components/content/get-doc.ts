import { reactDocs } from "./react";
import { nextDocs } from "./next";

export function getDoc(tech: string, topic: string) {
  const map: Record<string, any> = {
    react: reactDocs,
    next: nextDocs,
  };

  return map[tech]?.[topic] ?? null;
}
