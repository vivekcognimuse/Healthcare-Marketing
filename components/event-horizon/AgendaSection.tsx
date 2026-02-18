import React from "react";
import { CheckCircle2 } from "lucide-react";

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
  theme?: "light" | "dark";
}> = ({
  takeaways = defaultTakeaways,
  agenda = defaultAgenda,
  variant = "standalone",
  theme = "light",
}) => {
  const isEmbedded = variant === "embedded";
  const isDark = theme === "dark";
  return (
    <section
      className={
        isEmbedded
          ? "py-0"
          : `py-8 md:py-10 mx-6 px-6 rounded-lg ${isDark ? "bg-transparent" : "bg-gray-100"}`
      }
    >
      <div className={isEmbedded ? "mx-auto" : "mx-auto max-w-3xl"}>
        <h2 className={`mb-6 typography-h3 ${isDark ? "text-white" : "text-[#1E1E1E]"}`}>What You'll Walk Away With</h2>
        <ul className="mb-12 space-y-3">
          {takeaways.map((item, i) => {
            const parts = item.split(/:\s*/, 2);
            const lead = parts.length > 1 ? parts[0] + ':' : null;
            const rest = parts.length > 1 ? parts[1] : item;
            return (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${isDark ? "text-white" : "text-primary"}`} />
                <span className={`typography-p2 ${isDark ? "text-white/80" : "text-[#1E1E1E]"}`}>
                  {lead ? <strong className={`font-semibold mr-1 ${isDark ? "text-white" : "text-[#1E1E1E]"}`}>{lead}</strong> : null}
                  {rest}
                </span>
              </li>
            );
          })}
        </ul>

        <h2 className={`mb-6 typography-h3 ${isDark ? "text-white" : "text-[#1E1E1E]"}`}>Agenda</h2>
        <div className="relative space-y-0">
          <div className={`absolute left-[59px] top-2 bottom-2 w-px ${isDark ? "bg-white/15" : "bg-gray-200"} hidden sm:block`} />
          {agenda.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-3">
              <span className={`w-[52px] shrink-0 typography-footnote text-right ${isDark ? "text-white/60" : "text-[#1E1E1E]/60"}`}>{item.time}</span>
              <div className="relative hidden sm:flex items-center justify-center">
                <div className={`h-3 w-3 rounded-full border-2 ${isDark ? "border-white/40 bg-white/10" : "border-primary bg-primary/15"} transition-transform group-hover:scale-125`} />
              </div>
              <div>
                <p className={`typography-p2 ${isDark ? "text-white" : "text-[#1E1E1E]"}`} style={{ fontWeight: 600 }}>{item.title}</p>
                {item.desc && <p className={`typography-p2 mt-0.5 ${isDark ? "text-white/70" : "text-[#1E1E1E]/70"}`}>{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;

