import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mw7etdjr";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "grass_infratech_studio",
  title: "Grass Infratech CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

