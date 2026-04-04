// app/request-access/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function RequestAccess() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          company: form.company,
          role: form.role,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
    } catch (err: any) {
      setErrorMsg("Failed to send request. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg,#F0E8D5 0%,#FAF6EF 50%,#F5EDE0 100%)" }}
          />
          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(184,149,42,1) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,42,1) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Diagonal hatching */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg,rgba(184,149,42,1),rgba(184,149,42,1) 1px,transparent 1px,transparent 120px)",
            }}
          />
          {/* Corner ornaments */}
          <div className="absolute top-24 left-8 w-16 h-16 border-l border-t border-[#B8952A]/25" />
          <div className="absolute top-24 right-8 w-16 h-16 border-r border-t border-[#B8952A]/25" />
          <div className="absolute bottom-24 left-8 w-16 h-16 border-l border-b border-[#B8952A]/25" />
          <div className="absolute bottom-24 right-8 w-16 h-16 border-r border-b border-[#B8952A]/25" />
          {/* Large monogram */}
          <div
            className="absolute bottom-0 right-0 overflow-hidden select-none pointer-events-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(300px,40vw,520px)",
              lineHeight: 0.85,
              color: "rgba(184,149,42,0.04)",
            }}
          >
            L
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 w-full">
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#B8952A]" />
              <span className="text-[#B8952A] text-[9px] tracking-[0.55em] uppercase font-light">
                LODHA ADMIN PORTAL
              </span>
            </div>

            <h1
              className="leading-none mt-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(42px,5vw,72px)",
                fontWeight: 300,
                color: "#1C1610",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Request Admin Access
            </h1>

            <div className="flex items-center gap-4 mt-8">
              <div className="h-px w-12 bg-gradient-to-r from-[#B8952A] to-[#D4B96A]" />
              <div className="w-1.5 h-1.5 bg-[#B8952A] rotate-45" />
              <div className="h-px max-w-[80px] w-20 bg-gradient-to-r from-[#B8952A]/40 to-transparent" />
            </div>

            <p
              className="font-light leading-relaxed max-w-md mt-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "18px",
                fontStyle: "italic",
                color: "rgba(28,22,16,0.50)",
              }}
            >
              Submit your details and our team will review your request within 24 hours.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6 mt-4">
            {[
              { step: "01", label: "Submit your request" },
              { step: "02", label: "Team reviews & verifies" },
              { step: "03", label: "Receive access credentials" },
            ].map(({ step, label }) => (
              <div key={step} className="flex items-center gap-4">
                <span
                  className="text-[#B8952A]/40 text-xs tracking-[0.3em]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {step}
                </span>
                <div className="w-8 h-px bg-[#B8952A]/20" />
                <span className="text-[#1C1610]/50 text-xs tracking-[0.15em] uppercase font-light">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="text-center mb-10 lg:hidden">
            <div className="flex justify-center">
              <div className="w-5 h-px bg-[#B8952A]" />
            </div>
            <h2 className="text-[#B8952A] text-[11px] tracking-[0.55em] uppercase font-light mt-2">
              LODHA ADMIN
            </h2>
          </div>

          {status === "success" ? (
            /* Success State */
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border border-[#B8952A]/30 rotate-45 flex items-center justify-center">
                  <div className="w-8 h-8 border border-[#B8952A]/60 rotate-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#B8952A] -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2
                className="text-3xl font-light mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1C1610" }}
              >
                Request Submitted
              </h2>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8952A]" />
                <div className="w-1 h-1 bg-[#B8952A] rotate-45" />
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8952A]" />
              </div>

              <p
                className="text-[#1C1610]/50 leading-relaxed mb-10 max-w-sm mx-auto"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontStyle: "italic" }}
              >
                Our team has been notified and will review your request within 24 hours.
              </p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#B8952A] text-xs tracking-[0.3em] uppercase font-light hover:text-[#1C1610]/60 transition-colors"
              >
                <span className="w-4 h-px bg-current" />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h2
                className="text-3xl font-light text-center mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1C1610" }}
              >
                Request Access
              </h2>
              <p className="text-center text-[#1C1610]/50 text-sm mb-10">
                Fill in your details to request admin access
              </p>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[#1C1610]/50 mb-2">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="Arjun Mehta"
                    className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[#1C1610]/50 mb-2">
                    Work Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="arjun@lodha.com"
                    className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50 text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[#1C1610]/50 mb-2">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50 text-sm"
                  />
                </div>

                {/* Company + Role side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#1C1610]/50 mb-2">
                      Company
                    </label>
                    <input
                      name="company"
                      type="text"
                      required
                      value={form.company}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      placeholder="Lodha Group"
                      className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#1C1610]/50 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      required
                      value={form.role}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50 text-sm text-[#1C1610]/70"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="Property Manager">Property Manager</option>
                      <option value="Sales Manager">Sales Manager</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Executive">Executive</option>
                      <option value="IT Admin">IT Admin</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full relative group flex items-center justify-center gap-3 px-6 py-4 overflow-hidden rounded transition-all mt-2"
                  style={{
                    background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)",
                    backgroundSize: "200%",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  <span className="relative z-10 text-xs tracking-[0.2em] uppercase font-medium text-white">
                    {status === "loading" ? "Submitting..." : "Submit Request"}
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-[#1C1610]/50">
                Already have an account?{" "}
                <Link href="/login" className="text-[#B8952A] hover:text-[#1C1610]/70 transition-colors font-medium">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}