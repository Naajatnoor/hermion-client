// import React from 'react';


//   const EventDetailsPage = async ({params})=>{
//   const{id} = await params;
//   const res = await fetch(`http://localhost:8000/createEvent/${id}`)
//   const events = await res.json();

//   return (
//     <div>
//       details page
//       <div>
//        <h1>Title:{events.title}</h1>
//       </div>
//     </div>
//   );
// };

// export default EventDetailsPage;



import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Clock3,
  Heart,
  Users,
  ShieldCheck,
  Mail,
  Sparkles,
  HandHeart,
  ChevronRight,
} from "lucide-react";

interface EventData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

async function getEvent(id: string): Promise<EventData | null> {
  try {
    const res = await fetch(`${API_URL}/createEvent`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();

    return (
      Array.isArray(data)
        ? data.find((item: EventData) => item._id === id)
        : null
    ) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDay(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "--";

  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#183c32]">
            Event Not Found
          </h1>
          <p className="mt-3 text-gray-500">
            This event may have been removed.
          </p>
          <Link
            href="/upcoming-events"
            className="mt-6 inline-flex rounded-full bg-[#176b52] px-6 py-3 text-white"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const emailSubject = encodeURIComponent(
    `Interested in ${event.title}`
  );

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#19382f]">

      {/* Top Navigation */}
      <div className="border-t border-[#19382f]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/upcoming-events"
            className="flex items-center gap-2 text-sm font-semibold text-[#527067] transition hover:text-[#176b52]"
          >
            <ArrowLeft size={17} />
            All Events
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-3  sm:px-8 lg:py-3">

        {/* Intro */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="sm:text-[5px] lg:text-xs font-bold uppercase tracking-[0.25em] text-[#a18b5d] ">
              Discover · Participate · Make a difference
            </p>

            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Every little action
              <br />
              <span className="font-serif font-normal italic text-[#6c9684]">
                creates a big impact.
              </span>
            </h1>
          </div>

          <div className="rounded-full border border-[#176b52]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#176b52]">
            {event.eventType}
          </div>
        </div>

        {/* Hero Section */}
        <section className="grid items-stretch gap-5 lg:grid-cols-12">

          {/* Image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-[#dce6df] lg:col-span-8 lg:min-h-[510px]">
            {event.thumbnail && (
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#102d24]/85 via-transparent to-black/10" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur-md">
                <Sparkles size={14} />
                Community Initiative
              </span>

              <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                {event.title}
              </h2>

              <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/85">
                <span className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {formatDate(event.eventDate)}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin size={17} />
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          {/* Event Summary */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#193e33] p-7 text-white sm:p-9 lg:col-span-4">

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b6d0c2]">
                  The Initiative
                </span>
                <HandHeart className="text-[#c8d9b6]" size={25} />
              </div>

              <h3 className="mt-10 text-3xl font-semibold leading-snug">
                Be part of something meaningful.
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#c0d2c9]">
                Your time, kindness and participation can
                help create a positive difference in the
                community.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 border-t border-white/15 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <p className="text-xs text-[#b6d0c2]">Event date</p>
                  <p className="mt-1 font-semibold">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-xs text-[#b6d0c2]">Location</p>
                  <p className="mt-1 font-semibold">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-[#d3e2c9] p-5 text-[#193e33]">
              <p className="text-xs font-semibold uppercase tracking-wider">
                Together we can
              </p>
              <p className="mt-2 text-lg font-bold">
                Make the community stronger.
              </p>
            </div>
          </div>
        </section>

        {/* Main Details */}
        <section className="mt-12 grid gap-8 lg:grid-cols-12">

          {/* About Event */}
          <div className="lg:col-span-8">

            <div className="rounded-[28px] border border-[#19382f]/10 bg-white p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-[#a18b5d]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a18b5d]">
                    Get to know the event
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">
                    About This Initiative
                  </h3>
                </div>
              </div>

              <p className="mt-8 whitespace-pre-line text-[15px] leading-8 text-[#71827b]">
                {event.description}
              </p>

              <div className="my-9 border-t border-[#19382f]/10" />

              <h3 className="text-xl font-bold">
                Event at a glance
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#f5f8f5] p-5">
                  <CalendarDays className="text-[#39836b]" size={23} />
                  <p className="mt-4 text-xs text-[#84948c]">
                    Date
                  </p>
                  <p className="mt-1 font-semibold">
                    {formatDate(event.eventDate)}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f8f5] p-5">
                  <MapPin className="text-[#39836b]" size={23} />
                  <p className="mt-4 text-xs text-[#84948c]">
                    Venue
                  </p>
                  <p className="mt-1 font-semibold">
                    {event.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f8f5] p-5">
                  <HandHeart className="text-[#39836b]" size={23} />
                  <p className="mt-4 text-xs text-[#84948c]">
                    Event Type
                  </p>
                  <p className="mt-1 font-semibold">
                    {event.eventType}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f5f8f5] p-5">
                  <Users className="text-[#39836b]" size={23} />
                  <p className="mt-4 text-xs text-[#84948c]">
                    Organized By
                  </p>
                  <p className="mt-1 break-all font-semibold">
                    {event.creatorEmail}
                  </p>
                </div>

              </div>
            </div>

            {/* Participation Note */}
            <div className="mt-6 rounded-[28px] border border-[#d8e4da] bg-[#edf4ed] p-7 sm:p-9">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white p-3 text-[#39836b]">
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Before You Participate
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#71827b]">
                    Please review the event date, venue and
                    description carefully. For participation
                    information, contact the event organizer
                    before attending.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-5">

              {/* Join Card */}
              <div className="rounded-[28px] border border-[#19382f]/10 bg-white p-7 shadow-[0_15px_50px_rgba(25,56,47,0.05)] sm:p-8">

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#a18b5d]">
                    Get Involved
                  </span>
                  <Heart size={21} className="text-[#39836b]" />
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-snug">
                  Want to be part of this?
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#84948c]">
                  Reach out to the organizer to learn
                  how you can participate in this event.
                </p>

                <Link
                  href={`mailto:${event.creatorEmail}?subject=${emailSubject}`}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#176b52] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#125740]"
                >
                  <Heart size={17} />
                  Contact Organizer
                  <ArrowUpRight size={17} />
                </Link>

                <p className="mt-4 text-center text-xs text-[#9aa9a1]">
                  Connect directly with the event organizer.
                </p>

                <div className="my-7 border-t border-[#19382f]/10" />

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#edf4ed] p-3 text-[#39836b]">
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-[#9aa9a1]">
                      Organizer Email
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold">
                      {event.creatorEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date Card */}
              <div className="flex items-center gap-5 rounded-[28px] bg-[#e8eee8] p-6">
                <div className="flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white">
                  <span className="text-xs font-bold uppercase text-[#a18b5d]">
                    {formatDay(event.eventDate)}
                  </span>
                  <span className="text-3xl font-bold text-[#193e33]">
                    {new Date(event.eventDate).getDate() || "--"}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-[#84948c]">
                    Mark your calendar
                  </p>
                  <p className="mt-1 font-bold">
                    Don't miss this opportunity.
                  </p>
                </div>
              </div>

            </div>
          </aside>
        </section>

        {/* Bottom CTA */}
        <section className="mt-12 overflow-hidden rounded-[28px] bg-[#193e33] px-7 py-12 text-center text-white sm:px-12 sm:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b6d0c2]">
            Hermione Community
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">
            Small contributions.
            <span className="block font-serif font-normal italic text-[#c8d9b6]">
              Meaningful changes.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#c0d2c9]">
            Explore more community initiatives and find
            opportunities to make a difference.
          </p>

          <Link
            href="/upcoming-events"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#d3e2c9] px-7 py-3.5 text-sm font-bold text-[#193e33] transition hover:bg-white"
          >
            Explore All Events
            <ChevronRight size={18} />
          </Link>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#19382f]/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-xs text-[#84948c] sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Hermione. All rights reserved.</p>
          <p>Building stronger communities together.</p>
        </div>
      </footer>
    </main>
  );
}

