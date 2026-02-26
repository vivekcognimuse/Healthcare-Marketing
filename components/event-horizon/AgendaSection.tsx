import React from "react";

const defaultTakeaways = [
  "Discover your personal leadership style through guided self-reflection",
  "Learn 3 practical frameworks for mindful decision-making",
  "Build stronger team trust with active listening techniques",
  "Create a 30-day action plan you can start using Monday morning",
  "Network with like-minded professionals in a relaxed setting",
];

const defaultAgenda = [
  { time: "9:00 AM", title: "Welcome & Warm-Up", desc: "Coffee, introductions, and setting intentions" },
  { time: "9:30 AM", title: "Keynote: Leading with Presence", desc: "Understanding the science behind mindful leadership" },
  { time: "10:30 AM", title: "Interactive Workshop", desc: "Hands-on exercises in small groups" },
  { time: "11:30 AM", title: "Coffee Break & Networking" },
  { time: "12:00 PM", title: "Action Planning Session", desc: "Build your personal 30-day leadership plan" },
  { time: "12:45 PM", title: "Closing & Q&A" },
];

const AgendaSection: React.FC<{
  takeaways?: string[];
  agenda?: { time: string; title: string; desc?: string }[];
  variant?: "standalone" | "embedded";
}> = ({
  takeaways = defaultTakeaways,
  agenda = defaultAgenda,
  variant = "standalone",
}) => {
  const isEmbedded = variant === "embedded";
  return (
    <section
      className={
        isEmbedded
          ? "py-0"
          : "py-8 md:py-10 mx-6 px-6 rounded-lg bg-gray-100"
      }
    >
      <div className={isEmbedded ? "mx-auto" : "mx-auto max-w-3xl"}>
        <h2 className="mb-6 typography-h3 !font-semibold text-[#1E1E1E]">What You'll Walk Away With</h2>
        <ul className="mb-12 space-y-3">
          {takeaways.map((item, i) => {
            const parts = item.split(/:\s*/, 2);
            const lead = parts.length > 1 ? parts[0] + ':' : null;
            const rest = parts.length > 1 ? parts[1] : item;
            return (
              <li key={i} className="flex items-start gap-3">
                <span className="typography-p2 text-[#1E1E1E]">
                  {lead ? <strong className="font-semibold mr-1 text-[#1E1E1E]">{lead}</strong> : null}
                    <div className="text-[#1E1E1E]/70">{rest}</div>
                </span>
              </li>
            );
          })}
        </ul>

        <h2 className="mb-6 typography-h3 !font-semibold text-[#1E1E1E]">Agenda</h2>
        <div className="space-y-0">
          {agenda.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="relative flex flex-col items-center shrink-0">
                <div className="h-2.5 w-2.5 rounded-full bg-[#1E1E1E]" />
                {i < agenda.length - 1 && (
                  <div className="w-px flex-1 bg-[#1E1E1E]/30" style={{ minHeight: "72px" }} />
                )}
              </div>
              <div className="flex-1">
                <p className={`typography-p2 font-semibold text-[#1E1E1E]`} style={{fontWeight: 600}}>{item.time}</p>
                <p className="typography-p2 text-[#1E1E1E]/70">{item.title}</p>
                {item.desc && <p className="typography-p2 mt-1 text-[#1E1E1E]/60">{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;

