import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedIn } from "./AnimatedIn";
import { Gallery } from "./Gallery";
import type { Post } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function PostCard({ post, index }: { post: Post; index: number }) {
  const isProject = post.type === "projet";

  return (
    <AnimatedIn variant={post.animation} delay={Math.min(index * 0.05, 0.3)}>
      <article className="card-surface glow-ring flex h-full flex-col overflow-hidden rounded-2xl transition">
        {!!post.images?.length && (
          <div className="p-3 pb-0">
            <Gallery images={post.images} ariaLabel={post.title} />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 text-xs font-medium text-muted">
            <span
              className={`rounded-full px-2.5 py-1 ${
                isProject
                  ? "bg-accent-a/15 text-accent-a"
                  : "bg-accent-b/15 text-accent-b"
              }`}
            >
              {isProject ? "Projet" : "Avis"}
            </span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <h3 className="mt-3 text-xl font-semibold leading-snug">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>

          {!!post.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/posts/${post.slug}`}
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-a transition hover:gap-2"
          >
            Lire la publication
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </AnimatedIn>
  );
}
