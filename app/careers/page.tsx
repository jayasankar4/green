import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ContactForm from "@/components/ContactForm";
import PillTag from "@/components/PillTag";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Grass Infratech LLP's engineering talent network. Apply for engineering deployment opportunities across Oil & Gas, Energy, Infrastructure, and more.",
};

const roleList = [
  "Engineering Managers", "Project Managers", "Lead Engineers", "Senior Engineers",
  "Engineers", "Designers", "Draftsmen", "BIM Coordinators", "Planning Engineers",
  "Cost Engineers", "Procurement Engineers", "Construction Managers", "QA/QC Engineers",
  "HSE Engineers", "Site Engineers", "Commissioning Engineers", "Document Controllers",
];

const careerFormFields = [
  { name: "name", label: "Full Name", type: "text" as const, required: true, placeholder: "Enter your full name" },
  { name: "email", label: "Email Address", type: "email" as const, required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  {
    name: "discipline",
    label: "Discipline / Role",
    type: "select" as const,
    required: true,
    options: [
      "Process Engineering", "Mechanical Engineering", "Piping Engineering",
      "Civil & Structural Engineering", "Electrical Engineering", "Instrumentation & Control",
      "Project Controls", "CAD & 3D Design", "Digital Engineering",
      "Project Management", "Construction Management", "QA/QC", "HSE",
    ],
  },
  {
    name: "experience",
    label: "Experience Level",
    type: "select" as const,
    required: true,
    options: ["3–8 Years", "8–15 Years", "15–25 Years", "25+ Years"],
  },
  { name: "resume", label: "Resume / CV", type: "file" as const, required: false },
  { name: "message", label: "Message (Optional)", type: "textarea" as const, required: false, placeholder: "Tell us about your experience and what type of opportunities you're looking for..." },
];

export default function CareersPage() {
  return (
    <>
      <Hero
        title="Careers at Grass Infratech LLP"
        subtitle="Join our engineering talent network for deployment opportunities across Oil & Gas, Energy, Infrastructure, and Industrial sectors worldwide."
        backgroundImage="/images/hero-careers.png"
        compact
      />

      {/* ─── TALENT NETWORK ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="JOIN OUR TEAM"
              title="Join Our Engineering Talent Network"
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <p className="text-secondary-text leading-relaxed mb-4 max-w-3xl">
              Grass Infratech LLP regularly places experienced engineering professionals across
              disciplines into short-term, long-term and project-based assignments across India and
              internationally. We are always looking for talented engineers to join our deployment
              network.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="mt-6">
              <h3 className="text-sm font-bold font-heading text-deep-teal uppercase tracking-wider mb-3">
                Roles We Deploy
              </h3>
              <div className="flex flex-wrap gap-2">
                {roleList.map((role) => (
                  <PillTag key={role} label={role} variant="default" />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── SUBMIT RESUME ─── */}
      <section className="py-16 md:py-20 bg-light-grey">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="SUBMIT YOUR RESUME"
              title="Apply for Engineering Opportunities"
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-border mt-8">
              <ContactForm
                fields={careerFormFields}
                submitLabel="Submit Application"
                formId="careers-form"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
