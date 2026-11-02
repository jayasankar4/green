import { client, urlForImage } from "./lib/client";

export interface FeatureCardData {
  title?: string;
  description?: string;
}

export interface SiteSettingsData {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  features?: FeatureCardData[];
  phone?: string;
  email?: string;
  registeredOffice?: string;
  corporateOffice?: string;
}

export interface AboutPageData {
  title?: string;
  subtitle?: string;
  whoWeAreP1?: string;
  whoWeAreP2?: string;
  whoWeAreP3?: string;
  aboutImageUrl?: string;
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
        features,
        phone,
        email,
        registeredOffice,
        corporateOffice
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
      features: data.features,
      phone: data.phone,
      email: data.email,
      registeredOffice: data.registeredOffice,
      corporateOffice: data.corporateOffice,
    };
  } catch (err) {
    console.warn("Could not fetch Sanity site settings:", err);
    return null;
  }
}

export async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    const data = await client.fetch(
      `*[_type == "aboutPage"][0]{
        title,
        subtitle,
        whoWeAreP1,
        whoWeAreP2,
        whoWeAreP3,
        aboutImage
      }`,
      {},
      { next: { revalidate: 60 } }
    );

    if (!data) return null;

    let aboutImageUrl: string | undefined;
    if (data.aboutImage) {
      try {
        aboutImageUrl = urlForImage(data.aboutImage)?.url();
      } catch {
        // fallback
      }
    }

    return {
      title: data.title,
      subtitle: data.subtitle,
      whoWeAreP1: data.whoWeAreP1,
      whoWeAreP2: data.whoWeAreP2,
      whoWeAreP3: data.whoWeAreP3,
      aboutImageUrl,
    };
  } catch (err) {
    console.warn("Could not fetch Sanity about page:", err);
    return null;
  }
}
