"use client";

const MILESTONES = [
  { year: "1995", title: "The Beginning", desc: "Mangal Prabhat Lodha founds the company with a single plot in Mumbai's suburban heartland." },
  { year: "2003", title: "First Landmark", desc: "Lodha completes its first premium residential tower in Thane — setting a new benchmark for quality." },
  { year: "2008", title: "International Ambitions", desc: "Lodha acquires the iconic Former Canadian High Commission site in London's West End." },
  { year: "2010", title: "World One Announced", desc: "The world's tallest residential tower is unveiled — an architectural marvel at 442 metres." },
  { year: "2012", title: "Palava City", desc: "Launch of Palava — India's first planned smart city spanning 4,500 acres near Mumbai." },
  { year: "2015", title: "London Debut", desc: "Lincoln Square completes — Lodha's first international project redefines prime London living." },
  { year: "2021", title: "Stock Market Listing", desc: "Lodha lists on NSE & BSE — becoming one of India's most valued real estate companies." },
  { year: "2024", title: "30 Years of Legacy", desc: "42,000+ homes delivered. ₹35,000 Cr+ revenue. A legacy built one extraordinary address at a time." },
];
const AWARDS = [
  "CREDAI National Award — Best Luxury Project 2023",
  "Euromoney — Best Residential Developer India 2022",
  "Times of India — Most Trusted Real Estate Brand 2023",
  "Forbes Asia — Best Under a Billion Companies 2021",
  "RICS Award — Residential Development of the Year 2022",
  "Financial Times — Asia Pacific Innovative Lawyers 2023",
];
const LEADERSHIP = [
  { name: "Mangal Prabhat Lodha", role: "Founder & Chairman", note: "Vision. Purpose. Legacy." },
  { name: "Abhishek Lodha", role: "Managing Director & CEO", note: "Growth. Innovation. Excellence." },
  { name: "Siddharth Gupta", role: "CFO", note: "Discipline. Transparency. Scale." },
];

export default function LegacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div className="relative pt-44 pb-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#EDE3CC 0%,#F5EDE0 40%,#FAF6EF 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_80%_40%,rgba(184,149,42,0.07)_0%,transparent_65%)]" />
        {/* Watermark year */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(200px,30vw,420px)", lineHeight: 1, color: "rgba(184,149,42,0.06)" }}>1995</span>
        </div>
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16 flex flex-col gap-8 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-[#B8952A]" />
            <span className="text-[#B8952A] text-[8px] tracking-[0.6em] uppercase font-light">Est. 1995</span>
          </div>
          <h1 className="text-[#1C1610] font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,8vw,100px)" }}>
            Our <em className="text-[#1C1610]/35">Legacy</em>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#B8952A] to-transparent" />
          <p className="text-[#1C1610]/50 font-light leading-relaxed max-w-xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,2vw,20px)", fontStyle: "italic" }}>
            "We believe that great architecture is not just about buildings. It is about creating a stage on which human life can unfold beautifully."
          </p>
          <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light">— Mangal Prabhat Lodha, Founder</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-[#B8952A]/15 py-24" style={{ background: "#FAF6EF" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
          <div className="mb-14">
            <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-2">Journey</p>
            <h2 className="text-[#1C1610]/85 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,46px)" }}>
              Three Decades of <em className="text-[#1C1610]/35">Milestones</em>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-gradient-to-b from-[#B8952A]/30 via-[#B8952A]/15 to-transparent hidden md:block" />
            <div className="flex flex-col gap-0">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="group relative flex gap-12 items-start">
                  <div className="w-20 flex-shrink-0 pt-8 text-right hidden md:block">
                    <p className="font-light transition-colors duration-300 group-hover:text-[#B8952A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: i === MILESTONES.length - 1 ? "#B8952A" : "rgba(28,22,16,0.30)" }}>{m.year}</p>
                  </div>
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-10">
                    <div className="w-2 h-2 rotate-45 transition-all duration-300 group-hover:scale-150" style={{ background: i === MILESTONES.length - 1 ? "#B8952A" : "rgba(28,22,16,0.15)" }} />
                  </div>
                  <div className={`flex-1 py-8 border-b border-[#B8952A]/10 ${i === MILESTONES.length - 1 ? "border-b-0" : ""}`}>
                    <p className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light mb-2 md:hidden">{m.year}</p>
                    <h3 className="text-[#1C1610]/80 font-light group-hover:text-[#1C1610] transition-colors duration-300 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,2.5vw,24px)" }}>{m.title}</h3>
                    <p className="text-[#1C1610]/40 text-[11px] font-light leading-relaxed tracking-wide">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="border-t border-[#B8952A]/12 py-24" style={{ background: "#F5EDE0" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-3">Stewardship</p>
            <h2 className="text-[#1C1610]/85 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,46px)" }}>
              The <em className="text-[#1C1610]/35">Leaders</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-[#B8952A]/15 bg-[#B8952A]/15">
            {LEADERSHIP.map((l) => (
              <div key={l.name} className="group px-10 py-12 flex flex-col gap-4 text-center hover:bg-white/50 transition-colors duration-500" style={{ background: "#F5EDE0" }}>
                <div className="w-16 h-16 border border-[#B8952A]/25 rotate-45 mx-auto group-hover:border-[#B8952A]/55 transition-colors duration-500" />
                <div>
                  <h3 className="text-[#1C1610]/85 font-light group-hover:text-[#1C1610] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>{l.name}</h3>
                  <p className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light mt-1.5">{l.role}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[#B8952A]/25 to-transparent" />
                <p className="text-[#1C1610]/38 font-light italic text-[13px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{l.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="border-t border-[#B8952A]/12 py-20" style={{ background: "#FAF6EF" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-2">Recognition</p>
            <h2 className="text-[#1C1610]/85 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px,3.5vw,42px)" }}>
              Accolades & <em className="text-[#1C1610]/35">Honours</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-[#B8952A]/12 bg-[#B8952A]/12">
            {AWARDS.map((award) => (
              <div key={award} className="group px-7 py-7 flex items-start gap-4 hover:bg-[#F5EDE0] transition-colors duration-400" style={{ background: "#FAF6EF" }}>
                <div className="w-1.5 h-1.5 bg-[#B8952A]/35 rotate-45 mt-1 flex-shrink-0 group-hover:bg-[#B8952A] transition-colors duration-300" />
                <p className="text-[#1C1610]/50 text-[11px] font-light leading-relaxed tracking-wide group-hover:text-[#1C1610]/75 transition-colors duration-300">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}