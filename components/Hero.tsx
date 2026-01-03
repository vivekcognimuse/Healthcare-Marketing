"use client";

import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header if any
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="home"
      className="relative text-white min-h-screen flex items-center py-12 sm:py-16 lg:py-24 z-0"
      style={{
        background: 'linear-gradient(180deg, #001B57 0%, #155DFC 71.32%, #FFFFFF 96.6%)'
      }}
    >
      <div className="container pt-20 sm:pt-24 lg:pt-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="typography-h1 mb-6">
              <span className="block">Expert Marketing for</span>
              <span className="block lg:whitespace-nowrap">Healthcare Professionals.</span>
            </h1>
            <p className="typography-p1 mb-8 opacity-90">
              <span className="lg:whitespace-nowrap">Connect with the Right Patients through Trusted Marketing Techniques.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
                className="inline-block"
              >
                <Button variant="primary">
                  Explore Our Services
                </Button>
              </a>
              <a 
                href="#work" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("work");
                }}
                className="inline-block"
              >
                <Button variant="outline">
                  View Our Work
                </Button>
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src="/Images webp/hero Images.webp"
                alt="Digital Healthcare Marketing"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

