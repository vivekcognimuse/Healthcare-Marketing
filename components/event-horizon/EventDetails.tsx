import React from "react";
import { CalendarDays, Clock, MapPin, Wallet } from "lucide-react";

interface DetailItem {
  icon?: any;
  label: string;
  value: string;
}

const defaultDetails: DetailItem[] = [
  { icon: CalendarDays, label: "Date", value: "Saturday, March 15, 2026" },
  { icon: Clock, label: "Time", value: "9:00 AM – 1:00 PM (GMT+1)" },
  { icon: MapPin, label: "Platform", value: "The Garden Hall, 24 Bloom Street, Stockholm" },
  { icon: Wallet, label: "Fee", value: "₹249" },
];

const EventDetails: React.FC<{
  details?: DetailItem[];
  variant?: "card" | "inline";
  theme?: "light" | "dark";
}> = ({
  details = defaultDetails,
  variant = "card",
  theme = "light",
}) => {
  const isInline = variant === "inline";
  const isDark = theme === "dark";
  return (
    <section className={isInline ? "py-0" : "py-8 md:py-10"}>
      <div className={isInline ? "" : "mx-auto max-w-6xl px-8"}>
        <div
          className={
            isInline
              ? ""
              : `rounded-xl p-6 md:p-8 shadow-sm ${
                  isDark ? "border border-white/10 bg-transparent" : "border border-gray-200 bg-[#FAFAFA]"
                }`
          }
        >
          {!isInline && (
            <h2 className={`mb-6 typography-h3 font-semibold ${isDark ? "text-white" : "text-[#1E1E1E]"}`}>
              When & Where
            </h2>
          )}
          <div className={`grid sm:grid-cols-2 lg:flex lg:justify-between lg:gap-8`}>
            {details.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${
                    isDark ? "border border-white/20 text-white" : "bg-[#155DFC]/10"
                  }`}
                >
                  {item.icon && <item.icon className={`h-6 w-6 ${isDark ? "text-white" : "text-[#155DFC]"}`} />}
                </div>
                <div className="flex-1">
                  <p className={`typography-footnote ${isDark ? "text-white/60" : "text-[#1E1E1E]/60"}`}>{item.label}</p>
                  <p className={`typography-p2 font-semibold leading-snug ${isDark ? "text-white" : "text-[#1E1E1E]"}`}>{item.value}</p>
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

