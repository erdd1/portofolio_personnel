"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/lib/types";

export function Gallery({
  images,
  ariaLabel,
}: {
  images: SanityImage[];
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.85 * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (!images?.length) return null;

  return (
    <div className="group/gallery relative">
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        className="scrollbar-thin snap-x-mandatory flex gap-3 overflow-x-auto pb-2"
      >
        {images.map((image, i) => (
          <figure
            key={image.asset?._id ?? i}
            className="snap-center relative aspect-video w-[85%] shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2 sm:w-[70%] lg:w-[60%]"
          >
            <Image
              src={urlFor(image).width(1200).height(750).fit("crop").url()}
              alt={image.alt || ariaLabel}
              fill
              sizes="(min-width: 1024px) 60vw, (min-width: 640px) 70vw, 85vw"
              className="object-cover"
            />
            {image.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm text-white">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-between opacity-0 transition group-hover/gallery:opacity-100 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Image précédente"
            className="pointer-events-auto ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Image suivante"
            className="pointer-events-auto mr-1 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
