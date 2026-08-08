import React from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  compact?: boolean;
  children?: React.ReactNode;
}

export default function Hero({ title, subtitle, backgroundImage, compact = false, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/70" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 ${
          compact ? "py-14 sm:py-20 md:py-28" : "py-16 sm:py-24 md:py-36"
        }`}
      >
        {children ? (
          children
        ) : (
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-tight mb-3 sm:mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
