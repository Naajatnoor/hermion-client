
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import EventCard, {
  type EventData,
} from "./EventCard";

interface UpcomingEventsProps {
  limit?: number;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export default function UpcomingEvents({
  limit = 6,
}: UpcomingEventsProps) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Bangladesh Today's Date
  const getTodayDate = () => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  };

  // Fetch Upcoming Events
  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/createEvent`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch events: ${response.status}`
          );
        }

        const data: EventData[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid event data received.");
        }

        const today = getTodayDate();

        // Only future events
        const upcomingEvents = data.filter((event) => {
          if (!event.eventDate) return false;

          const eventDate = event.eventDate.slice(0, 10);

          return eventDate > today;
        });

        // Sort by nearest date first
        upcomingEvents.sort((a, b) => {
          return (
            a.eventDate.slice(0, 10).localeCompare(
              b.eventDate.slice(0, 10)
            )
          );
        });

        setEvents(upcomingEvents);
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

        console.error("Upcoming Events Error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load upcoming events."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => controller.abort();
  }, []);

  // Show First 6 Nearest Events
  const displayedEvents = events.slice(0, limit);

  return (
    <section className="bg-[#F7F5ED] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">

      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#174C3C]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#174C3C] shadow-sm">
              <Sparkles
                size={15}
                className="text-[#E9A15B]"
              />
              Make an Impact Together
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#26352E] sm:text-4xl lg:text-5xl">
              Upcoming{" "}
              <span className="font-serif font-medium italic text-[#174C3C]">
                Events.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#68766E] sm:text-base">
              Discover meaningful community events, connect
              with passionate people, and be part of something
              positive.
            </p>

          </div>

          {/* Explore All Events */}
          {!loading && !error && events.length > limit && (
            <Link
              href="/upcoming-events"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#174C3C]/20 bg-white px-6 py-3.5 text-sm font-semibold text-[#174C3C] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174C3C] hover:text-white hover:shadow-lg"
            >
              Explore All Events

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}

        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[510px] animate-pulse rounded-2xl border border-[#174C3C]/10 bg-white"
              />
            ))}

          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">

            <p className="font-semibold text-red-500">
              Unable to load upcoming events.
            </p>

            <p className="mt-2 text-sm text-[#68766E]">
              {error}
            </p>

          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[#174C3C]/10 bg-white px-5 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E2EDE5] text-[#174C3C]">
              <Sparkles size={28} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#26352E]">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-sm text-[#68766E]">
              New community events will appear here soon.
            </p>

          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && displayedEvents.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {displayedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}

          </div>
        )}

        {/* Bottom Message */}
        {!loading && !error && events.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">

            <div className="h-1 w-12 rounded-full bg-[#E9A15B]" />

            <p className="text-sm text-[#68766E]">
              Every small action creates a meaningful change.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}
