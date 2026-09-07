import { cache } from "react";
import { client } from "@/sanity/client";
import {
  educationQuery,
  experiencesQuery,
  postBySlugQuery,
  postsQuery,
  siteSettingsQuery,
} from "./queries";
import type { Education, Experience, Post, SiteSettings } from "./types";

export const getSiteSettings = cache(() =>
  client.fetch<SiteSettings | null>(siteSettingsQuery)
);

export const getExperiences = cache(() =>
  client.fetch<Experience[]>(experiencesQuery)
);

export const getEducation = cache(() =>
  client.fetch<Education[]>(educationQuery)
);

export const getPosts = cache(() => client.fetch<Post[]>(postsQuery));

export const getPostBySlug = cache((slug: string) =>
  client.fetch<Post | null>(postBySlugQuery, { slug })
);
