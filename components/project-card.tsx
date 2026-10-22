import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-black/40">
      <Link
        href={`/projects/${project.slug}`}
        className="block overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-brand-600 dark:text-brand-400">
            {project.category}
          </span>
          <span className="text-zinc-500">{project.year}</span>
        </div>

        <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          <Link
            href={`/projects/${project.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((item) => (
            <li
              key={item}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
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
    </article>
  );
}
