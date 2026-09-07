/**
 * Met à jour le site avec les informations exactes du CV : bio, email,
 * compétences complètes, dates réelles des expériences, nouvelles
 * expériences et parcours académique complet.
 * À exécuter une fois : `npm run update-cv`.
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

async function run() {
  console.log("→ Mise à jour de la bio et de l'email...");
  await client
    .patch("siteSettings")
    .set({
      bio: "Je suis développeur full-stack et ingénieur des travaux informatiques (option Génie Logiciel), passionné par le développement d'applications web et mobiles, ainsi que l'intelligence artificielle et l'administration système.\n\nJ'ai une solide maîtrise des langages et frameworks modernes tels que Bootstrap, PHP (Laravel) et Flutter pour le développement multiplateforme, ainsi qu'une bonne pratique des outils CI/CD (GitHub Actions, GitLab CI), du déploiement et du monitoring dans le cloud (AWS, Azure, Firebase).\n\nJe m'intéresse également à l'administration système (Linux, Windows Server), à la gestion des infrastructures as code (Terraform, Ansible) et à la sécurisation des environnements de production.\n\nPolyvalent et orienté résultats, je cherche à contribuer à des projets innovants alliant ingénierie logicielle, intelligence artificielle et sécurité applicative, afin de créer des solutions numériques fiables, performantes et évolutives.",
      email: "cabrelyvan6@gmail.com",
      skills: [
        "React",
        "Flutter",
        "Laravel",
        "PHP",
        "Django",
        "Flask",
        "Java EE",
        "Bootstrap",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Firebase",
        "Docker",
        "Redis",
        "AWS",
        "Windows Server",
        "Linux",
        "Terraform",
        "Ansible",
        "GitHub Actions",
        "GitLab CI",
      ],
    })
    .commit({ autoGenerateArrayKeys: true });

  console.log("→ Correction des dates réelles de l'expérience Baticonfort...");
  await client
    .patch("experience-baticonfort")
    .set({
      role: "Développeur Web",
      location: "Yaoundé, Cameroun",
      startDate: "2026-05-01",
      endDate: "2026-06-30",
      current: false,
      description:
        "Implémentation du système de gestion des stocks de Baticonfort SARL.",
    })
    .commit({ autoGenerateArrayKeys: true });

  console.log("→ Ajout des expériences professionnelles précédentes...");
  await client.createOrReplace({
    _id: "experience-incubateur",
    _type: "experience",
    role: "Stagiaire",
    company: "Incubateur SARL",
    location: "Yaoundé, Cameroun",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    current: false,
    description: "Stage effectué chez Incubateur SARL, à Yaoundé.",
    technologies: [],
  });

  await client.createOrReplace({
    _id: "experience-mercy-innovation-lab",
    _type: "experience",
    role: "Stagiaire",
    company: "Mercy Innovation Lab",
    location: "Yaoundé, Cameroun",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    current: false,
    description: "Stage effectué chez Mercy Innovation Lab, à Yaoundé.",
    technologies: [],
  });

  await client.createOrReplace({
    _id: "experience-smart-digital",
    _type: "experience",
    role: "Apprenant en marketing digital",
    company: "Smart Digital and Communication",
    location: "Yaoundé, Cameroun",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    current: false,
    description:
      "Apprentissage du marketing digital chez Smart Digital and Communication, à Yaoundé.",
    technologies: [],
  });

  console.log("→ Ajout du parcours académique...");
  await client.createOrReplace({
    _id: "education-ingenieur",
    _type: "education",
    degree: "Ingénieur des Travaux Informatiques — Génie Logiciel",
    institution: "IAI-Cameroun",
    location: "Yaoundé, Cameroun",
    startDate: "2022-09-01",
    endDate: "2025-06-30",
  });

  await client.createOrReplace({
    _id: "education-bac",
    _type: "education",
    degree: "Baccalauréat ESG",
    institution: "Collège Adventiste d'Odza",
    location: "Yaoundé, Cameroun",
    startDate: "2021-09-01",
    endDate: "2022-06-30",
  });

  await client.createOrReplace({
    _id: "education-probatoire",
    _type: "education",
    degree: "Probatoire ESG",
    institution: "Collège Adventiste d'Odza",
    location: "Yaoundé, Cameroun",
    startDate: "2020-09-01",
    endDate: "2021-06-30",
  });

  await client.createOrReplace({
    _id: "education-bepc",
    _type: "education",
    degree: "Brevet d'Études du Premier Cycle",
    institution: "Collège Adventiste d'Odza",
    location: "Yaoundé, Cameroun",
    startDate: "2018-09-01",
    endDate: "2019-06-30",
  });

  await client.createOrReplace({
    _id: "education-primaire",
    _type: "education",
    degree: "Certificat d'Études Primaires",
    institution: "École primaire Saint-Pierre Apôtre",
    location: "Yaoundé, Cameroun",
    startDate: "2014-09-01",
    endDate: "2015-06-30",
  });

  console.log("Terminé.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
