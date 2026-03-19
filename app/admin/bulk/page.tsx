"use client";

import { useState, useRef } from "react";
import { databases, DATABASE_ID, RESIDENCES_COLLECTION_ID } from "@/lib/appwrite";
import { ID } from "appwrite";

interface ResidenceRow {
  name: string;
  location: string;
  type: string;
  beds: string;
  price: string;
  area: string;
  status: string;
  floors: string;
  order: string;
  imageUrl: string;
}

const REQUIRED_COLUMNS = ["name", "location", "type", "beds"];
const ALL_COLUMNS = ["name", "location", "type", "beds", "price", "area", "status", "floors", "order", "imageUrl"];

const SAMPLE_CSV = `name,location,type,beds,price,area,status,floors,order,imageUrl
World One,Worli Sea Face Mumbai,Ultra Luxury,3-5 BHK,₹ 12 Cr+,2800-6200 sq.ft,Ready to Move,117 Floors,1,https://example.com/image1.jpg
Lodha Malabar,Malabar Hill Mumbai,Ultra Luxury,4-6 BHK,₹ 25 Cr+,4200-9000 sq.ft,Accepting Expressions,42 Floors,2,
Lodha Park,Lower Parel Mumbai,Premium,2-4 BHK,₹ 8.5 Cr+,1850-3600 sq.ft,Limited Units,68 Floors,3,`;

function parseCSV(text: string): ResidenceRow[] {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: ResidenceRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Handle quoted values with commas inside
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of lines[i]) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === "," && !inQuotes) { values.push(current.trim()); current = ""; }
      else { current += char; }
    }
    values.push(current.trim());

    const row: any = {};
    headers.forEach((h, idx) => { row[h] = values[idx] ?? ""; });

    // Only add if required fields are present
    if (row.name && row.location && row.type && row.beds) {
      rows.push({
        name: row.name || "",
        location: row.location || "",
        type: row.type || "Premium",
        beds: row.beds || "",
        price: row.price || "",
        area: row.area || "",
        status: row.status || "Ready to Move",
        floors: row.floors || "",
        order: row.order || String(i),
        imageUrl: row.imageurl || row.imageUrl || "",
      });
    }
  }
  return rows;
}

type RowStatus = "pending" | "uploading" | "success" | "error";

interface RowState {
  row: ResidenceRow;
  status: RowStatus;
  error?: string;
}

