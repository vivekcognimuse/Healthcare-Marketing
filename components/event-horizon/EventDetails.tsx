import React from "react";
import { CalendarDays, Clock, Video, IndianRupee } from "lucide-react";

interface DetailItem {
  icon?: any;
  label: string;
  value: string;
}

const defaultDetails: DetailItem[] = [
  { icon: CalendarDays, label: "Date", value: "Saturday, March 15, 2026" },
  { icon: Clock, label: "Time", value: "9:00 AM – 1:00 PM (GMT+1)" },
  { icon: Video, label: "Google Meet", value: "The Garden Hall, 24 Bloom Street, Stockholm" },
  { icon: IndianRupee, label: "Fee", value: "Rs.249" },
];

const EventDetails: React.FC<{
  details?: DetailItem[];
  variant?: "card" | "inline";
  theme?: "light" | "dark";
  tag?: string;
  title?: string;
}> = ({
  details = defaultDetails,
  variant = "card",
  theme = "light",
  tag,
  title,
}) => {
  const isInline = variant === "inline";
  const isDark = theme === "dark";
  return (
    <section className={isInline ? "py-0" : "py-8 md:py-10"}>
      <div className={isInline ? "" : "mx-auto max-w-6xl px-8"}>
        {/* Tag and Title Section */}
        {(tag || title) && (
          <div className="mb-16 space-y-4">
            {tag && (
                <div className="inline-block mb-6">
                <span 
                  className="px-6 py-2 text-white text-sm font-medium tracking-wide"
                  style={{ 
                  fontFamily: "'Anonymous Pro', monospace",
                  backgroundColor: "#EF7438",
                  borderRadius: "100px",
                  padding: "8px 24px",
                  borderBottom: "1px solid #373737"
                  }}
                >
                  {tag}
                </span>
              </div>
            )}
            {title && (
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-normal leading-tight ${isDark ? "text-white" : "text-[#1E1E1E]"}`}
                style={{ 
                  fontFamily: "'PP Editorial New', serif",
                  letterSpacing: "-0.02em"
                }}
              >
                {title}
              </h1>
            )}
          </div>
        )}

        {/* Event Details */}
        <div
          className={
            isInline
              ? ""
              : `rounded-xl p-6 md:p-8 shadow-sm ${
                  isDark ? "border border-white/10 bg-transparent" : "border border-gray-200 bg-[#FAFAFA]"
                }`
          }
        >
       
          <div className={`grid sm:grid-cols-2 lg:flex lg:justify-between lg:gap-8`}>
            {details.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[#1E1E1E]
                  }`}
                >
                  {item.icon && <item.icon className={`h-6 w-6 text-[#1E1E1E]`} />}
                </div>
                <div className="flex-1">
                  <p className={`typography-p1  text-black `} style={{ fontFamily: "'TT Commons Pro', sans-serif", fontWeight: 600 }}>{item.label}</p>
                  <p className={`typography-p2 text-black/70`} style={{ fontFamily: "'TT Commons Pro', sans-serif" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

