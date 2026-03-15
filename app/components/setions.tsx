"use client";
import Link from "next/link";

/* ── FEATURED PROPERTIES ── */
const PROPERTIES = [
  { id: 1, name: "Lodha Malabar", location: "Malabar Hill", city: "Mumbai", type: "Ultra Luxury", price: "₹ 25 Cr+", area: "4,200 sq.ft", status: "Accepting Expressions" },
  { id: 2, name: "World One", location: "Worli Sea Face", city: "Mumbai", type: "Iconic Supertall", price: "₹ 12 Cr+", area: "2,800 sq.ft", status: "Ready to Move" },
  { id: 3, name: "Lodha Park", location: "Lower Parel", city: "Mumbai", type: "Premium Residences", price: "₹ 8.5 Cr+", area: "2,100 sq.ft", status: "Limited Units" },
  { id: 4, name: "Lincoln Square", location: "Holborn", city: "London", type: "Prime London", price: "£ 1.8M+", area: "1,650 sq.ft", status: "Enquire Now" },
];

const BuildingSVG = ({ v }: { v: number }) => {
  const h = 300 + (v % 4) * 28; const w = 50 + (v % 4) * 10; const x = (240 - w) / 2;
  return (
    <svg viewBox="0 0 240 420" fill="none" className="absolute inset-0 w-full h-full">
      {Array.from({ length: 18 }).map((_, i) => <circle key={i} cx={10 + (i * 51) % 220} cy={5 + (i * 15) % 55} r={0.6} fill="rgba(184,149,42,0.4)" />)}
      <rect x={x} y={420 - h} width={w} height={h} fill="rgba(184,149,42,0.06)" />
      {Array.from({ length: Math.floor(h / 12) }).map((_, i) => <rect key={i} x={x + 2} y={422 - h + i * 12} width={w - 4} height={9} fill={`rgba(184,149,42,${0.04 + (i % 4) * 0.01})`} />)}
      {Array.from({ length: Math.floor(w / 10) }).map((_, c) => Array.from({ length: Math.floor(h / 16) }).map((_, r) => (
        <rect key={`${c}-${r}`} x={x + 4 + c * 9} y={424 - h + 4 + r * 14} width="5" height="8" fill={((c + r + v) % 3 === 0) ? "rgba(184,149,42,0.42)" : "rgba(184,149,42,0.07)"} />
      )))}
      {v % 2 === 0 && <polygon points={`${x + w / 2},${420 - h - 20} ${x + w / 2 - 3},${420 - h} ${x + w / 2 + 3},${420 - h}`} fill="rgba(184,149,42,0.5)" />}
      <ellipse cx="120" cy="416" rx={w * 0.8} ry="6" fill="rgba(184,149,42,0.07)" />
    </svg>
  );
};

export function FeaturedProperties() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(184,149,42,0.05)_0%,transparent_60%)]" />
      </div>
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3"><div className="w-5 h-px bg-[#B8952A]" /><span className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light">Curated Collection</span></div>
            <h2 className="text-[#1C1610] font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,56px)" }}>
              Signature<br /><em className="text-[#1C1610]/35">Residences</em>
            </h2>
          </div>
          <Link href="/residences" className="group flex items-center gap-4 self-start md:self-auto">
            <span className="text-[#1C1610]/35 text-[9px] tracking-[0.4em] uppercase font-light group-hover:text-[#B8952A] transition-colors duration-300">View All Properties</span>
            <div className="w-8 h-px bg-[#1C1610]/20 group-hover:w-12 group-hover:bg-[#B8952A] transition-all duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROPERTIES.map((p) => (
            <div key={p.id} className="group relative cursor-pointer">
              <div className="border border-[#B8952A]/12 group-hover:border-[#B8952A]/35 group-hover:shadow-[0_8px_40px_rgba(184,149,42,0.10)] overflow-hidden transition-all duration-700" style={{ background: "#FBF7F0" }}>
                <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "linear-gradient(160deg,#EDE3CC 0%,#E5D9BC 100%)" }}>
                  <BuildingSVG v={p.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#EDE3CC]/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[7px] tracking-[0.4em] uppercase font-light px-3 py-1.5 border border-[#B8952A]/35 text-[#B8952A] bg-[#FAF6EF]/80">{p.status}</span>
                  </div>
                  <div className="absolute top-3 right-3"><span className="text-[#1C1610]/30 text-[7px] tracking-[0.35em] uppercase font-light">{p.type}</span></div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light">{p.location} · {p.city}</p>
                    <h3 className="text-[#1C1610]/85 font-light mt-1.5 group-hover:text-[#1C1610] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,2vw,22px)" }}>{p.name}</h3>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#B8952A]/20 to-transparent group-hover:from-[#B8952A]/50 transition-colors duration-700" />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[#1C1610]/25 text-[7px] tracking-[0.4em] uppercase font-light">Starting</p>
                      <p className="text-[#1C1610]/80 font-light mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>{p.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1C1610]/25 text-[7px] tracking-[0.4em] uppercase font-light">From</p>
                      <p className="text-[#1C1610]/50 text-[11px] font-light mt-0.5">{p.area}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── LEGACY SECTION ── */
