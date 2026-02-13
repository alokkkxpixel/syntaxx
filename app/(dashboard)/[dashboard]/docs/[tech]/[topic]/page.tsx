interface PageProps {
  params: Promise<{
    dashboard: string;
    tech: string;
    topic: string;
  }>;
}

export default async function TopicPage({ params }: PageProps) {
  const { dashboard, tech, topic } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold capitalize">{topic.replace(/-/g, ' ')}</h1>
        <p className="text-muted-foreground mt-2">
          Documentation for {topic} in {tech}
        </p>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>This is a placeholder page for the <strong>{topic}</strong> documentation.</p>
        <p className="text-sm text-muted-foreground mt-4">
          Content for this topic will be added soon.
        </p>
      </div>
    </div>
  );
}
