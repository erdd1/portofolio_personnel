import {
  getEducation,
  getExperiences,
  getPosts,
  getSiteSettings,
} from "@/lib/data";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Posts } from "@/components/Posts";
import { Contact } from "@/components/Contact";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, experiences, education, posts] = await Promise.all([
    getSiteSettings(),
    getExperiences(),
    getEducation(),
    getPosts(),
  ]);

  if (!settings) return null;

  return (
    <main>
      <Hero settings={settings} />
      <About settings={settings} />
      <Skills skills={settings.skills ?? []} />
      <Education education={education} />
      <Experience experiences={experiences} />
      <Posts posts={posts} />
      <Contact settings={settings} />
    </main>
  );
}
