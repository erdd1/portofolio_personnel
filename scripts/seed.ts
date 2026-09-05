/**
 * Script de pré-remplissage à exécuter une seule fois après avoir créé
 * le projet Sanity : `npm run seed`.
 * Nécessite SANITY_WRITE_TOKEN dans .env.local (token avec droit d'écriture).
 */
import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Merci de renseigner NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_WRITE_TOKEN dans .env.local avant de lancer ce script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log("→ Création du document 'Réglages du site'...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    fullName: "Nouetagni Kue Yvan Cabrel",
    role: "Développeur Full-Stack",
    tagline:
      "Je conçois des solutions numériques innovantes et ultra-sécurisées pour les entreprises.",
    bio: "Développeur full-stack, je conçois des solutions innovantes et ultra-sécurisées pour des entreprises, du backend robuste à l'interface utilisateur soignée.",
    skills: [
      "React",
      "Flutter",
      "Laravel",
      "Django",
      "Flask",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Docker",
      "Redis",
    ],
    whatsappNumber: "237699803165",
    githubUrl: "https://github.com/erdd1/",
    linkedinUrl: "https://tinyurl.com/4bmwypzr",
  });

  console.log("→ Création d'une première expérience professionnelle...");
  await client.createIfNotExists({
    _id: "experience-baticonfort",
    _type: "experience",
    role: "Développeur Full-Stack",
    company: "Baticonfort SARL",
    startDate: new Date().toISOString().slice(0, 10),
    current: true,
    description:
      "Développement du système de gestion de stock de Baticonfort SARL.",
    technologies: [],
  });

  console.log("Terminé. Rends-toi sur /studio pour compléter et affiner ces informations.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
