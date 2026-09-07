# Portfolio — Nouetagni Kue Yvan Cabrel

Portfolio professionnel construit avec Next.js, Tailwind CSS, Framer Motion et Sanity (CMS headless embarqué sur `/studio`).

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** pour le design
- **Framer Motion** pour les animations
- **Sanity** comme CMS — Studio accessible sur `/studio`, sans hébergement séparé

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copie `.env.example` vers `.env.local` et renseigne ton projet Sanity :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

## Gestion du contenu

Tout le contenu (réglages du site, expériences professionnelles, publications) se gère depuis l'interface Sanity Studio, accessible à `/studio` une fois le site déployé — aucune modification de code nécessaire pour publier.

## Déploiement

Le projet est déployé sur [Vercel](https://vercel.com), avec redéploiement automatique à chaque push sur `master`.
