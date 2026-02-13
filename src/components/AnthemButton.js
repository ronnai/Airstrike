"use client";

import { useState, useRef } from "react";

export default function AnthemButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  function toggle() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/anthem.mp3");
      audioRef.current.loop = true;
      audioRef.current.onended = () => setPlaying(false);
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <button
      onClick={toggle}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 24px", marginTop: 32,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 40, cursor: "pointer",
        transition: "all 0.3s",
        animation: "fadeInUp 0.8s ease 0.8s both",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
      }}
    >
      <span style={{ fontSize: 16 }}>{playing ? "\u23F8" : "\u{1F50A}"}</span>
      <span style={{
        fontFamily: "var(--font-barlow-condensed)",
        fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
        fontWeight: 700, color: "rgba(255,255,255,0.5)",
      }}>
        {playing ? "Pause Anthem" : "Play the Anthem"}
      </span>
    </button>
  );
}
