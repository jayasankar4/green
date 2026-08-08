import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AccordionSection from "@/components/AccordionSection";
import FeatureCard from "@/components/FeatureCard";
import PillTag from "@/components/PillTag";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Engineering resource deployment services across Process, Mechanical, Piping, Civil, Electrical, Instrumentation, Project Controls, CAD, and Digital Engineering disciplines.",
};

const disciplines = [
  {
    title: "Process Engineering",
    roles: ["Process Engineers", "Lead Process Engineers", "Safety Engineers", "HAZOP Specialists", "Process Simulation Engineers"],
  },
  {
    title: "Mechanical Engineering",
    roles: ["Static Equipment Engineers", "Rotating Equipment Engineers", "Package Engineers", "HVAC Engineers", "Fire Protection Engineers"],
  },
  {
    title: "Piping Engineering",
    roles: ["Lead Piping Engineers", "Layout Engineers", "Stress Engineers", "Material Engineers", "Pipe Support Engineers"],
  },
  {
    title: "Civil & Structural Engineering",
    roles: ["Structural Engineers", "Civil Engineers", "Foundation Engineers", "Steel Structure Designers", "Tekla Specialists"],
  },
  {
    title: "Electrical Engineering",
    roles: ["Power System Engineers", "Substation Engineers", "Lighting Engineers", "Earthing Engineers", "Electrical Designers"],
  },
  {
    title: "Instrumentation & Control",
    roles: ["Instrument Engineers", "Control System Engineers", "SIS Engineers", "Telecom Engineers", "SPI Administrators", "Instrument Designers"],
  },
  {
    title: "Project Controls",
    roles: ["Planning Engineers", "Primavera Experts", "Cost Engineers", "Project Coordinators", "Project Managers"],
  },
  {
    title: "CAD & 3D Design",
    roles: ["SP3D Designers", "E3D Designers", "AutoCAD Designers", "Plant 3D Designers", "PDMS Designers", "BIM Modelers", "Revit Specialists", "Tekla Modelers"],
  },
  {
    title: "Digital Engineering",
    roles: ["Laser Scanning Specialists", "Scan to BIM", "Digital Twin", "As-built Modeling", "Asset Information Modeling"],
  },
];

const deploymentModels = [
  { title: "Contract Staffing", description: "Deploy engineers for a defined duration.", icon: "📋" },
  { title: "Resource Sharing", description: "Dedicated engineers working exclusively for your projects.", icon: "🤝" },
  { title: "Offshore Engineering Centre", description: "Build your own engineering team operating from India.", icon: "🏢" },
  { title: "Dedicated Engineering Team", description: "An extension of your engineering office.", icon: "👥" },
  { title: "Project Based Deployment", description: "Complete multidisciplinary engineering team for EPC projects.", icon: "🏗️" },
  { title: "Permanent Recruitment", description: "Identification and recruitment of experienced engineering professionals.", icon: "🎯" },
];

const engagementModels = [
  "Time & Material", "Fixed Monthly", "Hourly Billing", "Project Based",
  "Resource Sharing", "Offshore Delivery Centre", "Dedicated Engineering Team", "Permanent Placement",
];

const softwareExpertise = [
  { discipline: "Process", tools: ["Aspen HYSYS", "Aspen Plus", "UniSim"] },
  { discipline: "Mechanical", tools: ["PV Elite", "Compress", "AutoPIPE Vessel"] },
  { discipline: "Piping", tools: ["CAESAR II", "AutoPIPE"] },
  { discipline: "3D Design", tools: ["SP3D", "AVEVA E3D", "PDMS", "AutoCAD Plant 3D", "SmartPlant Review"] },
  { discipline: "Structural", tools: ["STAAD Pro", "Tekla", "ETABS", "SAP2000"] },
  { discipline: "Electrical", tools: ["ETAP", "Dialux"] },
  { discipline: "Instrumentation", tools: ["SPI", "SmartPlant Instrumentation"] },
  { discipline: "Project Management", tools: ["Primavera P6", "MS Project"] },
];

const typicalRoles = [
  "Engineering Managers", "Project Managers", "Lead Engineers", "Senior Engineers",
  "Engineers", "Designers", "Draftsmen", "BIM Coordinators", "Planning Engineers",
  "Cost Engineers", "Procurement Engineers", "Construction Managers", "QA/QC Engineers",
  "HSE Engineers", "Site Engineers", "Commissioning Engineers", "Document Controllers",
];

export default function ServicesPage() {
  const accordionItems = disciplines.map((d) => ({
    title: d.title,
    content: (
      <div className="flex flex-wrap gap-2">
        {d.roles.map((role) => (
          <span
            key={role}
            className="inline-block px-3 py-1.5 rounded-lg bg-light-grey text-sm text-dark-slate border border-border"
          >
            {role}
          </span>
        ))}
      </div>
    ),
  }));

  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Engineering Resource Deployment — We deploy engineering professionals to support clients during every phase of project execution."
        backgroundImage="/images/hero-services.png"
        compact
      />

      {/* ─── DISCIPLINE CATEGORIES ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="ENGINEERING DISCIPLINES"
              title="Specialized Engineering Resource Deployment"
              description="We provide qualified professionals across every major engineering discipline."
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <AccordionSection items={accordionItems} allowMultiple />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── RESOURCE DEPLOYMENT MODELS ─── */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="RESOURCE DEPLOYMENT MODELS"
              title="Flexible Hiring Solutions"
              centered
            />
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {deploymentModels.map((model, i) => (
              <AnimateOnScroll key={model.title} delay={i * 100}>
                <FeatureCard
                  icon={<span className="text-2xl">{model.icon}</span>}
                  title={model.title}
                  description={model.description}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT MODELS ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="ENGAGEMENT MODELS"
              title="Commercial Flexibility"
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {engagementModels.map((model) => (
                <PillTag key={model} label={model} variant="green" />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── SOFTWARE EXPERTISE ─── */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="ENGINEERING SOFTWARE EXPERTISE"
              title="Tools & Technologies"
              centered
            />
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {softwareExpertise.map((group, i) => (
              <AnimateOnScroll key={group.discipline} delay={i * 80}>
                <div className="bg-white rounded-xl p-5 border border-border">
                  <h4 className="text-sm font-bold font-heading text-brand-green uppercase tracking-wider mb-3">
                    {group.discipline}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-block px-2.5 py-1 rounded-md bg-light-grey text-xs text-dark-slate border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TYPICAL ROLES ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="TYPICAL ROLES WE DEPLOY"
              title="Engineering Professionals Ready to Join Your Team"
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-2.5 mt-10">
              {typicalRoles.map((role) => (
                <PillTag key={role} label={role} variant="default" />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
