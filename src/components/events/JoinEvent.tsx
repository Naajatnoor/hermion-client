
"use client";

import { useState } from "react";
import {
  Heart,
  Users,
  Mail,
  ShieldCheck,
  X,
  CheckCircle2,
  UserRound,
  Share2,
  CalendarDays,
  Sparkles,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface EventData {
  _id: string;
  title: string;
  eventDate: string;
}

export default function JoinEvent({
  event,
}: {
  event: EventData;
}) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [joined, setJoined] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  // Join event
  const handleJoin = () => {
    if (!user) return;

    setJoined(true);
    setShowModal(false);
    setSuccess(true);
  };

  // Leave event
  const handleLeave = () => {
    setJoined(false);
    setSuccess(false);
  };

  // Share event
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: "Check out this community event!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied!");
      }
    } catch (error) {
      console.log("Sharing cancelled or failed:", error);
    }
  };

  return (
    <section className="space-y-6">

      {/* Join Event Card */}
      <div className="rounded-[24px] border border-[#19382f]/10 bg-white p-5 shadow-[0_8px_35px_rgba(25,56,47,0.04)] sm:p-7">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          {/* Volunteer Count */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4ed] text-[#39836b]">
              <Users size={23} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#19382f]">
                {joined ? "1 Volunteer Joined" : "0 Volunteers Joined"}
              </h3>

              <p className="mt-1 text-xs text-[#84948c]">
                {joined
                  ? "You are part of this initiative!"
                  : "Be the first to join this initiative."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={handleShare}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#19382f]/10 text-[#668076] transition hover:bg-[#f1f6f1]"
              aria-label="Share event"
            >
              <Share2 size={18} />
            </button>

            {isPending ? (
              <div className="rounded-xl bg-gray-100 px-6 py-3 text-sm text-gray-500">
                Loading...
              </div>
            ) : !user ? (
              <a
                href="/log-in"
                className="rounded-xl bg-[#176b52] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#125740]"
              >
                Login to Join
              </a>
            ) : joined ? (
              <>
                {/* Joined Status */}
                <div className="flex items-center gap-2 rounded-xl bg-[#e8f4eb] px-5 py-3 text-sm font-bold text-[#21834e]">
                  <CheckCircle2 size={17} />
                  Joined
                </div>

                {/* Leave Button */}
                <button
                  onClick={handleLeave}
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Leave Event
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#159b78] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#118365]"
              >
                <Heart size={17} />
                Join Event
              </button>
            )}

          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#bde5ca] bg-[#edfaf0] p-4 text-sm text-[#21834e]">
            <CheckCircle2 size={20} />

            <div>
              <p className="font-bold">Successfully joined!</p>
              <p className="mt-1 text-xs">
                Thank you for being part of this initiative.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Volunteers Section */}
      <div className="rounded-[24px] border border-[#19382f]/10 bg-white p-6 shadow-[0_8px_35px_rgba(25,56,47,0.04)] sm:p-7">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a18b5d]">
              Community Members
            </p>

            <h3 className="mt-2 text-xl font-bold text-[#19382f]">
              Confirmed Volunteers
            </h3>
          </div>

          <div className="rounded-xl bg-[#edf5ef] px-4 py-2 text-sm font-bold text-[#39836b]">
            {joined ? "01" : "00"}
          </div>
        </div>

        <div className="mt-6">

          {joined && user ? (
            <div className="flex items-center gap-3 rounded-2xl bg-[#f5f8f5] p-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcebe0] text-[#39836b]">
                <UserRound size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#19382f]">
                  {user.name || "Community Volunteer"}
                </p>

                <p className="mt-1 flex items-center gap-2 break-all text-xs text-[#84948c]">
                  <Mail size={13} />
                  {user.email}
                </p>
              </div>

              <CheckCircle2
                size={19}
                className="shrink-0 text-[#39836b]"
              />
            </div>
          ) : (
            <div className="rounded-2xl bg-[#f6f8f5] px-5 py-9 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f1e9] text-[#729b83]">
                <Users size={25} />
              </div>

              <h4 className="mt-4 font-bold text-[#526b60]">
                No volunteers yet
              </h4>

              <p className="mt-2 text-xs text-[#91a097]">
                Be the first person to join this event.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && user && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10251e]/60 px-4 py-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] rounded-[28px] bg-white p-7 shadow-2xl sm:p-9"
          >

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-[22px] bg-[#eaf4ed] text-[#39836b]">
              <Heart size={30} />
            </div>

            <div className="mt-6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a18b5d]">
                Make a Difference
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#19382f]">
                Join This Event?
              </h2>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#84948c]">
                You're just one step away from becoming part of this meaningful initiative.
              </p>
            </div>

            {/* Event Info */}
            <div className="mt-7 rounded-2xl border border-[#19382f]/10 bg-[#f7f9f6] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a18b5d]">
                Selected Event
              </p>

              <h3 className="mt-2 font-bold text-[#19382f]">
                {event.title}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#84948c]">
                <CalendarDays size={15} />

                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* User Info */}
            <div className="mt-4 rounded-2xl border border-[#dce9df] p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a18b5d]">
                <ShieldCheck size={16} />
                Joining as
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e5f0e7] text-[#39836b]">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#19382f]">
                    {user.name || "Volunteer"}
                  </p>

                  <p className="mt-1 break-all text-xs text-[#84948c]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#84948c]">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-[#a18b5d]" />
              Your participation makes this community stronger.
            </div>

            {/* Modal Actions */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleJoin}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#159b78] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#118365]"
              >
                <Heart size={16} />
                Confirm Join
              </button>
            </div>

            <p className="mt-5 text-center text-[10px] text-[#a3afa8]">
              HERMIONE · COMMUNITY INITIATIVE
            </p>

          </div>
        </div>
      )}

    </section>
  );
}
