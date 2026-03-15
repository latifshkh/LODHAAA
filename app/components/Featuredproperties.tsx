"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
  type: string;
  price: string;
  area: string;
  status: string;
  accentColor: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Lodha Malabar",
    location: "Malabar Hill",
    city: "Mumbai",
    type: "Ultra Luxury",
    price: "₹ 25 Cr+",
    area: "4,200 sq.ft",
    status: "Accepting Expressions",
    accentColor: "rgba(201,168,76,0.9)",
  },
  {
    id: 2,
    name: "World One",
    location: "Worli Sea Face",
    city: "Mumbai",
    type: "Iconic Supertall",
    price: "₹ 12 Cr+",
    area: "2,800 sq.ft",
    status: "Ready to Move",
    accentColor: "rgba(230,200,140,0.9)",
  },
  {
    id: 3,
    name: "Lodha Park",
    location: "Lower Parel",
    city: "Mumbai",
    type: "Premium Residences",
    price: "₹ 8.5 Cr+",
    area: "2,100 sq.ft",
    status: "Limited Units",
    accentColor: "rgba(180,148,60,0.9)",
  },
  {
    id: 4,
    name: "Lincoln Square",
    location: "Holborn",
    city: "London",
    type: "Prime London",
    price: "£ 1.8M+",
    area: "1,650 sq.ft",
    status: "Enquire Now",
    accentColor: "rgba(201,168,76,0.9)",
  },
];

const BuildingIllustration = ({ variant }: { variant: number }) => {
  const configs = [
    { height: 380, floors: 38, width: 60, x: 90 },
    { height: 420, floors: 42, width: 70, x: 85 },
    { height: 320, floors: 32, width: 80, x: 80 },
    { height: 360, floors: 36, width: 65, x: 87 },
  ];
  const c = configs[variant % configs.length];

  return (
    <svg viewBox="0 0 240 460" fill="none" className="absolute inset-0 w-full h-full">
      {Array.from({ length: 25 }).map((_, i) => (
        <circle key={i} cx={15 + (i * 43) % 210} cy={8 + (i * 19) % 80}
          r={0.5 + (i % 3) * 0.4} fill="rgba(255,255,255,0.5)" />
      ))}
      <rect x={c.x} y={460 - c.height} width={c.width} height={c.height}
        fill="rgba(201,168,76,0.04)" />
      {Array.from({ length: c.floors }).map((_, i) => (
        <rect key={i} x={c.x + 2} y={462 - c.height + i * 10} width={c.width - 4} height={8}
          fill={`rgba(201,168,76,${0.03 + (i % 3) * 0.015})`} />
      ))}
      {Array.from({ length: Math.floor(c.width / 10) }).map((_, col) =>
        Array.from({ length: Math.floor(c.height / 14) }).map((_, row) => (
          <rect key={`${col}-${row}`}
            x={c.x + 4 + col * 9} y={462 - c.height + 4 + row * 12}
            width="5" height="7"
            fill={Math.random() > 0.45 ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.06)"} />
        ))
      )}
      {variant % 2 === 0 && (
        <polygon points={`${c.x + c.width / 2},${460 - c.height - 30} ${c.x + c.width / 2 - 4},${460 - c.height} ${c.x + c.width / 2 + 4},${460 - c.height}`}
          fill="rgba(201,168,76,0.35)" />
      )}
      <ellipse cx={c.x + c.width / 2} cy={455} rx={c.width * 0.7} ry={8}
        fill="rgba(201,168,76,0.07)" />
    </svg>
  );
};

export default function FeaturedProperties() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative bg-[#080806] py-28 overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Section ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[8px] tracking-[0.55em] uppercase font-light">
                Curated Collection
              </span>
            </div>
            <h2
              className="text-white/90 font-light leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 56px)",
              }}
            >
              Signature<br />
              <span className="italic text-white/50">Residences</span>
            </h2>
          </div>

          <Link
            href="#"
            className="group flex items-center gap-4 self-start md:self-auto"
          >
            <span className="text-white/35 text-[9px] tracking-[0.4em] uppercase font-light group-hover:text-[#C9A84C] transition-colors duration-300">
              View All Properties
            </span>
            <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-[#C9A84C] transition-all duration-500" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card */}
              <div
                className="relative overflow-hidden border border-white/[0.06] group-hover:border-[#C9A84C]/25 transition-all duration-700"
                style={{
                  background: "linear-gradient(160deg, #111009 0%, #0A0906 100%)",
                }}
              >
                {/* Architectural illustration */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#141008] via-[#0f0c06] to-[#080604]" />
                  <BuildingIllustration variant={property.id - 1} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080604] via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-[#C9A84C]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[7px] tracking-[0.45em] uppercase font-light px-3 py-1.5 border border-[#C9A84C]/30 text-[#C9A84C] bg-black/30 backdrop-blur-sm"
                    >
                      {property.status}
                    </span>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[7px] tracking-[0.35em] uppercase font-light text-white/25"
                    >
                      {property.type}
                    </span>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p
                      className="text-[#C9A84C] text-[7px] tracking-[0.5em] uppercase font-light"
                    >
                      {property.location} · {property.city}
                    </p>
                    <h3
                      className="text-white/90 font-light mt-1.5 leading-tight group-hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(18px, 2vw, 22px)",
                      }}
                    >
                      {property.name}
                    </h3>
                  </div>

                  <div className="h-px bg-gradient-to-r from-[#C9A84C]/20 to-transparent group-hover:from-[#C9A84C]/50 transition-colors duration-700" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/20 text-[7px] tracking-[0.4em] uppercase font-light">
                        Starting
                      </p>
                      <p
                        className="text-white/85 font-light mt-0.5 tracking-wide"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "18px",
                        }}
                      >
                        {property.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/20 text-[7px] tracking-[0.4em] uppercase font-light">
                        From
                      </p>
                      <p className="text-white/50 text-[11px] font-light mt-0.5 tracking-wide">
                        {property.area}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0"
                  >
                    <span className="text-[#C9A84C] text-[8px] tracking-[0.4em] uppercase font-light">
                      View Details
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
                  </div>
                </div>

                {/* Bottom shimmer line on hover */}
                <div
                  className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Drop shadow glow on hover */}
              <div
                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  boxShadow: "0 0 40px rgba(201,168,76,0.08), 0 0 0 1px rgba(201,168,76,0.12)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}