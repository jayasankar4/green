import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 sm:mb-10 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-block text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-3 ${
            light ? "text-accent-green" : "text-brand-green"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight ${
          light ? "text-white" : "text-deep-teal"
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-12 sm:w-16 h-1 rounded-full mt-3 sm:mt-4 ${centered ? "mx-auto" : ""} ${
          light ? "bg-accent-green" : "bg-brand-green"
        }`}
      />
      {description && (
        <p
          className={`mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-gray-300" : "text-secondary-text"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
