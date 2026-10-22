import { cacheLife } from "next/cache";

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  features: string[];
  tech: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
};

export type SkillGroup = {
  category: string;
  icon: string;
  items: string[];
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

/* ---------------------------------------------------------------------------
 * Static profile content
 * ------------------------------------------------------------------------- */

export const profile = {
  name: "Alex Johnson",
  initials: "AJ",
  role: "Full-Stack Developer",
  tagline:
    "I design and build fast, accessible web applications with modern JavaScript — from pixel-perfect interfaces to reliable, well-tested APIs.",
  location: "Lagos, Nigeria",
  email: "hello@alexjohnson.dev",
  availability: "Available for freelance & full-time roles",
  socials: {
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjdev",
  },
  bio: [
    "I'm Alex, a full-stack developer who loves turning complex problems into clean, intuitive products. My journey started with a curiosity about how websites work, and grew through the intensive full-stack curriculum at GoMyCode — where I fell in love with React, Node.js, and everything in between.",
    "Today I build production web applications end-to-end: designing accessible interfaces with React and Next.js, modelling data with PostgreSQL and Prisma, and shipping APIs that stay fast under load. I care deeply about performance, developer experience, and writing code that the next person can actually read.",
    "When I'm not coding, you'll find me mentoring junior developers, writing about what I learn, or experimenting with new tools in the ever-moving JavaScript ecosystem.",
  ],
};

export const stats: Stat[] = [
  { value: "3+", label: "Years of experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "15+", label: "Technologies mastered" },
  { value: "100%", label: "Client satisfaction" },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "◧",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Redux Toolkit"],
  },
  {
    category: "Backend",
    icon: "⚙",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "REST & GraphQL"],
  },
  {
    category: "Tools & Practices",
    icon: "◆",
    items: ["Git & GitHub", "Docker", "Jest & Testing Library", "Figma", "CI/CD", "Agile / Scrum"],
  },
];

export const experience: Experience[] = [
  {
    period: "2024 — Present",
    role: "Full-Stack Developer (Freelance)",
    company: "Self-employed",
    description:
      "Building and shipping web products for startups and small businesses — from marketing sites and dashboards to full e-commerce platforms. Own the process end-to-end: discovery, design, implementation, deployment, and iteration.",
  },
  {
    period: "2023 — 2024",
    role: "Frontend Developer",
    company: "Lumina Digital",
    description:
      "Developed responsive React interfaces for SaaS clients, improved Core Web Vitals by 40%, and introduced a shared component library that cut new-page build time in half.",
  },
  {
    period: "2022 — 2023",
    role: "Full-Stack Web Development Trainee",
    company: "GoMyCode",
    description:
      "Completed the intensive full-stack curriculum covering JavaScript, React, Node.js, Express, and MongoDB. Shipped multiple capstone projects and graduated with distinction.",
  },
];

/* ---------------------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------------------- */

