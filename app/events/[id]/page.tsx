'use client';

import EventsFooter from "@/components/event-horizon/EventsFooter";
import { CalendarDays, Clock, Video, Users, CheckCircle2, Share2, Copy } from "lucide-react";
import { events } from "@/data/events";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EventPage() {
  const params = useParams() as Record<string, string> | null;
  const id = (params?.id as string) ?? '';
  const event = events.find((e) => e.id === id);
  const [showShareModal, setShowShareModal] = useState(false);

  if (!event) {
    return <div className="p-12 text-center">Event not found</div>;
  }

  const seatsLeft = (event.seatLimit ?? event.capacity) - event.attendees;

  const shareEvent = (platform: 'linkedin' | 'whatsapp' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = `Check out this event: ${event.title}`;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  return (
    <main className="min-h-screen bg-[#FCF4E1] pt-16 md:pt-20">
      {/* PAGE HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center">
          <h1 className="typography-h1 !font-normal ">
            {event.title}
          </h1>
       
        </div>
      </section>

      {/* HERO SECTION - Premium Clean Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">
        {/* Share Button - Top Right */}
        <div className="flex justify-end ">
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 hover:border-[#155DFC] text-gray-700 hover:text-[#155DFC] rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md touch-manipulation"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Event</span>
          </button>
        </div>

        {/* Main Grid: Left Hero Card + Right Content */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
          {/* LEFT COLUMN - STICKY HERO CARD */}
          <div className="lg:sticky lg:top-24 h-fit order-2 lg:order-1">
            <div className="relative">
              {/* Decorative gradient background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#155DFC] via-[#EF7438] to-[#155DFC] rounded-3xl blur opacity-20"></div>
              
              {/* Hero Card */}
              <div className="relative bg-gradient-to-br from-[#0F3B7C] to-[#1B5FD4] rounded-2xl shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wide">
                      <Video className="w-3.5 h-3.5" />
                      {event.tagline || "LIVE EVENT"}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {event.title}
                  </h2>
                </div>

                {/* Event Image */}
                {event.imageUrl && (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B7C]/55 via-[#0F3B7C]/20 to-transparent"></div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 space-y-6">
                  {/* Date & Time */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                      <CalendarDays className="w-5 h-5 text-white flex-shrink-0" />
                      <div>
                        <p className="text-white/70 text-xs font-medium uppercase tracking-wide mb-0.5">Date & Time</p>
                        <p className="text-white font-bold text-sm">{event.date}</p>
                        <p className="text-white font-bold text-sm">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                      <Video className="w-5 h-5 text-white flex-shrink-0" />
                      <div>
                        <p className="text-white/70 text-xs font-medium uppercase tracking-wide mb-0.5">Platform</p>
                        <p className="text-white font-bold text-sm">{event.Platform}</p>
                      </div>
                    </div>
                  </div>

                  {/* Instructor - Compact */}
                  {event.speaker && (
                    <div className="space-y-3 pt-3 border-t border-white/20">
                      <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Instructor</p>
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-white/30 shadow-sm">
                            <img
                              src={event.speaker.photoSrc || "/assets/events/profile.png"}
                              alt={event.speaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>    
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#EF7438] rounded-full border-2 border-[#0F3B7C] flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-sm">{event.speaker.name}</h4>
                          <p className="text-white/80 text-xs">{event.speaker.role}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price Section */}
                  <div className="pt-3 border-t border-white/20 space-y-3">
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Price</p>
                    <div className="flex items-baseline justify-between">
                      <p className="text-4xl font-bold text-white">
                        {event.ticketPrice && event.ticketPrice > 0 ? `₹${event.ticketPrice}` : 'FREE'}
                      </p>
                   
                    </div>
                  </div>

                  {/* Seats Left Alert - Compact */}
                  {seatsLeft <= 10 && (
                    <div className="p-3 rounded-lg bg-[#EF7438]/20 border border-[#EF7438]/30">
                      <p className="text-[#EF7438] text-xs font-bold">Only {seatsLeft} seats left!</p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={`/events/${event.id}/register`}
                    className="block w-full"
                  >
                    <button className="w-full bg-gradient-to-r from-[#EF7438] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#EF7438] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 touch-manipulation text-lg">
                      Register Now
                      <span className="ml-2">→</span>
                    </button>
                  </Link>

                  {/* WhatsApp Link */}
                  {event.whatsappLink && (
                    <a
                      href={event.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium text-sm leading-none py-3 px-6 rounded-xl transition-all touch-manipulation flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        Join WhatsApp Community
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - CONTENT */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#155DFC] to-[#EF7438] rounded-full"></div>
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
            </div>

            {/* Benefits Section */}
            {event.benefits && event.benefits.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#155DFC] to-[#EF7438] rounded-full"></div>
                  What You'll Get
                </h3>
                <div className="space-y-3">
                  {event.benefits.slice(0, 6).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-[#155DFC] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda Section */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#155DFC] to-[#EF7438] rounded-full"></div>
                  Agenda
                </h3>
                <div className="space-y-3 bg-white rounded-xl p-6 border border-gray-100">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 last:pb-0 last:border-0 border-b border-gray-100">
                      <span className="text-sm font-bold text-[#155DFC] bg-[#155DFC]/10 px-3 py-1 rounded-lg flex-shrink-0 h-fit">
                        {item.time}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        {item.desc && <p className="text-sm text-gray-600 mt-1">{item.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Share Modal - Premium Design */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#155DFC] to-[#EF7438] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <Share2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Share This Event</h3>
              <p className="text-xs sm:text-sm text-gray-600">Help others discover this amazing opportunity</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => shareEvent('linkedin')}
                className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-[#0077B5] hover:bg-[#0077B5]/5 hover:shadow-lg transition-all duration-300 touch-manipulation"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0077B5]/10 group-hover:bg-[#0077B5]/20 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="#0077B5" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#0077B5] transition-colors">LinkedIn</span>
              </button>
              <button
                onClick={() => shareEvent('whatsapp')}
                className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-[#25D366] hover:bg-[#25D366]/5 hover:shadow-lg transition-all duration-300 touch-manipulation"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#25D366]/10 group-hover:bg-[#25D366]/20 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#25D366] transition-colors">WhatsApp</span>
              </button>
              <button
                onClick={() => shareEvent('twitter')}
                className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/5 hover:shadow-lg transition-all duration-300 touch-manipulation"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1DA1F2]/10 group-hover:bg-[#1DA1F2]/20 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="#1DA1F2" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#1DA1F2] transition-colors">Twitter</span>
              </button>
              <button
                onClick={() => shareEvent('copy')}
                className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-[#EF7438] hover:bg-[#EF7438]/5 hover:shadow-lg transition-all duration-300 touch-manipulation"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EF7438]/10 group-hover:bg-[#EF7438]/20 flex items-center justify-center transition-colors">
                  <Copy className="w-6 h-6 sm:w-7 sm:h-7 text-[#EF7438]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#EF7438] transition-colors">Copy Link</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-6 sm:mt-8 w-full bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 font-semibold py-3 sm:py-3.5 rounded-xl transition-all hover:shadow-md touch-manipulation"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <EventsFooter />
    </main>
  );
}
