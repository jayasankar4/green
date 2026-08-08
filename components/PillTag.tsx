import React from "react";

interface PillTagProps {
  label: string;
  variant?: "default" | "green" | "blue" | "dark";
}

export default function PillTag({ label, variant = "default" }: PillTagProps) {
  const variants: Record<string, string> = {
    default: "bg-light-grey text-dark-slate border border-border",
    green: "bg-brand-green/10 text-brand-green border border-brand-green/20",
    blue: "bg-accent-blue/10 text-accent-blue border border-accent-blue/20",
    dark: "bg-navy-800 text-white border border-navy-700",
  };

  return (
    <span
      className={`inline-block px-3.5 py-1.5 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
