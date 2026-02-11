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
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 typography-h3 font-semibold text-gray-900">Meet Your Speaker</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-2xl overflow-hidden shadow-md bg-gray-100">
                <Image unoptimized src={s.photoSrc || "/placeholder.svg"} alt={s.name || "Speaker"} fill className="object-cover" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="typography-h4 font-sans text-gray-900">{s.name}</h3>
              <p className="mt-1 typography-p2 text-gray-600">{s.title}</p>
              <p className="mt-1 typography-footnote text-gray-500">{s.affiliation}</p>
              <p className="mt-4 typography-p2 text-gray-700 leading-relaxed">{s.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerSection;