export function LegacySection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "#F5EDE0", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/25 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/25 to-transparent" />
      </div>
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3"><div className="w-5 h-px bg-[#B8952A]" /><span className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light">Our Heritage</span></div>
              <h2 className="text-[#1C1610] font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)" }}>
                Three Decades of<br /><em className="text-[#1C1610]/35">Unbroken Legacy</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-px border border-[#B8952A]/15 bg-[#B8952A]/15">
              {[{ value: "42,000+", label: "Homes Delivered", sub: "Across India & World" }, { value: "₹ 35,000 Cr", label: "Annual Revenue", sub: "FY 2024" }, { value: "4,500+", label: "Acres Developed", sub: "Prime Locations" }, { value: "30+", label: "Years of Trust", sub: "Est. 1995" }].map(({ value, label, sub }) => (
                <div key={label} className="group px-7 py-8 flex flex-col gap-1.5 hover:bg-white/40 transition-colors duration-500 cursor-default" style={{ background: "#F5EDE0" }}>
                  <p className="text-[#1C1610]/80 font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px,3vw,36px)" }}>{value}</p>
                  <p className="text-[#B8952A] text-[8px] tracking-[0.45em] uppercase font-light mt-1">{label}</p>
                  <p className="text-[#1C1610]/30 text-[9px] tracking-wide font-light">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="relative">
              <div className="absolute -top-6 -left-4 select-none leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "140px", lineHeight: 1, color: "rgba(184,149,42,0.08)" }}>"</div>
              <p className="relative text-[#1C1610]/55 leading-[1.9] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,2vw,20px)", fontStyle: "italic" }}>
                We don't merely construct buildings — we create communities, craft experiences, and build the places where life's most precious moments unfold.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {[{ title: "World-Class Architecture", desc: "Collaborating with globally acclaimed architects to design iconic structures that define city skylines." }, { title: "Sustainable Development", desc: "Every project is crafted with deep respect for the environment and future generations." }, { title: "Unparalleled Craftsmanship", desc: "Premium materials, precision engineering, and meticulous attention to every detail." }].map(({ title, desc }) => (
                <div key={title} className="group flex gap-5 cursor-default">
                  <div className="flex-shrink-0 mt-1.5"><div className="w-1.5 h-1.5 bg-[#B8952A]/35 rotate-45 group-hover:bg-[#B8952A] transition-colors duration-400" /></div>
                  <div>
                    <p className="text-[#1C1610]/70 text-sm font-light tracking-wide group-hover:text-[#1C1610]/90 transition-colors duration-300">{title}</p>
                    <p className="text-[#1C1610]/38 text-xs font-light leading-relaxed mt-1 tracking-wide">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/legacy" className="group flex items-center gap-4">
              <span className="text-[#1C1610]/35 text-[9px] tracking-[0.4em] uppercase font-light group-hover:text-[#B8952A] transition-colors duration-300">Our Story</span>
              <div className="w-8 h-px bg-[#1C1610]/15 group-hover:w-14 group-hover:bg-[#B8952A] transition-all duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── DESTINATIONS STRIP ── */
export function DestinationsStrip() {
  const cities = [
    { name: "Mumbai", count: "18 Projects", flag: "🇮🇳" }, { name: "Pune", count: "6 Projects", flag: "🇮🇳" },
    { name: "Hyderabad", count: "3 Projects", flag: "🇮🇳" }, { name: "London", count: "4 Projects", flag: "🇬🇧" },
    { name: "Dubai", count: "2 Projects", flag: "🇦🇪" }, { name: "New York", count: "1 Project", flag: "🇺🇸" },
  ];
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/18 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/18 to-transparent" />
      </div>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          <div className="flex-shrink-0">
            <p className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light mb-2">Global Presence</p>
            <p className="text-[#1C1610]/75 font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,3vw,34px)" }}>Across<br />4 Nations</p>
          </div>
          <div className="w-px h-20 bg-[#B8952A]/15 hidden md:block flex-shrink-0" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 flex-1">
            {cities.map(({ name, count, flag }, i) => (
              <Link key={name} href="/destinations"
                className={`group flex flex-col gap-2 px-6 py-5 border-r border-[#B8952A]/10 last:border-0 hover:bg-[#F5EDE0] transition-colors duration-500 ${i === 0 ? "border-l border-[#B8952A]/10" : ""}`}>
                <span className="text-xl">{flag}</span>
                <p className="text-[#1C1610]/65 group-hover:text-[#1C1610]/90 font-light transition-colors duration-300 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>{name}</p>
                <p className="text-[#1C1610]/28 text-[8px] tracking-[0.35em] uppercase font-light group-hover:text-[#B8952A]/70 transition-colors duration-300">{count}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA SECTION ── */
export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "linear-gradient(135deg,#EDE3CC 0%,#F5EDE0 50%,#EDE3CC 100%)", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(184,149,42,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23B8952A' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />
        <div className="absolute top-12 left-12 w-20 h-20 border-l-2 border-t-2 border-[#B8952A]/20" />
        <div className="absolute top-12 right-12 w-20 h-20 border-r-2 border-t-2 border-[#B8952A]/20" />
        <div className="absolute bottom-12 left-12 w-20 h-20 border-l-2 border-b-2 border-[#B8952A]/20" />
        <div className="absolute bottom-12 right-12 w-20 h-20 border-r-2 border-b-2 border-[#B8952A]/20" />
      </div>
      <div className="relative max-w-[900px] mx-auto px-6 text-center flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#B8952A]/50" />
          <div className="w-2 h-2 bg-[#B8952A] rotate-45" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#B8952A]/50" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#B8952A] text-[8px] tracking-[0.6em] uppercase font-light">Begin Your Journey</p>
          <h2 className="text-[#1C1610] font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,6vw,72px)" }}>
            Find Your<br /><em className="text-[#1C1610]/35">Perfect Address</em>
          </h2>
        </div>
        <p className="text-[#1C1610]/45 font-light leading-relaxed max-w-md" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.8vw,18px)", fontStyle: "italic" }}>
          Our private client advisors are available exclusively for you. Schedule a personal consultation and experience Lodha firsthand.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
          <Link href="/contact" className="group relative px-10 py-4 overflow-hidden" style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
            <span className="relative z-10 text-[9px] tracking-[0.45em] uppercase font-medium text-white">Schedule a Private Visit</span>
            <span className="absolute inset-0 bg-white/25 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
          <Link href="/residences" className="group flex items-center gap-3">
            <span className="text-[#1C1610]/40 text-[9px] tracking-[0.4em] uppercase font-light group-hover:text-[#1C1610]/70 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>Download Brochure</span>
            <div className="w-6 h-px bg-[#1C1610]/20 group-hover:w-10 group-hover:bg-[#1C1610]/45 transition-all duration-500" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 pt-2">
          {["+91 80 6748 1800", "concierge@lodhagroup.com"].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#B8952A]/50 rounded-full" />
              <span className="text-[#1C1610]/35 text-[9px] tracking-[0.3em] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item}</span>
              {i === 0 && <div className="w-px h-3 bg-[#1C1610]/10 hidden sm:block ml-4" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}