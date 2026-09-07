import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
  alt?: string;
  caption?: string;
}

export interface SiteSettings {
  fullName: string;
  role: string;
  tagline?: string;
  bio: string;
  profileImage?: SanityImage;
  skills?: string[];
  email?: string;
  whatsappNumber: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeFile?: { asset: { url: string } };
  seoDescription?: string;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  logo?: SanityImage;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export type PostType = "avis" | "projet";

export type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "zoom-in"
  | "slide-left"
  | "slide-right"
  | "flip"
  | "none";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  type: PostType;
  excerpt: string;
  description: PortableTextBlock[];
  images?: SanityImage[];
  animation: AnimationVariant;
  tags?: string[];
  featured?: boolean;
  publishedAt: string;
}
