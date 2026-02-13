import Link from "next/link";
import { docsConfig } from "@/components/content/docs";
import { notFound } from "next/navigation";

export default async function TechLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tech: string }>;
}) {
  const { tech } = await params;
  const techConfig = docsConfig[tech as keyof typeof docsConfig];

  if (!techConfig) return notFound();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r px-4 py-6 space-y-6">
        <h2 className="font-bold text-lg">{techConfig.label}</h2>

        {techConfig.nav.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              {section.title}
            </h3>

            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/dashboard/docs/${tech}/${item.slug}`}
                    className="block rounded px-2 py-1 text-sm hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 px-10 py-8">
        {children}
      </main>
    </div>
  );
}
