/**
 * Ajoute les premiers posts (projets + avis) et complète la stack technique
 * de l'expérience Baticonfort. À exécuter une fois : `npm run add-posts`.
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

let keyCounter = 0;
function nextKey() {
  keyCounter += 1;
  return `k${keyCounter}`;
}

function paragraphs(texts: string[]) {
  return texts.map((text) => ({
    _type: "block" as const,
    _key: nextKey(),
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: nextKey(), text, marks: [] }],
  }));
}

async function addPosts() {
  console.log("→ Mise à jour de l'expérience Baticonfort (stack technique)...");
  await client.patch("experience-baticonfort").set({
    technologies: ["Laravel", "MySQL"],
  }).commit({ autoGenerateArrayKeys: true });

  console.log("→ Création du post projet Baticonfort...");
  await client.createOrReplace({
    _id: "post-baticonfort-stock",
    _type: "post",
    title: "Système de gestion de stock — Baticonfort SARL",
    slug: { _type: "slug", current: "systeme-gestion-stock-baticonfort" },
    type: "projet",
    excerpt:
      "Conception et développement d'une application de gestion de stock sur mesure pour Baticonfort SARL, afin de fiabiliser le suivi des matériaux et réduire les ruptures.",
    description: paragraphs([
      "Baticonfort SARL, entreprise du secteur du BTP, avait besoin d'un outil fiable pour suivre ses entrées et sorties de stock, jusque-là gérées manuellement et sources d'erreurs coûteuses.",
      "J'ai conçu et développé une application avec Laravel et MySQL, couvrant la gestion des articles, le suivi des mouvements de stock, les alertes de seuil bas et un tableau de bord de suivi en temps réel.",
      "Résultat : une meilleure visibilité sur les stocks, moins de ruptures d'approvisionnement, et un gain de temps significatif pour les équipes sur le terrain.",
    ]),
    animation: "fade-up",
    tags: ["Laravel", "MySQL"],
    featured: true,
    publishedAt: new Date().toISOString(),
  });

  console.log("→ Création du post projet Cytech-Labs...");
  await client.createOrReplace({
    _id: "post-cytech-website",
    _type: "post",
    title: "Site web — Cytech-Labs",
    slug: { _type: "slug", current: "site-web-cytech-labs" },
    type: "projet",
    excerpt:
      "Conception et développement du site web de Cytech-Labs avec Next.js et Laravel, pensé pour présenter clairement l'activité de l'entreprise et convertir les visiteurs en contacts qualifiés.",
    description: paragraphs([
      "Cytech-Labs souhaitait un site web professionnel capable de présenter clairement ses services et de générer des demandes de contact qualifiées.",
      "J'ai développé le site avec Next.js pour un frontend rapide et soigné, couplé à un backend Laravel pour la gestion du contenu et des formulaires de contact.",
      "Une attention particulière a été portée à la performance, au référencement et à la sécurité, dans la continuité de mon approche des projets clients.",
    ]),
    animation: "slide-left",
    tags: ["Next.js", "Laravel"],
    featured: false,
    publishedAt: new Date().toISOString(),
  });

  console.log("→ Création du post avis Flutter...");
  await client.createOrReplace({
    _id: "post-avis-flutter",
    _type: "post",
    title: "Flutter : mon choix pour le développement mobile multiplateforme",
    slug: { _type: "slug", current: "flutter-mon-choix-mobile-multiplateforme" },
    type: "avis",
    excerpt:
      "Pourquoi Flutter est devenu mon framework de référence pour livrer des applications mobiles rapides et cohérentes sur iOS et Android, sans dupliquer le travail.",
    description: paragraphs([
      "Quand il s'agit de livrer une application mobile rapidement sans sacrifier la qualité, Flutter est devenu mon choix par défaut. Un seul code source pour iOS et Android, avec un rendu quasi identique sur les deux plateformes : ça change concrètement la vitesse de développement.",
      "Ce que j'apprécie particulièrement, c'est le hot reload qui permet d'itérer sur l'interface en quelques secondes, et le système de widgets qui pousse à construire des composants réutilisables plutôt que du code jetable.",
      "Ce n'est pas une solution magique : pour des applications très proches du système natif ou très gourmandes en performances graphiques, il faut parfois descendre plus bas niveau. Mais pour la grande majorité des projets clients, Flutter offre le meilleur rapport entre vitesse de développement, qualité du rendu et facilité de maintenance.",
    ]),
    animation: "zoom-in",
    tags: ["Flutter", "Dart", "Mobile"],
    featured: false,
    publishedAt: new Date().toISOString(),
  });

  console.log("→ Création du post avis Docker...");
  await client.createOrReplace({
    _id: "post-avis-docker",
    _type: "post",
    title: "Docker : pourquoi je ne reviens plus en arrière",
    slug: { _type: "slug", current: "docker-pourquoi-je-ne-reviens-plus-en-arriere" },
    type: "avis",
    excerpt:
      "Docker a changé ma façon de développer et de déployer : des environnements reproductibles, moins de bugs liés à la configuration, et une sécurité renforcée.",
    description: paragraphs([
      "Avant d'adopter Docker, une bonne partie de mon temps partait dans la résolution de problèmes du type « ça marche sur ma machine ». Depuis que je conteneurise mes projets, cette classe entière de bugs a quasiment disparu.",
      "Chaque service (application, base de données, cache Redis) tourne dans un environnement isolé et reproductible, identique du poste de développement à la production. Ça simplifie énormément l'intégration de nouveaux projets et réduit la surface d'erreur humaine.",
      "C'est aussi un vrai atout côté sécurité : isolation des processus, images minimales et versionnées, secrets gérés proprement. Pour des solutions que je veux à la fois robustes et sécurisées, Docker fait partie des outils que je considère aujourd'hui non négociables.",
    ]),
    animation: "fade-in",
    tags: ["Docker", "DevOps", "Sécurité"],
    featured: false,
    publishedAt: new Date().toISOString(),
  });

  console.log(
    "Terminé. Va sur /studio pour ajouter des captures d'écran aux posts \"Projet\"."
  );
}

addPosts().catch((err) => {
  console.error(err);
  process.exit(1);
});
