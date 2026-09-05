import { defineField, defineType } from "sanity";

export const ANIMATION_OPTIONS = [
  { title: "Apparition + montée (par défaut)", value: "fade-up" },
  { title: "Fondu simple", value: "fade-in" },
  { title: "Zoom avant", value: "zoom-in" },
  { title: "Glissement depuis la gauche", value: "slide-left" },
  { title: "Glissement depuis la droite", value: "slide-right" },
  { title: "Bascule (flip)", value: "flip" },
  { title: "Aucune animation", value: "none" },
];

export const post = defineType({
  name: "post",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type de publication",
      type: "string",
      options: {
        list: [
          { title: "Avis / Réflexion sur une techno", value: "avis" },
          { title: "Projet réalisé", value: "projet" },
        ],
        layout: "radio",
      },
      initialValue: "avis",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé court",
      description: "Affiché dans la liste des publications (1-2 phrases)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "description",
      title: "Contenu complet",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos / Captures d'écran",
      description:
        "Ajoute une ou plusieurs images. Elles s'afficheront en défilement horizontal.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Légende (facultatif)",
              type: "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "animation",
      title: "Animation d'apparition",
      description:
        "Choisis l'animation utilisée quand cette publication apparaît à l'écran",
      type: "string",
      options: { list: ANIMATION_OPTIONS },
      initialValue: "fade-up",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags / Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Date de publication (récent en premier)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "projet" ? "Projet" : "Avis",
        media,
      };
    },
  },
});
