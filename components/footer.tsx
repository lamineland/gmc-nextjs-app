import Link from "next/link";
import { profile } from "@/lib/portfolio";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const connectLinks = [
  { href: profile.socials.github, label: "GitHub", external: true },
  { href: profile.socials.linkedin, label: "LinkedIn", external: true },
  { href: profile.socials.twitter, label: "Twitter / X", external: true },
  { href: `mailto:${profile.email}`, label: profile.email, external: false },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
              AJ
            </span>
            <span className="font-semibold">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Full-stack developer crafting fast, accessible web experiences with
            Next.js and React. Based in {profile.location}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Connect
          </h2>
          <ul className="mt-4 space-y-2.5">
            {connectLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-6 dark:border-zinc-800">
        <p className="mx-auto max-w-6xl px-6 text-sm text-zinc-500">
          © 2026 {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
