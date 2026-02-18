import React from "react";
import Image from "next/image";

interface HeroProps {
  imageSrc?: string;
  alt?: string;
}

const HeroSection: React.FC<HeroProps> = ({
  imageSrc = "/placeholder.svg",
  alt = "Event Hero Image",
}) => {
  return (
    <section className="relative overflow-hidden">
      <div className="w-full relative overflow-hidden rounded-b">
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-[480px]">
          <Image
            src={imageSrc}
            alt={alt}
            className="h-full w-full object-cover"
            style={{
              borderBottomLeftRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

