"use client";

import { useState } from "react";
import AgendaSection from "./AgendaSection";
import SpeakerSection from "./SpeakerSection";

interface EventTabsProps {
  takeaways?: string[];
  agenda?: { time: string; title: string; desc?: string }[];
  description?: string;
  speaker: { name?: string; title?: string; bio?: string; photoSrc?: string; affiliation?: string };
  theme?: "light" | "dark";
}

const EventTabs: React.FC<EventTabsProps> = ({ takeaways, agenda, description, speaker, theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-4 ${isDark ? "border-b border-white/20" : "border-b border-[#1E1E1E]/10"}`}
        role="tablist"
        aria-label="Event details"
      >
        <div
          className={`typography-h2 pb-2 font-semibold text-[#1E1E1E]`}
        >
          Description
        </div>
      </div>

      <div className={isDark ? "pt-6" : "pt-6"}>
        <div id="event-tab-description" role="tabpanel">
          <p className={`typography-p1 text-[#1E1E1E]/70 pb-8`} style={{ fontFamily: "'TT Commons Pro', sans-serif" }}>{description}</p>
          <AgendaSection takeaways={takeaways} agenda={agenda} variant="embedded" theme={theme} />
          <div className="mt-12">
            <SpeakerSection speaker={speaker} variant="embedded" theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTabs;
