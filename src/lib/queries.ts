import { groq } from "next-sanity";

const imageFields = groq`
  ...,
  asset->{ _id, url, metadata { lqip, dimensions } }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    fullName,
    role,
    tagline,
    bio,
    profileImage{ ${imageFields} },
    skills,
    email,
    whatsappNumber,
    githubUrl,
    linkedinUrl,
    resumeFile{ asset->{ url } },
    seoDescription
  }
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(startDate desc){
    _id,
    role,
    company,
    companyUrl,
    location,
    logo{ ${imageFields} },
    startDate,
    endDate,
    current,
    description,
    highlights,
    technologies
  }
`;

export const educationQuery = groq`
  *[_type == "education"] | order(startDate desc){
    _id,
    degree,
    institution,
    location,
    startDate,
    endDate,
    description
  }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    type,
    excerpt,
    description,
    images[]{ ${imageFields} },
    animation,
    tags,
    featured,
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    type,
    excerpt,
    description,
    images[]{ ${imageFields} },
    animation,
    tags,
    featured,
    publishedAt
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;
