import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Content",
  type: "document",
  fields: [
    // ─── Hero Section ───
    defineField({
      name: "heroBadge",
      title: "Hero Badge (Green text)",
      type: "string",
      initialValue: "YOUR ENGINEERING WORKFORCE POWERHOUSE",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Main Title",
      type: "string",
      initialValue: "Right Engineers. Right Time. Zero Downtime.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      initialValue: "Fueling the World's Biggest Energy & Infrastructure Projects with Elite Engineering Talent",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description Paragraph",
      type: "text",
      rows: 4,
      initialValue: "Grass Infratech is your go-to partner for rapid engineering workforce deployment. We supply battle-tested engineers, design specialists, BIM experts, project managers, and construction professionals to top-tier EPC contractors, consultancies, and asset owners globally.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Banner Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ─── 6 Key Value Feature Cards ───
    defineField({
      name: "features",
      title: "Why Choose Grass Infratech (6 Feature Cards)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Card Description", type: "text", rows: 3 }),
          ],
        },
      ],
      initialValue: [
        {
          title: "Vast Engineering Talent Network",
          description: "Tap into our powerhouse of 5,000+ pre-vetted engineers spanning every discipline — from process and piping to civil, electrical, and instrumentation.",
        },
        {
          title: "Lightning-Fast Mobilization",
          description: "Time is money. We deploy qualified professionals to your project site within days, not weeks — keeping your timelines on track and budgets intact.",
        },
        {
          title: "Flexible Engagement Models",
          description: "Contract staffing, dedicated teams, project-based deployment, or permanent recruitment — choose the model that fits your project perfectly.",
        },
        {
          title: "Proven Global Reach",
          description: "Our professionals have delivered excellence across India, Middle East, Africa, Southeast Asia, Europe, and North America — wherever your project demands.",
        },
        {
          title: "Battle-Tested Engineers",
          description: "From mid-career specialists (3–8 yrs) to seasoned veterans (25+ yrs), every professional we deploy brings hands-on, real-world project experience.",
        },
        {
          title: "Maximum Value, Minimal Risk",
          description: "Get top-tier engineering talent at competitive rates — we absorb the recruitment risk so you can focus on delivering world-class projects.",
        },
      ],
    }),

    // ─── Contact Info ───
    defineField({
      name: "phone",
      title: "Contact Phone Number",
      type: "string",
      initialValue: "+91 90142 05256",
    }),
    defineField({
      name: "email",
      title: "Contact Email Address",
      type: "string",
      initialValue: "grassinfratech@gmail.com",
    }),
  ],
});

export const schemaTypes = [siteSettings];
