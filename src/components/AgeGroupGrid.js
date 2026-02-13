"use client";

import Link from "next/link";
import { AGE_GROUPS } from "@/data/teams";
import { useInView, fadeUp } from "@/hooks/useInView";

function AgeCard({ href, label, fullName, style, accentColor }) {
  return (
    <Link
      href={href}
      style={{
        display: "block", textDecoration: "none",
        background: "#fff", borderRadius: 16, padding: 32,
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        borderLeft: `4px solid ${accentColor}`,
        ...style,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{
        fontFamily: "var(--font-bebas)", fontSize: 48,
        letterSpacing: 2, color: "#111", lineHeight: 1, marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font-barlow-condensed)", fontSize: 13,
        letterSpacing: 3, textTransform: "uppercase", color: "#999", fontWeight: 600,
      }}>
        {fullName}
      </div>
    </Link>
  );
}

export default function AgeGroupGrid({ program }) {
  const [ref, visible] = useInView();
  const accent = program === "boys" ? "var(--red)" : "var(--teal)";

  return (
    <div ref={ref} style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 20, maxWidth: 1200, margin: "0 auto",
    }}>
      {AGE_GROUPS.map((ag, i) => (
        <AgeCard
          key={ag.slug}
          href={`/${program}/${ag.slug}`}
          label={ag.label}
          fullName={ag.fullName}
          accentColor={accent}
          style={fadeUp(visible, 0.05 + i * 0.05)}
        />
      ))}
    </div>
  );
}
