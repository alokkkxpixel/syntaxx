import React from 'react';

interface PageProps {
  params: {
    dashboard: string;
    tech: string;
    topic: string;
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { dashboard, tech, topic } = await params;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{topic}</h1>
      <p className="text-muted-foreground mt-2">
        Documentation for {topic} in {tech} ({dashboard})
      </p>
      <div className="mt-8">
        {/* Topic content will go here */}
        <p>This is a placeholder for the {topic} documentation page.</p>
      </div>
    </div>
  );
}
