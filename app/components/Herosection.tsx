"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SLIDES = [
  { id: 1, label: "Mumbai · Flagship", title: "World One", subtitle: "The World's Tallest Residential Tower", tag: "Ultra Luxury", city: "Worli, Mumbai" },
  { id: 2, label: "London · International", title: "Lincoln Square", subtitle: "Timeless Elegance in the Heart of Holborn", tag: "Prime London", city: "Holborn, London" },
  { id: 3, label: "Dubai · Gulf", title: "Lodha Damac Hills", subtitle: "Where Desert Meets Architectural Perfection", tag: "Golf Residences", city: "DAMAC Hills, Dubai" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { width, height } = heroRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX / width - 0.5) * 18, y: (e.clientY / height - 0.5) * 10 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 600);
  };

  const slide = SLIDES[current];

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F0E8D5 0%,#FAF6EF 50%,#F5EDE0 100%)" }} />
        {/* Slide mesh */}
        <div className="absolute inset-0 transition-opacity duration-1000"
          style={{ background: `radial-gradient(ellipse 80% 60% at ${current === 0 ? "20%" : current === 1 ? "80%" : "50%"} 50%, rgba(184,149,42,0.06) 0%, transparent 60%)` }} />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(184,149,42,1) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,42,1) 1px,transparent 1px)", backgroundSize: "80px 80px", transform: `translate(${mousePos.x * 0.3}px,${mousePos.y * 0.3}px)`, transition: "transform 0.6s ease-out" }} />
        {/* Diagonal hatching */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg,rgba(184,149,42,1),rgba(184,149,42,1) 1px,transparent 1px,transparent 120px)" }} />
        {/* Corner ornaments */}
        <div className="absolute top-24 left-8 w-16 h-16 border-l border-t border-[#B8952A]/25" />
        <div className="absolute top-24 right-8 w-16 h-16 border-r border-t border-[#B8952A]/25" />
        <div className="absolute bottom-24 left-8 w-16 h-16 border-l border-b border-[#B8952A]/25" />
        <div className="absolute bottom-24 right-8 w-16 h-16 border-r border-b border-[#B8952A]/25" />
        {/* Large monogram */}
        <div className="absolute bottom-0 right-0 overflow-hidden select-none pointer-events-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(300px,40vw,520px)", lineHeight: 0.85, color: "rgba(184,149,42,0.04)", transform: `translate(${mousePos.x * 0.5}px,${mousePos.y * 0.5}px)`, transition: "transform 0.8s ease-out" }}>
          L
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1320px] mx-auto w-full px-6 lg:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[70vh]">

          {/* Left: Text */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className={`flex items-center gap-3 transition-all duration-700 ${animating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}>
              <div className="w-5 h-px bg-[#B8952A]" />
              <span className="text-[#B8952A] text-[9px] tracking-[0.55em] uppercase font-light">{slide.label}</span>
            </div>

            <div className="overflow-hidden">
              <h1 className={`transition-all duration-700 delay-100 leading-none ${animating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,8vw,112px)", fontWeight: 300, color: "#1C1610", letterSpacing: "-0.01em", lineHeight: 1.0 }}>
                {slide.title}
              </h1>
            </div>

            <div className={`flex items-center gap-4 transition-all duration-700 delay-200 ${animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
              <div className="h-px w-12 bg-gradient-to-r from-[#B8952A] to-[#D4B96A]" />
              <div className="w-1.5 h-1.5 bg-[#B8952A] rotate-45" />
              <div className="h-px max-w-[80px] w-20 bg-gradient-to-r from-[#B8952A]/40 to-transparent" />
            </div>

            <p className={`font-light leading-relaxed max-w-md transition-all duration-700 delay-300 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,2vw,22px)", fontStyle: "italic", color: "rgba(28,22,16,0.50)" }}>
              {slide.subtitle}
            </p>

            <div className={`flex items-center gap-5 transition-all duration-700 delay-[400ms] ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <span className="border border-[#B8952A]/40 text-[#B8952A] text-[8px] tracking-[0.45em] px-4 py-2 uppercase font-light">{slide.tag}</span>
              <span className="text-[#1C1610]/35 text-[9px] tracking-[0.3em] uppercase font-light">{slide.city}</span>
            </div>

            <div className={`flex items-center gap-6 pt-2 transition-all duration-700 delay-500 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <Link href="/residences" className="relative group flex items-center gap-3 px-8 py-4 overflow-hidden"
                style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
                <span className="relative z-10 text-[9px] tracking-[0.45em] uppercase font-medium text-white">Explore Residences</span>
                <span className="relative z-10 w-5 h-px bg-white group-hover:w-8 transition-all duration-300" />
                <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              <button className="flex items-center gap-3 group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <div className="w-10 h-10 border border-[#1C1610]/15 group-hover:border-[#B8952A]/50 rounded-full flex items-center justify-center transition-colors duration-300">
                  <div className="w-0 h-0 ml-0.5" style={{ borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "6px solid rgba(28,22,16,0.4)" }} />
                </div>
                <span className="text-[#1C1610]/35 group-hover:text-[#1C1610]/65 text-[9px] tracking-[0.4em] uppercase font-light transition-colors duration-300">Virtual Tour</span>
              </button>
            </div>
          </div>

          {/* Right: Property card */}
          <div className="lg:col-span-5 flex justify-end">
            <div className={`relative w-full max-w-sm lg:max-w-none transition-all duration-700 delay-200 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              style={{ transform: `translate(${mousePos.x * -0.8}px,${mousePos.y * -0.8}px)`, transition: "transform 0.8s ease-out, opacity 0.7s" }}>
              <div className="relative aspect-[3/4] w-full max-w-[340px] ml-auto overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#EDE3CC 0%,#E5D9BC 100%)" }} />
                {/* Building SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 450" fill="none" preserveAspectRatio="xMidYMax meet">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <circle key={i} cx={20 + (i * 47) % 300} cy={10 + (i * 23) % 100} r={0.6 + (i % 3) * 0.4} fill="rgba(184,149,42,0.5)" />
                  ))}
                  <rect x="130" y="80" width="80" height="360" fill="rgba(184,149,42,0.06)" />
                  {Array.from({ length: 36 }).map((_, i) => (
                    <rect key={i} x="132" y={82 + i * 10} width="76" height="8" fill={`rgba(184,149,42,${0.05 + (i % 4) * 0.025})`} />
                  ))}
                  {Array.from({ length: 9 }).map((_, col) =>
                    Array.from({ length: 28 }).map((_, row) => (
                      <rect key={`${col}-${row}`} x={138 + col * 8} y={88 + row * 13} width="5" height="8"
                        fill={Math.random() > 0.4 ? "rgba(184,149,42,0.45)" : "rgba(184,149,42,0.1)"} />
                    ))
                  )}
                  <polygon points="170,20 165,80 175,80" fill="rgba(184,149,42,0.5)" />
                  <ellipse cx="170" cy="440" rx="80" ry="12" fill="rgba(184,149,42,0.1)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#EDE3CC] via-transparent to-transparent" />
                <div className="absolute inset-0 border border-[#B8952A]/20" />
                {/* Card info */}
                <div className="absolute bottom-0 inset-x-0 p-5" style={{ background: "rgba(237,227,204,0.85)", backdropFilter: "blur(8px)" }}>
                  <div className="h-px bg-gradient-to-r from-[#B8952A]/60 to-transparent mb-3" />
                  <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light">Starting from</p>
                  <p className="text-[#1C1610]/80 text-2xl font-light mt-1 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ₹ 12 Cr <span className="text-[#1C1610]/30 text-sm">onwards</span>
                  </p>
                </div>
                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 border border-[#B8952A]/30" style={{ background: "rgba(245,237,224,0.85)", backdropFilter: "blur(8px)" }}>
                  <span className="text-[#B8952A] text-[7px] tracking-[0.5em] uppercase font-light">{slide.tag}</span>
                </div>
              </div>
              {/* Offset frame */}
              <div className="absolute -bottom-3 -right-3 w-full max-w-[340px] aspect-[3/4] border border-[#B8952A]/15 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6 lg:px-16 pb-10 flex items-end justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[#B8952A] text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>0{current + 1}</span>
          <div className="w-px h-6 bg-[#1C1610]/12" />
          <span className="text-[#1C1610]/25 text-xs font-light">0{SLIDES.length}</span>
        </div>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="group flex items-center">
              <div className={`transition-all duration-500 ${i === current ? "w-8 h-px bg-[#B8952A]" : "w-2 h-px bg-[#1C1610]/20 group-hover:bg-[#1C1610]/40"}`} />
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#1C1610]/25 text-[8px] tracking-[0.45em] uppercase font-light" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Scroll</span>
          <div className="w-px h-10 overflow-hidden bg-[#1C1610]/10">
            <div className="w-full bg-[#B8952A]" style={{ height: "50%", animation: "scrollDown 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-[#B8952A]/15" style={{ background: "rgba(245,237,224,0.70)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#B8952A]/12">
            {[{ value: "42,000+", label: "Homes Delivered" }, { value: "4,500+", label: "Acres Developed" }, { value: "30+", label: "Years of Legacy" }, { value: "4", label: "Global Cities" }].map(({ value, label }) => (
              <div key={label} className="px-8 py-5 flex flex-col gap-1">
                <p className="text-[#1C1610]/80 text-xl font-light tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{value}</p>
                <p className="text-[#1C1610]/35 text-[8px] tracking-[0.4em] uppercase font-light">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}