import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Formation",
  type: "document",
  fields: [
    defineField({
      name: "degree",
      title: "Diplôme / Formation",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "institution",
      title: "Établissement",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Date de début",
      type: "date",
      options: { dateFormat: "YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Date de fin",
      type: "date",
      options: { dateFormat: "YYYY" },
    }),
    defineField({
      name: "description",
      title: "Description (facultatif)",
      type: "text",
      rows: 3,
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
    select: { title: "degree", subtitle: "institution" },
  },
});
