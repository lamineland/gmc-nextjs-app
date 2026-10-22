import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug, getNextProject } from "@/lib/portfolio";

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Alex Johnson`,
      description: project.summary,
      images: [{ url: project.image, width: 1200, height: 800 }],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return (
    <>
      {/* Header ---------------------------------------------------------- */}
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            All projects
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Cover image ------------------------------------------------------ */}
      <section className="mx-auto w-full max-w-6xl px-6">
        <Image
          src={project.image}
          alt={`${project.title} project cover`}
          width={1200}
          height={800}
          priority
          className="-mt-2 w-full rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:shadow-black/30"
        />
      </section>

      {/* Body ------------------------------------------------------------- */}
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Project Details
            </h2>

            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-zinc-500">Role</dt>
                <dd className="mt-1">{project.role}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Year</dt>
                <dd className="mt-1">{project.year}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Category</dt>
                <dd className="mt-1">{project.category}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Tech Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Visit live site
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-300 px-5 py-2.5 text-center text-sm font-semibold transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:hover:border-brand-400 dark:hover:text-brand-400"
                >
                  View source code
                </a>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <div className="mt-4 space-y-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            {project.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold tracking-tight">
            Key Features
          </h2>
          <ul className="mt-5 space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-brand-600 dark:text-brand-400"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="leading-7 text-zinc-700 dark:text-zinc-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next project ----------------------------------------------------- */}
      {nextProject ? (
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Next Project
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="underline-offset-4 transition-colors hover:text-brand-600 hover:underline dark:hover:text-brand-400"
              >
                {nextProject.title}
              </Link>
            </h2>
            <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
              {nextProject.summary}
            </p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              View case study
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
