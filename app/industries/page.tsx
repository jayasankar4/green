import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import PillTag from "@/components/PillTag";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Grass Infratech provides engineering professionals for Oil & Gas, Power Generation, Renewable Energy, Infrastructure, Industrial Manufacturing, and Mining & Metals industries.",
};

const industries = [
  {
    title: "Oil & Gas",
    icon: "🛢️",
    items: [
      "Offshore Platforms", "Onshore Facilities", "Refineries", "Petrochemical Plants",
      "LNG Terminals", "Pipelines", "Gas Processing Plants", "Tank Farms", "City Gas Distribution",
    ],
  },
  {
    title: "Power Generation",
    icon: "⚡",
    items: [
      "Thermal Power Plants", "Combined Cycle Plants", "Gas Based Plants",
      "Hydro Power", "Nuclear Support Services", "Transmission & Distribution",
    ],
  },
  {
    title: "Renewable Energy",
    icon: "☀️",
    items: [
      "Solar", "Wind", "Battery Energy Storage", "Hydrogen", "Green Ammonia", "Bio Energy",
    ],
  },
  {
    title: "Infrastructure",
    icon: "🏗️",
    items: [
      "Metro Rail", "Airports", "Water Supply", "Waste Water Treatment",
      "Industrial Buildings", "Smart Cities", "Roads & Highways",
    ],
  },
  {
    title: "Industrial Manufacturing",
    icon: "🏭",
    items: [
      "Cement", "Steel", "Fertilizer", "Chemical Plants", "Pharmaceuticals", "Food Processing",
    ],
  },
  {
    title: "Mining & Metals",
    icon: "⛏️",
    items: [
      "Mineral Processing", "Material Handling", "Beneficiation Plants", "Slurry Pipelines",
    ],
  },
];

const sectors = [
  "Oil & Gas", "Refinery", "Petrochemical", "LNG", "Pipelines", "City Gas Distribution",
  "Power Generation", "Renewable Energy", "Hydrogen", "Infrastructure",
  "Industrial Manufacturing", "Water", "Mining", "Metals", "Ports", "Marine",
];

export default function IndustriesPage() {
  return (
    <>
      <Hero
        title="Industries We Serve"
        subtitle="Delivering engineering professionals across the most critical sectors of the global economy."
        backgroundImage="/images/hero-industries.png"
        compact
      />

      {/* ─── INDUSTRY CARDS ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="OUR INDUSTRY COVERAGE"
              title="Engineering Talent Across Key Sectors"
              centered
            />
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {industries.map((industry, i) => (
              <AnimateOnScroll key={industry.title} delay={i * 100}>
                <div className="bg-white rounded-xl p-6 border border-border hover:border-brand-green/30 hover:shadow-xl transition-all duration-300 h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center text-2xl group-hover:bg-brand-green/20 transition-all duration-300">
                      {industry.icon}
                    </div>
                    <h3 className="text-lg font-bold font-heading text-deep-teal">{industry.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {industry.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-secondary-text">
                        <svg
                          className="w-3.5 h-3.5 text-brand-green flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTORS SUPPORTED ─── */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="SECTORS SUPPORTED"
              title="Comprehensive Sector Coverage"
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {sectors.map((sector) => (
                <PillTag key={sector} label={sector} variant="green" />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
