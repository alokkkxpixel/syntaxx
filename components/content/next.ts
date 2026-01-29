export const nextDocs = {
  "app-router": {
    title: "App Router",
    sections: [
      {
        type: "text",
        content: "Next.js App Router enables you to build applications using React's latest features.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// app/page.tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}`,
      },
    ],
  },

  routing: {
    title: "Routing in Next.js",
    sections: [
      {
        type: "text",
        content: "Next.js uses file-system based routing where folders define routes.",
      },
      {
        type: "code",
        language: "tsx",
        content: `// app/dashboard/page.tsx creates /dashboard route
export default function Dashboard() {
  return <div>Dashboard</div>
}`,
      },
    ],
  },
};
