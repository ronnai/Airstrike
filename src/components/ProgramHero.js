"use client";

import { useInView, fadeUp } from "@/hooks/useInView";

export default function ProgramHero({ program }) {
  const [ref, visible] = useInView();

  return (
    <section
      style={{
        position: "relative", padding: "160px 0 80px",
        background: "#111", overflow: "hidden",
      }}
      className="section-pad"
    >
      {program.heroImage && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${program.heroImage})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.15,
        }} />
      )}
      <div ref={ref} style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.logo}
          alt={program.name}
          style={{
            width: 80, height: 80, objectFit: "contain",
            marginBottom: 24, borderRadius: 12,
            filter: `drop-shadow(0 0 20px ${program.colorGlow})`,
            ...fadeUp(visible),
          }}
        />
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 8vw, 96px)",
          letterSpacing: 2, color: "#fff", lineHeight: 1,
          ...fadeUp(visible, 0.1),
        }}>
          {program.name.toUpperCase()}
        </h1>
        <p style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: 15, letterSpacing: 5, textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)", marginTop: 16,
          ...fadeUp(visible, 0.2),
        }}>
          {program.tagline}
        </p>
      </div>
    </section>
  );
}
