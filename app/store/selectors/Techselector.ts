import { selector } from "recoil";

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

export const techQuery = selector<Tech[]>({
  key: "techQuery",
  get: async () => {
    const res = await fetch("/api/tech");

    if (!res.ok) {
      throw new Error("Failed to fetch technologies");
    }

    return res.json();
  },
});
