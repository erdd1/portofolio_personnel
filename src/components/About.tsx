import { AnimatedIn } from "./AnimatedIn";
import type { SiteSettings } from "@/lib/types";

export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <AnimatedIn variant="fade-up">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent-a">
          À propos
        </span>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Qui suis-je&nbsp;?
        </h2>
      </AnimatedIn>

      <AnimatedIn variant="fade-up" delay={0.1} className="mt-8">
        <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-muted">
          {settings.bio}
        </p>
      </AnimatedIn>
    </section>
  );
}
