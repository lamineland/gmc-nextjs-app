import Image from "next/image";
import Link from "next/link";
import { profile, stats, getFeaturedProjects } from "@/lib/portfolio";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import hero from "@/styles/Hero.module.css";

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <>
      {/* Hero ------------------------------------------------------------- */}
      <section className={hero.hero}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className={hero.chip}>
              <span className={hero.pulseDot} aria-hidden />
              Available for freelance projects
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className={hero.gradientText}>{profile.name}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-brand-400 dark:hover:text-brand-400"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className={`${hero.blob} ${hero.blobOne}`} aria-hidden />
            <div className={`${hero.blob} ${hero.blobTwo}`} aria-hidden />
            <Image
              src="/images/profile.png"
              alt={`Portrait of ${profile.name}`}
              width={900}
              height={900}
              priority
              className="relative rounded-3xl border border-zinc-200/70 shadow-2xl shadow-brand-500/10 dark:border-zinc-800"
            />
          </div>
        </div>
      </section>

      {/* Stats ----------------------------------------------------------- */}
      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                {stat.value}
              </dd>
              <dt className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured projects ----------------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects I'm proud of"
          description="A selection of recent work — from e-commerce platforms to real-time productivity tools. Each one shipped end to end."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            View all projects
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

      {/* CTA ------------------------------------------------------------- */}
      <section className="bg-brand-600">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have a project in mind? Let&apos;s build something great together.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-indigo-100">
            I&apos;m currently available for freelance work and interesting
            full-time opportunities.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-indigo-50"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
