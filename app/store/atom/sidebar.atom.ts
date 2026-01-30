import { atom } from "recoil";



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

export const techState = atom({
  key: "techState",
  default: {
    data: [] as Tech[],
    loading: false,
    error: null,
    
  },
});
