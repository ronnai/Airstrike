"use client";

import Image from "next/image";
import { useInView, fadeUp } from "@/hooks/useInView";

const STATS = [
  { val: "2", label: "Programs (Boys + Girls)", color: "#CC0000" },
  { val: "8U\u2013HS", label: "Age Divisions", color: "#1a9e75" },
  { val: "70+", label: "Athletes Evaluated", color: "#CC0000" },
  { val: "MULTI", label: "Teams Per Age Group", color: "#1a9e75" },
];

const VALUES = [
  {
    title: "DEVELOPMENT FIRST",
    desc: "Every drill, every rep, every evaluation is designed to build complete athletes. We prioritize long-term growth over short-term wins.",
    accent: "#CC0000",
  },
  {
    title: "CHARACTER MATTERS",
    desc: "Coachability, effort, and body language are evaluated alongside speed and skill. We build leaders, not just players.",
    accent: "#111",
  },
  {
    title: "NEXT LEVEL READY",
    desc: "From 8U through high school, with multiple teams per age group, we prepare athletes for every next step \u2014 club, varsity, or beyond.",
    accent: "#1a9e75",
  },
];

export default function About() {
  const [aboutRef, aboutVis] = useInView();
  const [statsRef, statsVis] = useInView();
  const [valuesRef, valuesVis] = useInView();

  return (
    <section id="about" style={{ padding: "7rem 0" }} className="section-pad">
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div ref={aboutRef} style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="sec-label" style={{ color: "var(--red)", marginBottom: 12, ...fadeUp(aboutVis) }}>
            About the Program
          </div>
          <h2
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(48px, 6vw, 80px)",
              lineHeight: 1,
              letterSpacing: 2,
              color: "#111",
              ...fadeUp(aboutVis, 0.1),
            }}
          >
            BUILT DIFFERENT. <span style={{ color: "var(--red)" }}>COACHED HARDER.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
            ...fadeUp(aboutVis, 0.2),
          }}
          className="about-grid"
        >
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.9, color: "#555", fontWeight: 300, marginBottom: 24 }}>
              Gilbert Air Strike isn&apos;t just another flag football program. We are a
              development-first organization in the East Valley running both boys
              and girls programs from 8U all the way through high school &mdash; with
              multiple teams per age group.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, color: "#555", fontWeight: 300, marginBottom: 24 }}>
              Our coaching philosophy:{" "}
              <strong style={{ color: "#111", fontWeight: 600 }}>
                development over wins, character over trophies, and preparation for the next level
              </strong>
              {" "}&mdash; whatever that looks like for each athlete.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, color: "#555", fontWeight: 300 }}>
              Both the{" "}
              <strong style={{ color: "var(--red)", fontWeight: 600 }}>Gilbert Air Strike</strong> (boys) and{" "}
              <strong style={{ color: "var(--teal-dark)", fontWeight: 600 }}>Lady Air Strike</strong> (girls)
              offer elite-level coaching, individualized player evaluations, and a culture built
              on accountability and growth. This isn&apos;t rec ball. This is Air Strike.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <Image
              src="/images/kids-group.jpg"
              alt="Air Strike athletes"
              width={1400}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -16,
                right: 24,
                background: "var(--red)",
                borderRadius: 10,
                padding: "12px 20px",
                boxShadow: "0 8px 30px rgba(204,0,0,0.3)",
              }}
            >
              <Image
                src="/images/allgas.png"
                alt="All Gas No Brakes"
                width={120}
                height={28}
                style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            marginTop: 96,
            padding: "48px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", ...fadeUp(statsVis, i * 0.08) }}>
              <div style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 4vw, 64px)", lineHeight: 1, color: s.color }}>
                {s.val}
              </div>
              <div className="sec-label" style={{ color: "#999", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div
          ref={valuesRef}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 80 }}
          className="values-grid"
        >
          {VALUES.map((v, i) => (
            <div
              key={i}
              style={{
                padding: 32,
                borderRadius: 16,
                background: "#fafafa",
                borderLeft: `4px solid ${v.accent}`,
                ...fadeUp(valuesVis, i * 0.1),
              }}
            >
              <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: 26, letterSpacing: 1, color: v.accent, marginBottom: 12 }}>
                {v.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666", fontWeight: 300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
