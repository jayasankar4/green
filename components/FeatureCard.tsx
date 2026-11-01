import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-brand-green/30 hover:border-l-4 hover:border-l-brand-green hover:-translate-y-1 h-full flex flex-col ${className}`}
    >
      <div className="w-14 h-14 rounded-lg bg-brand-green/10 flex items-center justify-center mb-4 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-heading text-deep-teal mb-2">{title}</h3>
      <p className="text-secondary-text text-sm leading-relaxed flex-grow">{description}</p>
    </div>
  );
}
