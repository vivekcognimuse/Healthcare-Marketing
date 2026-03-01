import { Sparkles } from "lucide-react";
import EventsFooter from "@/components/event-horizon/EventsFooter";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

export default function EventsIndex() {
  return (
    <div className="min-h-screen " style={{ paddingTop: "var(--header-height)" }}>


      {/* Hero + Events */}
      <section className="">
        <div className="container">
          <div className="py-12 pt-8">
            <h1 className="typography-h1 !font-normal text-black">Workshops That Inspire Growth</h1>
            <p
              className="typography-h3 !font-medium mt-2"
            >
              Expert-led seminars designed to sharpen your skills and expand your perspective.
            </p>
          </div>

          <h2 className="typography-h3 font-bold mb-4">Upcoming Events</h2>

          {events.length > 0 && (
            <div className="mb-8">
              <EventCard event={events[0]} basePath="events" />
            </div>
          )}

        
        </div>
      </section>

     
      <EventsFooter/>
    </div>
  );
}
