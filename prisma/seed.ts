import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Tech table with common technologies
const techs = [
  {
    name: 'React',
    slug: 'react',
    title: 'React JavaScript Library',
    description: 'React is an open-source JavaScript library developed by Meta for building user interfaces, primarily for single-page applications. It uses a component-based architecture and a virtual DOM to efficiently update and render UI changes. React is widely used in the industry for building scalable frontend applications. Official documentation: https://react.dev'
  },
  {
    name: 'Next.js',
    slug: 'nextjs',
    title: 'Next.js React Framework',
    description: 'Next.js is a full-stack React framework that enables features such as server-side rendering, static site generation, file-based routing, and API routes. It is commonly used to build production-grade web applications with improved performance and SEO. Official documentation: https://nextjs.org/docs'
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    title: 'TypeScript Typed JavaScript',
    description: 'TypeScript is a strongly typed programming language that builds on JavaScript by adding static type definitions. It helps developers catch errors early, improve code readability, and scale large applications. TypeScript is maintained by Microsoft and widely adopted in enterprise projects. Official documentation: https://www.typescriptlang.org/docs'
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    title: 'JavaScript Programming Language',
    description: 'JavaScript is a high-level, interpreted programming language used to create dynamic and interactive content on the web. It runs in browsers and server environments like Node.js. JavaScript is a core technology of the web alongside HTML and CSS. Official documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    title: 'Node.js Runtime Environment',
    description: 'Node.js is an open-source, cross-platform JavaScript runtime that allows developers to run JavaScript on the server. It is built on Chrome’s V8 engine and is commonly used to build fast, scalable backend services and APIs. Official documentation: https://nodejs.org/en/docs'
  },
  {
    name: 'Python',
    slug: 'python',
    title: 'Python Programming Language',
    description: 'Python is a high-level, interpreted programming language known for its readability and simplicity. It is widely used in web development, data science, automation, artificial intelligence, and backend systems. Official documentation: https://docs.python.org/3'
  },
  {
    name: 'FastAPI',
    slug: 'fastapi',
    title: 'FastAPI Python Web Framework',
    description: 'FastAPI is a modern, high-performance Python web framework used to build RESTful APIs. It is based on standard Python type hints and automatically generates OpenAPI and Swagger documentation. FastAPI is known for its speed, simplicity, and developer experience. Official documentation: https://fastapi.tiangolo.com'
  },
  {
    name: 'Django',
    slug: 'django',
    title: 'Django Python Web Framework',
    description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It includes built-in features such as authentication, ORM, admin panel, and security protections. Django is widely used for building robust, database-driven web applications. Official documentation: https://docs.djangoproject.com'
  },
  {
    name: 'Vue.js',
    slug: 'vuejs',
    title: 'Vue.js Progressive JavaScript Framework',
    description: 'Vue.js is a progressive JavaScript framework used for building user interfaces and single-page applications. It is designed to be incrementally adoptable and focuses on simplicity, reactivity, and performance. Official documentation: https://vuejs.org/guide'
  },
  {
    name: 'Angular',
    slug: 'angular',
    title: 'Angular Frontend Framework',
    description: 'Angular is a TypeScript-based frontend framework developed by Google. It provides a complete solution for building large-scale, enterprise-level web applications with features like dependency injection, routing, and RxJS. Official documentation: https://angular.io/docs'
  },
  {
    name: 'Svelte',
    slug: 'svelte',
    title: 'Svelte Frontend Compiler',
    description: 'Svelte is a modern frontend framework that shifts work from the browser to the build step by compiling components into efficient JavaScript. This results in faster runtime performance and smaller bundle sizes. Official documentation: https://svelte.dev/docs'
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    title: 'Tailwind CSS Utility-First Framework',
    description: 'Tailwind CSS is a utility-first CSS framework that allows developers to build custom designs directly in markup using predefined utility classes. It is widely used for rapid UI development and design consistency. Official documentation: https://tailwindcss.com/docs'
  },
  {
    name: 'Prisma',
    slug: 'prisma',
    title: 'Prisma ORM',
    description: 'Prisma is a next-generation ORM for Node.js and TypeScript that provides type-safe database access, schema modeling, and migrations. It supports databases like PostgreSQL, MySQL, and MongoDB. Official documentation: https://www.prisma.io/docs'
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    title: 'PostgreSQL Relational Database',
    description: 'PostgreSQL is a powerful, open-source relational database system known for reliability, extensibility, and standards compliance. It is widely used in production systems for storing structured data and supporting complex queries. Official documentation: https://www.postgresql.org/docs'
  }
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
