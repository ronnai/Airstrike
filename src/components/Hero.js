import Link from "next/link";
import AnthemButton from "./AnthemButton";

export default function Hero() {
  return (
    <section style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />

      <div style={{
        position: "relative", zIndex: 10, height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "0 24px",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/asset8-new.svg"
          alt="Gilbert Air Strike"
          style={{
            width: "min(180px, 35vw)", height: "auto",
            filter: "drop-shadow(0 0 30px rgba(236,35,46,0.4))",
            marginBottom: 24,
            animation: "fadeInUp 0.8s ease 0.2s both",
          }}
        />
        <p style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: 15, letterSpacing: 5, textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)", marginBottom: 48,
          animation: "fadeInUp 0.8s ease 0.4s both",
        }}>
          Development-First Flag Football
        </p>

        <div style={{
          display: "flex", gap: 20, flexWrap: "wrap",
          justifyContent: "center", animation: "fadeInUp 0.8s ease 0.6s both",
        }}>
          <Link href="/boys" style={{
            padding: "18px 44px", fontSize: 15, fontWeight: 700,
            letterSpacing: 4, textTransform: "uppercase",
            fontFamily: "var(--font-barlow-condensed)",
            background: "var(--red)", color: "#fff",
            border: "2px solid var(--red)", borderRadius: 8,
            textDecoration: "none", transition: "all 0.3s",
          }}>
            Boys Program
          </Link>
          <Link href="/girls" style={{
            padding: "18px 44px", fontSize: 15, fontWeight: 700,
            letterSpacing: 4, textTransform: "uppercase",
            fontFamily: "var(--font-barlow-condensed)",
            background: "transparent", color: "var(--teal)",
            border: "2px solid var(--teal)", borderRadius: 8,
            textDecoration: "none", transition: "all 0.3s",
          }}>
            Girls Program
          </Link>
        </div>
        <AnthemButton />
      </div>

      <div style={{
        position: "absolute", bottom: 32, left: "50%",
        transform: "translateX(-50%)", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 8, animation: "pulse 2s ease-in-out infinite",
      }}>
        <span style={{
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
          fontFamily: "var(--font-barlow-condensed)",
          color: "rgba(255,255,255,0.35)",
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 24,
          background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)",
        }} />
      </div>
    </section>
  );
}
