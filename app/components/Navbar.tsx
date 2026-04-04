"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Residences", href: "/residences" },
  { label: "Commercial", href: "/commercial" },
  { label: "Destinations", href: "/destinations" },
  { label: "Legacy", href: "/legacy" },
  { label: "Contact", href: "/contact" },
];

const LodhaLogo = () => (
  <div className="flex items-center gap-3.5 group cursor-pointer select-none">
    <div className="relative w-9 h-9 flex-shrink-0">
      <div className="absolute inset-0 border border-[#B8952A] rotate-45 transition-transform duration-700 group-hover:rotate-[135deg]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-[#B8952A] rotate-45" />
      </div>
    </div>
    <div className="leading-none">
      <p className="text-[#1C1610] text-[22px] tracking-[0.28em] font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        LODHA
      </p>
      <p className="text-[#B8952A] text-[8px] tracking-[0.5em] font-light mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        REAL ESTATE
      </p>
    </div>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-in-out"
        style={{
          background: scrolled ? "rgba(252,248,242,0.92)" : "rgba(252,248,242,0.80)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          borderBottom: "1px solid rgba(184,149,42,0.18)",
          boxShadow: scrolled ? "0 4px 40px rgba(28,22,16,0.08)" : "none",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/60 to-transparent" />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" aria-label="Lodha Home"><LodhaLogo /></Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => setActiveLink(label)} className="relative group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <span className={`text-[10px] tracking-[0.35em] uppercase font-light transition-colors duration-300 ${activeLink === label ? "text-[#B8952A]" : "text-[#1C1610]/55 group-hover:text-[#1C1610]/90"}`}>
                    {label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#B8952A] transition-all duration-500 ${activeLink === label ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-5">
              {user ? (
                /* Logged in — show admin link + logout */
                <div className="flex items-center gap-5">
                  <Link
                    href="/admin"
                    className="text-[9px] tracking-[0.4em] uppercase font-light text-[#1C1610]/40 hover:text-[#B8952A] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[9px] tracking-[0.4em] uppercase font-light text-[#1C1610]/40 hover:text-red-500 transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                /* Not logged in — show login button */
                <div className="flex items-center gap-5">
                  <button
                    className="text-[9px] tracking-[0.4em] uppercase font-light text-[#1C1610]/40 hover:text-[#B8952A] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Enquire
                  </button>
                  <Link
                    href="/login"
                    className="text-[9px] tracking-[0.4em] uppercase font-light text-[#1C1610]/40 hover:text-[#B8952A] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Login
                  </Link>
                  <button
                    className="relative px-6 py-[11px] overflow-hidden group"
                    style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="relative z-10 text-[9px] tracking-[0.4em] uppercase font-medium text-white">Book Now</span>
                    <span className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
              <span className={`block w-6 h-px bg-[#B8952A] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-6 h-px bg-[#1C1610]/40 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block w-6 h-px bg-[#B8952A] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/15 to-transparent" />

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
          style={{ background: "rgba(252,248,242,0.98)", backdropFilter: "blur(32px)", borderTop: "1px solid rgba(184,149,42,0.15)", boxShadow: "0 24px 60px rgba(28,22,16,0.12)" }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#B8952A]/50 to-transparent" />
          <div className="px-7 py-8 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => { setActiveLink(label); setMenuOpen(false); }}
                className="group flex items-center justify-between py-4 border-b border-[#1C1610]/[0.07] last:border-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <div className="flex items-center gap-4">
                  <span className={`w-5 h-px transition-all duration-400 ${activeLink === label ? "bg-[#B8952A] w-7" : "bg-[#1C1610]/15 group-hover:bg-[#B8952A]/60 group-hover:w-7"}`} />
                  <span className={`text-[11px] tracking-[0.4em] uppercase transition-colors duration-300 ${activeLink === label ? "text-[#B8952A] font-normal" : "text-[#1C1610]/70 font-light group-hover:text-[#1C1610]"}`}>
                    {label}
                  </span>
                </div>
                <span className={`text-[10px] transition-all duration-300 ${activeLink === label ? "text-[#B8952A]" : "text-[#1C1610]/20 opacity-0 group-hover:opacity-100"}`}>›</span>
              </Link>
            ))}

            {/* Mobile auth buttons */}
            <div className="flex items-center gap-4 pt-6">
              {user ? (
                <>
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 py-3.5 text-[9px] tracking-[0.45em] uppercase font-medium text-white text-center"
                    style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="flex-1 py-3.5 text-[9px] tracking-[0.45em] uppercase font-light text-red-500 border border-red-200 hover:bg-red-50 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex-1 py-3.5 text-[9px] tracking-[0.45em] uppercase font-medium text-white"
                    style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Book Now
                  </button>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 py-3.5 text-[9px] tracking-[0.45em] uppercase font-light text-[#1C1610]/60 border border-[#1C1610]/15 hover:border-[#B8952A]/40 hover:text-[#B8952A] transition-all duration-300 text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
            <p className="text-[#1C1610]/25 text-[8px] tracking-[0.3em] uppercase font-light pt-3 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mumbai · London · Dubai · New York</p>
          </div>
        </div>
      </nav>
    </>
  );
}