import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { AnimatedIn } from "./AnimatedIn";
import type { Experience } from "@/lib/types";

function formatDate(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const period = `${formatDate(experience.startDate)} — ${
    experience.current ? "Aujourd'hui" : formatDate(experience.endDate)
  }`;

  return (
    <AnimatedIn
      variant={index % 2 === 0 ? "slide-right" : "slide-left"}
      className="relative pl-10 sm:pl-14"
    >
      <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent-a bg-background sm:h-7 sm:w-7">
        <span className="h-2 w-2 rounded-full bg-accent-a" />
      </span>

      <div className="card-surface glow-ring rounded-2xl p-6 transition sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {experience.logo && (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border">
                <Image
                  src={urlFor(experience.logo).width(80).height(80).url()}
                  alt={experience.company}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{experience.role}</h3>
              <p className="text-sm font-medium text-accent-a">
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {experience.company}
                  </a>
                ) : (
                  experience.company
                )}
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-muted">
            <p>{period}</p>
            {experience.location && <p>{experience.location}</p>}
          </div>
        </div>

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted">
          {experience.description}
        </p>

        {!!experience.highlights?.length && (
          <ul className="mt-4 space-y-1.5">
            {experience.highlights.map((point) => (
              <li
                key={point}
                className="flex gap-2 text-sm leading-relaxed text-muted"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-a" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {!!experience.technologies?.length && (
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </AnimatedIn>
  );
}
