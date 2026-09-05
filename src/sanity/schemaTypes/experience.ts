import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Expérience professionnelle",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Poste occupé",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Entreprise",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyUrl",
      title: "Site web de l'entreprise",
      type: "url",
    }),
    defineField({
      name: "location",
      title: "Lieu",
      description: 'Ex : "Douala, Cameroun" ou "Télétravail"',
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo de l'entreprise",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "startDate",
      title: "Date de début",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "current",
      title: "Poste actuel",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "Date de fin",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
      hidden: ({ document }) => Boolean(document?.current),
    }),
    defineField({
      name: "description",
      title: "Description de la mission",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Points clés / réalisations",
      description: "Une ligne par réalisation (facultatif)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies utilisées",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    {
      title: "Date (récent en premier)",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "role",
      subtitle: "company",
      media: "logo",
    },
  },
});
