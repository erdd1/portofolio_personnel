import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du portfolio")
    .items([
      S.listItem()
        .title("Réglages du site")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Expériences professionnelles")
        .child(
          S.documentTypeList("experience").title("Expériences professionnelles")
        ),
      S.listItem()
        .title("Formation")
        .child(S.documentTypeList("education").title("Formation")),
      S.listItem()
        .title("Publications")
        .child(S.documentTypeList("post").title("Publications")),
    ]);
