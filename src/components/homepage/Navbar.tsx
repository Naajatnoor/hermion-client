
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  UserRound,
  CalendarPlus,
  CalendarDays,
  ClipboardList,
  LogOut,
  ChevronDown,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import ThemeToggle from "../themeToggle/ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  // Local UI states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Navigation links
  const publicLinks = [
    {
      name: "Upcoming Events",
      href: "/upcoming-events",
    },
  ];

  const profileLinks = [
    {
      name: "My Profile",
      href: "/user",
      icon: UserRound,
    },
    {
      name: "Create Event",
      href: "/createEvent",
      icon: CalendarPlus,
    },
    {
      name: "Manage Events",
      href: "/manage-event",
      icon: ClipboardList,
    },
    {
      name: "Joined Events",
      href: "/join-event",
      icon: CalendarDays,
    },
  ];

  // Check active route
  const isActive = (href: string) => pathname === href;

  // Close menus after navigation
  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      closeMenus();

      router.replace("/log-in");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // User initials for fallback avatar
  const getInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

      
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-xl font-bold">H</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              hermione<span className="text-accent">.</span>
            </span>

            <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
              MAKE AN IMPACT
            </span>
          </div>
        </Link>

        
        <div className="hidden items-center gap-7 md:flex">

   
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          
          <ThemeToggle />

          {isPending ? (
            <div className="flex h-10 w-24 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : isLoggedIn ? (
       
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setProfileMenuOpen(!profileMenuOpen)
                }
                aria-expanded={profileMenuOpen}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 transition-colors hover:bg-muted"
              >
             
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {getInitial()}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-medium text-foreground">
                  {user?.name || "User"}
                </span>

                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-xl">

                  {/* User Information */}
                  <div className="border-b border-border px-3 py-3">
                    <p className="truncate text-sm font-semibold text-popover-foreground">
                      {user?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>

                  {/* Profile Links */}
                  <div className="py-2">
                    {profileLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenus}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            isActive(link.href)
                              ? "bg-secondary text-primary"
                              : "text-popover-foreground hover:bg-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}

                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In */
            <Link
              href="/log-in"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-3 md:hidden">

          {/* Theme Toggle - Always Visible */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-5 shadow-lg md:hidden">

          {/* Public Links */}
          <div className="flex flex-col gap-2">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-secondary text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Authentication Loading */}
          {isPending ? (
            <div className="mt-4 flex justify-center py-3">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : isLoggedIn ? (
            <div className="mt-4 border-t border-border pt-4">

              {/* Mobile User Information */}
              <div className="mb-3 flex items-center gap-3 px-3">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {getInitial()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Mobile Profile Links */}
              <div className="flex flex-col gap-1">
                {profileLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-secondary text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

         
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="mt-3 flex w-full items-center gap-3 rounded-lg border-t border-border px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}

                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            
            <div className="mt-4 border-t border-border pt-4">
              <Link
                href="/log-in"
                onClick={closeMenus}
                className="block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
