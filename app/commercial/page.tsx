"use client";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   BANNER CONFIG — put your images in /public and update paths here
   Examples: "/banners/office-1.jpg" or "/commercial-1.webp"
───────────────────────────────────────────────────────────────── */
const BANNER_SLIDES = [
  {
    id: 1,
    image: "/commercial/11.jpg",   // ← replace with your /public image
    tag: "Grade A · Mahalaxmi",
    headline: "Lodha Excelus",
    sub: "Where Fortune 500 companies\nchoose to call home.",
    stat1: { val: "28", label: "Floors" },
    stat2: { val: "6.2L", label: "sq.ft" },
  },
  {
    id: 2,
    image: "/commercial/12.jpg",   // ← replace with your /public image
    tag: "Apple Park is Apple Inc",
    headline: "Apple Park",
    sub: "headquarters in Cupertino, California, designed by Foster + Partners.",
    stat1: { val: "1", label: "Ground" },
    stat2: { val: "2.8M", label: "sq.ft" },
  },
  {
    id: 3,
    image: "/commercial/13.jpg",   // ← replace with your /public image
    tag: "Mixed-Use · Lower Parel",
    headline: "One World Centre",
    sub: "Retail, offices and hospitality —\nunified under one iconic address.",
    stat1: { val: "20", label: "Floors" },
    stat2: { val: "3.6L", label: "sq.ft" },
  },
];

const COMMERCIAL = [
  { id: 1, name: "Lodha Excelus",        location: "Mahalaxmi, Mumbai",    type: "Grade A Office",  area: "6.2L sq.ft", floors: "28 Floors", status: "Fully Leased"      },
  { id: 2, name: "Lodha Supremus",       location: "Lower Parel, Mumbai",  type: "Premium Office",  area: "4.8L sq.ft", floors: "22 Floors", status: "Available"         },
  { id: 3, name: "iThink Techno Campus", location: "Thane, Mumbai",        type: "Tech Park",       area: "12L sq.ft",  floors: "4 Towers",  status: "Available"         },
  { id: 4, name: "Lodha Platinum",       location: "Andheri East, Mumbai", type: "Business Centre", area: "2.1L sq.ft", floors: "18 Floors", status: "Limited Units"     },
  { id: 5, name: "Lodha NTC Mill",       location: "Worli, Mumbai",        type: "Grade A Office",  area: "8.4L sq.ft", floors: "35 Floors", status: "Under Construction"},
  { id: 6, name: "One World Centre",     location: "Lower Parel, Mumbai",  type: "Mixed Use",       area: "3.6L sq.ft", floors: "20 Floors", status: "Available"         },
];

const SPECS = [
  { label: "Total Leasable Area", value: "38L+", unit: "sq.ft"     },
  { label: "Grade A Properties",  value: "12",   unit: "Buildings" },
  { label: "Corporate Tenants",   value: "500+", unit: "Companies" },
  { label: "Avg Occupancy",       value: "96%",  unit: "Rate"      },
];

const statusStyle = (s: string) => {
  if (s === "Fully Leased") return "text-emerald-700 border-emerald-400/40 bg-emerald-50";
  if (s === "Available")    return "text-[#B8952A] border-[#B8952A]/35 bg-amber-50";
  return "text-[#1C1610]/50 border-[#1C1610]/15 bg-white/60";
};

