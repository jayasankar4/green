import React from "react";
import Link from "next/link";

interface IconGridItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

interface IconGridProps {
  items: IconGridItem[];
  columns?: number;
}

export default function IconGrid({ items, columns = 3 }: IconGridProps) {
  const gridCols: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div className={`grid ${gridCols[columns] || gridCols[3]} gap-4`}>
      {items.map((item, index) => {
        const content = (
          <div
            key={index}
            className="group flex flex-col items-center text-center p-5 rounded-xl bg-white border border-border hover:border-brand-green/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-3 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
            <span className="text-sm font-semibold text-deep-teal font-heading">{item.label}</span>
          </div>
        );

        if (item.href) {
          return (
            <Link key={index} href={item.href} className="block">
              {content}
            </Link>
          );
        }
        return <div key={index}>{content}</div>;
      })}
    </div>
  );
}
