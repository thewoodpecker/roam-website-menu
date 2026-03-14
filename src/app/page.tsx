import Image from "next/image";
import Navbar from "@/components/Navbar";
import MobileBookDemo from "@/components/MobileBookDemo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black lg:bg-[#0c0c0e]">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-start justify-end border-b-0 lg:border-b lg:border-white/10">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={`${basePath}/images/hero-bg.jpg`}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[37.66%] to-[rgba(0,0,0,0.6)] to-[83.75%]" />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Black gradient at top on mobile */}
        <div className="absolute inset-x-0 top-0 z-[5] h-[25%] bg-gradient-to-t from-transparent to-black pointer-events-none lg:hidden" />

        {/* Black gradient behind hero content on mobile */}
        <div className="absolute inset-x-0 bottom-0 z-[5] h-[45%] bg-gradient-to-b from-transparent to-black pointer-events-none lg:hidden" />

        {/* Hero Content */}
        <div className="relative z-10 flex w-full flex-col items-start lg:items-center justify-end pb-10 px-5 lg:px-10">
          <div className="flex flex-col items-start lg:items-center gap-6 lg:gap-4 max-w-full">
            <div className="flex flex-col items-start lg:items-center gap-3 lg:gap-0">
              <div className="flex flex-col items-start lg:items-center gap-3 lg:gap-1">
                {/* Badge */}
                <div className="flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-2.5 py-1 lg:px-3 lg:py-1.5 backdrop-blur-[50px]">
                  <span className="animate-silver-swipe bg-[length:200%_100%] bg-clip-text text-xs font-bold uppercase tracking-[-0.5px] text-transparent"
                    style={{
                      fontFamily: "var(--font-possibility), sans-serif",
                      backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 35%, #e0e0e0 50%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.3) 100%)",
                    }}
                  >
                    VIRTUAL OFFICE PLATFORM
                  </span>
                </div>
                {/* Heading */}
                <h1
                  className="text-left lg:text-center text-[22px] lg:text-[40px] font-bold uppercase leading-[28px] lg:leading-[50px] tracking-[-1px] text-white whitespace-nowrap"
                  style={{ fontFamily: "var(--font-possibility), sans-serif" }}
                >
                  Roam Makes Remote Work
                </h1>
              </div>
              {/* Subtitle */}
              <p className="text-left lg:text-center text-base font-normal leading-6 tracking-[-0.32px] text-white/50">
                Virtual Office, Drop-In Meetings, AI Notetaker, AI Assistant, Screen Recorder, AI Agents.
                <br className="hidden lg:block" />
                {" "}Unleash Productivity, Culture &amp; AI.
              </p>
            </div>

            <MobileBookDemo />

            {/* Desktop CTA */}
            <div className="relative hidden lg:flex h-[68px] w-[626px] items-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-[30px]">
              <div className="absolute left-2 top-[7.5px] flex w-[300px] items-center justify-between rounded-2xl bg-white px-4 py-3.5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18),0px_6px_10px_4px_rgba(0,0,0,0.08)]">
                <div className="relative size-6 overflow-hidden rounded-full">
                  <Image
                    src={`${basePath}/images/avatar.png`}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-base font-medium leading-6 tracking-[-0.32px] text-[#1a1a1a]">
                  Demo
                </span>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="text-[#1a1a1a]">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute right-2 top-[7.5px] flex w-[300px] items-center justify-center rounded-2xl bg-white px-4 py-3.5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18),0px_6px_10px_0px_rgba(0,0,0,0.08)]">
                <span className="text-base font-medium leading-6 tracking-[-0.32px] text-[#414141]">
                  Free Trial
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Magicast sidebar - left overlay */}
        <div className="absolute left-4 top-20 z-10 hidden lg:flex flex-col items-start gap-4">
          <div className="pl-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold leading-6 tracking-[-0.32px] text-white/70">
                AInbox
              </span>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                className="text-white/50"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm font-normal leading-5 tracking-[-0.15px] text-white/40">
              Enterprise Messaging
            </p>
          </div>
          {/* Progress dots */}
          <div className="inline-flex h-[36px] items-center gap-2 self-start rounded-full border border-white/10 bg-white/10 px-2.5 backdrop-blur-[50px]">
            <button className="flex items-center justify-center">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M7 1.5L2 6L7 10.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className={`size-[7px] rounded-full ${i === 1 ? "bg-white" : "bg-white/25"}`}
                />
              ))}
            </div>
            <button className="flex items-center justify-center">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M1 1.5L6 6L1 10.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Skeleton sections — mobile only */}
      <div className="flex flex-col gap-6 px-5 py-10 lg:hidden">
        {/* Section 1 */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-24 rounded-full bg-white/5" />
          <div className="h-5 w-48 rounded-full bg-white/8" />
          <div className="h-3 w-full rounded-full bg-white/5" />
          <div className="h-3 w-4/5 rounded-full bg-white/5" />
        </div>

        {/* Section 2 — cards */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
              <div className="h-20 w-full rounded-xl bg-white/5" />
              <div className="h-3 w-3/4 rounded-full bg-white/8" />
              <div className="h-3 w-1/2 rounded-full bg-white/5" />
            </div>
          ))}
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-20 rounded-full bg-white/5" />
          <div className="h-5 w-56 rounded-full bg-white/8" />
          <div className="h-40 w-full rounded-2xl bg-white/[0.03] border border-white/5" />
        </div>

        {/* Section 4 — list */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-28 rounded-full bg-white/5" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-white/5" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-3 w-3/4 rounded-full bg-white/8" />
                <div className="h-3 w-1/2 rounded-full bg-white/5" />
              </div>
            </div>
          ))}
        </div>

        {/* Section 5 */}
        <div className="flex flex-col gap-3">
          <div className="h-5 w-40 rounded-full bg-white/8" />
          <div className="h-3 w-full rounded-full bg-white/5" />
          <div className="h-3 w-5/6 rounded-full bg-white/5" />
          <div className="h-3 w-2/3 rounded-full bg-white/5" />
        </div>

        {/* Bottom spacer for fixed button */}
        <div className="h-16" />
      </div>



    </div>
  );
}
