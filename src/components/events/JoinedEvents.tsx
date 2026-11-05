
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import EventCard, { type EventData } from "./EventCard";
import { authClient } from "@/lib/auth-client";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

interface JoinedEventData {
  eventId: string;
  userEmail: string;
}

export default function JoinedEvents() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const email = session?.user?.email;

        if (!email) {
          setEvents([]);
          return;
        }

        // Get user's joined event records
        const joinedRes = await fetch(
          `${API_URL}/my-joined-events/${encodeURIComponent(email)}`
        );

        if (!joinedRes.ok) {
          throw new Error("Failed to load joined events");
        }

        const joinedData: JoinedEventData[] =
          await joinedRes.json();

        // Get all events
        const eventsRes = await fetch(`${API_URL}/createEvent`);

        if (!eventsRes.ok) {
          throw new Error("Failed to load events");
        }

        const allEvents: EventData[] = await eventsRes.json();

        // Match joined event IDs with actual events
        const joinedIds = new Set(
          joinedData.map((item) => item.eventId)
        );

        const myEvents = allEvents.filter((event) =>
          joinedIds.has(event._id)
        );

        setEvents(myEvents);
      } catch (err) {
        console.error(err);
        setError("Unable to load your joined events.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <section className="bg-[#F7F5ED] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[400px] animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F5ED] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8EFE8] px-4 py-2 text-sm font-medium text-[#174C3C]">
            <Users size={16} />
            Your Activities
          </div>

          <h2 className="text-3xl font-bold text-[#26352E] sm:text-4xl">
            Joined <span className="text-[#174C3C]">Events</span>
          </h2>

          <p className="mt-3 text-sm text-[#68766E]">
            All the events you have joined in one place.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-white p-8 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Not Logged In */}
        {!session?.user?.email && (
          <div className="rounded-2xl bg-white p-10 text-center">
            <h3 className="text-xl font-semibold text-[#26352E]">
              Login Required
            </h3>

            <p className="mt-2 text-sm text-[#68766E]">
              Please login to see your joined events.
            </p>

            <Link
              href="/log-in"
              className="mt-5 inline-flex rounded-full bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white"
            >
              Login Now
            </Link>
          </div>
        )}

        {/* Empty */}
        {!error && session?.user?.email && events.length === 0 && (
          <div className="rounded-2xl border border-[#174C3C]/10 bg-white px-6 py-16 text-center">
            <Users
              size={36}
              className="mx-auto mb-4 text-[#174C3C]"
            />

            <h3 className="text-xl font-semibold text-[#26352E]">
              No Joined Events Yet
            </h3>

            <p className="mt-2 text-sm text-[#68766E]">
              You haven't joined any events yet.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white"
            >
              Explore Events
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Joined Events */}
        {!error && events.length > 0 && (
          <>
            <div className="mb-6 text-sm text-[#68766E]">
              You have joined{" "}
              <span className="font-bold text-[#174C3C]">
                {events.length}
              </span>{" "}
              {events.length === 1 ? "event" : "events"}.
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
