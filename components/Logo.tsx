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
  return (
    <div className={`inline-flex items-center max-w-full overflow-hidden ${className}`}>
      {showImage && (
        <div
          className={
            size === "small"
              ? "relative w-28 h-10 sm:w-32 sm:h-12"
              : size === "large"
              ? "relative w-52 h-16 sm:w-60 sm:h-20"
              : "relative w-36 h-12 sm:w-44 sm:h-14 lg:w-52 lg:h-16"
          }
        >
          <Image
            src="/images/logo.jpg"
            alt="Grass Infratech Logo"
            fill
            className="object-contain object-left"
            priority
            sizes={
              size === "small"
                ? "128px"
                : size === "large"
                ? "240px"
                : "(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
            }
          />
        </div>
      )}

      {showText && !showImage && (
        <div className="flex flex-col leading-tight min-w-0 max-w-full ml-2.5">
          <span
            className={`${
              size === "small"
                ? "text-sm sm:text-base"
                : size === "large"
                ? "text-xl sm:text-2xl"
                : "text-sm sm:text-lg lg:text-xl"
            } font-bold tracking-wide text-deep-teal font-heading truncate`}
            style={{ lineHeight: 1.1 }}
          >
            GRASS INFRATECH
          </span>
          {showTagline && (
            <span className="text-[9px] sm:text-[10px] text-secondary-text tracking-wide leading-tight hidden md:block truncate">
              Engineering Resource Deployment | Technical Staffing | Engineering Support Services
            </span>
          )}
        </div>
      )}
    </div>
  );
}
