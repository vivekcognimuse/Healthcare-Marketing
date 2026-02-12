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
        

        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center bg-gradient-to-t from-black/80 via-black/50 via-60% to-black/0 h-fit justify-end pb-6 pt-20 px-6 text-center">
        
          <h1 className=" typography-h1 max-w-6xl  text-white">
            {title}
          </h1>
          <h2 className="max-w-3xl typography-h3  text-white mt-2">{tag}</h2>
          <p className="mt-4 max-w-xl typography-p2 text-white/90 ">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

