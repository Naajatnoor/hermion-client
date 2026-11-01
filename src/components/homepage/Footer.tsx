
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";



export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#174C3C] text-[#F7F5ED]">

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        {/* Top section */}
        <div className="grid gap-12 border-b border-[#477060] pb-14 md:grid-cols-2 md:items-end">

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[4px] text-[#E9A15B]">
              A community that cares
            </p>

            <h2 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Change starts
              <br />
              <span className="font-serif font-normal italic text-[#E9A15B]">
                with us.
              </span>
            </h2>
          </div>

          <div className="md:justify-self-end md:max-w-sm">
            <p className="mb-6 text-sm leading-7 text-[#DCE8DF]">
              Every small action has the power to create a meaningful
              difference. Find your people, join a cause, and make
              something better happen.
            </p>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-3 border-b border-[#E9A15B] pb-2 text-sm font-bold transition hover:text-[#E9A15B]"
            >
              Discover events <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

      
        <div className="grid grid-cols-2 gap-10 py-8 md:grid-cols-4">

          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-3xl font-extrabold tracking-tight">
              hermione<span className="text-[#E9A15B]">.</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[#DCE8DF]">
              Bringing people together to build stronger,
              kinder, and more connected communities.
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-[#E9A15B]">
              Explore
            </h3>
            <div className="flex flex-col gap-4 text-sm text-[#F7F5ED]">
              <Link href="/" className="hover:text-[#E9A15B]">Home</Link>
              <Link href="/upcoming-events" className="hover:text-[#E9A15B]">Upcoming Events</Link>
              <Link href="/create-event" className="hover:text-[#E9A15B]">Create Event</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-[#E9A15B]">
              Causes
            </h3>

            <div className="flex flex-col gap-4 text-sm text-[#F7F5ED]">
              <span>Donation</span>
              <span>Plantation</span>
              <span>Clean-up</span>
              <span>Education</span>
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-[#E9A15B]">
              Connect
            </h3>

            <p className="mb-5 text-sm leading-6 text-[#DCE8DF]">
              Have an idea or want to collaborate?
              We'd love to hear from you.
            </p>

            <a
              href="mailto:hello@hermione.com"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-[#E9A15B]"
            >
              <Mail size={16} />
              Get in touch
            </a>

            <div className="flex gap-3">
              {[
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaLinkedin , label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#477060] transition hover:border-[#E9A15B] hover:bg-[#E9A15B] hover:text-[#174C3C]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 border-t border-[#477060] pt-7 text-xs text-[#DCE8DF] md:flex-row md:items-center md:justify-between pt-10">

          <p>
            © {new Date().getFullYear()} Hermione. Made for a better tomorrow.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#E9A15B]">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-[#E9A15B]">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
