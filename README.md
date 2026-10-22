# Alex Johnson — Portfolio

A modern portfolio website built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**. Fully server-rendered, statically optimised, and ready to deploy to Vercel or any Node.js host.

## Features

- **Home** — hero with animated gradient text, stats strip, featured projects, and a call-to-action banner.
- **About** — bio story, skills grouped by category, work experience timeline, and education.
- **Projects** — listing page plus individual case-study pages with `generateStaticParams`, per-page metadata, and 404 handling for unknown slugs.
- **Contact** — validated contact form (client component) posting to an API route handler at `/api/contact`.
- **Extras** — sticky responsive navbar with mobile menu, custom 404 page, skip-to-content link, dark mode via `prefers-color-scheme`, reduced-motion support, and Open Graph/Twitter metadata.

## Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 16 (App Router, Cache Components)   |
| UI         | React 19, Tailwind CSS v4, CSS Modules      |
| Language   | TypeScript (strict)                         |
| Data       | Static typed data with `"use cache"` accessors + `cacheLife` revalidation |
| Images     | `next/image` with explicit `width`/`height` |
| API        | Route handler (`app/api/contact/route.ts`)  |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000
```

### Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server             |
| `npm run build` | Create an optimized production build     |
| `npm run start` | Serve the production build               |
| `npm run lint`  | Run ESLint                               |

## Project Structure

```
app/
  layout.tsx               # Root layout: metadata, navbar, footer, skip link
  page.tsx                 # Home (hero, stats, featured projects, CTA)
  about/page.tsx           # About: story, skills, experience, education
  projects/page.tsx        # All projects grid
  projects/[slug]/page.tsx # Case study: generateStaticParams + generateMetadata
  contact/page.tsx         # Contact info + validated contact form
  not-found.tsx            # Custom 404
  api/contact/route.ts     # POST endpoint for the contact form
components/                # Navbar, Footer, ProjectCard, SectionHeading, ContactForm
lib/portfolio.ts           # Typed profile/projects data + cached accessors
styles/                    # CSS Modules (Hero, ContactForm)
public/images/             # Generated images (profile, workspace, og, projects)
scripts/generate_images.py # PIL script that generates all placeholder imagery
```

## Data & Caching

All content lives in `lib/portfolio.ts`. Data accessors (`getProjects`, `getFeaturedProjects`, `getProjectBySlug`) use the `"use cache"` directive with `cacheLife("days")`, so pages are prerendered at build time and revalidate on a daily schedule. Project detail pages are statically generated for every slug via `generateStaticParams`.

## Images

All imagery is generated locally with Pillow via `scripts/generate_images.py` (abstract gradient artwork — no stock photos needed). To regenerate:

```bash
python3 scripts/generate_images.py
```

Images are referenced with explicit `width`/`height` on `next/image` (required for files in `public/`) and served with lazy loading (the hero and case-study covers use `priority`).

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new) — the Next.js preset is detected automatically.
3. Click **Deploy**. Every push to `main` triggers a new deployment.

### Self-hosted (Node.js)

```bash
npm run build
npm run start        # serves on port 3000 (override with PORT=…)
```

Use a process manager (PM2, systemd) and a reverse proxy (nginx, Caddy) for TLS in production. The app is a standard Next.js server — no serverless-specific APIs are required.

### Environment Variables

None required. When wiring the contact form to a real mail provider (Resend, Nodemailer, Formspree…), add its API key as an environment variable and update `app/api/contact/route.ts`.

## Notes

- The persona and projects ("Alex Johnson", ShopFlow, TaskHive, …) are fictional sample content — swap `lib/portfolio.ts` for your own details.
- Tailwind CSS v4 is configured via the `@theme` block in `app/globals.css` (no `tailwind.config.ts` needed).
- Dark mode follows the system preference (`prefers-color-scheme`).
