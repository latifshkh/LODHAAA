"use client";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   BANNER CONFIG — put your images in /public and update paths here
   e.g. "/destinations/mumbai-hero.jpg"
───────────────────────────────────────────────────────────────── */
const BANNER_SLIDES = [
  {
    id: 1,
    image: "https://nyc.cloud.appwrite.io/v1/storage/buckets/69b6331b002098a340ab/files/69b6479b000bbab0a376/view?project=69b6319e002662c7faa5",   // ← /public/destination-banner-1.jpg
    flag: "🇮🇳",
    tag: "18 Projects · India",
    headline: "Mumbai",
    sub: "Where Lodha was born —\nand where our tallest dreams stand.",
    stat1: { val: "18", label: "Projects" },
    stat2: { val: "1995", label: "Est." },
  },
  {
    id: 2,
    image: "https://nyc.cloud.appwrite.io/v1/storage/buckets/69b6331b002098a340ab/files/69b648ee001ac62aa05e/view?project=69b6319e002662c7faa5",   // ← /public/destination-banner-2.jpg
    flag: "🇬🇧",
    tag: "4 Projects · United Kingdom",
    headline: "London",
    sub: "Prime addresses in the\nworld's most prestigious city.",
    stat1: { val: "4", label: "Projects" },
    stat2: { val: "2013", label: "Est." },
  },
  {
    id: 3,
    image: "https://nyc.cloud.appwrite.io/v1/storage/buckets/69b6331b002098a340ab/files/69b648f4003e426d2c21/view?project=69b6319e002662c7faa5",   // ← /public/destination-banner-3.jpg
    flag: "🇦🇪",
    tag: "2 Projects · UAE",
    headline: "Dubai",
    sub: "Sun-kissed luxury at the\nintersection of desert grandeur.",
    stat1: { val: "2", label: "Projects" },
    stat2: { val: "2018", label: "Est." },
  },
];

const DESTINATIONS = [
  { id: 1, city: "Mumbai",    country: "India",          flag: "🇮🇳", tagline: "The City That Never Sleeps",    projects: 18, description: "From the soaring spires of Worli to the verdant estates of Malabar Hill — Mumbai is where Lodha was born and where our most iconic residences stand.", highlights: ["World One · 117 Floors", "Malabar Hill Estates", "Lower Parel Business District", "Palava Smart City"], area: "Mumbai Metropolitan Region", since: "1995" },
  { id: 2, city: "Pune",      country: "India",          flag: "🇮🇳", tagline: "The Oxford of the East",         projects: 6,  description: "Thoughtfully designed residences nestled in Pune's most coveted micro-markets — where quality of life meets architectural ambition.", highlights: ["Belmondo", "Lodha Azzuro", "The Park Koregaon", "Lodha Giardino"], area: "Pune Metropolitan Region", since: "2008" },
  { id: 3, city: "Hyderabad", country: "India",          flag: "🇮🇳", tagline: "The City of Pearls",             projects: 3,  description: "Premium developments in Hyderabad's fastest growing corridors — connecting tech hubs with lifestyle destinations.", highlights: ["Lodha Meridian", "Lodha Bellezza", "Lodha Camelia"], area: "HITECH City & Gachibowli", since: "2015" },
  { id: 4, city: "London",    country: "United Kingdom", flag: "🇬🇧", tagline: "Where History Meets Modern Living",projects: 4, description: "Prime addresses in the world's most prestigious city — crafted with the same passion and precision that defines every Lodha residence.", highlights: ["Lincoln Square · Holborn", "No. 1 Grosvenor Square", "Grosvenor Gate", "Berkeley Gate"], area: "Central & West London", since: "2013" },
  { id: 5, city: "Dubai",     country: "UAE",            flag: "🇦🇪", tagline: "A Vision of Tomorrow",           projects: 2,  description: "Sun-kissed luxury at the intersection of desert grandeur and architectural innovation — Lodha's Gulf flagship.", highlights: ["Lodha DAMAC Hills", "Lodha Arabian Ranches"], area: "DAMAC Hills & Emirates Hills", since: "2018" },
  { id: 6, city: "New York",  country: "USA",            flag: "🇺🇸", tagline: "The Centre of the World",        projects: 1,  description: "Lodha's most ambitious international venture — a statement of intent in the world's most competitive real estate market.", highlights: ["125 Greenwich Street · Manhattan"], area: "Lower Manhattan", since: "2022" },
];

