
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UserRound,
  Mail,
  CalendarDays,
  CalendarPlus,
  MapPin,
  ArrowUpRight,
  Loader2,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

interface EventData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  creatorEmail: string;
}

interface JoinedEvent {
  _id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  userName: string;
  userEmail: string;
}

export default function UserDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [createdEvents, setCreatedEvents] = useState<EventData[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [eventsResponse, joinedResponse] = await Promise.all([
          fetch(`${API_URL}/createEvent`),
          fetch(
            `${API_URL}/my-joined-events/${encodeURIComponent(user.email)}`
          ),
        ]);

        if (!eventsResponse.ok || !joinedResponse.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const allEvents: EventData[] = await eventsResponse.json();
        const joined: JoinedEvent[] = await joinedResponse.json();

        setCreatedEvents(
          allEvents.filter(
            (event) => event.creatorEmail === user.email
          )
        );

        setJoinedEvents(joined);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Could not load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email, isPending]);

  const formatDate = (date: string) => {
    if (!date) return "Date not available";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "Date not available";
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Loading State
  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5ED] dark:bg-black transition-colors duration-300">
        <div className="flex flex-col items-center gap-3 text-[#174C3C] dark:text-white">
          <Loader2 className="animate-spin" size={36} />
          <p className="text-sm font-medium text-[#68766E] dark:text-zinc-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Login Required
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5ED] dark:bg-black px-4 transition-colors duration-300">
        <Card className="max-w-md w-full rounded-2xl border-[#E8EDE8] dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
              <UserRound
                className="text-[#174C3C] dark:text-white"
                size={32}
              />
            </div>

            <h2 className="text-2xl font-bold text-[#26352E] dark:text-white">
              Login Required
            </h2>

            <p className="text-[#68766E] dark:text-zinc-400">
              Please login to access your dashboard.
            </p>

            <Link
              href="/log-in"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-[#174C3C] hover:bg-[#10392D] dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
            >
              Login Now
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5ED] dark:bg-black py-10 sm:py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-9">

        {/* Dashboard Heading */}
 <div className="rounded-2xl bg-gradient-to-r from-[#174C3C] via-[#205D48] to-[#174C3C] p-6 sm:p-8 shadow-md dark:from-black dark:via-zinc-950 dark:to-black">
  <p className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-white/80 mb-3">
    <span className="w-2 h-2 rounded-full bg-emerald-300" />
    Hermione Community
  </p>

  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
    My Dashboard
  </h1>

  <p className="text-sm sm:text-base text-white/80 mt-3">
    Manage your profile and keep track of your activities.
  </p>
</div>

        {/* Profile Section */}
        <Card className="rounded-3xl border border-[#DDE5DD] dark:border-zinc-800 bg-white dark:bg-black shadow-sm overflow-hidden p-0 gap-0 transition-colors duration-300">

          {/* Full Green Banner */}
          <div className=" h:20 sm:h-20 w-full bg-white dark:bg-black dark:bg-none" />

         
<CardContent className="px-6 pb-7 pt-0 bg-white dark:bg-black transition-colors duration-300">
  <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">

    {/* Profile Image */}
    <div className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 bg-[#E8EFE8] dark:bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={96}
          height={96}
          className="w-full h-full object-cover"
          unoptimized
        />
      ) : (
        <UserRound
          size={42}
          className="text-[#174C3C] dark:text-white"
        />
      )}
    </div>

    {/* User Information */}
    <div className="flex-1 min-w-0 pt-2">
      <h2 className="text-2xl font-bold text-[#174C3C] dark:text-white break-words">
        {user.name || "Community Member"}
      </h2>

      <div className="flex items-center gap-2 text-sm text-[#68766E] dark:text-zinc-400 mt-2">
        <Mail size={16} className="shrink-0 text-[#174C3C] dark:text-zinc-400" />
        <span className="break-all">{user.email}</span>
      </div>
    </div>

    {/* Member Badge */}
    <div className="inline-flex items-center gap-2 rounded-full bg-[#174C3C] dark:bg-zinc-900 text-white px-4 py-3 text-sm font-semibold w-fit border border-[#174C3C] dark:border-zinc-700 shadow-sm">
      <Sparkles size={17} />
      Community Member
    </div>

  </div>
