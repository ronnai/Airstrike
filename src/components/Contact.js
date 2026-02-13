"use client";

import { useInView, fadeUp } from "@/hooks/useInView";

export default function Contact() {
  const [ref, visible] = useInView();

  return (
    <section id="contact" style={{ padding: "7rem 0", background: "#111", color: "#fff" }} className="section-pad">
      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div className="sec-label" style={{ color: "var(--red)", marginBottom: 12, ...fadeUp(visible) }}>
          Join the Program
        </div>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 6vw, 80px)",
            letterSpacing: 2,
            lineHeight: 1,
            marginBottom: 24,
            ...fadeUp(visible, 0.1),
          }}
        >
          READY TO <span style={{ color: "var(--red)" }}>COMPETE</span>?
        </h2>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 300,
            maxWidth: 580,
            margin: "0 auto 48px",
            ...fadeUp(visible, 0.2),
          }}
        >
          Whether you&apos;re a first-time player or an experienced competitor,
          Gilbert Air Strike and Lady Air Strike have a spot for you &mdash; 8U
          through high school, boys and girls. Reach out to learn about tryouts,
          open practices, and registration.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56, ...fadeUp(visible, 0.3) }}>
          <a
            href="mailto:coach@gilbertairstrike.com"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              borderRadius: 8,
              background: "var(--red)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-barlow-condensed)",
              transition: "all 0.3s",
            }}
          >
            Contact Us
          </a>
          <a
            href="/portal"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              borderRadius: 8,
              background: "transparent",
              color: "var(--teal)",
              border: "2px solid var(--teal)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-barlow-condensed)",
              transition: "all 0.3s",
            }}
          >
            Player Portal
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap", ...fadeUp(visible, 0.4) }}>
          <div>
            <div className="sec-label" style={{ color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>Email</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)" }}>coach@gilbertairstrike.com</div>
          </div>
          <div>
            <div className="sec-label" style={{ color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>Location</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)" }}>Gilbert, Arizona</div>
          </div>
        </div>
      </div>
    </section>
  );
}