/* ═══════════════════════════════
   BANNER COMPONENT
═══════════════════════════════ */
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    if (leaving || next === current) return;
    setLeaving(true);
    setTimeout(() => { setCurrent(next); setLeaving(false); }, 480);
  };

  useEffect(() => {
    timer.current = setTimeout(() => goTo((current + 1) % BANNER_SLIDES.length), 5500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, leaving]);

  const s = BANNER_SLIDES[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "90vh", minHeight: 520, maxHeight: 820 }}>

      {/* Background image */}
      <div
        key={current}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${s.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: leaving
            ? "bExit 0.48s ease-in forwards"
            : "bEnter 0.9s cubic-bezier(0.2,0,0.4,1) forwards",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0A06]/82 via-[#0D0A06]/44 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A06]/65 via-transparent to-[#0D0A06]/18" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg,rgba(184,149,42,1),rgba(184,149,42,1) 1px,transparent 1px,transparent 80px)" }} />

      {/* Left gold bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#B8952A]/75 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1320px] mx-auto px-6 lg:px-16 flex flex-col justify-end pb-20 lg:pb-28">

        {/* Flag + Tag */}
        <div key={`t-${current}`} className="flex items-center gap-3 mb-5"
          style={{ animation: "fUp 0.7s 0.10s both" }}>
          <span className="text-3xl leading-none">{s.flag}</span>
          <div className="w-4 h-px bg-[#B8952A]/60" />
          <span
            className="text-[#B8952A] text-[9px] tracking-[0.55em] uppercase font-light px-3 py-1.5 border border-[#B8952A]/40"
            style={{ background: "rgba(184,149,42,0.08)", backdropFilter: "blur(8px)", fontFamily: "'Montserrat', sans-serif" }}>
            {s.tag}
          </span>
        </div>

        {/* Headline */}
        <div key={`h-${current}`} className="overflow-hidden mb-4"
          style={{ animation: "fUp 0.8s 0.22s both" }}>
          <h1
            className="text-white font-light leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(60px,10vw,128px)",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 40px rgba(0,0,0,0.35)",
            }}>
            {s.headline}
          </h1>
        </div>

        {/* Gold rule */}
        <div key={`r-${current}`} className="flex items-center gap-3 mb-5"
          style={{ animation: "sX 0.65s 0.38s both", transformOrigin: "left" }}>
          <div className="h-px w-14 bg-gradient-to-r from-[#B8952A] to-[#D4B96A]" />
          <div className="w-1.5 h-1.5 bg-[#B8952A] rotate-45 flex-shrink-0" />
          <div className="h-px w-8 bg-[#B8952A]/30" />
        </div>

        {/* Sub */}
        <p key={`s-${current}`}
          className="text-white/52 font-light leading-relaxed mb-10 max-w-md"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px,2vw,20px)",
            fontStyle: "italic",
            animation: "fUp 0.8s 0.44s both",
            whiteSpace: "pre-line",
          }}>
          {s.sub}
        </p>

        {/* Bottom row */}
        <div key={`b-${current}`}
          className="flex flex-col sm:flex-row items-start sm:items-end gap-6"
          style={{ animation: "fUp 0.7s 0.54s both" }}>

          {/* Stats glass card */}
          <div className="flex items-stretch border border-[#B8952A]/25"
            style={{ background: "rgba(13,10,6,0.55)", backdropFilter: "blur(12px)" }}>
            {[s.stat1, s.stat2].map((st, idx) => (
              <div key={idx}
                className={`px-6 py-4 flex flex-col gap-0.5 ${idx === 0 ? "border-r border-[#B8952A]/20" : ""}`}>
                <p className="text-white font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26 }}>{st.val}</p>
                <p className="text-[#B8952A] text-[8px] tracking-[0.45em] uppercase font-light mt-0.5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>{st.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="group relative px-8 py-4 overflow-hidden flex items-center gap-3"
            style={{
              background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)",
              backgroundSize: "200%",
              fontFamily: "'Montserrat', sans-serif",
            }}>
            <span className="relative z-10 text-[9px] tracking-[0.45em] uppercase font-medium text-white">
              Explore {s.headline}
            </span>
            <span className="relative z-10 w-5 h-px bg-white group-hover:w-8 transition-all duration-300" />
            <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>

          {/* Counter + dots */}
          <div className="sm:ml-auto flex items-center gap-5">
            <span className="text-white/30 text-[9px] tracking-[0.3em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              0{current + 1} / 0{BANNER_SLIDES.length}
            </span>
            <div className="flex items-center gap-2">
              {BANNER_SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                  className="relative overflow-hidden transition-all duration-500"
                  style={{
                    height: 2,
                    width: i === current ? 32 : 8,
                    background: i === current ? "#B8952A" : "rgba(255,255,255,0.25)",
                  }}>
                  {i === current && (
                    <span className="absolute inset-0 bg-[#D4B96A]"
                      style={{
                        animation: "pFill 5.5s linear forwards",
                        transformOrigin: "left",
                        transform: "scaleX(0)",
                      }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-9 overflow-hidden bg-white/10">
          <div className="w-full bg-[#B8952A]"
            style={{ height: "50%", animation: "sPulse 2s ease-in-out infinite" }} />
        </div>
        <span className="text-white/20 text-[7px] tracking-[0.5em] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif" }}>Scroll</span>
      </div>

      <style>{`
        @keyframes bEnter  { from{opacity:0;transform:scale(1.05)} to{opacity:1;transform:scale(1)} }
        @keyframes bExit   { from{opacity:1;transform:scale(1)}    to{opacity:0;transform:scale(0.97)} }
        @keyframes fUp     { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sX      { from{opacity:0;transform:scaleX(0)}        to{opacity:1;transform:scaleX(1)} }
        @keyframes pFill   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes sPulse  { 0%{transform:translateY(-100%);opacity:0} 50%{opacity:1} 100%{transform:translateY(200%);opacity:0} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════
   PAGE
═══════════════════════════════ */
export default function DestinationsPage() {
  const [selected, setSelected] = useState(DESTINATIONS[0]);

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      {/* ══ BANNER ══ */}
      <HeroBanner />

      {/* ══ HERO TEXT (original, untouched) ══ */}
      <div className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#EDE3CC 0%,#FAF6EF 60%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_75%_50%,rgba(184,149,42,0.07)_0%,transparent_65%)]" />
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-[#B8952A]" />
            <span className="text-[#B8952A] text-[8px] tracking-[0.6em] uppercase font-light">Global Presence</span>
          </div>
          <h1 className="text-[#1C1610] font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px,7vw,92px)" }}>
            Our <em className="text-[#1C1610]/35">Destinations</em>
          </h1>
          <p className="text-[#1C1610]/45 max-w-lg font-light leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.8vw,18px)", fontStyle: "italic" }}>
            Four nations. Six cities. One unwavering standard of excellence.
          </p>
        </div>
      </div>

      {/* ══ INTERACTIVE PANEL (original, untouched) ══ */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16 pb-24">
        <div className="grid lg:grid-cols-12 gap-0 border border-[#B8952A]/15">

          {/* Left list */}
          <div className="lg:col-span-4 border-r border-[#B8952A]/12">
            {DESTINATIONS.map((d) => (
              <button key={d.id} onClick={() => setSelected(d)}
                className="w-full text-left group flex items-center justify-between px-8 py-6 border-b border-[#B8952A]/08 last:border-0 relative transition-all duration-400"
                style={{ background: selected.id === d.id ? "#F5EDE0" : "transparent" }}>
                {selected.id === d.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#B8952A]" />
                )}
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{d.flag}</span>
                  <div>
                    <p className="font-light transition-colors duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px",
                        color: selected.id === d.id ? "#1C1610" : "rgba(28,22,16,0.60)" }}>
                      {d.city}
                    </p>
                    <p className="text-[#1C1610]/30 text-[7px] tracking-[0.4em] uppercase font-light mt-0.5">
                      {d.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[8px] tracking-[0.35em] font-light transition-colors duration-300"
                    style={{ color: selected.id === d.id ? "#B8952A" : "rgba(28,22,16,0.25)" }}>
                    {d.projects} Projects
                  </span>
                  <span className="transition-all duration-300"
                    style={{ color: "#B8952A", opacity: selected.id === d.id ? 1 : 0 }}>›</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right detail */}
          <div className="lg:col-span-8 p-10 lg:p-14 flex flex-col gap-8 relative overflow-hidden"
            style={{ background: "#FAF6EF" }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(184,149,42,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selected.flag}</span>
                  <div>
                    <h2 className="text-[#1C1610] font-light leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,58px)" }}>
                      {selected.city}
                    </h2>
                    <p className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light mt-1">
                      {selected.area}
                    </p>
                  </div>
                </div>
                <p className="text-[#1C1610]/35 font-light italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
                  "{selected.tagline}"
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#1C1610]/30 text-[7px] tracking-[0.4em] uppercase font-light">Since</p>
                <p className="text-[#B8952A] font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px" }}>
                  {selected.since}
                </p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-[#B8952A]/30 to-transparent" />

            <p className="text-[#1C1610]/55 font-light leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.8vw,18px)" }}>
              {selected.description}
            </p>

            <div>
              <p className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light mb-4">
                Flagship Projects
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.highlights.map((h) => (
                  <div key={h}
                    className="group flex items-center gap-3 px-4 py-3 border border-[#B8952A]/12 hover:border-[#B8952A]/40 hover:bg-[#F5EDE0] transition-all duration-400 cursor-pointer">
                    <div className="w-1 h-1 bg-[#B8952A]/40 rotate-45 flex-shrink-0 group-hover:bg-[#B8952A] transition-colors duration-300" />
                    <span className="text-[#1C1610]/55 text-[10px] tracking-wide font-light group-hover:text-[#1C1610]/80 transition-colors duration-300">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <button className="px-8 py-3.5 text-[9px] tracking-[0.45em] uppercase font-medium text-white"
                style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
                View {selected.city} Projects
              </button>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-[#1C1610]/35 text-[8px] tracking-[0.4em] uppercase font-light group-hover:text-[#B8952A] transition-colors duration-300">
                  Get Directions
                </span>
                <div className="w-5 h-px bg-[#1C1610]/25 group-hover:w-8 group-hover:bg-[#B8952A] transition-all duration-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STATS (original, untouched) ══ */}
      <div className="border-t border-[#B8952A]/12 py-16" style={{ background: "#F5EDE0" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-px border border-[#B8952A]/15 bg-[#B8952A]/15">
          {[
            { v: "4",      l: "Nations"         },
            { v: "6",      l: "Cities"           },
            { v: "34+",    l: "Active Projects"  },
            { v: "42,000+",l: "Homes Delivered"  },
          ].map(({ v, l }) => (
            <div key={l} className="px-8 py-8 text-center" style={{ background: "#F5EDE0" }}>
              <p className="text-[#1C1610]/80 font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px" }}>{v}</p>
              <p className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light mt-2">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}