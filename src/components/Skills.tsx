"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedIn } from "./AnimatedIn";
import {
  TECH_CATEGORY_LABELS,
  getTechMeta,
  type TechCategory,
} from "@/lib/techIcons";

const CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "backend",
  "mobile",
  "database",
  "devops",
];

export function Skills({ skills }: { skills: string[] }) {
  const grouped = useMemo(() => {
    const groups: Record<TechCategory | "autres", string[]> = {
      frontend: [],
      backend: [],
      mobile: [],
      database: [],
      devops: [],
      autres: [],
    };
    for (const skill of skills) {
      const meta = getTechMeta(skill);
      groups[meta?.category ?? "autres"].push(skill);
    }
    return groups;
  }, [skills]);

  const availableCategories = [...CATEGORY_ORDER, "autres" as const].filter(
    (cat) => grouped[cat].length > 0
  );

  const [active, setActive] = useState<TechCategory | "autres" | null>(
    availableCategories[0] ?? null
  );

  if (!skills?.length || !active) return null;

  const visible = grouped[active];

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

        {availableCategories.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === cat
                    ? "text-background"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="skills-filter-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {cat === "autres" ? "Autres" : TECH_CATEGORY_LABELS[cat]}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {visible.map((skill, i) => {
            const meta = getTechMeta(skill);
            const Icon = meta?.icon;
            return (
              <AnimatedIn
                key={skill}
                variant="zoom-in"
                delay={Math.min(i * 0.04, 0.4)}
              >
                <div className="card-surface glow-ring flex items-center gap-3 rounded-xl px-4 py-3.5 transition">
                  {Icon && (
                    <Icon
                      className="h-6 w-6 shrink-0"
                      style={{ color: meta.color }}
                      aria-hidden
                    />
                  )}
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              </AnimatedIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
