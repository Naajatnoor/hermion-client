
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  Eye,
  Plus,
  Loader2,
} from "lucide-react";

import { authClient } from "../../lib/auth-client";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

import EditEventDialog, {
  EventData,
} from "../../components/manage-event/EditEventDialog";

import DeleteEventDialog from "../../components/manage-event/DeleteEventDialog";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = session?.user?.email;

  // Fetch My Events
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

        const myEvents = data.filter(
          (event) =>
            event.creatorEmail?.toLowerCase() ===
            userEmail.toLowerCase()
        );

        setEvents(myEvents);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [userEmail, isPending]);

  // Update UI after successful edit
  const handleUpdated = (updatedEvent: EventData) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event._id === updatedEvent._id
          ? updatedEvent
          : event
      )
    );
  };

  // Update UI after successful delete
  const handleDeleted = (id: string) => {
    setEvents((previousEvents) =>
      previousEvents.filter((event) => event._id !== id)
    );
  };

  // Loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5ED]">
        <div className="text-center">
          <Loader2
            className="mx-auto mb-4 animate-spin text-[#174C3C]"
            size={35}
          />

          <p className="font-medium text-[#174C3C]">
            Loading your events...
          </p>
        </div>
      </div>
    );
  }

  // Login Check
  if (!userEmail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5ED] px-5 text-center">
        <h1 className="text-2xl font-bold text-[#174C3C]">
          Please log in first
        </h1>

        <p className="mt-3 text-gray-600">
          You need to log in to manage your events.
        </p>

        <Link href="/log-in">
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

          <Link href="/createEvent">
            <Button className="bg-[#174C3C] hover:bg-[#10382C]">
              <Plus size={17} className="mr-2" />
              Create New Event
            </Button>
          </Link>
        </div>

        {/* Event Count */}
        <div className="mb-8 rounded-xl border border-[#174C3C]/10 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Created Events
          </p>

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
            <CalendarDays
              size={40}
              className="mx-auto mb-4 text-[#174C3C]/50"
            />

            <h2 className="text-2xl font-bold text-[#174C3C]">
              No events created yet!
            </h2>

            <p className="mt-3 text-gray-500">
              Your created events will appear here.
            </p>

            <Link href="/createEvent">
              <Button className="mt-6 bg-[#174C3C] hover:bg-[#10382C]">
                Create Your First Event
              </Button>
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event._id}
                className="overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-[#E8EFE8]">
                  {event.thumbnail && (
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}
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

                  {/* Event Information */}
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

                    {/* View */}
                    <Link
                      href={`/event-details/${event._id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-[#174C3C] text-[#174C3C] hover:bg-[#E8EFE8]"
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                    </Link>

                    {/* Edit */}
                    <EditEventDialog
                      event={event}
                      onUpdated={handleUpdated}
                    />

                    {/* Delete */}
                    <DeleteEventDialog
                      id={event._id}
                      onDeleted={handleDeleted}
                    />

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
