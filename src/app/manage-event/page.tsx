
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Trash2, Eye } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EventData {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  creatorEmail: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/createEvent`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const data: EventData[] = await response.json();

        // Only show events created by the logged-in user
        const myEvents = data.filter(
          (event) =>
            event.creatorEmail?.toLowerCase() ===
            userEmail.toLowerCase()
        );

        setEvents(myEvents);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [userEmail, isPending]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/deleteEvent/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== id)
      );

      alert("Event deleted successfully!");
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#F7F5ED] px-5 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-lg font-medium text-[#174C3C]">
            Loading your events...
          </p>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-[#F7F5ED] px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#174C3C]">
          Please log in first
        </h1>
        <p className="mt-3 text-gray-600">
          You need to log in to manage your events.
        </p>
        <Link href="/login">
          <Button className="mt-6 bg-[#174C3C] hover:bg-[#10382C]">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5ED] px-5 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#E9A15B]">
              Account Dashboard
            </p>

            <h1 className="text-3xl font-bold text-[#174C3C] md:text-4xl">
              Manage My Events
            </h1>

            <p className="mt-2 text-gray-600">
              View and manage the events you have created.
            </p>
          </div>

          <Link href="/create-event">
            <Button className="bg-[#174C3C] hover:bg-[#10382C]">
              + Create New Event
            </Button>
          </Link>
        </div>

        {/* Event Count */}
        <div className="mb-8 rounded-xl border border-[#174C3C]/10 bg-white p-5">
          <p className="text-sm text-gray-500">Total Created Events</p>
          <h2 className="mt-1 text-3xl font-bold text-[#174C3C]">
            {events.length}
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#174C3C]/30 bg-white px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-[#174C3C]">
              No events created yet!
            </h2>

            <p className="mt-3 text-gray-500">
              Your created events will appear here.
            </p>

            <Link href="/create-event">
              <Button className="mt-6 bg-[#174C3C] hover:bg-[#10382C]">
                Create Your First Event
              </Button>
            </Link>
          </div>
        )}

        {/* Events */}
        {events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event._id}
                className="overflow-hidden rounded-2xl border-none bg-white shadow-sm"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-5">
                  <span className="rounded-full bg-[#E9A15B]/15 px-3 py-1 text-xs font-semibold text-[#A76524]">
                    {event.eventType}
                  </span>

                  <h2 className="mt-4 line-clamp-1 text-xl font-bold text-[#174C3C]">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={16} />
                      {event.location}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href={`/event-details/${event._id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-[#174C3C] text-[#174C3C]"
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                    </Link>

                    <Link href={`/manage-events/edit/${event._id}`}>
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={16} />
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      onClick={() => handleDelete(event._id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
