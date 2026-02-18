import React from "react";
import Image from "next/image";

interface Speaker {
  name?: string;
  title?: string;
  bio?: string;
  photoSrc?: string;
  affiliation?: string;
}

const SpeakerSection: React.FC<{ speaker?: Speaker; variant?: "standalone" | "embedded"; theme?: "light" | "dark" }> = ({
  speaker,
  variant = "standalone",
  theme = "light",
}) => {
  const defaultSpeaker: Required<Speaker> = {
    name: "Dr. Elena Marsh",
    title: "Leadership Coach & Organizational Psychologist",
    affiliation: "Manipal College of Health Professions.",
    bio:
      "With over 15 years of experience guiding Fortune 500 executives and startup founders alike, Elena combines research-backed frameworks with warmth and humor.",
    photoSrc: "/assets/dr saha.png",
  };
  const s = { ...defaultSpeaker, ...(speaker || {}) };
  const isEmbedded = variant === "embedded";
  const isDark = theme === "dark";
  return (
    <section className={isEmbedded ? "py-0" : "py-6 md:py-8"}>
      <div className={isEmbedded ? "mx-auto" : "mx-auto max-w-3xl px-4 sm:px-6 2xl:max-w-5xl"}>
        <h2 className={`mb-8 typography-h3 font-semibold ${isDark ? "text-white" : "text-[#1E1E1E]"}`} style={{ letterSpacing: '0.03em', lineHeight: '1.25' }}>
          Meet Your Speaker
        </h2>
        <div
          className={`rounded-xl
          `}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] items-stretch gap-6 lg:gap-8">
            <div className="flex flex-col justify-between">
              <div>
                <p className={`typography-p2 font-semibold ${isDark ? "text-white" : "text-[#1E1E1E]"}`} >
                  {s.name}
                </p>
                <p className={`mt-1 typography-p2 ${isDark ? "text-white/70" : "text-[#1E1E1E]/70"}`}>
                  {s.title}
                </p>
                <p className={`mt-1 typography-p2 ${isDark ? "text-white/60" : "text-[#1E1E1E]/60"}`}>
                  {s.affiliation}
                </p>
              </div>
              <p className={`mt-4 typography-footnote ${isDark ? "text-white/70" : "text-[#1E1E1E]/70"}`}>
                {s.bio}
              </p>
            </div>

            <div className="relative w-full overflow-hidden rounded-lg lg:h-full min-h-[220px]" style={{ boxShadow: '0px 4px 15.2px 0px #00000040' }}>
              <Image
              unoptimized
              src={s.photoSrc || "/placeholder.svg"}
              alt={s.name || "Speaker"}
              fill
              className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerSection;

