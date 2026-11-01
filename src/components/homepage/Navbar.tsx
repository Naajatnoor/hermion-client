"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Plus,
  CalendarDays,
  Users,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const isLoggedIn = false;

  const user = {
    name: "Hermione User",
    image: "https://i.pravatar.cc/100",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4E7DF] bg-[#F7F5ED]/95 backdrop-blur-xl">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

       
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#174C3C] text-xl font-bold text-white transition-transform group-hover:rotate-6">
            H
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#174C3C]">
              hermione<span className="text-[#E9A15B]">.</span>
            </h1>
            <p className="text-[9px] font-semibold uppercase tracking-[2px] text-[#68766E]">
              Make an impact
            </p>
          </div>
        </Link>

        
        <div className="hidden items-center gap-9 md:flex">
    
          <Link
            href="/upcoming-events"
            className="text-sm font-semibold text-[#26352E] transition hover:text-[#E9A15B]"
          >
            Upcoming Events
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="rounded-full border border-[#DCE8DF] p-2.5 text-[#174C3C] transition hover:bg-[#DCE8DF]"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="rounded-full bg-[#174C3C] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#26352E] hover:shadow-lg"
            >
              Login 
            </Link>
          ) : (
            <div className="relative flex items-center gap-3">

              <div className="group relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-[#E9A15B] object-cover"
                  />
                  <ChevronDown size={16} />
                </button>

                <span className="invisible absolute right-0 top-12 whitespace-nowrap rounded-lg bg-[#174C3C] px-3 py-2 text-xs text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                  {user.name}
                </span>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl border border-[#E4E7DF] bg-white p-2 shadow-xl">

                  <Link
                    href="/create-event"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#26352E] hover:bg-[#DCE8DF]"
                  >
                    <Plus size={17} /> Create Event
                  </Link>

                  <Link
                    href="/manage-events"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#26352E] hover:bg-[#DCE8DF]"
                  >
                    <CalendarDays size={17} /> Manage Events
                  </Link>

                  <Link
                    href="/joined-events"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#26352E] hover:bg-[#DCE8DF]"
                  >
                    <Users size={17} /> Joined Events
                  </Link>

                  <hr className="my-2 border-[#E4E7DF]" />

                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={17} /> Logout
                  </button>
                </div>
              )}

              <button className="rounded-full bg-[#174C3C] px-5 py-2.5 text-sm font-bold text-white">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#174C3C] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="border-t border-[#E4E7DF] bg-[#F7F5ED] px-5 py-5 md:hidden">

          <div className="flex flex-col gap-5">
            <Link href="/" onClick={() => setIsOpen(false)}
              className="font-semibold text-[#26352E]">
              Home
            </Link>

            <Link href="/upcoming-events" onClick={() => setIsOpen(false)}
              className="font-semibold text-[#26352E]">
              Upcoming Events
            </Link>

            {isLoggedIn && (
              <>
                <Link href="/create-event">Create Event</Link>
                <Link href="/manage-events">Manage Events</Link>
                <Link href="/joined-events">Joined Events</Link>
              </>
            )}

            {!isLoggedIn && (
              <Link
                href="/login"
                className="rounded-full bg-[#174C3C] px-5 py-3 text-center font-bold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
