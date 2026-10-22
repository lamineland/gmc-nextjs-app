import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { profile, experience, skillGroups } from "@/lib/portfolio";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Alex Johnson — full-stack developer, builder, and lifelong learner based in Lagos, Nigeria.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header ---------------------------------------------------------- */}
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            About Me
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Developer, builder, and lifelong learner.
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Story ----------------------------------------------------------- */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="My Journey"
            title="From curiosity to craft"
            description="What started as a fascination with how websites work turned into a career building products that people rely on every day."
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <p>
              I started writing code by customising blog templates and never
              stopped. After graduating from the GoMyCode intensive full-stack
              program, I dove headfirst into the JavaScript ecosystem — React
              on the front end, Node.js on the back end, and everything in
              between.
            </p>
            <p>
              Today I work with startups and product teams to design, build, and
              ship web applications that are fast, accessible, and a joy to
              maintain. I care deeply about performance budgets, semantic HTML,
              and clear communication.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/images/workspace.png"
            alt="Alex's workspace with a laptop showing code"
            width={1200}
            height={800}
            className="rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:shadow-black/30"
          />
        </div>
      </section>

      {/* Skills ---------------------------------------------------------- */}
      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I work with"
            description="A toolkit built around the modern JavaScript ecosystem, with a focus on type safety and developer experience."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold">
                  <span
                    aria-hidden
                    className="mr-2 text-brand-600 dark:text-brand-400"
                  >
                    {group.icon}
                  </span>
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience ------------------------------------------------------ */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Roles that shaped how I build products and collaborate with teams."
        />

        <ol className="mt-12 space-y-8">
          {experience.map((item) => (
            <li
              key={`${item.company}-${item.period}`}
              className="relative rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  {item.period}
                </p>
              </div>
              <p className="mt-1 text-sm font-medium text-zinc-500">
                {item.company}
              </p>
              <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA ------------------------------------------------------------- */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          Want to work together?
        </h2>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Whether you have a project in mind or just want to say hello, my
          inbox is always open.
        </p>
        <Link
          href="/contact"
          className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Get in touch
        </Link>
      </section>
    </>
  );
}
