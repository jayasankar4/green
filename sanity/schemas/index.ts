import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Content",
  type: "document",
  fields: [
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
      options: {
        hotspot: true,
      },
    }),
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

