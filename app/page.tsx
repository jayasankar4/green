import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";
import { getSiteSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Grass Infratech | Engineering Resource Deployment & Technical Staffing",
  description:
    "Grass Infratech delivers highly skilled engineering professionals for the global energy & infrastructure industry. Engineering staffing, resource deployment, and technical manpower solutions.",
};

/* ─── Icon Components ─── */
const FastDeployIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const FlexibleIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const ExperiencedIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const CostIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TalentPoolIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const MobilizationIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HiringIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const GlobalIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExperienceYearsIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

/* ─── Industry & Service Icons ─── */
const OilGasIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const PowerIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const RenewableIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const InfraIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ManufacturingIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MiningIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ProcessIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const MechanicalIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PipingIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

const CivilIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ElectricalIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const InstrumentIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const ProjectIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const CADIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const DigitalIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  </svg>
);

export default async function HomePage() {
  const cms = await getSiteSettings();

  const heroBadge = cms?.heroBadge || "YOUR ENGINEERING WORKFORCE POWERHOUSE";
  const heroTitle = cms?.heroTitle || "Right Engineers. Right Time. Zero Downtime.";
  const heroSubtitle = cms?.heroSubtitle || "Fueling the World's Biggest Energy & Infrastructure Projects with Elite Engineering Talent";
  const heroDescription = cms?.heroDescription || "Grass Infratech is your go-to partner for rapid engineering workforce deployment. We supply battle-tested engineers, design specialists, BIM experts, project managers, and construction professionals to top-tier EPC contractors, consultancies, and asset owners globally.";
  const heroImgSrc = cms?.heroImageUrl || "/images/hero-home.png";

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[680px]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImgSrc})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-green mb-4">
                {heroBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold font-heading text-white leading-tight mb-5">
                {heroTitle.includes("Zero Downtime") ? (
                  <>
                    {heroTitle.replace("Zero Downtime.", "").replace("Zero Downtime", "")}
                    <span className="text-accent-green">Zero Downtime.</span>
                  </>
                ) : (
                  heroTitle
                )}
              </h1>
              <p className="text-lg font-semibold text-white/90 mb-4">
                {heroSubtitle}
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                {heroDescription}
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                One specialist or an entire multidisciplinary team — we mobilize fast, so your
                projects never miss a beat. Oil & Gas, Power, Renewables, Infrastructure — we've got
                every sector covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/25 hover:-translate-y-0.5"
                >
                  Get Your Dream Team
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Talk to an Expert
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <Image
                  src={heroImgSrc}
                  alt="Industrial oil refinery with engineering infrastructure at twilight"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── FEATURE STRIP ─── */}
      <section className="relative z-10 mt-8 sm:mt-12 lg:-mt-12 mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimateOnScroll delay={0} className="h-full">
              <FeatureCard
                icon={<FastDeployIcon />}
                title="Fast Deployment"
                description="Resources deployed within days"
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={100} className="h-full">
              <FeatureCard
                icon={<FlexibleIcon />}
                title="Flexible Engagement Models"
                description="Multiple hiring models to suit your needs"
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={200} className="h-full">
              <FeatureCard
                icon={<ExperiencedIcon />}
                title="Experienced Professionals"
                description="Skilled experts with proven industry experience"
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={300} className="h-full">
              <FeatureCard
                icon={<CostIcon />}
                title="Cost Effective Solutions"
                description="High quality resources at competitive rates"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
                <SectionHeading
                  eyebrow="ABOUT Grass Infratech"
                  title="The Workforce Engine Behind World-Class Projects"
                />
                <p className="text-secondary-text leading-relaxed mb-4">
                  We don't just fill positions — we fuel project success. Grass Infratech
                  matches technically elite professionals with your exact project needs, whether
                  it's a short-term sprint or a multi-year mega-project.
                </p>
                <p className="text-secondary-text leading-relaxed mb-6">
                  From seasoned piping engineers to BIM virtuosos, project controls gurus to
                  site inspectors — we deliver the right talent, every single time.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all duration-300"
                >
                  Discover Our Story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slide-in-right" delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-engineers.png"
                  alt="Two engineers collaborating on site wearing hard hats and safety vests"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-light-grey via-white to-brand-green/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="ENGINEERING RESOURCES READY TO DEPLOY"
              title="Why Choose Grass Infratech"
              centered
            />
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {(cms?.features && cms.features.length > 0 ? cms.features : [
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
            ]).map((feat, idx) => {
              const icons = [
                <TalentPoolIcon key="1" />,
                <MobilizationIcon key="2" />,
                <HiringIcon key="3" />,
                <GlobalIcon key="4" />,
                <ExperienceYearsIcon key="5" />,
                <CostIcon key="6" />,
              ];
              return (
                <AnimateOnScroll key={feat.title || idx} delay={idx * 100} className="h-full">
                  <FeatureCard
                    icon={icons[idx % icons.length]}
                    title={feat.title || ""}
                    description={feat.description || ""}
                  />
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES PREVIEW ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="INDUSTRIES WE DOMINATE"
              title="Deployed Across the World's Toughest Sectors"
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
              {[
                { icon: <OilGasIcon />, label: "Oil & Gas" },
                { icon: <PowerIcon />, label: "Power Generation" },
                { icon: <RenewableIcon />, label: "Renewable Energy" },
                { icon: <InfraIcon />, label: "Infrastructure" },
                { icon: <ManufacturingIcon />, label: "Industrial Manufacturing" },
                { icon: <MiningIcon />, label: "Mining & Metals" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href="/industries"
                  className="group flex flex-col items-center text-center p-3 sm:p-5 rounded-xl bg-white border border-border hover:border-brand-green/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-3 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-deep-teal font-heading">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-light-grey via-white to-brand-green/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="WHAT WE BRING TO THE TABLE"
              title="Every Engineering Discipline. One Powerhouse Partner."
              centered
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {[
                { icon: <ProcessIcon />, label: "Process Engineering" },
                { icon: <MechanicalIcon />, label: "Mechanical Engineering" },
                { icon: <PipingIcon />, label: "Piping Engineering" },
                { icon: <CivilIcon />, label: "Civil & Structural Engineering" },
                { icon: <ElectricalIcon />, label: "Electrical Engineering" },
                { icon: <InstrumentIcon />, label: "Instrumentation & Control" },
                { icon: <ProjectIcon />, label: "Project Controls" },
                { icon: <CADIcon />, label: "CAD & 3D Design" },
                { icon: <DigitalIcon />, label: "Digital Engineering" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href="/services"
                  className="group flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white border border-border hover:border-brand-green/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 min-w-0"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-deep-teal font-heading leading-snug break-words hyphens-auto">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <CTASection />
    </>
  );
}
