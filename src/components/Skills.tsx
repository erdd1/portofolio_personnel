"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const AUTO_ROTATE_MS = 3500;
const RESUME_AFTER_MANUAL_MS = 6000;

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

  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (availableCategories.length < 2) return;

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      setActive((current) => {
        const index = availableCategories.indexOf(
          current ?? availableCategories[0]
        );
        return availableCategories[(index + 1) % availableCategories.length];
      });
    }, AUTO_ROTATE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCategories.join(",")]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  function selectManually(cat: TechCategory | "autres") {
    setActive(cat);
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_AFTER_MANUAL_MS);
  }

  const maxCount = Math.max(
    1,
    ...availableCategories.map((cat) => grouped[cat].length)
  );

  if (!skills?.length || !active) return null;

  const visible = grouped[active];

  return (
    <section id="skills" className="border-y border-border bg-surface/50 py-20">
      <div
        className="mx-auto max-w-6xl px-6"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!resumeTimeoutRef.current) isPausedRef.current = false;
        }}
      >
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
                onClick={() => selectManually(cat)}
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

        <div className="relative mt-8 min-h-[4.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
            >
              {Array.from({ length: maxCount }).map((_, i) => {
                const skill = visible[i];

                if (!skill) {
                  return (
                    <div
                      key={`placeholder-${i}`}
                      className="invisible flex items-center gap-3 rounded-xl px-4 py-3.5"
                      aria-hidden
                    >
                      <span className="h-6 w-6 shrink-0" />
                      <span className="text-sm font-medium">&nbsp;</span>
                    </div>
                  );
                }

                const meta = getTechMeta(skill);
                const Icon = meta?.icon;
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i * 0.04, 0.3) }}
                    className="card-surface glow-ring flex items-center gap-3 rounded-xl px-4 py-3.5 transition"
                  >
                    {Icon && (
                      <Icon
                        className="h-6 w-6 shrink-0"
                        style={{ color: meta.color }}
                        aria-hidden
                      />
                    )}
                    <span className="text-sm font-medium">{skill}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {availableCategories.length > 1 && (
          <div className="mt-6 flex justify-center gap-1.5">
            {availableCategories.map((cat) => (
              <span
                key={cat}
                className={`h-1.5 rounded-full transition-all ${
                  active === cat ? "w-6 bg-accent-a" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
