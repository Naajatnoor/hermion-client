
"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Mail,
  Heart,
  Sparkles,
  Send,
} from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-[#F7F5ED] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">


        <div className="relative overflow-hidden rounded-[2rem] bg-[#E8EFE8] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">

          
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border-[45px] border-[#174C3C]/[0.06]" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#D5E3D7] opacity-70 blur-2xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#174C3C]/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#174C3C]">
                <Sparkles size={15} />
                Stay Connected
              </div>

              <h2 className="mt-6 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-[#26352E] sm:text-4xl lg:text-5xl">
                Be part of the{" "}
                <span className="font-serif font-medium italic text-[#174C3C]">
                  change.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#68766E] sm:text-base">
                Stay connected with Hermione. Get updates about
                upcoming community events, volunteering opportunities,
                and inspiring stories that make a difference.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">

                <div className="flex items-center gap-2 text-sm font-medium text-[#174C3C]">
                  <Heart size={17} className="text-[#C47B36]" />
                  Make an impact
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-[#174C3C]">
                  <Mail size={17} className="text-[#C47B36]" />
                  Stay informed
                </div>

              </div>
            </div>

            <div className="relative">

              <div className="rounded-[1.7rem] border border-[#174C3C]/10 bg-white p-5 shadow-[0_12px_35px_rgba(38,53,46,0.07)]  sm:p-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9A15B]/20 text-[#174C3C]">
                    <Send size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#26352E]">
                      Get Community Updates
                    </h3>

                    <p className="mt-1 text-xs text-[#89938B]">
                      Good things are worth sharing.
                    </p>
                  </div>

                </div>

                {/* Subscription Form */}
                <form onSubmit={handleSubmit} className="mt-7">

                  <label
                    htmlFor="newsletter-email"
                    className="mb-2 block text-sm font-semibold text-[#26352E]"
                  >
                    Your email address
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">

                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSubscribed(false);
                      }}
                      placeholder="Enter your email"
                      className="min-w-0 flex-1 rounded-xl border border-[#174C3C]/15 bg-[#F7F5ED]/60 px-4 py-3.5 text-sm text-[#26352E] outline-none transition-all duration-300 placeholder:text-[#9AA39B] focus:border-[#174C3C] focus:bg-white focus:ring-2 focus:ring-[#174C3C]/10"
                    />

                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#174C3C] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#10392D] hover:shadow-lg hover:shadow-[#174C3C]/20 active:translate-y-0 active:scale-95"
                    >
                      Subscribe
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                  </div>

                  {subscribed && (
                    <p
                      className="mt-3 text-sm font-medium text-[#174C3C]"
                      role="status"
                    >
                      Thank you for your interest in our community!
                    </p>
                  )}

                </form>

                <div className="mt-6 flex items-start gap-2 border-t border-[#174C3C]/10 pt-5">

                  <Heart
                    size={15}
                    className="mt-0.5 shrink-0 text-[#C47B36]"
                  />

                  <p className="text-xs leading-5 text-[#89938B]">
                    No spam, just meaningful updates and opportunities
                    to make a positive difference.
                  </p>

                </div>

              </div>

              <div className="absolute -right-3 -top-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#E8EFE8] bg-[#E9A15B] text-[#174C3C] shadow-md sm:-right-5">
                <Heart size={19} fill="currentColor" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
