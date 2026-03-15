"use client";
import { useState } from "react";

const OFFICES = [
  { city: "Mumbai", flag: "🇮🇳", address: "Lodha Excelus, N.M. Joshi Marg, Mahalaxmi", phone: "+91 22 6139 9500", email: "mumbai@lodhagroup.com", hours: "Mon–Sat: 9am–7pm" },
  { city: "London", flag: "🇬🇧", address: "1 Grosvenor Square, Mayfair, London W1K 6JP", phone: "+44 20 7758 4880", email: "london@lodhagroup.com", hours: "Mon–Fri: 9am–6pm" },
  { city: "Dubai", flag: "🇦🇪", address: "DAMAC Smart Heights, Barsha Heights, Dubai", phone: "+971 4 553 1800", email: "dubai@lodhagroup.com", hours: "Sun–Thu: 9am–6pm" },
  { city: "New York", flag: "🇺🇸", address: "125 Greenwich Street, Manhattan, NY 10006", phone: "+1 212 390 9800", email: "ny@lodhagroup.com", hours: "Mon–Fri: 9am–6pm" },
];
const ENQUIRY_TYPES = ["Residential Purchase", "Commercial Leasing", "Investment Advisory", "NRI Services", "Media & Press", "General Enquiry"];

export default function ContactPage() {
  const [selected, setSelected] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#EDE3CC 0%,#FAF6EF 65%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_20%,rgba(184,149,42,0.07)_0%,transparent_65%)]" />
        <div className="absolute top-28 left-6 lg:left-16 w-14 h-14 border-l border-t border-[#B8952A]/25" />
        <div className="absolute top-28 right-6 lg:right-16 w-14 h-14 border-r border-t border-[#B8952A]/25" />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16 text-center flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-[#B8952A]/60" />
            <span className="text-[#B8952A] text-[8px] tracking-[0.6em] uppercase font-light">Private Concierge</span>
            <div className="w-5 h-px bg-[#B8952A]/60" />
          </div>
          <h1 className="text-[#1C1610] font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px,7vw,90px)" }}>
            Let's <em className="text-[#1C1610]/35">Connect</em>
          </h1>
          <p className="text-[#1C1610]/45 max-w-lg font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.8vw,18px)", fontStyle: "italic" }}>
            Our private advisors are at your disposal — any time, any question, any city.
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16 pb-24">
        <div className="grid lg:grid-cols-12 gap-0 border border-[#B8952A]/15">
          {/* Form */}
          <div className="lg:col-span-7 p-8 lg:p-12 border-r border-[#B8952A]/12" style={{ background: "#FAF6EF" }}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 py-16 text-center">
                <div className="w-12 h-12 border border-[#B8952A]/50 rotate-45 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#B8952A] rotate-45" />
                </div>
                <div>
                  <h3 className="text-[#1C1610]/85 font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px" }}>Thank You, {formData.name.split(" ")[0]}</h3>
                  <p className="text-[#1C1610]/45 text-[11px] font-light tracking-wide">A private advisor will contact you within 24 hours.</p>
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#B8952A]/50 to-transparent" />
                <p className="text-[#B8952A] text-[8px] tracking-[0.45em] uppercase font-light">Reference: LOD-{Date.now().toString().slice(-6)}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-2">Enquiry Form</p>
                  <h2 className="text-[#1C1610]/85 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px,3vw,36px)" }}>
                    Begin Your <em className="text-[#1C1610]/40">Conversation</em>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#1C1610]/40 text-[8px] tracking-[0.45em] uppercase font-light">Full Name *</label>
                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="border border-[#B8952A]/20 focus:border-[#B8952A]/60 px-4 py-3.5 text-[#1C1610]/75 text-[11px] tracking-wider font-light outline-none transition-colors duration-300 placeholder:text-[#1C1610]/20"
                      style={{ background: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif" }} placeholder="Rahul Sharma" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#1C1610]/40 text-[8px] tracking-[0.45em] uppercase font-light">Email Address *</label>
                    <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email"
                      className="border border-[#B8952A]/20 focus:border-[#B8952A]/60 px-4 py-3.5 text-[#1C1610]/75 text-[11px] tracking-wider font-light outline-none transition-colors duration-300 placeholder:text-[#1C1610]/20"
                      style={{ background: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif" }} placeholder="rahul@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#1C1610]/40 text-[8px] tracking-[0.45em] uppercase font-light">Phone Number</label>
                    <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="tel"
                      className="border border-[#B8952A]/20 focus:border-[#B8952A]/60 px-4 py-3.5 text-[#1C1610]/75 text-[11px] tracking-wider font-light outline-none transition-colors duration-300 placeholder:text-[#1C1610]/20"
                      style={{ background: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif" }} placeholder="+91 98XXXXXXXX" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#1C1610]/40 text-[8px] tracking-[0.45em] uppercase font-light">Enquiry Type</label>
                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="border border-[#B8952A]/20 focus:border-[#B8952A]/60 px-4 py-3.5 text-[#1C1610]/55 text-[11px] tracking-wider font-light outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif" }}>
                      <option value="" disabled>Select type</option>
                      {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#1C1610]/40 text-[8px] tracking-[0.45em] uppercase font-light">Your Message</label>
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4}
                    className="border border-[#B8952A]/20 focus:border-[#B8952A]/60 px-4 py-3.5 text-[#1C1610]/75 text-[11px] tracking-wider font-light outline-none transition-colors duration-300 resize-none placeholder:text-[#1C1610]/20"
                    style={{ background: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif" }} placeholder="Tell us about your requirements..." />
                </div>
                <div className="flex items-center gap-5">
                  <button onClick={() => { if (formData.name && formData.email) setSubmitted(true); }}
                    className="relative group flex-1 sm:flex-none px-10 py-4 overflow-hidden"
                    style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
                    <span className="relative z-10 text-[9px] tracking-[0.45em] uppercase font-medium text-white">Submit Enquiry</span>
                    <span className="absolute inset-0 bg-white/25 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                  <p className="text-[#1C1610]/30 text-[8px] tracking-wide font-light">Your information is secure and confidential.</p>
                </div>
              </div>
            )}
          </div>

          {/* Offices */}
          <div className="lg:col-span-5 flex flex-col" style={{ background: "#F5EDE0" }}>
            <div className="p-8 lg:p-12 pb-4">
              <p className="text-[#B8952A] text-[8px] tracking-[0.5em] uppercase font-light mb-2">Global Offices</p>
              <h2 className="text-[#1C1610]/80 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,2.5vw,30px)" }}>
                Find Us <em className="text-[#1C1610]/40">Worldwide</em>
              </h2>
            </div>
            <div className="flex flex-col flex-1">
              {OFFICES.map((o, i) => (
                <button key={o.city} onClick={() => setSelected(i)}
                  className="group text-left flex items-start gap-5 px-8 lg:px-12 py-6 border-t border-[#B8952A]/10 transition-all duration-400"
                  style={{ background: selected === i ? "rgba(255,255,255,0.5)" : "transparent" }}>
                  <span className="text-2xl mt-0.5">{o.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-light transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: selected === i ? "#1C1610" : "rgba(28,22,16,0.60)" }}>{o.city}</p>
                      {selected === i && <div className="w-1 h-1 bg-[#B8952A] rotate-45" />}
                    </div>
                    {selected === i && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        <p className="text-[#1C1610]/45 text-[9px] tracking-wide font-light">{o.address}</p>
                        <p className="text-[#B8952A]/80 text-[9px] tracking-wide font-light">{o.phone}</p>
                        <p className="text-[#1C1610]/35 text-[9px] tracking-wide font-light">{o.email}</p>
                        <p className="text-[#1C1610]/28 text-[8px] tracking-[0.3em] uppercase font-light mt-1">{o.hours}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-8 lg:p-12 pt-6 border-t border-[#B8952A]/10">
              <p className="text-[#1C1610]/30 text-[8px] tracking-[0.45em] uppercase font-light mb-2">Direct Concierge Line</p>
              <p className="text-[#1C1610]/75 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px" }}>+91 80 6748 1800</p>
              <p className="text-[#1C1610]/30 text-[9px] tracking-wide font-light mt-1">Available 24 × 7 for priority clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}