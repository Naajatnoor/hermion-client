
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Tag,
  Sparkles,
  Type,
  Loader2,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { getTokenFromClient } from "../../lib/getTokenFromClient";


// API Configuration


const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const EVENT_ENDPOINT = `${API_URL}/add-event`;


// Event Categories


const categories = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

// Image Presets

const photoPresets = [
  {
    name: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1548126032-079a0fb0099d",
  },
  {
    name: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3",
  },
  {
    name: "Cleanup",
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
  },
  {
    name: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
];

// Event Type

interface EventPayload {
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  creatorEmail: string;
}

// Get Today's Date

const getTodayDate = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

// Create Event Page

export default function CreateEventPage() {
  // Better Auth Session (No JWT)
  const { data: session, isPending } = authClient.useSession();

  // States
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Organizer Email
  const organizerEmail = session?.user?.email || "";

  // Today's Date
  const minDate = getTodayDate();

    // Form Submit Handler
  
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Check session loading
    if (isPending) {
      return;
    }

    // Check login
    if (!organizerEmail) {
      setError("Please login before creating an event.");
      return;
    }

    // Check image URL
    if (!imageUrl.trim()) {
      setError("Please provide an event image URL.");
      return;
    }

    // Get form data
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Prepare event data
    const eventData: EventPayload = {
      title: String(formData.get("title") || "").trim(),
      eventType: String(formData.get("eventType") || ""),
      eventDate: String(formData.get("date") || ""),
      location: String(formData.get("location") || "").trim(),
      thumbnail: imageUrl.trim(),
      description: String(
        formData.get("description") || ""
      ).trim(),
      creatorEmail: organizerEmail,
    };

    // Validate fields
    if (
      !eventData.title ||
      !eventData.eventType ||
      !eventData.eventDate ||
      !eventData.location ||
      !eventData.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate event date
    if (eventData.eventDate <= minDate) {
      setError("Please select a future event date.");
      return;
    }

    setLoading(true);

    try {
      // Send data without 
         const token = await getTokenFromClient()
      const response = await fetch(EVENT_ENDPOINT,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           authorization: `Bearer ${token}`
        },
        body: JSON.stringify(eventData),
      });

      const responseText = await response.text();

      let result;

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(
          `Invalid backend response. HTTP Status: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
          result.msg ||
          "Failed to create event."
        );
      }

      console.log("Created Event:", result);

      // Success
      setSuccess("Community event created successfully!");

      // Reset form
      form.reset();
      setImageUrl("");

    } catch (err) {
      console.error("Create Event Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

    // JSX
  
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600"
        >
          <ArrowLeft size={18} />
          Back to Upcoming Events
        </Link>

        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <CardContent className="p-6 sm:p-8 md:p-10">

            {/* Header */}
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                <Sparkles size={14} />
                Social Service Drive
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Create a Community Event
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Organize a local relief effort, environmental
                cleanup, or community support drive.
              </p>
            </div>

            {/* Event Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Event Title <span className="text-red-500">*</span>
                </Label>

                <div className="relative">
                  <Type
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Winter Clothes Distribution - Dhaka"
                    required
                    maxLength={100}
                    className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-zinc-800"
                  />
                </div>
              </div>

              {/* Event Type and Date */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Event Type */}
                <div className="space-y-2">
                  <Label htmlFor="eventType">
                    Event Type <span className="text-red-500">*</span>
                  </Label>

                  <div className="relative">
                    <Tag
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="eventType"
                      name="eventType"
                      required
                      defaultValue=""
                      className="h-12 w-full rounded-xl border border-input bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-zinc-800"
                    >
                      <option value="" disabled>
                        Select event type
                      </option>

                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">
                    Event Date <span className="text-red-500">*</span>
                  </Label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id="date"
                      name="date"
                      type="date"
                      min={minDate}
                      required
                      className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-zinc-800"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Select a future event date.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location / Venue <span className="text-red-500">*</span>
                </Label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                    required
                    maxLength={200}
                    className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-zinc-800"
                  />
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">
                  Thumbnail Image URL <span className="text-red-500">*</span>
                </Label>

                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setError("");
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 dark:bg-zinc-800"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <p className="mb-3 text-xs text-muted-foreground">
                    Quick photo presets:
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {photoPresets.map((photo) => (
                      <button
                        key={photo.name}
                        type="button"
                        onClick={() => {
                          setImageUrl(photo.url);
                          setError("");
                        }}
                        className={`text-xs font-medium transition hover:underline ${
                          imageUrl === photo.url
                            ? "font-bold text-teal-700 dark:text-teal-300"
                            : "text-teal-600 dark:text-teal-400"
                        }`}
                      >
                        {photo.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Preview */}
                {imageUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-700">
                    <img
                      src={imageUrl}
                      alt="Event preview"
                      className="h-48 w-full object-cover"
                      onError={() => {
                        setError(
                          "Unable to load this image. Please check the URL."
                        );
                      }}
                      onLoad={() => {
                        setError("");
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Event Description <span className="text-red-500">*</span>
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                  required
                  minLength={10}
                  maxLength={2000}
                  className="min-h-36 resize-y rounded-xl bg-slate-50 p-4 dark:bg-zinc-800"
                />
              </div>

              {/* Organizer Email */}
              <div className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center dark:border-zinc-700 dark:bg-zinc-800">
                <span className="text-xs text-muted-foreground">
                  Organizer Email:
                </span>

                <span className="break-all text-sm font-semibold text-slate-700 dark:text-white">
                  {isPending
                    ? "Loading..."
                    : organizerEmail || "Please login"}
                </span>
              </div>

              {/* Success Message */}
              {success && (
                <p
                  role="status"
                  className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-400"
                >
                  {success}
                </p>
              )}

              {/* Error Message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
                >
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || isPending || !organizerEmail}
                className="h-12 w-full rounded-xl bg-teal-600 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="mr-2 animate-spin"
                      size={18}
                    />
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={18} />
               Create Community Event
                  </>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
