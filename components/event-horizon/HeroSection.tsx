import React from "react";
import Image from "next/image";
interface HeroProps {

  title?: string;
  subtitle?: string;
  imageSrc?: string;
  tag?: string;
}

const HeroSection: React.FC<HeroProps> = ({
  
  title = "How to Explain OT to Anyone",
  tag = "Sundays with Dr. Shovan Saha",
  subtitle = "A half-day workshop to transform how you lead, communicate, and inspire your team.",
  imageSrc = "/placeholder.svg",
}) => {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
        
          <h1 className="max-w-3xl typography-h2 font-extrabold leading-tight text-white">
            {title}
          </h1>
          <h2 className="max-w-3xl typography-h4 font-semibold text-white/90 mt-2">{tag}</h2>
          <p className="mt-4 max-w-xl text-lg md:text-xl text-white/80 font-light">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

