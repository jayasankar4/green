"use client";

import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionSectionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function AccordionSection({ items, allowMultiple = false }: AccordionSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`rounded-xl border transition-all duration-300 ${
              isOpen ? "border-brand-green/30 shadow-md bg-white" : "border-border bg-white hover:border-brand-green/20"
            }`}
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold font-heading text-deep-teal">{item.title}</span>
              <svg
                className={`w-5 h-5 text-brand-green transition-transform duration-300 flex-shrink-0 ml-4 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-5 text-secondary-text leading-relaxed">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
