
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Users,
  CalendarDays,
  Sprout,
} from "lucide-react";

const Banner = () => {
  const statistics = [
    {
      value: "1,450+",
      label: "Active Volunteers",
      description: "People making a difference",
      icon: Users,
      color: "#174C3C",
      bg: "bg-[#E2EDE5]",
    },
    {
      value: "180+",
      label: "Events Completed",
      description: "Meaningful moments together",
      icon: CalendarDays,
      color: "#C47B36",
      bg: "bg-[#FCEBD9]",
    },
    {
      value: "24,000+",
      label: "Lives Impacted",
      description: "Smiles created through kindness",
      icon: Heart,
      color: "#7161C9",
      bg: "bg-[#ECE8FA]",
    },
    {
      value: "100%",
      label: "Community Driven",
      description: "Powered by people like you",
      icon: Sprout,
      color: "#43835B",
      bg: "bg-[#E6F0E4]",
    },
  ];

  return (
    <section className="bg-[#F7F5ED] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Main Banner */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#E8EFE8]">

          {/* Decorative Circle */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D5E3D7] opacity-70" />

          <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">

            {/* Left Content */}
            <div className="relative z-10">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#174C3C]/15 bg-white/70 px-4 py-2 text-sm font-medium text-[#174C3C]">
                <Sparkles size={16} />
                Make an impact together
              </div>

              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#26352E] sm:text-6xl lg:text-[4.5rem]">
                Be the reason
                <br />
                someone
                <span className="relative ml-2 inline-block font-serif font-medium italic tracking-[-0.055em] text-[#174C3C]">
                  smiles.
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#E9A15B]" />
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-8 text-[#68766E] sm:text-lg">
                Discover meaningful community events, meet people
                who care, and turn small acts of kindness into
                something bigger. Every action makes a difference.
              </p>

              {/* Action Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  href="/upcoming-events"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#174C3C] px-7 py-4 text-sm font-semibold text-white shadow-md shadow-[#174C3C]/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#10392D] hover:shadow-xl hover:shadow-[#174C3C]/25 active:translate-y-0 active:scale-95"
                >
                  Explore Events
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                  />
                </Link>

                <Link
                  href="/create-event"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#174C3C]/30 bg-white/60 px-7 py-4 text-sm font-semibold text-[#174C3C] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#174C3C] hover:bg-[#174C3C] hover:text-white hover:shadow-lg hover:shadow-[#174C3C]/15 active:translate-y-0 active:scale-95"
                >
                  Create an Event
                  <ArrowRight
                    size={17}
                    className="translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </Link>

              </div>

              {/* Community Highlights */}
              <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-[#174C3C]/15 pt-7">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#174C3C] text-white">
                    <Users size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-[#26352E]">
                      One Community
                    </p>
                    <p className="text-xs text-[#68766E]">
                      United by kindness
                    </p>
                  </div>
                </div>

                <div className="h-10 w-px bg-[#174C3C]/15" />

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9A15B] text-[#26352E]">
                    <Heart size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-[#26352E]">
                      Real Impact
                    </p>
                    <p className="text-xs text-[#68766E]">
                      Small acts, big changes
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Image */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

              <div className="relative overflow-hidden rounded-[1.7rem] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=85"
                  alt="Community volunteers working together"
                  className="h-[500px] w-full object-cover sm:h-[500px] lg:h-[490px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#142D23]/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <p className="text-sm font-medium text-white/80">
                    Together, we can do more
                  </p>

                  <h2 className="mt-2 pb-7 text-[30px] font-bold leading-snug text-white">
                    Your community needs your kindness.
                  </h2>
                </div>
              </div>

             
              <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg sm:-left-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8DF] text-[#174C3C]">
                  <Heart size={23} fill="currentColor" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0a492c]">
                    Spread kindness
                  </p>
                  <p className="text-xs text-[#68766E]">
                    Start with one event
                  </p>
                </div>

              </div>

              <div className="absolute -right-3 -top-4 -z-0 h-20 w-20 rounded-full border-[12px] border-[#E9A15B] sm:-right-5" />

            </div>

          </div>
        </div>

        <section className="relative mt-12 pb-4">

       <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">

  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E9A15B]">
    Our community in action
  </p>

  <h2 className="mt-1 text-2xl font-serif italic font-bold tracking-tight text-[#174C3C] sm:text-3xl">
    Small actions,big impact.

  </h2>

  <p className="max-w-md text-sm leading-6 text-[#68766E]">
    Every volunteer and every event brings us one step closer
    to a better community.
  </p>

</div>
    
          <div className="flex gap-4  justify-center items-center">

            {statistics.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#174C3C]/10 bg-white/80 p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#174C3C]/20 hover:bg-white hover:shadow-lg sm:p-5"
                >

              
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]`}
                  >
                    <Icon
                      size={22}
                      style={{ color: stat.color }}
                    />
                  </div>

            
                  <div className="relative z-10 min-w-0">
                    <h3
                      className="text-2xl font-extrabold tracking-tight"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </h3>

                    <p className="mt-0.5 text-sm font-semibold text-[#26352E]">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-xs text-[#89938B]">
                      {stat.description}
                    </p>
                  </div>

                  {/* Decorative Circle */}
                  <div
                    className="absolute -right-5 -top-5 h-16 w-16 rounded-full opacity-[0.06] transition-transform duration-500 group-hover:scale-150"
                    style={{ backgroundColor: stat.color }}
                  />

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 rounded-r-full transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: stat.color }}
                  />

                </div>
              );
            })}

          </div>
        </section>

      </div>
    </section>
  );
};

export default Banner;
