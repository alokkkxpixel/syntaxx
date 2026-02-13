import React from 'react'

interface PageProps {
  params: Promise<{
    dashboard: string;
    tech: string;
  }>;
}

export default async function TechPage({ params }: PageProps) {
  const { tech } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{tech}</h1>
      <p className="text-muted-foreground">
        Select a topic from the sidebar to view documentation.
      </p>
    </div>
  );
}