import React from "react";
import Image from "next/image";

export default function Logo({
  className = "",
  size = "default",
  showText = true,
  showImage = true,
  showTagline = true,
}: {
  className?: string;
  size?: "small" | "default" | "large";
  showText?: boolean;
  showImage?: boolean;
  showTagline?: boolean;
}) {
  const sizes = {
    small: { img: 40, name: "text-sm sm:text-base", tagline: true },
    default: { img: 52, name: "text-sm sm:text-lg lg:text-xl", tagline: true },
    large: { img: 64, name: "text-xl sm:text-2xl", tagline: true },
  };

  const s = sizes[size];
  // When showing only the logo image (no HTML text), render at a size matching standard headers
  const imgSize = showText ? s.img : (size === "large" ? 64 : size === "default" ? 48 : 36);

  return (
    <div className={`inline-flex items-center max-w-full overflow-hidden ${className}`}>
      {/* Logo Image */}
      {showImage && (
        <Image
          src="/images/logo.jpg"
          alt="Grass Infratech Logo"
          width={imgSize}
          height={imgSize}
          className="flex-shrink-0 object-contain block rounded-sm mr-2.5"
          style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
          priority
        />
      )}

      {/* Wordmark */}
      {showText && (
        <div className="flex flex-col leading-tight min-w-0 max-w-full">
          <span
            className={`${s.name} font-bold tracking-wide text-deep-teal font-heading truncate`}
            style={{ lineHeight: 1.1 }}
          >
            <span className="sm:hidden">GRASS INFRATECH</span>
            <span className="hidden sm:inline">GRASS INFRATECH LLP</span>
          </span>
          {s.tagline && showTagline && (
            <span className="text-[9px] sm:text-[10px] text-secondary-text tracking-wide leading-tight hidden md:block truncate">
              Engineering Resource Deployment | Technical Staffing | Engineering Support Services
            </span>
          )}
        </div>
      )}
    </div>
  );
}

