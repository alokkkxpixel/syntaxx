// types/tech.ts
export interface Doc {
  id: string
  title: string
  slug: string
}

export interface Tech {
  id: string
  name: string
  slug: string
  createdAt: Date   // ✅ Date on server
  title: string
  description: string
  docs?: Doc[]
}