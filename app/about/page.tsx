import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import StepperNumbered from "@/components/StepperNumbered";
import CTASection from "@/components/CTASection";
import { getAboutPageData } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Grass Infratech — a specialized engineering resource deployment company providing technically competent professionals to global EPC contractors, engineering consultants, and asset owners.",
};

const trustItems = [
  "Fast turnaround time",
  "Verified engineering professionals",
  "Flexible commercial models",
  "Reduced hiring costs",
  "Lower project risks",
  "Scalable engineering teams",
  "High retention",
  "Strong technical screening process",
];

const recruitmentSteps = [
  { number: 1, title: "Requirement Analysis" },
  { number: 2, title: "Candidate Identification" },
  { number: 3, title: "Technical Evaluation" },
  { number: 4, title: "Client Interview Coordination" },
  { number: 5, title: "Documentation" },
  { number: 6, title: "Mobilization" },
  { number: 7, title: "Continuous Performance Monitoring" },
];

const mobilizationAreas = [
  "FEED Engineering",
  "Detailed Engineering",
  "EPC Projects",
  "PMC Projects",
  "Brownfield Modifications",
  "Greenfield Projects",
  "Shutdowns & Turnarounds",
  "Commissioning",
  "Construction Supervision",
  "Owner's Engineer Support",
];

export default async function AboutPage() {
  const cms = await getAboutPageData();

  const title = cms?.title || "About Grass Infratech";
  const subtitle = cms?.subtitle || "Your Trusted Engineering Workforce Partner — Delivering Competent Engineering Professionals Worldwide";
  const p1 = cms?.whoWeAreP1 || "Grass Infratech is committed to supporting engineering organizations by providing technically competent professionals on short-term, long-term and project-specific assignments.";
  const p2 = cms?.whoWeAreP2 || "We help engineering companies overcome manpower challenges by supplying experienced engineers, designers, BIM specialists, project managers, inspectors and technical consultants.";
  const p3 = cms?.whoWeAreP3 || "Our extensive talent network enables clients to quickly mobilize skilled resources for a wide range of project phases. Our professionals are deployed either remotely, at client offices or directly at project sites worldwide.";
  const aboutImg = cms?.aboutImageUrl || "/images/about-engineers.png";

  return (
    <>
      <Hero
        title={title}
        subtitle={subtitle}
        backgroundImage="/images/hero-about.png"
        compact
      />

      {/* ─── WHO WE ARE ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="WHO WE ARE"
              title="Specialized Engineering Resource Deployment"
            />
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-10 mt-4">
            <AnimateOnScroll delay={100}>
              <div>
                <p className="text-secondary-text leading-relaxed mb-4">
                  {p1}
                </p>
                <p className="text-secondary-text leading-relaxed mb-4">
                  {p2}
                </p>
                <p className="text-secondary-text leading-relaxed">
                  {p3}
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <div>
                <h3 className="text-lg font-bold font-heading text-deep-teal mb-4">
                  Quick Mobilization Across:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {mobilizationAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-brand-green flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-dark-slate">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── WHY CLIENTS TRUST US ─── */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="WHY CLIENTS TRUST US"
              title="Built on Reliability, Quality & Speed"
              centered
            />
          </AnimateOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {trustItems.map((item, i) => (
              <AnimateOnScroll key={item} delay={i * 80}>
                <div className="flex items-start gap-3 p-5 bg-white rounded-xl border border-border hover:border-brand-green/30 hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-brand-green"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-deep-teal font-heading">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECRUITMENT PROCESS ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="OUR RECRUITMENT PROCESS"
              title="A Structured Approach to Engineering Staffing"
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="mt-10 flex justify-center">
              <StepperNumbered steps={recruitmentSteps} />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── OUR COMMITMENT ─── */}
      <section className="py-16 md:py-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent-green blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent-blue blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="OUR COMMITMENT"
              title="Our Promise to Clients & Professionals"
              centered
              light
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <blockquote className="mt-8">
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 w-12 h-12 text-accent-green/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic pl-8">
                  Grass Infratech is committed to becoming the preferred engineering workforce
                  partner for global EPC contractors, engineering consultants, project management
                  companies, and asset owners by delivering highly competent engineering professionals
                  with integrity, quality, responsiveness, and technical excellence.
                </p>
              </div>
            </blockquote>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
