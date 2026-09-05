import { AnimatedIn } from "./AnimatedIn";

export function Skills({ skills }: { skills: string[] }) {
  if (!skills?.length) return null;

  return (
    <section id="skills" className="border-y border-border bg-surface/50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedIn variant="fade-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-a">
            Boîte à outils
          </span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Technologies que j&apos;utilise
          </h2>
        </AnimatedIn>

        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <AnimatedIn
              key={skill}
              variant="zoom-in"
              delay={Math.min(i * 0.04, 0.4)}
            >
              <span className="card-surface glow-ring inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition">
                {skill}
              </span>
            </AnimatedIn>
          ))}
        </div>
      </div>
    </section>
  );
}
