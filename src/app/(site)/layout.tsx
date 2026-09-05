import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { urlFor } from "@/sanity/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return {};

  const title = `${settings.fullName} — ${settings.role}`;
  const description = settings.seoDescription || settings.bio;
  const ogImage = settings.profileImage
    ? [urlFor(settings.profileImage).width(1200).height(630).fit("crop").url()]
    : [];

  return {
    title: { default: title, template: `%s — ${settings.fullName}` },
    description,
    openGraph: { title, description, images: ogImage, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: ogImage },
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  if (!settings) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="text-2xl font-semibold">Configuration requise</h1>
        <p className="max-w-md text-muted">
          Aucune donnée trouvée dans Sanity. Rendez-vous sur{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5">/studio</code>{" "}
          pour créer le document &quot;Réglages du site&quot;.
        </p>
      </main>
    );
  }

  return (
    <>
      <Navbar fullName={settings.fullName} />
      {children}
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
