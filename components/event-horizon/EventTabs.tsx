"use client";

import { useState } from "react";
import AgendaSection from "./AgendaSection";
import SpeakerSection from "./SpeakerSection";

interface EventTabsProps {
  takeaways?: string[];
  agenda?: { time: string; title: string; desc?: string }[];
  speaker: { name?: string; title?: string; bio?: string; photoSrc?: string; affiliation?: string };
  theme?: "light" | "dark";
}

const EventTabs: React.FC<EventTabsProps> = ({ takeaways, agenda, speaker, theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-4 ${isDark ? "border-b border-white/20" : "border-b border-[#1E1E1E]/10"}`}
        role="tablist"
        aria-label="Event details"
      >
        <div
          className={`typography-p2 px-4 pb-2 font-semibold border-b-2 ${
            isDark ? "text-white border-primary" : "text-primary border-primary"
          }`}
        >
          Description
        </div>
      </div>

      <div className={isDark ? "pt-6" : "pt-6"}>
        <div id="event-tab-description" role="tabpanel">
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
