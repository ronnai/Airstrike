"use client";

import Image from "next/image";
import { useInView, fadeUp } from "@/hooks/useInView";

const PHOTOS = [
  { src: "/images/hero-team.jpg", cols: 2 },
  { src: "/images/action-teal.jpg", cols: 1 },
  { src: "/images/kids-group.jpg", cols: 1 },
  { src: "/images/jersey3-teal.jpg", cols: 1 },
  { src: "/images/coaches.jpg", cols: 1 },
  { src: "/images/kids-group-red.jpg", cols: 1 },
  { src: "/images/hero-team-red.jpg", cols: 2 },
];

export default function Gallery() {
  const [ref, visible] = useInView();

  return (
    <section id="gallery" style={{ padding: "7rem 0", background: "#fff" }} className="section-pad">
      <div ref={ref} style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="sec-label" style={{ color: "var(--teal-dark)", marginBottom: 12, ...fadeUp(visible) }}>
            On the Field
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
            <span style={{ color: "var(--red)" }}>GAME</span> DAY
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            ...fadeUp(visible, 0.2),
          }}
        >
          {PHOTOS.map((g, i) => (
            <div
              key={i}
              style={{
                gridColumn: `span ${g.cols}`,
                height: 320,
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={g.src}
                alt="Gilbert Air Strike game day"
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
