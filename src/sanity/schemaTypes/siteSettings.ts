import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Nom complet",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Titre / rôle",
      description: 'Ex : "Développeur Full-Stack"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Phrase d'accroche (Hero)",
      description: "Courte phrase affichée en grand sur la page d'accueil",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bio",
      title: "Bio / À propos",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Photo de profil",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "skills",
      title: "Technologies principales",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "Numéro WhatsApp",
      description:
        "Format international sans le +, ni espaces. Ex : 237699803165",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^\d{8,15}$/, {
          name: "numéro international",
          invert: false,
        }),
    }),
    defineField({
      name: "githubUrl",
      title: "Lien GitHub",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "Lien LinkedIn",
      type: "url",
    }),
    defineField({
      name: "resumeFile",
      title: "CV (PDF)",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "seoDescription",
      title: "Description SEO",
      description: "Utilisée pour les moteurs de recherche et les aperçus de partage",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role" },
  },
});
