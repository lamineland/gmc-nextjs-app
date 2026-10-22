import type { Metadata } from "next";
import { profile } from "@/lib/portfolio";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Alex Johnson for freelance projects, collaborations, or full-time opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Contact
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s build something together
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Have a project in mind, a question, or just want to say hello?
            Fill out the form below and I&apos;ll get back to you within 24
            hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-5">
        {/* Contact info */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Contact Information
          </h2>

          <ul className="mt-8 space-y-6">
            <li>
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 inline-block text-lg font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Location
              </p>
              <p className="mt-1 text-lg font-medium">{profile.location}</p>
              <p className="text-sm text-zinc-500">
                Available for remote work worldwide
              </p>
            </li>
            <li>
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Social
              </p>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 transition-colors hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-400"
                  >
                    Twitter / X
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-bold tracking-tight">
              Send me a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
