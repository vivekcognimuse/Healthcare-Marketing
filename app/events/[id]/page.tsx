import Header from "@/components/Header";
import EventsFooter from "@/components/event-horizon/EventsFooter";
import HeroSection from "@/components/event-horizon/HeroSection";
import EventDetails from "@/components/event-horizon/EventDetails";
import CTASection from "@/components/event-horizon/CTASection";
import EventTabs from "@/components/event-horizon/EventTabs";
import { CalendarDays, Clock, Video, IndianRupee } from "lucide-react";
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
    { icon: Video, label: "Google Meet", value: event.Platform },
    { icon: IndianRupee, label: "Fee", value: `Rs.${event.ticketPrice}` },
 
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCF4E1] text-[#1E1E1E]" style={{ paddingTop: "var(--header-height)" }}>
        <HeroSection
          imageSrc={event.imageUrl || "/placeholder.svg"}
          alt={event.title}
        />

        <section className=" text-[#1E1E1E]">
          <div className="container mx-auto max-w-7xl px-6 md:px-8 pt-8 pb-12">
            <div className="mt-0">
              <EventDetails 
                details={details} 
                variant="inline" 
                theme="light"
                tag={event.tagline || "WEBINAR"}
                title={event.title}
              />
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
              <div className="max-w-6xl">
                <EventTabs
                  takeaways={event.takeaways}
                  agenda={event.agenda}
                  description={event.description}
                  speaker={{
                    name: event.speaker.name,
                    title: event.speaker.role,
                    photoSrc: event.speaker.photoSrc,
                    bio: event.speaker.bio,
                    affiliation: event.speaker.affiliation,
                  }}
                  theme="light"
                />
              </div>

              <aside className="lg:sticky lg:top-24">
                <div>
                  <h3 className="typography-h2 font-semibold text-[#1E1E1E]">Book your slot</h3>
                  <div className="h-px bg-[#1E1E1E]/10 mt-2" />
     
                  <div className="pt-6">
                    <CTASection
                      cta={event.cta}
                      eventId={event.id}
                      ticketPrice={event.ticketPrice}
                      currency={event.currency}
                      variant="sidebar"
                      theme="light"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <EventsFooter />
    </>
  );
}

