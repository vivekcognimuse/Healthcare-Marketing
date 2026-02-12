import React from "react";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

interface DetailItem {
  icon?: any;
  label: string;
  value: string;
}

const defaultDetails: DetailItem[] = [
  { icon: CalendarDays, label: "Date", value: "Saturday, March 15, 2026" },
  { icon: Clock, label: "Time", value: "9:00 AM – 1:00 PM (GMT+1)" },
  { icon: MapPin, label: "Location", value: "The Garden Hall, 24 Bloom Street, Stockholm" },
  { icon: Users, label: "Capacity", value: "40 seats — intimate & interactive" },
];

const EventDetails: React.FC<{ details?: DetailItem[] }> = ({ details = defaultDetails }) => {
  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-8">
        <div
          className="rounded-xl border border-gray-800 p-6 md:p-8 shadow-sm"
          style={{ background: "linear-gradient(90deg, #001B57 0%, #0D3796 50%, #155DFC 100%)" }}
        >
          <h2 className="mb-6 typography-h3 font-semibold text-white">When & Where</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {details.map((item) => (
              <div key={item.label} className="flex items-center gap-6 group w-full">
                <div className="mt-0 flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  {item.icon && <item.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="typography-footnote text-white/80">{item.label}</p>
                  <p className="typography-p2 text-white font-medium">{item.value}</p>
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

