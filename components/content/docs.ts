export const docsConfig = {
  react: {
    label: "React",
    nav: [
      {
        title: "Hooks",
        items: [
          { label: "useState", slug: "use-state" },
          { label: "useEffect", slug: "use-effect" },
        ],
      },
      {
        title: "Core",
        items: [
          { label: "Routing", slug: "routing" },
        ],
      },
    ],
  },

  next: {
    label: "Next.js",
    nav: [
      {
        title: "App Router",
        items: [
          { label: "Routing", slug: "app-router" },
          { label: "Layouts", slug: "layouts" },
        ],
      },
    ],
  },

  node: {
    label: "Node.js",
    nav: [
      {
        title: "Express",
        items: [
          { label: "Setup", slug: "express-setup" },
        ],
      },
    ],
  },
};
