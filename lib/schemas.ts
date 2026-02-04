import { z } from "zod";

export const CreateSnippetSchema = z.object({
  lang: z.string().min(1, "Snippet language is required"),
  code: z.string().min(1, "Snippet code is required"),
  title: z.string().optional().default(""),
  icon: z.string().optional().default("filecode"),
  filename: z.string().optional().default(""),
  description: z.string().min(4, "Description must be at least 4 characters"),
});

export const CreateDocSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.string().min(1, "Technology is required"),
  snippets: z.array(CreateSnippetSchema).min(1, "At least one code snippet is required"),
  tags: z.array(z.string()).optional().default([]),
});

export type CreateDocInput = z.infer<typeof CreateDocSchema>;
