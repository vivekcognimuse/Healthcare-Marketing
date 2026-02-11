import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/event-horizon/HeroSection";
import EventDetails from "@/components/event-horizon/EventDetails";
import SpeakerSection from "@/components/event-horizon/SpeakerSection";
import AgendaSection from "@/components/event-horizon/AgendaSection";
import CTASection from "@/components/event-horizon/CTASection";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events } from "@/data/events";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) {
    return <div className="p-12">Event not found</div>;
  }

  const details = [
    { icon: CalendarDays, label: "Date", value: event.date },
    { icon: Clock, label: "Time", value: event.time },
    { icon: MapPin, label: "Platform", value: event.location },
    { icon: Users, label: "Fee", value: `₹${event.ticketPrice}` },
 
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900" style={{ paddingTop: "var(--header-height)" }}>
        <HeroSection
          tag={event.tagline || "Event"}
          title={event.title}
          subtitle={event.time}
          imageSrc={event.imageUrl || "/placeholder.svg"}
        />

        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Event description removed per request */}

          <EventDetails details={details} />

          <div className="border-t border-gray-200 my-6" />

          <AgendaSection takeaways={event.takeaways} agenda={event.agenda} />

          <div className="border-t border-gray-200 my-6" />

          <SpeakerSection speaker={{ name: event.speaker.name, title: event.speaker.role, photoSrc: event.speaker.photoSrc, bio: event.speaker.bio }} />

          <div className="border-t border-gray-200 my-6" />

          <CTASection cta={event.cta} eventId={event.id} ticketPrice={event.ticketPrice} currency={event.currency} />
        </div>
      </main>
      <Footer />
    </>
  );
}

