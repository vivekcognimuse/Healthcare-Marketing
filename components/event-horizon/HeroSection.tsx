import React from "react";
import Image from "next/image";
interface HeroProps {

  title?: string;
  subtitle?: string;
  imageSrc?: string;
  tag?: string;
  variant?: "default" | "imageOnly";
}

const HeroSection: React.FC<HeroProps> = ({
  
  title = "How to Explain OT to Anyone",
  tag = "Sundays with Dr. Shovan Saha",
  subtitle = "A half-day workshop to transform how you lead, communicate, and inspire your team.",
  imageSrc = "/placeholder.svg",
  variant = "default",
}) => {
  const showContent = variant !== "imageOnly";
  const showTitleOverlay = variant === "imageOnly";
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] md:h-[540px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
          fill
          unoptimized
          priority
        />
        
        {showContent && (
          <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center bg-gradient-to-t from-black/80 via-black/50 via-60% to-black/0 h-fit justify-end pb-6 pt-20 px-6 text-center">

            <h1 className="typography-h1 max-w-6xl text-white">
              {title}
            </h1>
            <h2 className="max-w-3xl typography-h3  text-white mt-2">{tag}</h2>
            <p className="mt-4 max-w-xl typography-p2 text-white/90 ">{subtitle}</p>
          </div>
        )}

        {showTitleOverlay && (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#FAFAFA]/95 via-[#FAFAFA]/70 via-50% to-transparent h-56 flex flex-col items-center justify-end pb-8 px-6 md:px-8 text-center">
            <h1 className="typography-h1 max-w-6xl" style={{ fontSize: "clamp(32px, 6vw, 48px)", letterSpacing: "-0.02em" }}>
              {title}
            </h1>
            <span className="mt-4 typography-p2 font-medium text-[#1E1E1E]">
              {tag}
            </span>
          </div>
        )}

        <div
          className="pointer-events-none absolute bottom-0 right-0 z-10 h-24 w-24"
          style={{ background: "radial-gradient(circle at bottom right, #FAFAFA 0%, rgba(250,250,250,0) 70%)" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;