/* ═══════════════════════════════
   BANNER
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
          animation: leaving ? "bExit 0.48s ease-in forwards" : "bEnter 0.9s cubic-bezier(0.2,0,0.4,1) forwards",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0A06]/82 via-[#0D0A06]/44 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A06]/65 via-transparent to-[#0D0A06]/18" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg,rgba(184,149,42,1),rgba(184,149,42,1) 1px,transparent 1px,transparent 80px)" }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#B8952A]/75 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1320px] mx-auto px-6 lg:px-16 flex flex-col justify-end pb-20 lg:pb-28">

        {/* Tag */}
        <div key={`t-${current}`} className="flex items-center gap-3 mb-5" style={{ animation: "fUp 0.7s 0.10s both" }}>
          <div className="w-6 h-px bg-[#B8952A]" />
          <span className="text-[#B8952A] text-[9px] tracking-[0.55em] uppercase font-light px-3 py-1.5 border border-[#B8952A]/40"
            style={{ background: "rgba(184,149,42,0.08)", backdropFilter: "blur(8px)", fontFamily: "'Montserrat', sans-serif" }}>
            {s.tag}
          </span>
        </div>

        {/* Headline */}
        <div key={`h-${current}`} className="overflow-hidden mb-4" style={{ animation: "fUp 0.8s 0.22s both" }}>
          <h1 className="text-white font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(50px,9vw,118px)",
              letterSpacing: "-0.01em", textShadow: "0 4px 40px rgba(0,0,0,0.35)" }}>
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
        <p key={`s-${current}`} className="text-white/52 font-light leading-relaxed mb-10 max-w-md"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,2vw,20px)",
            fontStyle: "italic", animation: "fUp 0.8s 0.44s both", whiteSpace: "pre-line" }}>
          {s.sub}
        </p>

        {/* Bottom row: stats + CTA + dots */}
        <div key={`b-${current}`} className="flex flex-col sm:flex-row items-start sm:items-end gap-6"
          style={{ animation: "fUp 0.7s 0.54s both" }}>

          {/* Stats glass card */}
          <div className="flex items-stretch border border-[#B8952A]/25"
            style={{ background: "rgba(13,10,6,0.55)", backdropFilter: "blur(12px)" }}>
            {[s.stat1, s.stat2].map((st, idx) => (
              <div key={idx} className={`px-6 py-4 flex flex-col gap-0.5 ${idx === 0 ? "border-r border-[#B8952A]/20" : ""}`}>
                <p className="text-white font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26 }}>{st.val}</p>
                <p className="text-[#B8952A] text-[8px] tracking-[0.45em] uppercase font-light mt-0.5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>{st.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="group relative px-8 py-4 overflow-hidden flex items-center gap-3"
            style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
            <span className="relative z-10 text-[9px] tracking-[0.45em] uppercase font-medium text-white">View Property</span>
            <span className="relative z-10 w-5 h-px bg-white group-hover:w-8 transition-all duration-300" />
            <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>

          {/* Counter + progress dots */}
          <div className="sm:ml-auto flex items-center gap-5">
            <span className="text-white/30 text-[9px] tracking-[0.3em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              0{current + 1} / 0{BANNER_SLIDES.length}
            </span>
            <div className="flex items-center gap-2">
              {BANNER_SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                  className="relative overflow-hidden transition-all duration-500"
                  style={{ height: 2, width: i === current ? 32 : 8,
                    background: i === current ? "#B8952A" : "rgba(255,255,255,0.25)" }}>
                  {i === current && (
                    <span className="absolute inset-0 bg-[#D4B96A]"
                      style={{ animation: "pFill 5.5s linear forwards", transformOrigin: "left", transform: "scaleX(0)" }} />
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
          <div className="w-full bg-[#B8952A]" style={{ height: "50%", animation: "sPulse 2s ease-in-out infinite" }} />
        </div>
        <span className="text-white/20 text-[7px] tracking-[0.5em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Scroll</span>
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
export default function CommercialPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      {/* ══ BANNER ══ */}
      <HeroBanner />

      {/* ══ HERO TEXT + STATS (your original section, untouched) ══ */}
      <div className="relative pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F0E8D5 0%,#FAF6EF 60%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_50%,rgba(184,149,42,0.07)_0%,transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(60deg,rgba(184,149,42,1) 1px,transparent 1px),linear-gradient(-60deg,rgba(184,149,42,1) 1px,transparent 1px)", backgroundSize: "50px 86px" }} />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-end">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#B8952A]" />
              <span className="text-[#B8952A] text-[8px] tracking-[0.6em] uppercase font-light">Commercial Division</span>
            </div>
            <h1 className="text-[#1C1610] font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px,7vw,90px)" }}>
              Where Business<br /><em className="text-[#1C1610]/40">Finds Its Stage</em>
            </h1>
            <p className="text-[#1C1610]/45 max-w-md font-light leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.8vw,18px)", fontStyle: "italic" }}>
              Premium commercial spaces engineered for corporations that refuse to compromise on excellence.
            </p>
            <div className="flex gap-4 pt-2">
              <button className="px-8 py-3.5 text-[9px] tracking-[0.45em] uppercase font-medium text-white"
                style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
                Explore Spaces
              </button>
              <button className="px-8 py-3.5 text-[9px] tracking-[0.45em] uppercase font-light text-[#1C1610]/55 border border-[#B8952A]/25 hover:border-[#B8952A]/60 hover:text-[#B8952A] transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Leasing Enquiry
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border border-[#B8952A]/15 bg-[#B8952A]/15">
            {SPECS.map(({ label, value, unit }) => (
              <div key={label} className="px-6 py-7 flex flex-col gap-1 hover:bg-[#F5EDE0] transition-colors duration-500"
                style={{ background: "#FAF6EF" }}>
                <p className="text-[#1C1610]/80 font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px" }}>{value}</p>
                <p className="text-[#B8952A] text-[7px] tracking-[0.45em] uppercase font-light mt-1">{unit}</p>
                <p className="text-[#1C1610]/35 text-[9px] tracking-wide font-light">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#B8952A]/30 to-transparent" />

      {/* ══ PROPERTIES LIST (your original section, untouched) ══ */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16 py-20">
        <div className="mb-12">
          <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-2">Portfolio</p>
          <h2 className="text-[#1C1610]/85 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,44px)" }}>
            Commercial <em className="text-[#1C1610]/40">Landmarks</em>
          </h2>
        </div>

        <div className="flex flex-col gap-px border border-[#B8952A]/12 bg-[#B8952A]/12">
          {COMMERCIAL.map((p, i) => (
            <div key={p.id} className="group cursor-pointer transition-colors duration-400"
              style={{ background: active === p.id ? "#F5EDE0" : "#FAF6EF" }}
              onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)}>
              <div className="px-8 py-7 grid grid-cols-12 items-center gap-4">
                <div className="col-span-1">
                  <span className="font-light text-lg transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: active === p.id ? "#B8952A" : "rgba(28,22,16,0.2)" }}>0{i + 1}</span>
                </div>
                <div className="col-span-4">
                  <h3 className="font-light transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,2vw,22px)", color: active === p.id ? "#1C1610" : "rgba(28,22,16,0.75)" }}>{p.name}</h3>
                  <p className="text-[#B8952A] text-[7px] tracking-[0.45em] uppercase font-light mt-1">{p.location}</p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <p className="text-[#1C1610]/30 text-[8px] tracking-[0.3em] uppercase font-light">Type</p>
                  <p className="text-[#1C1610]/60 text-[11px] font-light mt-0.5">{p.type}</p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <p className="text-[#1C1610]/30 text-[8px] tracking-[0.3em] uppercase font-light">Area</p>
                  <p className="text-[#1C1610]/60 text-[11px] font-light mt-0.5">{p.area}</p>
                </div>
                <div className="col-span-2 hidden lg:block">
                  <p className="text-[#1C1610]/30 text-[8px] tracking-[0.3em] uppercase font-light">Floors</p>
                  <p className="text-[#1C1610]/60 text-[11px] font-light mt-0.5">{p.floors}</p>
                </div>
                <div className="col-span-1 flex justify-end">
                  <span className={`text-[7px] tracking-[0.4em] uppercase font-light px-3 py-1.5 border ${statusStyle(p.status)}`}>{p.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ AMENITIES (your original section, untouched) ══ */}
      <div className="border-t border-[#B8952A]/12 py-20" style={{ background: "#F5EDE0" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-3">Why Lodha Commercial</p>
            <h2 className="text-[#1C1610]/80 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px,3vw,38px)" }}>
              Built for the <em className="text-[#1C1610]/40">Extraordinary</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border border-[#B8952A]/15 bg-[#B8952A]/15">
            {["LEED Certified", "24×7 Security", "EV Charging", "Concierge", "Smart BMS", "Helipad Access"].map((f) => (
              <div key={f} className="px-6 py-8 text-center hover:bg-[#FAF6EF] transition-colors duration-400 cursor-default"
                style={{ background: "#F5EDE0" }}>
                <div className="w-1.5 h-1.5 bg-[#B8952A]/40 rotate-45 mx-auto mb-3" />
                <p className="text-[#1C1610]/55 text-[9px] tracking-[0.35em] uppercase font-light">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}