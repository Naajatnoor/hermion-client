
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import EventCard, { type EventData } from "../../components/events/EventCard";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

// Bangladesh today's date
const getTodayDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

export default function AllEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch only past events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/createEvent`);

        if (!res.ok) {
          throw new Error("Failed to load events.");
        }

        const data: EventData[] = await res.json();

        const today = getTodayDate();

        // Show only events before today's date
        const pastEvents = data
          .filter((event) => {
            const eventDate = event.eventDate.slice(0, 10);
            return eventDate < today;
          })
          // Latest past event first
          .sort((a, b) => {
            return (
              new Date(b.eventDate).getTime() -
              new Date(a.eventDate).getTime()
            );
          });

        setEvents(pastEvents);
      } catch (err) {
        console.error("Event fetching error:", err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate scroll amount
  const getScrollAmount = () => {
    const track = carouselRef.current;

    if (!track) return 380;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 350;

    return cardWidth + 28;
  };

  // Previous and Next buttons
  const scrollCarousel = (direction: "next" | "prev") => {
    const track = carouselRef.current;

    if (!track) return;

    const scrollAmount = getScrollAmount();

    if (direction === "next") {
      const isAtEnd =
        track.scrollLeft + track.clientWidth >=
        track.scrollWidth - 20;

      track.scrollTo({
        left: isAtEnd ? 0 : track.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    } else {
      const isAtStart = track.scrollLeft <= 10;

      track.scrollTo({
        left: isAtStart
          ? track.scrollWidth
          : track.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto sliding
  useEffect(() => {
    if (events.length < 2 || loading || isPaused) return;

    const interval = setInterval(() => {
      const track = carouselRef.current;

      if (!track) return;

      const scrollAmount = getScrollAmount();

      const isAtEnd =
        track.scrollLeft + track.clientWidth >=
        track.scrollWidth - 20;

      track.scrollTo({
        left: isAtEnd ? 0 : track.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [events.length, loading, isPaused]);

  return (
    <section
      id="events"
      className="bg-[#F7F5ED] px-4 py-2 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8EFE8] px-4 py-2 text-sm font-medium text-[#174C3C]">
              <Sparkles size={16} />
              Our Community Memories
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#26352E] sm:text-4xl lg:text-5xl">
              Past{" "}
              <span className="text-[#174C3C]">Events</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68766E] sm:text-base">
              Take a look back at the wonderful events and
              memorable moments we've shared together.
            </p>
          </div>

          {/* Navigation Buttons */}
          {events.length > 1 && !loading && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollCarousel("prev")}
                aria-label="Previous events"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#174C3C]/20 bg-white text-[#174C3C] shadow-sm transition hover:bg-[#174C3C] hover:text-white"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={() => scrollCarousel("next")}
                aria-label="Next events"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#174C3C]/20 bg-white text-[#174C3C] shadow-sm transition hover:bg-[#174C3C] hover:text-white"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex gap-7 overflow-hidden pb-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[480px] w-[85%] shrink-0 animate-pulse rounded-2xl bg-white shadow-sm sm:w-[360px]"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
            <p className="text-red-600">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#174C3C] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#12392E]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[#174C3C]/10 bg-white px-6 py-16 text-center">
            <Sparkles
              size={36}
              className="mx-auto mb-4 text-[#174C3C]"
            />

            <h3 className="text-xl font-semibold text-[#26352E]">
              No Past Events Yet
            </h3>

            <p className="mt-2 text-sm text-[#68766E]">
              Our past events and memories will appear here.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12392E]"
            >
              Explore Upcoming Events
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Past Events Carousel */}
        {!loading && !error && events.length > 0 && (
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {events.map((event) => (
              <div
                key={event._id}
                className="relative w-[85%] shrink-0 snap-start sm:w-[360px] lg:w-[380px]"
              >
                <span className="absolute right-3 top-3 z-10 rounded-full bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-md">
                  Past Event
                </span>

                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {!loading && !error && events.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#174C3C]/10 pt-8 sm:flex-row">
            <p className="text-sm text-[#68766E]">
              Showing {events.length} past community events
            </p>

            <Link
              href="/upcoming-events"
              className="group inline-flex items-center gap-2 rounded-full border border-[#174C3C]/20 px-6 py-3 text-sm font-semibold text-[#174C3C] transition hover:bg-[#174C3C] hover:text-white"
            >
              Explore Upcoming Events
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
