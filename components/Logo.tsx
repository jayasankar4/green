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
    <div className={`inline-flex items-center max-w-full ${className}`}>
      {showImage && (
        <div
          className={
            size === "small"
              ? "relative w-36 h-12 sm:w-40 sm:h-14"
              : size === "large"
              ? "relative w-64 h-20 sm:w-80 sm:h-24"
              : "relative w-44 h-14 sm:w-56 sm:h-16 lg:w-64 lg:h-16"
          }
        >
          <Image
            src="/images/logo.png"
            alt="Grass Infratech Logo"
            fill
            className="object-contain object-left"
            priority
            sizes={
              size === "small"
                ? "160px"
                : size === "large"
                ? "320px"
                : "(max-width: 640px) 180px, (max-width: 1024px) 224px, 256px"
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