export default function BulkUploadPage() {
  const [rows, setRows]           = useState<RowState[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [done, setDone]           = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [dragOver, setDragOver]   = useState(false);
  const fileRef                   = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setParseError(null);
    setRows([]); setDone(false); setProgress(0);

    if (!file.name.endsWith(".csv")) {
      setParseError("Please upload a .csv file."); return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      if (parsed.length === 0) {
        setParseError("No valid rows found. Make sure required columns (name, location, type, beds) are present.");
        return;
      }
      setRows(parsed.map((row) => ({ row, status: "pending" })));
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (rows.length === 0) return;
    setUploading(true); setDone(false); setProgress(0);

    let successCount = 0;

    for (let i = 0; i < rows.length; i++) {
      setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, status: "uploading" } : r));

      try {
        await databases.createDocument(
          DATABASE_ID,
          RESIDENCES_COLLECTION_ID,
          ID.unique(),
          rows[i].row
        );
        setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, status: "success" } : r));
        successCount++;
      } catch (err: any) {
        setRows((prev) => prev.map((r, idx) =>
          idx === i ? { ...r, status: "error", error: err?.message || "Failed" } : r
        ));
      }

      setProgress(Math.round(((i + 1) / rows.length) * 100));
      // Small delay to avoid rate limiting
      await new Promise((res) => setTimeout(res, 120));
    }

    setUploading(false); setDone(true);
  };

  const downloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = "lodha-residences-sample.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const successCount = rows.filter((r) => r.status === "success").length;
  const errorCount   = rows.filter((r) => r.status === "error").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(184,149,42,1) 1px,transparent 1px),linear-gradient(90deg,rgba(184,149,42,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Nav */}
      <div className="sticky top-0 z-40 border-b border-[#B8952A]/15"
        style={{ background: "rgba(250,246,239,0.94)", backdropFilter: "blur(20px)" }}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8952A]/50 to-transparent" />
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 border border-[#B8952A] rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#B8952A] rotate-45" />
              </div>
            </div>
            <div className="leading-none">
              <p className="text-[#1C1610] tracking-[0.28em] font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>LODHA</p>
              <p className="text-[#B8952A] text-[7px] tracking-[0.5em] font-light mt-0.5">BULK UPLOAD</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="/admin" className="text-[#1C1610]/35 hover:text-[#B8952A] text-[9px] tracking-[0.4em] uppercase font-light transition-colors duration-300">
              ← Admin
            </a>
            <a href="/residences" target="_blank" className="text-[#1C1610]/35 hover:text-[#B8952A] text-[9px] tracking-[0.4em] uppercase font-light transition-colors duration-300">
              Live ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-16 py-14">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-[#B8952A]/60" />
            <span className="text-[#B8952A] text-[8px] tracking-[0.6em] uppercase font-light">Bulk Import</span>
          </div>
          <h1 className="text-[#1C1610] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,48px)" }}>
            Upload <em className="text-[#1C1610]/30">Multiple Properties</em>
          </h1>
          <p className="text-[#1C1610]/40 font-light mt-3 max-w-lg text-sm leading-relaxed">
            Upload a CSV file with up to 50 properties at once. Each row becomes a residence card on your live page.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10">

          {/* Left — Upload + Preview */}
          <div className="flex flex-col gap-6">

            {/* Drop zone */}
            {rows.length === 0 && (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center py-20 px-8 text-center
                  ${dragOver ? "border-[#B8952A]/60 bg-[#B8952A]/05" : "border-[#B8952A]/20 hover:border-[#B8952A]/45 hover:bg-[#B8952A]/02"}`}>
                <input ref={fileRef} type="file" accept=".csv" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                {/* Icon */}
                <div className="w-14 h-14 border border-[#B8952A]/25 flex items-center justify-center mb-5"
                  style={{ background: "rgba(184,149,42,0.04)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="#B8952A" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M3 15V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V15" stroke="#B8952A" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </div>

                <p className="text-[#1C1610]/60 font-light mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                  {dragOver ? "Drop your CSV here" : "Drag & drop your CSV file"}
                </p>
                <p className="text-[#1C1610]/30 text-[10px] tracking-wide font-light">or click to browse</p>

                {parseError && (
                  <div className="mt-5 px-5 py-3 border border-red-300/40 bg-red-50">
                    <p className="text-red-600 text-[10px] font-light tracking-wide">{parseError}</p>
                  </div>
                )}
              </div>
            )}

            {/* Parsed preview table */}
            {rows.length > 0 && (
              <div>
                {/* Table header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <p className="text-[#1C1610]/60 text-sm font-light">
                      <span className="text-[#B8952A] font-medium"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>
                        {rows.length}
                      </span>
                      {" "}properties ready
                    </p>
                    {done && (
                      <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase font-light">
                        <span className="text-emerald-600">{successCount} uploaded</span>
                        {errorCount > 0 && <span className="text-red-500">{errorCount} failed</span>}
                      </div>
                    )}
                  </div>
                  {!uploading && (
                    <button onClick={() => { setRows([]); setDone(false); setProgress(0); }}
                      className="text-[#1C1610]/30 hover:text-[#1C1610]/60 text-[9px] tracking-[0.4em] uppercase font-light transition-colors duration-300">
                      ✕ Clear
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                {(uploading || done) && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#1C1610]/35 text-[9px] tracking-[0.4em] uppercase font-light">
                        {done ? "Complete" : `Uploading… ${progress}%`}
                      </p>
                      <p className="text-[#1C1610]/35 text-[9px] font-light">{successCount} / {rows.length}</p>
                    </div>
                    <div className="h-1 bg-[#B8952A]/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#B8952A] to-[#D4B96A] transition-all duration-500"
                        style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                {/* Rows */}
                <div className="border border-[#B8952A]/12 overflow-hidden">
                  {/* Thead */}
                  <div className="grid grid-cols-[24px_2fr_2fr_1fr_1fr_80px] border-b border-[#B8952A]/10"
                    style={{ background: "rgba(184,149,42,0.04)" }}>
                    {["", "Name", "Location", "Type", "Price", "Status"].map((h, i) => (
                      <div key={i} className="px-4 py-3">
                        <p className="text-[#1C1610]/25 text-[8px] tracking-[0.4em] uppercase font-light">{h}</p>
                      </div>
                    ))}
                  </div>

                  {/* Rows */}
                  <div className="max-h-[500px] overflow-y-auto">
                    {rows.map((r, i) => (
                      <div key={i}
                        className={`grid grid-cols-[24px_2fr_2fr_1fr_1fr_80px] border-b border-[#B8952A]/06 last:border-0 transition-colors duration-300
                          ${r.status === "success" ? "bg-emerald-50/50" : r.status === "error" ? "bg-red-50/50" : r.status === "uploading" ? "bg-[#B8952A]/04" : ""}`}>
                        {/* Row number / status icon */}
                        <div className="px-4 py-3.5 flex items-center justify-center">
                          {r.status === "pending"   && <span className="text-[#1C1610]/20 text-[9px] font-light">{i + 1}</span>}
                          {r.status === "uploading" && (
                            <div className="w-3 h-3 border border-[#B8952A] border-t-transparent rounded-full animate-spin" />
                          )}
                          {r.status === "success"   && <span className="text-emerald-500 text-[11px]">✓</span>}
                          {r.status === "error"     && <span className="text-red-500 text-[11px]" title={r.error}>✕</span>}
                        </div>
                        <div className="px-4 py-3.5 flex items-center">
                          <p className="text-[#1C1610]/70 text-[11px] font-light"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px" }}>{r.row.name}</p>
                        </div>
                        <div className="px-4 py-3.5 flex items-center">
                          <p className="text-[#1C1610]/35 text-[10px] font-light">{r.row.location}</p>
                        </div>
                        <div className="px-4 py-3.5 flex items-center">
                          <p className="text-[#B8952A]/60 text-[8px] tracking-[0.3em] uppercase font-light">{r.row.type}</p>
                        </div>
                        <div className="px-4 py-3.5 flex items-center">
                          <p className="text-[#1C1610]/50 text-[11px] font-light"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}>{r.row.price || "—"}</p>
                        </div>
                        <div className="px-4 py-3.5 flex items-center">
                          {r.status === "error" && (
                            <p className="text-red-500 text-[8px] font-light leading-tight">{r.error?.slice(0, 30)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload button */}
                {!done && (
                  <div className="mt-6">
                    <button onClick={handleUpload} disabled={uploading}
                      className="relative px-10 py-4 overflow-hidden group disabled:opacity-60 transition-opacity"
                      style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", backgroundSize: "200%", fontFamily: "'Montserrat', sans-serif" }}>
                      <span className="relative z-10 text-[9px] tracking-[0.45em] uppercase font-medium text-white">
                        {uploading ? `Uploading ${progress}%…` : `Upload All ${rows.length} Properties`}
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                    <p className="text-[#1C1610]/25 text-[9px] font-light mt-3">
                      Each property is uploaded one by one to avoid rate limits.
                    </p>
                  </div>
                )}

                {/* Done state */}
                {done && (
                  <div className="mt-6 flex items-center gap-5">
                    <div className="border border-emerald-400/30 bg-emerald-50 px-5 py-3 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <p className="text-emerald-700 text-[10px] tracking-[0.35em] uppercase font-light">
                        {successCount} of {rows.length} uploaded successfully
                      </p>
                    </div>
                    <a href="/residences" target="_blank"
                      className="text-[#B8952A] text-[9px] tracking-[0.4em] uppercase font-light hover:opacity-70 transition-opacity">
                      View Live →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — Instructions */}
          <div className="flex flex-col gap-6">

            {/* Download sample */}
            <div className="border border-[#B8952A]/15 p-6" style={{ background: "rgba(245,237,224,0.5)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-px bg-[#B8952A]/50" />
                <p className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light">Step 1</p>
              </div>
              <p className="text-[#1C1610]/65 font-light mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                Download the template
              </p>
              <p className="text-[#1C1610]/35 text-[11px] font-light leading-relaxed mb-4">
                Use our sample CSV as a starting point. Fill in your property data row by row.
              </p>
              <button onClick={downloadSample}
                className="flex items-center gap-3 text-[#B8952A] text-[9px] tracking-[0.4em] uppercase font-light border border-[#B8952A]/25 px-5 py-2.5 hover:bg-[#B8952A]/5 transition-colors duration-300">
                ↓ Download Sample CSV
              </button>
            </div>

            {/* Column guide */}
            <div className="border border-[#B8952A]/12 p-6" style={{ background: "rgba(245,237,224,0.5)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-px bg-[#B8952A]/50" />
                <p className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light">Step 2</p>
              </div>
              <p className="text-[#1C1610]/65 font-light mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                Fill in your data
              </p>
              <div className="flex flex-col gap-2">
                {ALL_COLUMNS.map((col) => (
                  <div key={col} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${REQUIRED_COLUMNS.includes(col) ? "bg-[#B8952A]" : "bg-[#1C1610]/15"}`} />
                    <p className="text-[#1C1610]/55 text-[10px] font-light tracking-wide">{col}</p>
                    {REQUIRED_COLUMNS.includes(col) && (
                      <span className="text-[#B8952A]/60 text-[8px] tracking-[0.3em] uppercase font-light ml-auto">required</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#B8952A]/10">
                <p className="text-[#1C1610]/30 text-[9px] font-light leading-relaxed">
                  Gold dot = required. Grey dot = optional. Leave optional cells empty if not applicable.
                </p>
              </div>
            </div>

            {/* Upload step */}
            <div className="border border-[#B8952A]/12 p-6" style={{ background: "rgba(245,237,224,0.5)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-px bg-[#B8952A]/50" />
                <p className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light">Step 3</p>
              </div>
              <p className="text-[#1C1610]/65 font-light mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
                Upload & publish
              </p>
              <p className="text-[#1C1610]/35 text-[11px] font-light leading-relaxed">
                Drag your CSV into the drop zone. Preview the data, then click Upload. Each property appears live on <span className="text-[#B8952A]">/residences</span> instantly.
              </p>
            </div>

            {/* Type & Status values */}
            <div className="border border-[#B8952A]/12 p-6" style={{ background: "rgba(245,237,224,0.5)" }}>
              <p className="text-[#B8952A] text-[8px] tracking-[0.55em] uppercase font-light mb-4">Valid Values</p>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[#1C1610]/40 text-[9px] tracking-[0.4em] uppercase font-light mb-2">type</p>
                  {["Ultra Luxury", "Premium", "New Launch"].map((v) => (
                    <p key={v} className="text-[#1C1610]/55 text-[10px] font-light py-0.5">· {v}</p>
                  ))}
                </div>
                <div className="h-px bg-[#B8952A]/10" />
                <div>
                  <p className="text-[#1C1610]/40 text-[9px] tracking-[0.4em] uppercase font-light mb-2">status</p>
                  {["Ready to Move", "Accepting Expressions", "Limited Units", "Sold Out", "New Launch", "Enquire Now"].map((v) => (
                    <p key={v} className="text-[#1C1610]/55 text-[10px] font-light py-0.5">· {v}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// 