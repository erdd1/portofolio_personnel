import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getPosts } from "@/lib/data";
import { Gallery } from "@/components/Gallery";
import { AnimatedIn } from "@/components/AnimatedIn";

export const revalidate = 60;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.images?.[0]?.asset?.url ? [post.images[0].asset.url] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link
        href="/#posts"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent-a"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux publications
      </Link>

      <AnimatedIn variant="fade-up" className="mt-6">
        <div className="flex items-center gap-3 text-xs font-medium text-muted">
          <span
            className={`rounded-full px-2.5 py-1 ${
              post.type === "projet"
                ? "bg-accent-a/15 text-accent-a"
                : "bg-accent-b/15 text-accent-b"
            }`}
          >
            {post.type === "projet" ? "Projet" : "Avis"}
          </span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
      </AnimatedIn>

      {!!post.images?.length && (
        <AnimatedIn variant="fade-in" delay={0.1} className="mt-8">
          <Gallery images={post.images} ariaLabel={post.title} />
        </AnimatedIn>
      )}

      <AnimatedIn
        variant="fade-up"
        delay={0.15}
        className="prose prose-neutral dark:prose-invert mt-8 max-w-none prose-p:leading-relaxed prose-p:text-muted"
      >
        <PortableText value={post.description} />
      </AnimatedIn>

      {!!post.tags?.length && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
