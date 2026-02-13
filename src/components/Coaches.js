"use client";

import Image from "next/image";
import { useInView, fadeUp } from "@/hooks/useInView";

const STAFF = [
  {
    name: "Coach Aaron",
    role: "Head Coach / Program Director",
    img: "/images/coach-aaron.jpg",
    bio: "Founded Gilbert Air Strike and built the program from the ground up. Brings years of coaching experience across multiple levels of flag football. Development-first approach with a focus on building complete athletes and leaders on and off the field.",
    accent: "#CC0000",
  },
  {
    name: "Coach TBD",
    role: "Offensive Coordinator",
    img: null,
    bio: "Coaching staff position available. We\u2019re looking for coaches who believe in development over wins and want to help build something special.",
    accent: "#999",
  },
  {
    name: "Coach TBD",
    role: "Defensive Coordinator",
    img: null,
    bio: "Coaching staff position available. We\u2019re looking for coaches who believe in development over wins and want to help build something special.",
    accent: "#999",
  },
];

export default function Coaches() {
  const [ref, visible] = useInView();

  return (
    <section id="coaches" style={{ padding: "7rem 0", background: "#f5f5f5" }} className="section-pad">
      <div ref={ref} style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="sec-label" style={{ color: "var(--red)", marginBottom: 12, ...fadeUp(visible) }}>
            Leadership
          </div>
          <h2
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(48px, 6vw, 80px)",
              letterSpacing: 2,
              color: "#111",
              ...fadeUp(visible, 0.1),
            }}
          >
            COACHING <span style={{ color: "var(--red)" }}>STAFF</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {STAFF.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                ...fadeUp(visible, 0.15 + i * 0.1),
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
              <div style={{ height: 280, position: "relative", background: "#e8e8e8" }}>
                {c.img ? (
                  <Image src={c.img} alt={c.name} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#d5d5d5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 24, color: "#bbb" }}>?</span>
                    </div>
                    <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#bbb", fontFamily: "var(--font-barlow-condensed)" }}>
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
              <div style={{ padding: 28 }}>
                <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: 30, letterSpacing: 1, color: "#111", marginBottom: 4 }}>
                  {c.name}
                </h3>
                <div style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: c.accent, marginBottom: 16 }}>
                  {c.role}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#777", fontWeight: 300 }}>{c.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
