import React from "react";
import Image from "next/image";

interface Speaker {
  name?: string;
  title?: string;
  bio?: string;
  photoSrc?: string;
  affiliation?: string;
}

const SpeakerSection: React.FC<{ speaker?: Speaker }> = ({ speaker }) => {
  const defaultSpeaker: Required<Speaker> = {
    name: "Dr. Elena Marsh",
    title: "Leadership Coach & Organizational Psychologist",
    affiliation: "Manipal College of Health Professions.",
    bio:
      "With over 15 years of experience guiding Fortune 500 executives and startup founders alike, Elena combines research-backed frameworks with warmth and humor.",
    photoSrc: "/assets/dr saha.png",
  };
  const s = { ...defaultSpeaker, ...(speaker || {}) };
  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 2xl:max-w-5xl">
        <h2 className="mb-8 typography-h3 font-semibold text-gray-900">Meet Your Speaker</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm 2xl:p-10">
          <div className="flex flex-col sm:flex-row items-start gap-6 2xl:gap-10">
            <div className="flex-shrink-0">
              <div className="relative w-32 sm:w-48 2xl:w-56 aspect-[4/5] rounded-lg overflow-hidden shadow-md">
                <Image unoptimized src={s.photoSrc || "/placeholder.svg"} alt={s.name || "Speaker"} fill className="object-cover" />
              </div>
            </div>

            <div className="flex-1 max-w-prose 2xl:max-w-none">
              <h3 className="typography-h3 font-sans text-gray-900">{s.name}</h3>
              <p className="mt-1 typography-p3 text-gray-600">{s.title}</p>
              <p className="mt-1 typography-p20 text-gray-500">{s.affiliation}</p>
              <p className="mt-4 typography-footnote text-gray-700 leading-relaxed">{s.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerSection;