</CardContent>

        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Joined Count */}
          <Card className="rounded-2xl border border-[#E8EDE8] dark:border-zinc-800 bg-white dark:bg-black shadow-sm hover:shadow-md dark:hover:shadow-black transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-[#68766E] dark:text-zinc-400">
                  Events Joined
                </p>

                <h3 className="text-4xl font-bold text-[#174C3C] dark:text-white mt-2">
                  {joinedEvents.length}
                </h3>

                <p className="text-xs text-[#8A968E] dark:text-zinc-500 mt-2">
                  Events you participate in
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
                <CalendarCheck
                  className="text-[#174C3C] dark:text-white"
                  size={28}
                />
              </div>

            </CardContent>
          </Card>

          {/* Created Count */}
          <Card className="rounded-2xl border border-[#E8EDE8] dark:border-zinc-800 bg-white dark:bg-black shadow-sm hover:shadow-md dark:hover:shadow-black transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-[#68766E] dark:text-zinc-400">
                  Events Created
                </p>

                <h3 className="text-4xl font-bold text-[#174C3C] dark:text-white mt-2">
                  {createdEvents.length}
                </h3>

                <p className="text-xs text-[#8A968E] dark:text-zinc-500 mt-2">
                  Events organized by you
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
                <CalendarPlus
                  className="text-[#174C3C] dark:text-white"
                  size={28}
                />
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Joined Events */}
        <section className="space-y-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#26352E] dark:text-white">
                My Joined Events
              </h2>

              <p className="text-sm text-[#68766E] dark:text-zinc-400 mt-1">
                Events you have joined.
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
              <CalendarDays
                className="text-[#174C3C] dark:text-white"
                size={23}
              />
            </div>
          </div>

          {joinedEvents.length === 0 ? (
            <Card className="rounded-2xl border border-dashed border-[#DCE6DD] dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
              <CardContent className="p-8 text-center">

                <div className="mx-auto w-14 h-14 rounded-full bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
                  <CalendarDays
                    className="text-[#174C3C] dark:text-white"
                    size={27}
                  />
                </div>

                <h3 className="font-semibold text-[#26352E] dark:text-white mt-4">
                  No joined events yet
                </h3>

                <p className="text-sm text-[#68766E] dark:text-zinc-400 mt-2">
                  Explore events and join your first community activity.
                </p>

                <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-[#174C3C] hover:bg-[#10392D] dark:bg-zinc-800 dark:hover:bg-zinc-700 transition mt-5"
                >
                  Explore Events
                  <ArrowUpRight size={16} className="ml-2" />
                </Link>

              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {joinedEvents.map((event) => (
                <Card
                  key={event._id}
                  className="rounded-2xl border border-[#E8EDE8] dark:border-zinc-800 bg-white dark:bg-black shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-5">

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-[#174C3C] dark:text-zinc-300 uppercase tracking-wider bg-[#F0F5F0] dark:bg-zinc-900 px-3 py-1 rounded-full">
                          Joined Event
                        </span>

                        <h3 className="text-lg font-bold text-[#26352E] dark:text-white mt-4">
                          {event.eventTitle}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-[#68766E] dark:text-zinc-400 mt-3">
                          <CalendarDays
                            size={15}
                            className="text-[#174C3C] dark:text-zinc-300"
                          />
                          {formatDate(event.eventDate)}
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center shrink-0">
                        <CalendarCheck className="text-[#174C3C] dark:text-white" />
                      </div>
                    </div>

                    <Link
                      href={`/event-details/${event.eventId}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] dark:text-zinc-300 mt-5 hover:text-[#A66B35] dark:hover:text-white transition"
                    >
                      View Event
                      <ArrowUpRight size={16} />
                    </Link>

                  </CardContent>
                </Card>
              ))}

            </div>
          )}

        </section>

        {/* Created Events */}
        <section className="space-y-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#26352E] dark:text-white">
                My Created Events
              </h2>

              <p className="text-sm text-[#68766E] dark:text-zinc-400 mt-1">
                Events you have organized.
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
              <CalendarPlus
                className="text-[#174C3C] dark:text-white"
                size={23}
              />
            </div>
          </div>

          {createdEvents.length === 0 ? (
            <Card className="rounded-2xl border border-dashed border-[#DCE6DD] dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
              <CardContent className="p-8 text-center">

                <div className="mx-auto w-14 h-14 rounded-full bg-[#F0F5F0] dark:bg-zinc-900 flex items-center justify-center">
                  <CalendarPlus
                    className="text-[#174C3C] dark:text-white"
                    size={27}
                  />
                </div>

                <h3 className="font-semibold text-[#26352E] dark:text-white mt-4">
                  No events created yet
                </h3>

                <p className="text-sm text-[#68766E] dark:text-zinc-400 mt-2">
                  Create an event and bring your community together.
                </p>

                <Link
                  href="/create-event"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-[#174C3C] hover:bg-[#10392D] dark:bg-zinc-800 dark:hover:bg-zinc-700 transition mt-5"
                >
                  Create Event
                  <ArrowUpRight size={16} className="ml-2" />
                </Link>

              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {createdEvents.map((event) => (
                <Card
                  key={event._id}
                  className="rounded-2xl border border-[#E8EDE8] dark:border-zinc-800 bg-white dark:bg-black shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >

                  {/* Event Image */}
                  <div className="relative h-48 bg-[#F0F5F0] dark:bg-zinc-900">
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

                    <span className="text-xs font-semibold text-[#174C3C] dark:text-zinc-300 uppercase tracking-wider bg-[#F0F5F0] dark:bg-zinc-900 px-3 py-1 rounded-full">
                      {event.eventType}
                    </span>

                    <h3 className="text-lg font-bold text-[#26352E] dark:text-white mt-4 line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-sm text-[#68766E] dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-3 mt-5 text-sm text-[#68766E] dark:text-zinc-400">

                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={15}
                          className="text-[#174C3C] dark:text-zinc-300"
                        />
                        {formatDate(event.eventDate)}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin
                          size={15}
                          className="text-[#174C3C] dark:text-zinc-300"
                        />
                        <span className="line-clamp-1">
                          {event.location}
                        </span>
                      </div>

                    </div>

                    <div className="border-t border-[#EDF0ED] dark:border-zinc-800 mt-5 pt-4">
                      <Link
                        href={`/event-details/${event._id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] dark:text-zinc-300 hover:text-[#A66B35] dark:hover:text-white transition"
                      >
                        View Event
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>

                  </CardContent>
                </Card>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
