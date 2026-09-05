"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedIn } from "./AnimatedIn";
import { PostCard } from "./PostCard";
import type { Post, PostType } from "@/lib/types";

const filters: { label: string; value: PostType | "tous" }[] = [
  { label: "Tout", value: "tous" },
  { label: "Avis & réflexions", value: "avis" },
  { label: "Projets", value: "projet" },
];

export function Posts({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<PostType | "tous">("tous");

  if (!posts?.length) return null;

  const visible =
    filter === "tous" ? posts : posts.filter((p) => p.type === filter);

  return (
    <section id="posts" className="mx-auto max-w-6xl px-6 py-24">
      <AnimatedIn variant="fade-up">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent-a">
          Publications
        </span>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Projets & réflexions
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Mes avis sur les technologies actuelles et des aperçus des
          applications sur lesquelles j&apos;ai travaillé.
        </p>
      </AnimatedIn>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.value ? "text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {filter === f.value && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((post, index) => (
          <PostCard key={post._id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
