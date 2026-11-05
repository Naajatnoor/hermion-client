

// import React from "react";

// const API_URL = (
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// ).replace(/\/+$/, "");

// const Page = async () => {
//   try {
//     const res = await fetch(`${API_URL}/createEvent`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch events: ${res.status}`);
//     }

//     const events = await res.json();

//     console.log("Events:", events);

//     return (
//       <div>
//         <h1>All Upcoming Events</h1>

//         <pre>{JSON.stringify(events, null, 2)}</pre>
//       </div>
//     );
//   } catch (error) {
//     console.error("Fetch Error:", error);

//     return (
//       <div>
//         <h1>Unable to load events.</h1>
//       </div>
//     );
//   }
// };

// export default Page;



"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Search,
  Plus,
  CalendarDays,
  Sparkles,
  HeartHandshake,
  X,
} from "lucide-react";

import EventCard, {
  type EventData,
} from "../../components/events/EventCard";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Get Today's Date in Bangladesh
  const getTodayDate = () => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  };

  // Fetch Events
  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/createEvent`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch events. Status: ${response.status}`
          );
        }

        const data: EventData[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid event data received from server.");
        }

        const today = getTodayDate();

        // Filter only upcoming events
        const upcomingEvents = data.filter((event) => {
          if (!event.eventDate) return false;

          // Supports YYYY-MM-DD and ISO date strings
          const eventDate = event.eventDate.slice(0, 10);

          return eventDate > today;
        });

        // Sort events by nearest date
        upcomingEvents.sort((a, b) => {
          return (
            a.eventDate.slice(0, 10).localeCompare(
              b.eventDate.slice(0, 10)
            )
          );
        });

        setEvents(upcomingEvents);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
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

  // Search and Category Filtering
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" ||
        event.eventType?.toLowerCase() ===
          activeCategory.toLowerCase();

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        event.title?.toLowerCase().includes(search) ||
        event.location?.toLowerCase().includes(search) ||
        event.description?.toLowerCase().includes(search) ||
        event.eventType?.toLowerCase().includes(search) ||
        event.creatorEmail?.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, searchTerm]);

  return (
    <main className="min-h-screen bg-[#F7F8F5]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#123D32]">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#E9A15B]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">

          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Hero Content */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider text-[#D5E9DD]">
                <Sparkles
                  size={14}
                  className="text-[#E9A15B]"
                />

                COMMUNITY • CONNECTION • CHANGE
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover Events.
                <br />

                <span className="font-serif font-medium italic text-[#E9B77E]">
                  Create Real Change.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#D0DED7] sm:text-base">
                Explore meaningful community initiatives, connect
                with inspiring people, and turn your good intentions
                into positive action.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <a
                  href="#explore-events"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E9A15B] px-6 py-3.5 text-sm font-bold text-[#26352E] transition hover:-translate-y-1 hover:bg-[#F3B879]"
                >
                  Explore Events
                  <ArrowRight size={17} />
                </a>

                <Link
                  href="/create-event"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Plus size={17} />
                  Create Event
                </Link>

              </div>
            </div>

            {/* Hero Information Card */}
            <div className="relative mx-auto w-full max-w-sm lg:ml-auto">

              <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9A15B]/15 text-[#E9B77E]">
                  <HeartHandshake size={30} />
                </div>

                <p className="mt-7 text-sm font-medium text-[#C5D8CE]">
                  Make every moment count
                </p>

                <h2 className="mt-2 text-3xl font-bold leading-tight text-white">
                  Your community.
                  <br />
                  Your impact.
                </h2>

                <div className="my-6 h-px bg-white/15" />

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-3xl font-bold text-[#E9B77E]">
                      {loading ? "..." : events.length}
                    </p>

                    <p className="mt-1 text-xs text-[#b2bab6]">
                      Upcoming events
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#E9B77E]">
                    <CalendarDays size={23} />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section
        id="explore-events"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >

        {/* Section Heading */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B47A42]">
              <CalendarDays size={15} />
              Find Your Opportunity
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#104e31] sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-[#718078]">
              Find a cause you care about and become part of
              something meaningful.
            </p>

          </div>

          <p className="text-sm font-medium text-[#68766E]">
            <span className="font-bold text-[#174C3C]">
              {loading ? "..." : filteredEvents.length}
            </span>{" "}
            events available
          </p>

        </div>

        {/* ================= FILTER & SEARCH ================= */}
        <div className="mb-9 rounded-2xl border border-[#E5EAE4] bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-5">

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">

              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                      active
                        ? "bg-[#174C3C] text-white shadow-md shadow-[#174C3C]/15"
                        : "border border-[#E7ECE7] bg-[#FAFBF9] text-[#68766E] hover:border-[#174C3C]/30 hover:text-[#174C3C]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}

            </div>

            {/* Search Bar */}
            <div className="relative w-full">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9990]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by event name, category or location..."
                className="w-full rounded-xl border border-[#E5EAE4] bg-[#FAFBF9] py-3.5 pl-11 pr-10 text-sm text-[#26352E] outline-none transition placeholder:text-[#A0AAA3] focus:border-[#174C3C] focus:ring-2 focus:ring-[#174C3C]/10"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-900 text-[#8A9990] hover:text-[#174C3C]"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}

            </div>
          </div>
        </div>

        {/* ================= LOADING STATE ================= */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[510px] animate-pulse rounded-2xl border border-[#E5EAE4] bg-white"
              />
            ))}

          </div>
        )}

        {/* ================= ERROR STATE ================= */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <CalendarDays size={25} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#26352E]">
              Unable to Load Events
            </h3>

            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>

            <p className="mt-2 text-sm text-[#718078]">
              Please check your connection and refresh the page.
            </p>

          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && !error && filteredEvents.length === 0 && (

          <div className="rounded-3xl border border-dashed border-[#D8E2D9] bg-white px-5 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7F0E8] text-[#174C3C]">
              <Search size={28} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#26352E]">
              No Events Found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#718078]">
              {events.length === 0
                ? "There are currently no upcoming events. Check back soon!"
                : "Try another category or search using a different keyword."}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="mt-6 rounded-full bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10392D]"
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* ================= EVENT CARDS ================= */}
        {!loading && !error && filteredEvents.length > 0 && (

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}

          </div>
        )}

        {/* ================= BOTTOM CTA ================= */}
        {!loading && !error && (

          <div className="mt-16 overflow-hidden rounded-3xl bg-[#E9EFE8] px-6 py-10 sm:px-10 sm:py-12">

            <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B47A42]">
                  Make a Difference
                </p>

                <h3 className="mt-3 text-2xl font-extrabold text-[#26352E] sm:text-3xl">
                  Have an idea worth sharing?
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-7 text-[#68766E]">
                  Bring people together around a cause.
                  Create an event and inspire your community.
                </p>

              </div>

              <Link
                href="/create-event"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#174C3C] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#174C3C]/15 transition hover:-translate-y-1 hover:bg-[#10392D]"
              >
                Create Your Event
                <ArrowRight size={17} />
              </Link>

            </div>
          </div>
        )}

      </section>
    </main>
  );
}
