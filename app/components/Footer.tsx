import Link from "next/link";

const FOOTER_SECTIONS = [
  { title: "Residences", links: ["World One", "Lodha Park", "Lodha Altamount", "New Cuffe Parade", "Palava City"] },
  { title: "Commercial", links: ["Lodha Excelus", "Lodha Supremus", "iThink Techno", "Lodha Platinum"] },
  { title: "Company", links: ["About Lodha", "Our Legacy", "Awards", "Press Room", "CSR"] },
  { title: "Connect", links: ["Contact Us", "Careers", "Investor Relations", "Find Us"] },
];
const COUNTRIES = ["IN", "UK", "UAE", "USA"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Use", "Disclaimer", "RERA"];

const LodhaLogo = () => (
  <div className="flex items-center gap-3.5 select-none">
    <div className="relative w-9 h-9 flex-shrink-0">
      <div className="absolute inset-0 border border-[#B8952A] rotate-45" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-[#B8952A] rotate-45" />
      </div>
    </div>
    <div className="leading-none">
      <p className="text-[#1C1610] text-[22px] tracking-[0.28em] font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>LODHA</p>
      <p className="text-[#B8952A] text-[8px] tracking-[0.5em] font-light mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>REAL ESTATE</p>
    </div>
  </div>
);

export default function Footer() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />
      <footer className="relative overflow-hidden" style={{ background: "#F5EFE4" }}>
        {/* Top gold line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#B8952A]/70 to-transparent" />
        {/* Subtle radial */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(184,149,42,0.06)_0%,transparent_70%)]" />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
          {/* Main Grid */}
          <div className="pt-20 pb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-12 lg:gap-10">
            {/* Brand */}
            <div className="flex flex-col gap-7">
              <LodhaLogo />
              <p className="text-[#1C1610]/45 text-[11px] leading-[1.9] font-light tracking-wide max-w-[260px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Building the finest addresses across the globe — where extraordinary architecture meets unparalleled craftsmanship and enduring vision.
              </p>
              <div className="flex flex-col gap-1.5">
                <p className="text-[#B8952A] text-[8px] tracking-[0.45em] font-light uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Experience Centre</p>
                <p className="text-[#1C1610]/50 text-[11px] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>Palava City, Dombivli East</p>
                <p className="text-[#1C1610]/50 text-[11px] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mumbai, Maharashtra 421204</p>
              </div>
              <div className="flex items-center gap-0">
                {COUNTRIES.map((c, i) => (
                  <button key={c} className={`text-[#1C1610]/35 hover:text-[#B8952A] text-[9px] tracking-[0.35em] font-light uppercase transition-colors duration-300 ${i < COUNTRIES.length - 1 ? "pr-3 mr-3 border-r border-[#1C1610]/12" : ""}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {FOOTER_SECTIONS.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-5">
                <p className="text-[#B8952A] text-[8px] tracking-[0.48em] font-light uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-[#1C1610]/45 hover:text-[#B8952A] text-[11px] font-light tracking-wide transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="py-9 border-t border-[#B8952A]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[#1C1610] text-lg tracking-[0.15em] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Private Collection Updates</p>
              <p className="text-[#1C1610]/35 text-[10px] tracking-[0.18em] font-light mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Exclusive previews · First access · By invitation only</p>
            </div>
            <div className="flex w-full md:w-auto min-w-[340px]">
              <input type="email" placeholder="Your email address"
                className="flex-1 border border-[#B8952A]/25 border-r-0 px-5 py-3.5 text-[#1C1610]/70 text-[11px] tracking-wider font-light outline-none focus:border-[#B8952A]/60 placeholder:text-[#1C1610]/25 transition-colors duration-300"
                style={{ background: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat', sans-serif" }} />
              <button className="px-7 py-3.5 text-[9px] tracking-[0.4em] uppercase font-medium text-white shrink-0 hover:brightness-110 transition-all duration-300"
                style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-5 border-t border-[#B8952A]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-[#1C1610]/30 text-[9px] tracking-[0.22em] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              © 2025 Lodha Group. All rights reserved.&nbsp;&nbsp;RERA No. P51800006289
            </p>
            <div className="flex flex-wrap gap-5">
              {LEGAL_LINKS.map((item) => (
                <Link key={item} href="#" className="text-[#1C1610]/30 hover:text-[#B8952A] text-[9px] tracking-[0.22em] font-light transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8952A]/60 to-transparent" />
      </footer>
    </>
  );
}