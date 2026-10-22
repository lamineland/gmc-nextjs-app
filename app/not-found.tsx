import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Back to Home
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-semibold transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:hover:border-brand-400 dark:hover:text-brand-400"
        >
          Browse projects
        </Link>
      </div>
    </section>
  );
}
