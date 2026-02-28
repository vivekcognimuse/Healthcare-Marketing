'use client';

import { useParams } from "next/navigation";
import { events } from "@/data/events";
import SinglePageRegistration from "@/components/event-horizon/SinglePageRegistration";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WebinarRegisterPage() {
  const params = useParams() as Record<string, string> | null;
  const id = (params?.id as string) ?? '';
  const event = events.find((e) => e.id === id);

  if (!event) {
    return <div className="p-12 text-center">Webinar not found</div>;
  }

  const seatsLeft = (event.seatLimit ?? event.capacity) - event.attendees;

  return (
    <main className="min-h-screen bg-[#FCF4E1]" style={{ paddingTop: "var(--header-height)" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <Link href={`/webinar/${event.id}`} className="inline-flex items-center gap-2 text-[#155DFC] hover:text-[#0F3B7C] font-semibold mb-8 transition">
          <ArrowLeft className="w-4 h-4" />
          Back to Details
        </Link>
        <SinglePageRegistration
          eventId={event.id}
          eventTitle={event.title}
          eventDate={event.date}
          eventTime={event.time}
          platform={event.Platform}
          ticketPrice={event.ticketPrice}
          currency="INR"
          seatsLeft={seatsLeft}
          totalSeats={event.seatLimit ?? event.capacity}
          imageUrl={event.imageUrl}
          meetLink={event.meetLink}
          whatsappLink={event.whatsappLink}
        />
      </div>
    </main>
  );
}
