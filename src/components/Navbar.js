"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Boys Program", href: "/boys" },
  { label: "Girls Program", href: "/girls" },
  { label: "About", href: "/#about" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "Contact", href: "/#contact" },
  { label: "Player Portal", href: "/portal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "16px clamp(1.5rem, 5vw, 4rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s",
        animation: "slideDown 0.6s ease",
      }}
    >
      <Link href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/asset8-new.svg"
          alt="Gilbert Air Strike"
          style={{ height: 40, width: "auto", filter: "drop-shadow(0 0 8px rgba(236,35,46,0.3))" }}
        />
      </Link>
      <div style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
              fontWeight: 600, fontFamily: "var(--font-barlow-condensed)",
              padding: "8px 0",
              borderBottom: "2px solid transparent",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderBottomColor = "var(--red)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderBottomColor = "transparent";
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
