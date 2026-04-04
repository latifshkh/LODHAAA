// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account, Client, OAuthProvider, Account } from "@/lib/appwrite";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "google">("email");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        await account.get();
        router.push("/dashboard");
      } catch (error) {
        // User is not authenticated, stay on login page
      }
    };

    checkAuth();
  }, [router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await account.createEmailPasswordSession(credentials.email, credentials.password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please check the email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError("");

    try {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

      const accountInstance = new Account(client);

      accountInstance.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/dashboard`,
        `${window.location.origin}/login`
      );
    } catch (err: any) {
      setError(err.message || "Failed to initiate Google login");
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* Left Panel - Branding */}
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
              Luxury Real Estate Management
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
              Access the exclusive admin dashboard to manage premium properties worldwide.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { value: "42,000+", label: "Homes Managed" },
              { value: "4", label: "Global Cities" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <p
                  className="text-[#1C1610]/80 text-2xl font-light tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {value}
                </p>
                <p className="text-[#1C1610]/35 text-[8px] tracking-[0.4em] uppercase font-light">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo (mobile only) */}
          <div className="text-center mb-12 lg:hidden">
            <div className="flex justify-center">
              <div className="w-5 h-px bg-[#B8952A]" />
            </div>
            <h2 className="text-[#B8952A] text-[11px] tracking-[0.55em] uppercase font-light mt-2">LODHA ADMIN</h2>
          </div>

          <h2
            className="text-3xl font-light text-center mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1C1610" }}
          >
            Welcome Back
          </h2>

          <p className="text-center text-[#1C1610]/50 text-sm mb-10">Sign in to your admin account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Auth Method Tabs */}
          <div className="flex border-b border-[#B8952A]/20 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                authMethod === "email" ? "text-[#B8952A] border-b-2 border-[#B8952A]" : "text-[#1C1610]/50"
              }`}
              onClick={() => setAuthMethod("email")}
            >
              Email Login
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                authMethod === "google" ? "text-[#B8952A] border-b-2 border-[#B8952A]" : "text-[#1C1610]/50"
              }`}
              onClick={() => setAuthMethod("google")}
            >
              Google Login
            </button>
          </div>

          {authMethod === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1C1610]/70 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50"
                  placeholder="admin@lodha.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#1C1610]/70 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-[#B8952A]/20 rounded focus:ring-2 focus:ring-[#B8952A]/30 focus:border-[#B8952A]/50 transition-colors bg-white/50"
                  placeholder="Your password"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#B8952A] focus:ring-[#B8952A]/30 border-[#B8952A]/20 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-[#1C1610]/50">
                    Remember me
                  </label>
                </div>

                <Link href="/forgot-password" className="text-[#B8952A] hover:text-[#1C1610]/50 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group flex items-center justify-center gap-3 px-6 py-4 overflow-hidden rounded transition-all"
                style={{
                  background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)",
                  backgroundSize: "200%",
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                <span className="relative z-10 text-xs tracking-[0.2em] uppercase font-medium text-white">
                  {isLoading ? "Signing in..." : "Sign in with Email"}
                </span>
                <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-[#B8952A]/20 rounded hover:border-[#B8952A]/40 transition-colors bg-white/50 mb-4"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-[#1C1610]/70">
                  {isLoading ? "Redirecting to Google..." : "Sign in with Google"}
                </span>
              </button>

              <p className="text-[#1C1610]/50 text-sm mt-4">
                You will be redirected to Google to authenticate your account.
              </p>
            </div>
          )}

          <div className="mt-10 text-center text-sm text-[#1C1610]/50">
            <p>
              Don't have an account?{" "}
              <Link
                href="/request-access"
                className="text-[#B8952A] hover:text-[#1C1610]/70 transition-colors font-medium"
              >
                Request access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}