
import {
  HandHeart,
  CalendarCheck,
  ClipboardCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: HandHeart,
    number: "01",
    title: "Community-Led Initiatives",
    description:
      "Bring people together to organize cleanups, food drives, tree plantations, and meaningful local activities.",
    color: "#174C3C",
    bg: "bg-[#E2EFE4]",
    border: "border-[#174C3C]/15",
    accent: "bg-[#174C3C]",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Easy Event Participation",
    description:
      "Discover meaningful events and join community initiatives with just a few clicks. Every helping hand matters.",
    color: "#C47B36",
    bg: "bg-[#FCEBD9]",
    border: "border-[#E9A15B]/30",
    accent: "bg-[#E9A15B]",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Manage Your Events",
    description:
      "Create, update, and manage your own events while keeping track of the people joining your initiatives.",
    color: "#6255B5",
    bg: "bg-[#ECE8FA]",
    border: "border-[#8877D8]/25",
    accent: "bg-[#8877D8]",
  },
  {
    icon: MapPin,
    number: "04",
    title: "Discover Upcoming Events",
    description:
      "Explore upcoming community activities, find opportunities near you, and become part of something meaningful.",
    color: "#43835B",
    bg: "bg-[#E6F0E4]",
    border: "border-[#75A77D]/30",
    accent: "bg-[#75A77D]",
  },
];

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7F5ED] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-28 top-40 h-72 w-72 rounded-full bg-[#DCE8DF]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-[#E8EFE8]/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">

          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#174C3C]/40" />

            <span className="rounded-full bg-[#E8EFE8] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#174C3C]">
              Platform Features
            </span>

            <span className="h-px w-8 bg-[#174C3C]/40" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-[#26352E] sm:text-4xl lg:text-5xl">
            Everything you need to
            <br />
            <span className="relative inline-block font-serif font-medium italic text-[#174C3C]">
              make a difference.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#E9A15B]" />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#68766E] sm:text-base">
            From discovering local initiatives to organizing your own
            events, Hermione makes community participation simple
            and meaningful.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className={`group relative flex min-h-[200px] flex-col overflow-hidden rounded-[2rem] border ${feature.border} bg-white/80 p-6 shadow-[0_8px_25px_rgba(38,53,46,0.04)] transition duration-300 ease-out hover:-translate-y-2 hover:bg-white hover:shadow-[0_18px_35px_rgba(38,53,46,0.10)] sm:p-7`}
              >

                <div
                  className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-[0.06] transition-transform duration-500 group-hover:scale-100"
                  style={{ backgroundColor: feature.color }}
                />

                <div className="relative z-10 flex items-start justify-between">

                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-[1.8rem] ${feature.bg} transition-all duration-300 group-hover:rotate-[-0deg] group-hover:scale-110`}
                  >
                    <Icon
                      size={35}
                      strokeWidth={1.8}
                      style={{ color: feature.color }}
                    />
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: feature.color }}
                    >
                      {feature.number}
                    </span>

                    <span
                      className="h-[3px] w-8 rounded-full"
                      style={{ backgroundColor: feature.color }}
                    />
                  </div>

                </div>

             
            <div className="relative z-10 mt-8 flex-1">

                  <h3 className="text-xl font-bold leading-snug text-[#26352E] transition-colors duration-300 group-hover:text-[#174C3C]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#68766E]">
                    {feature.description}
                  </p>

                </div>  
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${feature.accent}`}
                /> 

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Features;
