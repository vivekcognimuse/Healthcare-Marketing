import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

export default function EventsIndex() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: "var(--header-height)" }}>
      <Header />
     
    

      {/* Hero + Events */}
      <section className="">
        <div className="container">
          <div className="py-12 pt-8">
            <h1 className="typography-h2 font-bold text-black">Workshops That Inspire Growth</h1>
            <p
              className="typography-h3 mt-2"
              style={{ fontWeight: 500, letterSpacing: "2%" }}
            >
              Expert-led seminars designed to sharpen your skills and expand your perspective.
            </p>
          </div>

          <h2 className="typography-h3 font-bold mb-4">Upcoming Events</h2>

          {events.length > 0 && (
            <div className="mb-8">
              <EventCard event={events[0]} />
            </div>
          )}

          <div className="space-y-6">
            {events.slice(1).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

     
      <Footer />
    </div>
  );
}

