import { Mail, MessageCircle } from "lucide-react";
import { AnimatedIn } from "./AnimatedIn";
import type { SiteSettings } from "@/lib/types";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export function Contact({ settings }: { settings: SiteSettings }) {
  const { email, githubUrl, linkedinUrl, whatsappNumber, fullName } = settings;

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-a/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <AnimatedIn variant="fade-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-a">
            Contact
          </span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Discutons de votre prochain projet
          </h2>
          <p className="mt-4 text-muted">
            Que ce soit pour une mission, une collaboration ou simplement pour
            échanger, {fullName.split(" ")[0]} vous répond rapidement.
          </p>
        </AnimatedIn>

        <AnimatedIn
          variant="zoom-in"
          delay={0.15}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25d366]/25 transition hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4" />
              Écrire sur WhatsApp
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent-a hover:text-accent-a"
            >
              <Mail className="h-4 w-4" />
              Envoyer un email
            </a>
          )}
        </AnimatedIn>

        <div className="mt-8 flex items-center justify-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent-a hover:text-accent-a"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent-a hover:text-accent-a"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