const projects: Project[] = [
  {
    slug: "shopflow",
    title: "ShopFlow",
    category: "E-commerce",
    year: "2026",
    role: "Full-Stack Developer",
    summary:
      "A modern e-commerce platform with a headless CMS, Stripe payments, and an admin dashboard for managing products, orders, and customers.",
    description: [
      "ShopFlow is a complete e-commerce experience built with Next.js App Router and server-side rendering for fast, SEO-friendly product pages. The storefront consumes a headless CMS for merchandising, while checkout is handled with Stripe Checkout and webhooks keep order state in sync.",
      "The admin dashboard supports product and inventory management, order fulfilment workflows, and sales analytics. Every page is statically generated where possible and revalidated on demand, so content updates go live in seconds without a redeploy.",
    ],
    features: [
      "Server-rendered product catalog with instant search and filtering",
      "Stripe checkout with webhook-driven order status updates",
      "Admin dashboard for products, inventory, and order fulfilment",
      "ISR + on-demand revalidation for near-instant content updates",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    image: "/images/projects/shopflow.png",
    liveUrl: "https://shopflow-demo.vercel.app",
    repoUrl: "https://github.com/alexjohnson/shopflow",
    featured: true,
  },
  {
    slug: "taskhive",
    title: "TaskHive",
    category: "Productivity",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "A collaborative project management workspace with real-time boards, task assignments, and team activity feeds.",
    description: [
      "TaskHive helps distributed teams plan and track work on Kanban-style boards with drag-and-drop interactions, due dates, and workload views. Optimistic UI updates keep the interface snappy while a REST API keeps every client in sync.",
      "Role-based access control lets team leads manage members and permissions, while an activity feed gives everyone a clear picture of what changed and when.",
    ],
    features: [
      "Real-time Kanban boards with drag-and-drop task management",
      "Role-based workspaces, invitations, and permissions",
      "Activity feed and digest notifications",
      "Responsive design that works on mobile and desktop",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Redux Toolkit"],
    image: "/images/projects/taskhive.png",
    liveUrl: "https://taskhive-demo.vercel.app",
    repoUrl: "https://github.com/alexjohnson/taskhive",
    featured: true,
  },
  {
    slug: "fintrack",
    title: "FinTrack",
    category: "Fintech",
    year: "2025",
    role: "Frontend Developer",
    summary:
      "A personal finance dashboard that visualises spending, budgets, and savings goals with interactive charts and monthly reports.",
    description: [
      "FinTrack turns raw transaction data into insight. Users connect accounts or import CSVs, categorise spending, and watch interactive charts update as they explore different time ranges and categories.",
      "The interface was built with accessibility in mind: every chart has an accompanying data table, colour contrast meets WCAG AA, and the whole flow works with keyboard navigation alone.",
    ],
    features: [
      "Interactive charts for spending, budgets, and savings goals",
      "CSV import with automatic transaction categorisation",
      "Monthly PDF-ready reports and summaries",
      "WCAG AA accessible data visualisations",
    ],
    tech: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS", "Zod"],
    image: "/images/projects/fintrack.png",
    liveUrl: "https://fintrack-demo.vercel.app",
    repoUrl: "https://github.com/alexjohnson/fintrack",
    featured: true,
  },
  {
    slug: "devspace",
    title: "DevSpace",
    category: "Developer Tools",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "A blog and portfolio CMS for developers, with MDX authoring, syntax highlighting, and automated social sharing.",
    description: [
      "DevSpace is a publishing platform for technical writing. Content is authored in MDX, enriched with live code samples, and rendered to statically generated pages with reading-time estimates and syntax highlighting.",
      "A lightweight CMS layer lets non-technical editors draft, preview, and schedule posts, while Open Graph images are generated automatically for every article.",
    ],
    features: [
      "MDX authoring with live code samples and syntax highlighting",
      "Draft, preview, and scheduled publishing workflows",
      "Automated Open Graph image generation per article",
      "Full-text search and tag-based archives",
    ],
    tech: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "Vercel Blob"],
    image: "/images/projects/devspace.png",
    liveUrl: "https://devspace-demo.vercel.app",
    repoUrl: "https://github.com/alexjohnson/devspace",
    featured: false,
  },
  {
    slug: "learnhub",
    title: "LearnHub",
    category: "Education",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "An online learning platform with video courses, progress tracking, quizzes, and certificates for completed tracks.",
    description: [
      "LearnHub delivers structured learning tracks with video lessons, downloadable resources, and knowledge checks. Progress is tracked per student and resumes seamlessly across devices.",
      "Instructors get a dashboard for uploading content, organising tracks, and monitoring completion rates, while students earn certificates when they finish a track.",
    ],
    features: [
      "Course tracks with video lessons and progress tracking",
      "Quizzes with instant feedback and scoring",
      "Instructor dashboard with completion analytics",
      "PDF certificates issued on track completion",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Cloudinary"],
    image: "/images/projects/learnhub.png",
    liveUrl: "https://learnhub-demo.vercel.app",
    repoUrl: "https://github.com/alexjohnson/learnhub",
    featured: false,
  },
  {
    slug: "medicare",
    title: "MediCare",
    category: "Healthtech",
    year: "2023",
    role: "Frontend Developer",
    summary:
      "A telemedicine booking experience where patients find doctors, book appointments, and manage their visits online.",
    description: [
      "MediCare simplifies booking a doctor's appointment. Patients browse verified specialists by specialty and availability, book a slot in a few taps, and receive reminders before each visit.",
      "Built with a mobile-first approach, the interface keeps the critical booking flow to three steps and works reliably on low-bandwidth connections.",
    ],
    features: [
      "Doctor discovery with filters for specialty and availability",
      "Three-step booking flow with appointment reminders",
      "Patient profile with visit history and documents",
      "Mobile-first, low-bandwidth friendly interface",
    ],
    tech: ["React", "Firebase", "Tailwind CSS", "React Hook Form"],
    image: "/images/projects/medicare.png",
    liveUrl: "https://medicare-demo.vercel.app",
    repoUrl: "https://github.com/alexjohnson/medicare",
    featured: false,
  },
];

/* ---------------------------------------------------------------------------
 * Cached data accessors (server-side).
 *
 * These run on the server inside React Server Components. With Cache
 * Components enabled, the `"use cache"` directive lets them contribute to the
 * static shell at build time and revalidate on the `cacheLife` schedule.
 * ------------------------------------------------------------------------- */

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("days");
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("days");
  return projects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  "use cache";
  cacheLife("days");
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
