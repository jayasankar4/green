import { client, urlForImage } from "./lib/client";

export interface SiteSettingsData {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  phone?: string;
  email?: string;
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{
        heroBadge,
        heroTitle,
        heroSubtitle,
        heroDescription,
        heroImage,
        phone,
        email
      }`,
      {},
      { next: { revalidate: 60 } }
    );

    if (!data) return null;

    let heroImageUrl: string | undefined;
    if (data.heroImage) {
      try {
        heroImageUrl = urlForImage(data.heroImage)?.url();
      } catch {
        // fallback
      }
    }

    return {
      heroBadge: data.heroBadge,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroDescription: data.heroDescription,
      heroImageUrl,
      phone: data.phone,
      email: data.email,
    };
  } catch (err) {
    console.warn("Could not fetch Sanity content, falling back to defaults:", err);
    return null;
  }
}
