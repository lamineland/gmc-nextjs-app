import Link from "next/link";
import type { Metadata } from "next";
import { getProjects } from "@/lib/portfolio";
import ProjectCard from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of web applications built by Alex Johnson — e-commerce platforms, productivity tools, fintech dashboards, and more.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            My Work
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Projects &amp; case studies
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Every project here was designed and built end to end — from the
            first wireframe to production deployment. Click through for the
            full story behind each one.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 pb-20">
        <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold tracking-tight">
            Looking for something specific?
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
            These are the highlighted projects — I have more work in private
            repositories and client engagements I can walk you through on a
            call.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Request a walkthrough
          </Link>
        </div>
      </section>
    </>
  );
}
