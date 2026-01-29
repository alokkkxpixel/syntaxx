import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Tech table with common technologies
  const techs = [
    { name: 'React', slug: 'react' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'Python', slug: 'python' },
    { name: 'Vue.js', slug: 'vuejs' },
    { name: 'Angular', slug: 'angular' },
    { name: 'Svelte', slug: 'svelte' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'Prisma', slug: 'prisma' },
    { name: 'PostgreSQL', slug: 'postgresql' },
  ];

  for (const tech of techs) {
    await prisma.tech.upsert({
      where: { slug: tech.slug },
      update: {},
      create: tech,
    });
  }

  console.log('✅ Seeding completed!');
  console.log(`📦 Created ${techs.length} technologies`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
