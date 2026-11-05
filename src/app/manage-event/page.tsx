
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  Loader2,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  // Edit Dialog States
  const [selectedEvent, setSelectedEvent] =
    useState<EventData | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

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

  // Open Edit Dialog
  const handleEdit = (event: EventData) => {
    setSelectedEvent({ ...event });
    setEditOpen(true);
  };

  // Handle Form Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSelectedEvent((previous) =>
      previous ? { ...previous, [name]: value } : previous
    );
  };

  // Update Event API
  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedEvent) return;

    try {
      setSaving(true);
      setError("");

      const { _id, ...updatedData } = selectedEvent;

      const response = await fetch(
        `${API_URL}/update-event/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update event."
        );
      }

      // Update UI without reloading
      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event._id === _id ? selectedEvent : event
        )
      );

      setEditOpen(false);
      setSelectedEvent(null);

      alert("Event updated successfully!");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete Event API
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/delete-event/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete event."
        );
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== id)
      );

      alert("Event deleted successfully!");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
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

  // Not Logged In
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
    <>
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
                  {/* Thumbnail */}
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
                    <div className="mt-6 flex gap-2">
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

                      <Button
                        variant="outline"
                        onClick={() => handleEdit(event)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        title="Edit Event"
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handleDelete(event._id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        title="Delete Event"
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

      {/* Edit Event Dialog */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);

          if (!open) {
            setSelectedEvent(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#e5e9e2] bg-[#F7F5ED] p-0 sm:max-w-[600px]">
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-7">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8EFE8] text-[#174C3C]">
                <Pencil size={22} />
              </div>

              <DialogTitle className="text-2xl font-bold text-[#174C3C]">
                Edit Event
              </DialogTitle>

              <DialogDescription className="text-[#68766E]">
                Update your event information below.
              </DialogDescription>
            </DialogHeader>

            {selectedEvent && (
              <form onSubmit={handleSave} className="space-y-5">

                {/* Event Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#26352E]">
                    Event Title
                  </label>

                  <Input
                    name="title"
                    value={selectedEvent.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    required
                    className="h-11 border-[#dce3d9] bg-white"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#26352E]">
                    Event Type
                  </label>

                  <Input
                    name="eventType"
                    value={selectedEvent.eventType}
                    onChange={handleChange}
                    placeholder="e.g. Winter Relief"
                    required
                    className="h-11 border-[#dce3d9] bg-white"
                  />
                </div>

                {/* Date and Location */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26352E]">
                      <CalendarDays size={15} />
                      Event Date
                    </label>

                    <Input
                      type="date"
                      name="eventDate"
                      value={selectedEvent.eventDate?.slice(0, 10)}
                      onChange={handleChange}
                      required
                      className="h-11 border-[#dce3d9] bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26352E]">
                      <MapPin size={15} />
                      Location
                    </label>

                    <Input
                      name="location"
                      value={selectedEvent.location}
                      onChange={handleChange}
                      placeholder="Event location"
                      required
                      className="h-11 border-[#dce3d9] bg-white"
                    />
                  </div>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26352E]">
                    <ImageIcon size={15} />
                    Thumbnail URL
                  </label>

                  <Input
                    name="thumbnail"
                    value={selectedEvent.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="h-11 border-[#dce3d9] bg-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#26352E]">
                    Description
                  </label>

                  <Textarea
                    name="description"
                    value={selectedEvent.description}
                    onChange={handleChange}
                    placeholder="Describe your event..."
                    rows={5}
                    required
                    className="resize-none border-[#dce3d9] bg-white"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 border-t border-[#e1e7df] pt-5">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={saving}
                    onClick={() => setEditOpen(false)}
                    className="border-[#dce3d9] text-[#26352E]"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-[#174C3C] text-white hover:bg-[#103b2e]"
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={16}
                          className="mr-2 animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Pencil size={15} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
