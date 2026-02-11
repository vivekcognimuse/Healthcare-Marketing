import Link from "next/link";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Event } from "@/data/events";

const EventCard = ({ event }: { event: Event }) => {
  const isFull = event.attendees >= event.capacity;

  return (
    <Link
      href={`/events/${event.id}`}
      aria-label={`Open event: ${event.title}`}
      className="group block rounded-xl border border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 hover:scale-[1.01] transition-transform transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{
        background: "linear-gradient(90deg, #001B57 0%, #0D3796 50%, #155DFC 100%)",
      }}
    >
      <div className="flex gap-0">
        <div className="flex-1 p-6 md:p-8 min-w-0">
          <div className="mb-2">
            <span className="inline-block bg-white/90 text-gray-800 rounded px-3 py-1 text-sm font-medium">
              {event.time}
            </span>
          </div>
          <h3 className="typography-h3 font-semibold text-white leading-snug mb-2 group-hover:text-gray-300 transition-colors">
            {event.title}
          </h3>
          <p className="mt-1 typography-p3 text-gray-400">
            By <span className="text-white font-medium">{event.speaker.name}</span>
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-gray-400">
                {tag}
              </span>
            ))}
          </div>
         
        </div>
          <div className="hidden sm:flex w-[220px] md:w-[260px] shrink-0 items-center justify-center p-4">
          <div className="w-full aspect-[4/5] rounded-lg overflow-hidden relative bg-gray-800/20 border border-white/5">
            <Image
              src={event.cardImageUrl || event.imageUrl || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

