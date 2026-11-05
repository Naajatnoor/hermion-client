
import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Mail,
} from "lucide-react";

export interface EventData {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  creatorEmail: string;
}

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(
    `${event.eventDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#174C3C]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#174C3C]/20 hover:shadow-xl hover:shadow-[#174C3C]/10">

      {/* Event Image */}
      <div className="relative h-56 shrink-0 overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142D23]/50 via-transparent to-transparent" />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#174C3C] shadow-sm backdrop-blur-sm">
          {event.eventType}
        </span>

        {/* Event Date on Image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#142D23]/85 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
          <CalendarDays size={14} className="text-[#8DD1B5]" />
          {formattedDate}
        </div>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Event Title */}
        <h2 className="line-clamp-1 text-xl font-bold text-[#26352E] transition-colors duration-300 group-hover:text-[#174C3C]">
          {event.title}
        </h2>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-[#68766E]">
          <MapPin
            size={17}
            className="shrink-0 text-[#82A99A]"
          />

          <span className="line-clamp-1">
            {event.location}
          </span>
        </div>

        {/* Event Description */}
        <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-[#718078]">
          {event.description || "No description available for this event."}
        </p>

        {/* Organizer Email */}
        <div className="mt-4 flex items-center gap-2 border-t border-[#E8ECE8] pt-4">
          <Mail
            size={17}
            className="shrink-0 text-[#82A99A]"
          />

          <span
            className="truncate text-sm text-[#68766E]"
            title={event.creatorEmail}
          >
            {event.creatorEmail || "Organizer email unavailable"}
          </span>
        </div>

        {/* View Event Button */}
        <Link
          href={`/event-details/${event._id}`}
          className="group/button mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:shadow-[#159B89]/20"
        >
          View Event

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover/button:translate-x-1"
          />
        </Link>

      </div>
    </div>
  );
}
