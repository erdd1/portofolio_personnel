import { AnimatedIn } from "./AnimatedIn";
import type { Education as EducationType } from "@/lib/types";

function formatYear(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-FR", { year: "numeric" }).format(
    new Date(value)
  );
}

export function Education({ education }: { education: EducationType[] }) {
  if (!education?.length) return null;

  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-24">
      <AnimatedIn variant="fade-up">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent-a">
          Formation
        </span>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Parcours académique
        </h2>
      </AnimatedIn>

      <div className="relative mt-12 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-3.5">
        {education.map((item, index) => (
          <AnimatedIn
            key={item._id}
            variant={index % 2 === 0 ? "slide-right" : "slide-left"}
            className="relative pl-10 sm:pl-14"
          >
            <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent-b bg-background sm:h-7 sm:w-7">
              <span className="h-2 w-2 rounded-full bg-accent-b" />
            </span>

            <div className="card-surface glow-ring rounded-2xl p-5 transition sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold sm:text-lg">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium text-accent-b">
                    {item.institution}
                  </p>
                </div>
                <div className="text-right text-sm text-muted">
                  <p>
                    {formatYear(item.startDate)}
                    {item.endDate && item.endDate !== item.startDate
                      ? ` — ${formatYear(item.endDate)}`
                      : ""}
                  </p>
                  {item.location && <p>{item.location}</p>}
                </div>
              </div>

              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              )}
            </div>
          </AnimatedIn>
        ))}
      </div>
    </section>
  );
}
