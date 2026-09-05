import { AnimatedIn } from "./AnimatedIn";
import { ExperienceCard } from "./ExperienceCard";
import type { Experience as ExperienceType } from "@/lib/types";

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  if (!experiences?.length) return null;

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <AnimatedIn variant="fade-up">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent-a">
          Parcours
        </span>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Expériences professionnelles
        </h2>
      </AnimatedIn>

      <div className="relative mt-12 space-y-10 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-3.5">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience._id}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
