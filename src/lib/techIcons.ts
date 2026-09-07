import type { IconType } from "react-icons";
import {
  SiReact,
  SiFlutter,
  SiLaravel,
  SiDjango,
  SiFlask,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiRedis,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiDart,
  SiKotlin,
  SiFirebase,
  SiGit,
  SiGithub,
  SiFigma,
  SiGraphql,
  SiSqlite,
  SiNginx,
  SiLinux,
  SiVercel,
  SiJquery,
  SiBootstrap,
  SiTerraform,
  SiAnsible,
  SiGithubactions,
  SiGitlab,
} from "react-icons/si";
import { FaAws, FaWindows, FaJava } from "react-icons/fa";

export type TechCategory = "frontend" | "backend" | "mobile" | "database" | "devops";

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  database: "Bases de données",
  devops: "DevOps & Outils",
};

interface TechMeta {
  icon: IconType;
  /** Omit for monochrome brand marks so the icon inherits the theme's text color instead. */
  color?: string;
  category: TechCategory;
}

const TECH_MAP: Record<string, TechMeta> = {
  react: { icon: SiReact, color: "#61DAFB", category: "frontend" },
  "next.js": { icon: SiNextdotjs, category: "frontend" },
  nextjs: { icon: SiNextdotjs, category: "frontend" },
  "vue.js": { icon: SiVuedotjs, color: "#4FC08D", category: "frontend" },
  vue: { icon: SiVuedotjs, color: "#4FC08D", category: "frontend" },
  "nuxt.js": { icon: SiNuxt, color: "#00DC82", category: "frontend" },
  nuxt: { icon: SiNuxt, color: "#00DC82", category: "frontend" },
  typescript: { icon: SiTypescript, color: "#3178C6", category: "frontend" },
  javascript: { icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
  html: { icon: SiHtml5, color: "#E34F26", category: "frontend" },
  "html/css/js": { icon: SiHtml5, color: "#E34F26", category: "frontend" },
  css: { icon: SiCss, color: "#1572B6", category: "frontend" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  jquery: { icon: SiJquery, color: "#0769AD", category: "frontend" },
  bootstrap: { icon: SiBootstrap, color: "#7952B3", category: "frontend" },

  flutter: { icon: SiFlutter, color: "#02569B", category: "mobile" },
  dart: { icon: SiDart, color: "#0175C2", category: "mobile" },
  kotlin: { icon: SiKotlin, color: "#7F52FF", category: "mobile" },

  laravel: { icon: SiLaravel, color: "#FF2D20", category: "backend" },
  django: { icon: SiDjango, color: "#092E20", category: "backend" },
  flask: { icon: SiFlask, category: "backend" },
  "node.js": { icon: SiNodedotjs, color: "#339933", category: "backend" },
  nodejs: { icon: SiNodedotjs, color: "#339933", category: "backend" },
  express: { icon: SiExpress, category: "backend" },
  python: { icon: SiPython, color: "#3776AB", category: "backend" },
  php: { icon: SiPhp, color: "#777BB4", category: "backend" },
  graphql: { icon: SiGraphql, color: "#E10098", category: "backend" },

  postgresql: { icon: SiPostgresql, color: "#4169E1", category: "database" },
  postgres: { icon: SiPostgresql, color: "#4169E1", category: "database" },
  mysql: { icon: SiMysql, color: "#4479A1", category: "database" },
  mongodb: { icon: SiMongodb, color: "#47A248", category: "database" },
  redis: { icon: SiRedis, color: "#DC382D", category: "database" },
  sqlite: { icon: SiSqlite, color: "#003B57", category: "database" },
  firebase: { icon: SiFirebase, color: "#FFCA28", category: "database" },

  "java ee": { icon: FaJava, color: "#007396", category: "backend" },
  java: { icon: FaJava, color: "#007396", category: "backend" },

  docker: { icon: SiDocker, color: "#2496ED", category: "devops" },
  git: { icon: SiGit, color: "#F05032", category: "devops" },
  github: { icon: SiGithub, color: "#181717", category: "devops" },
  figma: { icon: SiFigma, color: "#F24E1E", category: "devops" },
  nginx: { icon: SiNginx, color: "#009639", category: "devops" },
  linux: { icon: SiLinux, color: "#FCC624", category: "devops" },
  vercel: { icon: SiVercel, category: "devops" },
  aws: { icon: FaAws, color: "#FF9900", category: "devops" },
  "windows server": { icon: FaWindows, color: "#0078D6", category: "devops" },
  windows: { icon: FaWindows, color: "#0078D6", category: "devops" },
  terraform: { icon: SiTerraform, color: "#7B42BC", category: "devops" },
  ansible: { icon: SiAnsible, color: "#EE0000", category: "devops" },
  "github actions": { icon: SiGithubactions, color: "#2088FF", category: "devops" },
  "gitlab ci": { icon: SiGitlab, color: "#FC6D26", category: "devops" },
  gitlab: { icon: SiGitlab, color: "#FC6D26", category: "devops" },
};

export function getTechMeta(name: string): TechMeta | undefined {
  return TECH_MAP[name.trim().toLowerCase()];
}
