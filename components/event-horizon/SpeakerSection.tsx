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
          className={`rounded-xl p-8 sm:p-8 2xl:p-10 ${
            isDark ? "bg-transparent border border-white/10 shadow-none" : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="relative w-32 sm:w-48 2xl:w-56 aspect-[4/5] rounded-lg overflow-hidden shadow-md">
                <Image unoptimized src={s.photoSrc || "/placeholder.svg"} alt={s.name || "Speaker"} fill className="object-cover" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className={`typography-p1 font-bold ${isDark ? "text-white" : "text-[#1E1E1E]"}`} style={{ letterSpacing: '0.03em', lineHeight: '1.25' }}>
                {s.name}
              </h3>
              <p className={`mt-2 typography-p2 ${isDark ? "text-white/70" : "text-[#1E1E1E]/70"}`} style={{ letterSpacing: '0.03em', lineHeight: '1.5' }}>
                {s.title}
              </p>
              <p className={`mt-1 typography-p2 ${isDark ? "text-white/60" : "text-[#1E1E1E]/60"}`} style={{ letterSpacing: '0.03em', lineHeight: '1.5' }}>
                {s.affiliation}
              </p>
            </div>
          </div>

          <div>
            <p className={`typography-footnote ${isDark ? "text-white/70" : "text-[#1E1E1E]/70"}`} style={{ letterSpacing: '0.05em', lineHeight: '1.5' }}>
              {s.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerSection;

