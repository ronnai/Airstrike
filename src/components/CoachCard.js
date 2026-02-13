"use client";

import Image from "next/image";

export default function CoachCard({ name, role, img, bio, accent = "#999" }) {
  return (
    <div
      style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)", transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ height: 220, position: "relative", background: "#e8e8e8" }}>
        {img ? (
          <Image src={img} alt={name} fill style={{ objectFit: "cover" }} />
        ) : (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: "#d5d5d5",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 24, color: "#bbb" }}>?</span>
            </div>
            <span style={{
              fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
              color: "#bbb", fontFamily: "var(--font-barlow-condensed)",
            }}>
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: 24 }}>
        <h3 style={{
          fontFamily: "var(--font-bebas)", fontSize: 26,
          letterSpacing: 1, color: "#111", marginBottom: 4,
        }}>
          {name}
        </h3>
        <div style={{
          fontFamily: "var(--font-barlow-condensed)", fontSize: 12,
          letterSpacing: 3, textTransform: "uppercase",
          fontWeight: 700, color: accent, marginBottom: 12,
        }}>
          {role}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#777", fontWeight: 300 }}>
          {bio}
        </p>
      </div>
    </div>
  );
}
