import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "1. Homepage & General Info",
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
      title: "Why Choose Grass Infratech (6 Cards)",
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
    defineField({
      name: "registeredOffice",
      title: "Registered Office Address",
      type: "string",
      initialValue: "Visakhapatnam, Andhra Pradesh",
    }),
    defineField({
      name: "corporateOffice",
      title: "Corporate Office Address",
      type: "string",
      initialValue: "Bangalore, Karnataka",
    }),
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "2. About Us Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "About Grass Infratech",
    }),
    defineField({
      name: "subtitle",
      title: "Page Subtitle",
      type: "string",
      initialValue: "Your Trusted Engineering Workforce Partner — Delivering Competent Engineering Professionals Worldwide",
    }),
    defineField({
      name: "whoWeAreP1",
      title: "Who We Are - Paragraph 1",
      type: "text",
      rows: 3,
      initialValue: "Grass Infratech is committed to supporting engineering organizations by providing technically competent professionals on short-term, long-term and project-specific assignments.",
    }),
    defineField({
      name: "whoWeAreP2",
      title: "Who We Are - Paragraph 2",
      type: "text",
      rows: 3,
      initialValue: "We help engineering companies overcome manpower challenges by supplying experienced engineers, designers, BIM specialists, project managers, inspectors and technical consultants.",
    }),
    defineField({
      name: "whoWeAreP3",
      title: "Who We Are - Paragraph 3",
      type: "text",
      rows: 3,
      initialValue: "Our extensive talent network enables clients to quickly mobilize skilled resources for a wide range of project phases. Our professionals are deployed either remotely, at client offices or directly at project sites worldwide.",
    }),
    defineField({
      name: "aboutImage",
      title: "About Page Site Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const schemaTypes = [siteSettings, aboutPage];
