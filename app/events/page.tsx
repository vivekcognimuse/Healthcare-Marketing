import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

export default function EventsIndex() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: "var(--header-height)" }}>
      <Header />
     
    

      {/* Hero + content grid (left column sized to card width) */}
      <section className="">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,900px)_1fr] gap-8">
            <div>
              <div className="py-12 pt-8">
                <h1 className="typography-h2 font-bold text-black">Workshops That Inspire Growth</h1>
                <p className="typography-p2 text-gray-700 mt-2">Expert-led seminars designed to sharpen your skills and expand your perspective.</p>
              </div>

              <h2 className="typography-h3 font-bold mb-4">Upcoming Events</h2>

              {events.length > 0 && (
                <div className="mb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
                  <EventCard event={events[0]} />
                </div>
              )}

              <div className="space-y-4">
                {events.slice(1).map((event) => (
                  <div key={event.id} className="mb-4">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

     
      <Footer />
    </div>
  );
}

