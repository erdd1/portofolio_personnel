"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowDown, Download, Mail, MessageCircle } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/lib/types";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export function Hero({ settings }: { settings: SiteSettings }) {
  const {
    fullName,
    role,
    tagline,
    profileImage,
    githubUrl,
    linkedinUrl,
    email,
    whatsappNumber,
    resumeFile,
  } = settings;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-accent-a/25 blur-3xl" />
        <div className="animate-blob absolute top-1/3 right-0 h-96 w-96 rounded-full bg-accent-b/20 blur-3xl [animation-delay:4s]" />
        <div className="animate-blob absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-a/15 blur-3xl [animation-delay:8s]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Disponible pour de nouvelles missions
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {fullName}
          </h1>
          <p className="mt-3 text-xl font-medium text-accent-a sm:text-2xl">
            {role}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {tagline ||
              "Je conçois des solutions numériques innovantes et sécurisées, pensées pour durer."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#posts"
              className="glow-ring inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition"
            >
              Voir mes réalisations
            </a>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent-a hover:text-accent-a"
              >
                <MessageCircle className="h-4 w-4" />
                Discuter sur WhatsApp
              </a>
            )}
            {resumeFile?.asset?.url && (
              <a
                href={resumeFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-accent-a hover:text-accent-a"
              >
                <Download className="h-4 w-4" />
                Télécharger mon CV
              </a>
            )}
          </div>

          <div className="mt-10 flex items-center gap-4">
            {githubUrl && (
              <SocialLink href={githubUrl} label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </SocialLink>
            )}
            {linkedinUrl && (
              <SocialLink href={linkedinUrl} label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </SocialLink>
            )}
            {email && (
              <SocialLink href={`mailto:${email}`} label="Email">
                <Mail className="h-5 w-5" />
              </SocialLink>
            )}
          </div>
        </motion.div>

        {profileImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="animate-float relative mx-auto aspect-square w-56 sm:w-72 md:w-full md:max-w-sm"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent-a to-accent-b opacity-30 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border">
              <Image
                src={urlFor(profileImage).width(640).height(640).fit("crop").url()}
                alt={fullName}
                fill
                priority
                sizes="(min-width: 768px) 24rem, 16rem"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        aria-label="Défiler vers le bas"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent-a hover:text-accent-a"
    >
      {children}
    </a>
  );
}
