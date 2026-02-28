import React from "react";
import { CalendarDays, Clock, Video, IndianRupee, Users } from "lucide-react";

interface QuickEventInfoProps {
  title?: string;
  date?: string;
  time?: string;
  platform?: string;
  fee?: number;
  attendees?: number;
  tag?: string;
}

const QuickEventInfo: React.FC<QuickEventInfoProps> = ({
  title,
  date,
  time,
  platform,
  fee = 0,
  attendees = 0,
  tag = "WEBINAR",
}) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Tag */}
      {tag && (
        <div className="mb-4 inline-block">
          <span 
            className="px-4 py-2 text-white text-xs font-bold tracking-wide rounded-full"
            style={{ 
              backgroundColor: "#EF7438",
              borderBottom: "1px solid #373737"
            }}
          >
            {tag}
          </span>
        </div>
      )}

      {/* Title */}
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-[#1E1E1E] mb-6">
          {title}
        </h2>
      )}

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Date */}
        {date && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-5 h-5 text-[#1E1E1E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</p>
              <p className="text-sm font-bold text-[#1E1E1E]">{date}</p>
            </div>
          </div>
        )}

        {/* Time */}
        {time && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#1E1E1E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Time</p>
              <p className="text-sm font-bold text-[#1E1E1E]">{time}</p>
            </div>
          </div>
        )}

        {/* Platform */}
        {platform && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5 text-[#1E1E1E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Platform</p>
              <p className="text-sm font-bold text-[#1E1E1E]">{platform}</p>
            </div>
          </div>
        )}

        {/* Fee */}
        {fee !== undefined && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center flex-shrink-0">
              <IndianRupee className="w-5 h-5 text-[#1E1E1E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Fee</p>
              <p className="text-sm font-bold text-[#1E1E1E]">
                {fee === 0 ? "Free" : `₹${fee}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Social Proof - Attendees */}
      {attendees > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Users className="w-4 h-4 text-[#155DFC]" />
          <p className="text-sm text-gray-700">
            <span className="font-bold text-[#155DFC]">{attendees}+</span> professionals already registered
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickEventInfo;
