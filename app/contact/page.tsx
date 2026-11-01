import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Grass Infratech's Resource Deployment Team today. Discuss your engineering manpower needs and discover how we can support your project's success.",
};

const contactFormFields = [
  { name: "name", label: "Full Name", type: "text" as const, required: true, placeholder: "Your name" },
  { name: "company", label: "Company", type: "text" as const, required: false, placeholder: "Your company name" },
  { name: "email", label: "Email Address", type: "email" as const, required: true, placeholder: "you@company.com" },
  { name: "phone", label: "Phone Number", type: "tel" as const, required: false, placeholder: "+91 XXXXX XXXXX" },
  {
    name: "subject",
    label: "Subject / Requirement Type",
    type: "select" as const,
    required: true,
    options: ["Request Resources", "Partnership", "Careers", "General Enquiry"],
  },
  { name: "message", label: "Message", type: "textarea" as const, required: true, placeholder: "Tell us about your engineering manpower requirements..." },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Contact our Resource Deployment Team today to discuss your engineering manpower needs and discover how we can support your project's success."
        backgroundImage="/images/hero-contact.png"
        compact
      />

      {/* ─── CONTACT SECTION ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — Contact Details */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <SectionHeading
                  eyebrow="GET IN TOUCH"
                  title="Contact Details"
                />
              </AnimateOnScroll>

              <AnimateOnScroll delay={100}>
                <div className="space-y-4 mt-6">

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-light-grey rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-teal font-heading mb-1">Office Locations</h4>
                      <p className="text-sm text-secondary-text leading-relaxed">
                        <span className="font-semibold text-deep-teal">Registered Office:</span><br />
                        Visakhapatnam, Andhra Pradesh
                      </p>
                      <p className="text-sm text-secondary-text leading-relaxed mt-1">
                        <span className="font-semibold text-deep-teal">Corporate Office:</span><br />
                        Bangalore, Karnataka
                      </p>
                    </div>
                  </div>

                  {/* General Email */}
                  <div className="flex items-start gap-4 p-4 bg-light-grey rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-teal font-heading mb-1">General Enquiries</h4>
                      <a href="mailto:info@grassinfratech.com" className="text-sm text-brand-green hover:underline">
                        info@grassinfratech.com
                      </a>
                      <p className="text-xs text-secondary-text mt-0.5">All enquiries: bd@grassinfratech.com</p>
                    </div>
                  </div>

                  {/* HR / CV Submission */}
                  <div className="flex items-start gap-4 p-4 bg-light-grey rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-teal font-heading mb-1">CV Submission / HR</h4>
                      <a href="mailto:hr@grassinfratech.com" className="text-sm text-brand-green hover:underline">
                        hr@grassinfratech.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 bg-light-grey rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-teal font-heading mb-1">Mobile</h4>
                      <a href="tel:+919014205256" className="text-sm text-brand-green hover:underline">
                        +91 90142 05256
                      </a>
                    </div>
                  </div>

                  {/* LLPIN */}
                  <div className="flex items-start gap-4 p-4 bg-light-grey rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-teal font-heading mb-1">LLPIN</h4>
                      <p className="text-sm text-secondary-text">ACW-4846</p>
                    </div>
                  </div>

                </div>
              </AnimateOnScroll>

              {/* Google Map */}
              <AnimateOnScroll delay={200}>
                <div className="mt-6 rounded-xl overflow-hidden border border-border shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121649.94577498588!2d83.15628979999999!3d17.732401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9c20395498a85!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Grass Infratech Location - Visakhapatnam"
                  />
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-3">
              <AnimateOnScroll animation="slide-in-right">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-heading text-deep-teal mb-1">
                      Send Us a Message
                    </h3>
                    <p className="text-sm text-secondary-text">
                      Fill out the form below and our team will respond within 24 hours.
                    </p>
                  </div>
                  <ContactForm
                    fields={contactFormFields}
                    submitLabel="Send Message"
                    formId="contact-form"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
