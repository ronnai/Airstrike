"use client";

import { useState, useMemo, useRef, useEffect } from "react";

// ─── STORAGE WRAPPER (localStorage) ──────────────────────────────────────
const storage = {
  get(key) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? { value: v } : null;
    } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  },
};

// ─── PASSWORD GATE / LANDING ──────────────────────────────────────────────
const PASS_HASH = "AaronLovesRefs";

function LandingPage({ onCoachLogin, onParentAccess }) {
  const [tab, setTab] = useState("parent"); // parent | coach
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, [tab]);

  const handleCoach = () => {
    if (pw === PASS_HASH) { onCoachLogin(); }
    else { setError("Access denied \u2014 invalid password"); setShake(true); setTimeout(() => setShake(false), 500); setPw(""); }
  };

  const handleParent = () => {
    const clean = code.trim();
    const match = PIN_LOOKUP[clean];
    if (match) { onParentAccess(match.player, match.group); }
    else { setError("PIN not found \u2014 check your 5-digit code and try again"); setShake(true); setTimeout(() => setShake(false), 500); }
  };

  const handleKey = (e) => { if (e.key === "Enter") { tab === "coach" ? handleCoach() : handleParent(); } };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f", fontFamily: "var(--font-outfit), sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 60L60 0' stroke='%23ffffff' stroke-width='0.3' opacity='0.02'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='60' height='60' fill='url(%23g)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-12px)} 40%{transform:translateX(12px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: 380, animation: shake ? "shake 0.4s ease-in-out" : "fadeIn 0.8s ease" }}>

        <div style={{ width: 72, height: 72, margin: "0 auto 20px", borderRadius: "50%", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
          {tab === "coach" ? "\ud83d\udd12" : "\ud83c\udfc8"}
        </div>

        <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          GILBERT AIR STRIKE
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 2, textTransform: "uppercase" }}>
          Player Evaluation Portal
        </p>

        {/* Tab Switcher */}
        <div style={{ display: "flex", marginBottom: 20, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => { setTab("parent"); setError(""); }} style={{ flex: 1, padding: "10px 0", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 1, border: "none", cursor: "pointer", background: tab === "parent" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.02)", color: tab === "parent" ? "#d4af37" : "rgba(255,255,255,0.3)", transition: "all 0.2s" }}>
            PARENT PORTAL
          </button>
          <button onClick={() => { setTab("coach"); setError(""); }} style={{ flex: 1, padding: "10px 0", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 1, border: "none", borderLeft: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", background: tab === "coach" ? "rgba(204,0,0,0.15)" : "rgba(255,255,255,0.02)", color: tab === "coach" ? "#CC0000" : "rgba(255,255,255,0.3)", transition: "all 0.2s" }}>
            COACH LOGIN
          </button>
        </div>

        {/* Input */}
        <div style={{ marginBottom: 12 }}>
          <input
            ref={inputRef}
            type={tab === "coach" ? "password" : "text"}
            value={tab === "coach" ? pw : code}
            onChange={e => { tab === "coach" ? setPw(e.target.value) : setCode(e.target.value.replace(/\D/g, "").slice(0, 5)); setError(""); }}
            onKeyDown={handleKey}
            placeholder={tab === "coach" ? "Enter coach password..." : "Enter 5-digit PIN"}
            style={{
              width: "100%", padding: "14px 18px", borderRadius: 8, fontSize: 13,
              fontFamily: "var(--font-jetbrains), monospace", letterSpacing: tab === "coach" ? 2 : 1, textAlign: "center",
              background: "rgba(255,255,255,0.04)",
              border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: "#f0f0f0", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(212,175,55,0.4)"}
            onBlur={e => e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)"}
          />
        </div>

        {error && <p style={{ margin: "0 0 12px", fontSize: 11, color: "#ef4444", fontFamily: "var(--font-jetbrains), monospace" }}>{error}</p>}

        <button
          onClick={tab === "coach" ? handleCoach : handleParent}
          style={{
            width: "100%", padding: "12px 0", borderRadius: 8, border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace",
            letterSpacing: 2, textTransform: "uppercase",
            background: tab === "coach" ? "linear-gradient(135deg, #CC0000, #aa0000)" : "linear-gradient(135deg, #d4af37, #b8941e)",
            color: tab === "coach" ? "#fff" : "#0a0a0f", transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.85"}
          onMouseLeave={e => e.target.style.opacity = "1"}
        >
          {tab === "coach" ? "Enter Command Center" : "View My Evaluation"}
        </button>

        <p style={{ margin: "20px 0 0", fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 1 }}>
          {tab === "coach" ? "\ud83c\udfc8 Tryout Evaluation Dashboard \u2022 Coaches Only" : "\ud83c\udfc8 Enter the 5-digit PIN provided by your coach"}
        </p>
      </div>
    </div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────
const PLAYERS_RAW = {
  "10u": [
    { name: "Gracie", pos1: null, pos2: null, pos3: null, speed: 4.5, catching: 4, flagPull: 3.5, throwing: 3.5, routeRun: 4, defending: 5, snaps: 3.5, effort: 4.5, iq: 4, coachability: 4, total: 40.5, notes: "" },
    { name: "Charlotte", pos1: null, pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 4, routeRun: 3.5, defending: 4, snaps: 3.5, effort: 4.5, iq: 4, coachability: 4, total: 39.5, notes: "" },
    { name: "Mimi", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 4, flagPull: 4, throwing: 3, routeRun: 3.5, defending: 4, snaps: 5, effort: 4, iq: 4, coachability: 4, total: 39, notes: "" },
    { name: "Tawni", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 4, throwing: 3.5, routeRun: 4, defending: 4, snaps: 4, effort: 4, iq: 4, coachability: 4, total: 39, notes: "" },
    { name: "Gianna", pos1: null, pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 4, defending: 4, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 38.5, notes: "" },
    { name: "Scarlett", pos1: null, pos2: null, pos3: null, speed: 4.5, catching: 4, flagPull: 4, throwing: 3, routeRun: 4, defending: 4, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 38.5, notes: "" },
    { name: "Dea", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 36, notes: "" },
    { name: "Sloan", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 4, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3.5, effort: 3.5, iq: 4, coachability: 4, total: 36, notes: "" },
    { name: "Monte", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3.5, routeRun: 3, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 36, notes: "" },
    { name: "Harlow", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 2.5, routeRun: 3.5, defending: 4, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 35.5, notes: "" },
    { name: "Lexi", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 3, coachability: 4, total: 35.5, notes: "" },
    { name: "Kopp", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 4, snaps: 3.5, effort: 4, iq: 3.5, coachability: 3.5, total: 35.5, notes: "" },
    { name: "Madison", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 4, flagPull: 3.5, throwing: 3, routeRun: 4, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 36.5, notes: "" },
    { name: "Cora", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 4, snaps: 3, effort: 4, iq: 3.5, coachability: 3.5, total: 35, notes: "" },
    { name: "Sophia", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3.5, routeRun: 3, defending: 3.5, snaps: 3, effort: 4, iq: 3.5, coachability: 3.5, total: 35, notes: "" },
    { name: "Harper", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 4, flagPull: 3.5, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 2.5, effort: 3.5, iq: 4, coachability: 3.5, total: 35, notes: "" },
    { name: "Fiona", pos1: null, pos2: null, pos3: null, speed: 3, catching: 4, flagPull: 3.5, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 3.5, iq: 3.5, coachability: 4, total: 35, notes: "" },
    { name: "Lola", pos1: null, pos2: null, pos3: null, speed: 3, catching: 3, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 3, snaps: 3.5, effort: 4, iq: 3.5, coachability: 3.5, total: 33, notes: "" },
    { name: "Jordan", pos1: null, pos2: null, pos3: null, speed: 3, catching: 3, flagPull: 3.5, throwing: 2.5, routeRun: 3, defending: 3, snaps: 3, effort: 3.5, iq: 3.5, coachability: 3.5, total: 31.5, notes: "" },
  ],
  "12u": [
    { name: "Zealand", pos1: "C", pos2: "CB", pos3: null, speed: 4, catching: 4.5, flagPull: 4, throwing: 3, routeRun: 4, defending: 4, snaps: 5, effort: 4, iq: 4, coachability: 5, total: 41.5, notes: "" },
    { name: "Lexi", pos1: "C", pos2: "CB", pos3: "S", speed: 4, catching: 4, flagPull: 4.5, throwing: 3, routeRun: 4, defending: 4, snaps: 5, effort: 3.5, iq: 4, coachability: 4, total: 40, notes: "" },
    { name: "Allie", pos1: "WR", pos2: "S", pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 4, defending: 4, snaps: 3, effort: 4, iq: 3.5, coachability: 4, total: 38, notes: "" },
    { name: "Brinley", pos1: "B", pos2: "WR", pos3: null, speed: 4, catching: 3.5, flagPull: 4.5, throwing: 2.5, routeRun: 3.5, defending: 4, snaps: 3.5, effort: 4, iq: 4, coachability: 4, total: 37.5, notes: "" },
    { name: "Shea", pos1: "WR", pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 4, snaps: 3.5, effort: 4, iq: 4, coachability: 4, total: 37.5, notes: "" },
    { name: "Kylee", pos1: "CB", pos2: "B", pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 4, snaps: 4, effort: 4, iq: 4, coachability: 4, total: 37.5, notes: "" },
    { name: "Laney", pos1: "QB", pos2: "CB", pos3: null, speed: 3.5, catching: 4, flagPull: 3.5, throwing: 4, routeRun: 3.5, defending: 4, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 37.5, notes: "" },
    { name: "Arria G", pos1: "CB", pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3.5, effort: 3.5, iq: 4, coachability: 4, total: 37, notes: "" },
    { name: "Addy Drake", pos1: "QB", pos2: "CB", pos3: "WR", speed: 3.5, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 37, notes: "" },
    { name: "Isabella", pos1: "QB", pos2: "WR", pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 4, routeRun: 3.5, defending: 4, snaps: 3, effort: 4, iq: 3.5, coachability: 4, total: 37, notes: "" },
    { name: "Dakota", pos1: "QB", pos2: "CB", pos3: null, speed: 3.5, catching: 3.5, flagPull: 4, throwing: 4, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 4, coachability: 3.5, total: 36.5, notes: "" },
    { name: "Eva", pos1: "QB", pos2: "WR", pos3: null, speed: 3.5, catching: 4, flagPull: 3.5, throwing: 4, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 3.5, iq: 4, coachability: 4, total: 36.5, notes: "" },
    { name: "Greyson", pos1: "QB", pos2: "B", pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 36, notes: "" },
    { name: "Etta", pos1: "C", pos2: "CB", pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 2, routeRun: 3.5, defending: 3.5, snaps: 5, effort: 4, iq: 3.5, coachability: 4, total: 36, notes: "" },
    { name: "Gianna", pos1: "CB", pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 35.5, notes: "" },
    { name: "Aria", pos1: "CB", pos2: null, pos3: null, speed: 3.5, catching: 4, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 3.5, iq: 3.5, coachability: 3.5, total: 34.5, notes: "" },
    { name: "Emma", pos1: "CB", pos2: "WR", pos3: null, speed: 3.5, catching: 3.5, flagPull: 5, throwing: 2, routeRun: 3.5, defending: 4, snaps: 2, effort: 3.5, iq: 3.5, coachability: 4, total: 34.5, notes: "" },
    { name: "Alana", pos1: "WR", pos2: "CB", pos3: "B", speed: 4, catching: 3.5, flagPull: 3.5, throwing: 2, routeRun: 3, defending: 3.5, snaps: 2, effort: 4, iq: 3.5, coachability: 4, total: 33, notes: "" },
    { name: "Karis", pos1: "WR", pos2: "S", pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 2, routeRun: 3.5, defending: 3.5, snaps: 2, effort: 4, iq: 3.5, coachability: 4, total: 33.5, notes: "" },
    { name: "Audette", pos1: "S", pos2: "WR", pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 2, routeRun: 3, defending: 3.5, snaps: 3, effort: 4, iq: 3, coachability: 4, total: 33, notes: "" },
    { name: "Tatum", pos1: "CB", pos2: null, pos3: null, speed: 3.5, catching: 3, flagPull: 3.5, throwing: 2, routeRun: 3, defending: 3.5, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 33.5, notes: "" },
    { name: "Phoenix", pos1: "B", pos2: "Y", pos3: null, speed: 4, catching: 3, flagPull: 3.5, throwing: 2, routeRun: 3, defending: 3.5, snaps: 3.5, effort: 3, iq: 3, coachability: 4, total: 32.5, notes: "" },
    { name: "Lauren", pos1: "CB", pos2: "WR", pos3: null, speed: 3, catching: 3, flagPull: 3.5, throwing: 2.5, routeRun: 3, defending: 3.5, snaps: 3, effort: 4, iq: 3.5, coachability: 3.5, total: 32.5, notes: "" },
    { name: "Goose", pos1: "S", pos2: "B", pos3: null, speed: 3, catching: 3.5, flagPull: 3.5, throwing: 2.5, routeRun: 3, defending: 3.5, snaps: 2.5, effort: 3.5, iq: 3.5, coachability: 3.5, total: 32, notes: "" },
    { name: "Sophia T", pos1: "B", pos2: "WR", pos3: null, speed: 4, catching: 3, flagPull: 3, throwing: 2, routeRun: 3, defending: 3.5, snaps: 2.5, effort: 4, iq: 3, coachability: 3.5, total: 31.5, notes: "" },
    { name: "Sophia G", pos1: "CB", pos2: null, pos3: null, speed: 3.5, catching: 3, flagPull: 3, throwing: 2.5, routeRun: 3, defending: 3.5, snaps: 2.5, effort: 3.5, iq: 3, coachability: 3.5, total: 31, notes: "" },
  ],
  "14u": [
    { name: "Emily", pos1: "QB", pos2: "S", pos3: null, speed: 4.5, catching: 4, flagPull: 4, throwing: 5, routeRun: 4, defending: 4.5, snaps: 4, effort: 4.5, iq: 4.5, coachability: 5, total: 44, notes: "" },
    { name: "Kenna", pos1: null, pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 4, defending: 4, snaps: 4, effort: 5, iq: 4, coachability: 4.5, total: 41, notes: "" },
    { name: "Shelby", pos1: null, pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 4.5, defending: 4, snaps: 4, effort: 4, iq: 4, coachability: 4.5, total: 40.5, notes: "" },
    { name: "Ady", pos1: null, pos2: null, pos3: null, speed: 4, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 4.5, defending: 4, snaps: 3.5, effort: 5, iq: 4, coachability: 4, total: 40.5, notes: "" },
    { name: "Alexa", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 4, throwing: 3, routeRun: 4, defending: 4, snaps: 3.5, effort: 4, iq: 4, coachability: 4, total: 38, notes: "" },
    { name: "Harper", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 4, flagPull: 4, throwing: 3.5, routeRun: 3.5, defending: 4, snaps: 3.5, effort: 4, iq: 4, coachability: 4, total: 38, notes: "" },
    { name: "Kaia", pos1: "QB", pos2: "CB", pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 4, routeRun: 3.5, defending: 4, snaps: 2.5, effort: 4, iq: 4, coachability: 4, total: 37, notes: "" },
    { name: "Veda", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 36.5, notes: "" },
    { name: "Ayana", pos1: "WR", pos2: "S", pos3: null, speed: 3.5, catching: 4, flagPull: 4, throwing: 2.5, routeRun: 4, defending: 4, snaps: 3, effort: 4, iq: 4, coachability: 4, total: 37, notes: "" },
    { name: "Charlie", pos1: "C", pos2: "CB", pos3: null, speed: 3, catching: 3.5, flagPull: 3.5, throwing: 2.5, routeRun: 3.5, defending: 3.5, snaps: 5, effort: 4, iq: 4, coachability: 4, total: 36.5, notes: "" },
    { name: "Cora Lee", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3.5, routeRun: 3.5, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 36, notes: "" },
    { name: "Mikayla", pos1: "S", pos2: "WR", pos3: null, speed: 4, catching: 3.5, flagPull: 4, throwing: 3, routeRun: 3.5, defending: 4, snaps: 3, effort: 4, iq: 4, coachability: 3.5, total: 36.5, notes: "" },
    { name: "Riley", pos1: null, pos2: null, pos3: null, speed: 4.5, catching: 3, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 35.5, notes: "" },
    { name: "Lilly", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 35.5, notes: "" },
    { name: "Devan", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3.5, effort: 4, iq: 3.5, coachability: 4, total: 35.5, notes: "" },
    { name: "Addison", pos1: null, pos2: null, pos3: null, speed: 4.5, catching: 3, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 3.5, snaps: 3, effort: 4, iq: 3.5, coachability: 4, total: 35, notes: "" },
    { name: "Hailey", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 3.5, coachability: 4, total: 35, notes: "" },
    { name: "Princess", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 4, snaps: 2.5, effort: 4, iq: 3.5, coachability: 4, total: 34.5, notes: "" },
    { name: "Melody", pos1: "WR", pos2: "C", pos3: null, speed: 3.5, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 3.5, iq: 3.5, coachability: 3.5, total: 34, notes: "" },
    { name: "Amerie", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 3.5, snaps: 3, effort: 4, iq: 3.5, coachability: 4, total: 34, notes: "" },
    { name: "Azylnn", pos1: null, pos2: null, pos3: null, speed: 4, catching: 3.5, flagPull: 3.5, throwing: 2, routeRun: 3.5, defending: 3.5, snaps: 3, effort: 4, iq: 3.5, coachability: 3, total: 33.5, notes: "" },
    { name: "Brielle", pos1: null, pos2: null, pos3: null, speed: 3, catching: 3.5, flagPull: 3.5, throwing: 3, routeRun: 3, defending: 3.5, snaps: 3.5, effort: 3.5, iq: 3.5, coachability: 3.5, total: 33.5, notes: "" },
    { name: "Lillian", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3, flagPull: 3.5, throwing: 2, routeRun: 3, defending: 3.5, snaps: 2.5, effort: 4, iq: 4, coachability: 4, total: 33, notes: "" },
    { name: "Afton", pos1: null, pos2: null, pos3: null, speed: 2.5, catching: 3, flagPull: 3, throwing: 3, routeRun: 3, defending: 3, snaps: 3, effort: 4, iq: 3.5, coachability: 4, total: 32, notes: "" },
    { name: "Jayla", pos1: null, pos2: null, pos3: null, speed: 3.5, catching: 3, flagPull: 3, throwing: 2.5, routeRun: 3, defending: 3, snaps: 3, effort: 4, iq: 3, coachability: 4, total: 32, notes: "" },
    { name: "Ryann", pos1: null, pos2: null, pos3: null, speed: 3, catching: 3, flagPull: 3, throwing: 3, routeRun: 3, defending: 3, snaps: 2.5, effort: 3.5, iq: 3.5, coachability: 3.5, total: 31, notes: "" },
  ],
};

const SKILL_KEYS = ["speed", "catching", "flagPull", "throwing", "routeRun", "defending", "snaps", "effort", "iq", "coachability"];

// ─── ACCESS CODES ─────────────────────────────────────────────────────────
// Generate parent access codes: GAS-FIRSTNAME-AGEGROUP
// Simple hash to generate deterministic 5-digit PINs
function hashPin(name, group) {
  const str = name + "-" + group;
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; }
  return String(Math.abs(h) % 90000 + 10000); // always 5 digits, 10000-99999
}

const PIN_LOOKUP = {};
const PLAYER_PINS = {}; // "name-group" -> pin, for coach reference
Object.entries(PLAYERS_RAW).forEach(([group, players]) => {
  players.forEach(p => {
    const pin = hashPin(p.name, group);
    PIN_LOOKUP[pin] = { player: p, group };
    PLAYER_PINS[p.name + "-" + group] = pin;
  });
});

// Current evaluation version — bump this when scores are updated
const EVAL_VERSION = "2025-02-12";

const SKILL_LABELS = { speed: "Speed", catching: "Catching", flagPull: "Flag Pulling", throwing: "Throwing", routeRun: "Route Running", defending: "Defending", snaps: "Snaps", effort: "Effort", iq: "Football IQ", coachability: "Coachability" };
const PHYSICAL_SKILLS = ["speed", "catching", "flagPull", "throwing", "routeRun", "defending", "snaps"];
const INTANGIBLE_SKILLS = ["effort", "iq", "coachability"];

const POS_FULL = { QB: "Quarterback", WR: "Wide Receiver", C: "Center", CB: "Cornerback", S: "Safety", B: "Blitzer/Rusher", Y: "Hybrid" };

const REPORT_SKILL_LABELS = {
  speed: "Speed / Athleticism", catching: "Catching", flagPull: "Flag Pulling",
  throwing: "Throwing", routeRun: "Route Running", defending: "Defense",
  snaps: "Snapping", effort: "Body Language / Effort",
  iq: "Football I.Q / Awareness", coachability: "Coachability"
};

function getPlacement(total) {
  const pct = total / 50;
  if (pct >= 0.82) return "Elite";
  if (pct >= 0.76) return "Select";
  return "Academy";
}

function getReportSummary(p, group) {
  const avg = p.total / 10;
  const scored = SKILL_KEYS.map(k => ({ key: k, val: p[k] })).sort((a, b) => b.val - a.val);
  const strengths = scored.slice(0, 3).map(s => REPORT_SKILL_LABELS[s.key].split("/")[0].trim()).join(" / ");
  const dev = scored.slice(-2).map(s => REPORT_SKILL_LABELS[s.key].split("/")[0].trim().toLowerCase()).join(" and ");

  if (avg >= 4.2) return {strengths, dev: dev.charAt(0).toUpperCase() + dev.slice(1), text: `${p.name} ranks among the top of her class in all skills. She is an exceptional player and is far above average in all skills. To maintain her growth, spring development should be focused on ${dev} mechanics and hand strengthening techniques.`};
  if (avg >= 3.9) return {strengths, dev: dev.charAt(0).toUpperCase() + dev.slice(1), text: `${p.name} is a standout player who demonstrates strong ability across the board. Her top strengths are ${strengths.toLowerCase()}. To continue her development, focused work on ${dev} will help unlock the next level of her game.`};
  if (avg >= 3.7) return {strengths, dev: dev.charAt(0).toUpperCase() + dev.slice(1), text: `${p.name} shows solid all-around skills and competes well at this level. She excels in ${strengths.toLowerCase()} and has a strong foundation to build on. Targeted development in ${dev} during spring training will help her take the next step.`};
  if (avg >= 3.5) return {strengths, dev: dev.charAt(0).toUpperCase() + dev.slice(1), text: `${p.name} is a developing player with clear strengths in ${strengths.toLowerCase()}. She brings good energy and is coachable. Spring development should focus on building confidence and improving ${dev} to become a more complete player.`};
  if (avg >= 3.3) return {strengths, dev: dev.charAt(0).toUpperCase() + dev.slice(1), text: `${p.name} is a growing player who shows promise. Her best attributes are ${strengths.toLowerCase()}. With focused development on ${dev} and continued effort, she has the potential to make strong improvements by next season.`};
  return {strengths, dev: dev.charAt(0).toUpperCase() + dev.slice(1), text: `${p.name} is in the early stages of her flag football development. She shows the most promise in ${strengths.toLowerCase()}. Spring training should prioritize fundamental skill building, especially ${dev}, along with building overall confidence and game awareness.`};
}

function getTier(total, group) {
  const maxes = { "10u": 50, "12u": 50, "14u": 50 };
  const pct = total / maxes[group];
  if (pct >= 0.82) return { label: "ELITE", color: "#d4af37", bg: "rgba(212,175,55,0.12)" };
  if (pct >= 0.76) return { label: "STARTER", color: "#22c55e", bg: "rgba(34,197,94,0.10)" };
  if (pct >= 0.70) return { label: "ROTATION", color: "#3b82f6", bg: "rgba(59,130,246,0.10)" };
  if (pct >= 0.64) return { label: "DEVELOPMENTAL", color: "#a855f7", bg: "rgba(168,85,247,0.10)" };
  return { label: "PROJECT", color: "#94a3b8", bg: "rgba(148,163,184,0.08)" };
}

function getCoachRec(p, group) {
  const avg = p.total / 10;
  const physAvg = PHYSICAL_SKILLS.reduce((s, k) => s + p[k], 0) / PHYSICAL_SKILLS.length;
  const intAvg = INTANGIBLE_SKILLS.reduce((s, k) => s + p[k], 0) / INTANGIBLE_SKILLS.length;
  const best = SKILL_KEYS.reduce((a, b) => p[a] >= p[b] ? a : b);
  const worst = SKILL_KEYS.reduce((a, b) => p[a] <= p[b] ? a : b);
  
  let rec = "";
  let posSuggestion = "";
  
  // Position recommendation
  if (p.throwing >= 4 && p.iq >= 4) posSuggestion = "QB";
  else if (p.speed >= 4 && p.routeRun >= 4 && p.catching >= 4) posSuggestion = "WR1";
  else if (p.speed >= 4 && p.catching >= 3.5) posSuggestion = "WR";
  else if (p.snaps >= 4.5 && p.coachability >= 4) posSuggestion = "C";
  else if (p.flagPull >= 4 && p.defending >= 4 && p.speed >= 3.5) posSuggestion = "B/CB";
  else if (p.defending >= 4 && p.iq >= 4) posSuggestion = "S";
  else if (p.flagPull >= 4 && p.speed >= 4) posSuggestion = "B";
  else if (p.catching >= 4 && p.routeRun >= 3.5) posSuggestion = "WR";
  else if (p.defending >= 3.5 && p.flagPull >= 3.5) posSuggestion = "CB";
  else posSuggestion = "Utility";

  // Coaching recommendation
  if (avg >= 4.2) {
    rec = `${p.name} is a franchise-caliber player. Elite across the board — trust her in high-leverage situations. She should be your go-to in crunch time. Build the offense/defense around her strengths.`;
  } else if (avg >= 3.9) {
    rec = `${p.name} is a day-one starter. Strong fundamentals with ${SKILL_LABELS[best]} being her standout skill (${p[best]}). Focus development reps on ${SKILL_LABELS[worst]} (${p[worst]}) to unlock the next tier.`;
  } else if (avg >= 3.7) {
    rec = `${p.name} is a solid rotation player who can step up as a starter. ${SKILL_LABELS[best]} (${p[best]}) is her calling card. Get her targeted reps on ${SKILL_LABELS[worst]} (${p[worst]}) and she'll compete for a starting spot.`;
  } else if (avg >= 3.5) {
    rec = `${p.name} brings value to the roster with her ${SKILL_LABELS[best]} (${p[best]}). She's a role player who can develop into more.${intAvg >= 3.8 ? " High intangibles suggest strong growth potential — invest in her." : ""} Prioritize ${SKILL_LABELS[worst]} development.`;
  } else if (avg >= 3.3) {
    rec = `${p.name} is a developmental prospect. ${intAvg >= 3.8 ? "Her intangibles are actually her strongest asset — great attitude and coachability mean she'll get better fast." : `Build on her ${SKILL_LABELS[best]} (${p[best]}) and be patient.`} She needs focused work on ${SKILL_LABELS[worst]} (${p[worst]}).`;
  } else {
    rec = `${p.name} is a long-term project. ${intAvg >= 3.5 ? "The motor and attitude are there, which is half the battle at this age." : "Focus on building confidence and fundamentals."} Priority development: ${SKILL_LABELS[worst]} and overall athleticism.`;
  }

  return { rec, posSuggestion };
}

// ─── RADAR CHART SVG ──────────────────────────────────────────────────────
function RadarChart({ player, size = 220, compare = null }) {
  const keys = SKILL_KEYS;
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const angleStep = (2 * Math.PI) / keys.length;
  
  const getPoint = (idx, val) => {
    const angle = angleStep * idx - Math.PI / 2;
    const dist = (val / 5) * r;
    return [cx + dist * Math.cos(angle), cy + dist * Math.sin(angle)];
  };

  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map(level => (
        <polygon
          key={level}
          points={keys.map((_, i) => getPoint(i, level).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={level === 5 ? 1.5 : 0.5}
        />
      ))}
      {keys.map((_, i) => {
        const [x, y] = getPoint(i, 5);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />;
      })}
      {compare && (
        <polygon
          points={keys.map((k, i) => getPoint(i, compare[k]).join(",")).join(" ")}
          fill="rgba(239,68,68,0.10)"
          stroke="rgba(239,68,68,0.5)"
          strokeWidth={1.5}
        />
      )}
      <polygon
        points={keys.map((k, i) => getPoint(i, player[k]).join(",")).join(" ")}
        fill="rgba(212,175,55,0.15)"
        stroke="#d4af37"
        strokeWidth={2}
      />
      {keys.map((k, i) => {
        const [x, y] = getPoint(i, player[k]);
        return <circle key={k} cx={x} cy={y} r={3} fill="#d4af37" />;
      })}
      {keys.map((k, i) => {
        const [x, y] = getPoint(i, 5.6);
        const short = { speed: "SPD", catching: "CTH", flagPull: "FLG", throwing: "THR", routeRun: "RTE", defending: "DEF", snaps: "SNP", effort: "EFF", iq: "IQ", coachability: "CCH" };
        return (
          <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="var(--font-jetbrains), monospace">
            {short[k]}
          </text>
        );
      })}
    </svg>
  );
}

// ─── SKILL BAR ──────────────────────────────────────────────────────────
function SkillBar({ label, value, max = 5, groupAvg }) {
  const pct = (value / max) * 100;
  const avgPct = (groupAvg / max) * 100;
  const color = value >= 4.5 ? "#d4af37" : value >= 4 ? "#22c55e" : value >= 3.5 ? "#3b82f6" : value >= 3 ? "#a855f7" : "#ef4444";
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-jetbrains), monospace" }}>{label}</span>
        <span style={{ fontSize: 14, color, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace" }}>{value.toFixed(1)}</span>
      </div>
      <div style={{ height: 8, borderRadius: 3, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: `linear-gradient(90deg, ${color}88, ${color})`, transition: "width 0.6s ease" }} />
        <div style={{ position: "absolute", top: 0, left: `${avgPct}%`, width: 2, height: "100%", background: "rgba(255,255,255,0.25)", borderRadius: 1 }} title={`Group Avg: ${groupAvg.toFixed(1)}`} />
      </div>
    </div>
  );
}

// ─── HORIZONTAL RANK BAR ──────────────────────────────────────────────────
function RankBar({ players, skill, groupMax }) {
  const sorted = [...players].sort((a, b) => b[skill] - a[skill]);
  const maxVal = Math.max(...sorted.map(p => p[skill]));
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>{SKILL_LABELS[skill]}</div>
      {sorted.slice(0, 5).map((p, i) => {
        const pct = (p[skill] / 5) * 100;
        const color = p[skill] >= 4.5 ? "#d4af37" : p[skill] >= 4 ? "#22c55e" : "#3b82f6";
        return (
          <div key={p.name + i} style={{ display: "flex", alignItems: "center", marginBottom: 3, gap: 8 }}>
            <span style={{ width: 85, fontSize: 14, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-jetbrains), monospace", textAlign: "right", flexShrink: 0 }}>{p.name}</span>
            <div style={{ flex: 1, height: 7, borderRadius: 3, background: "rgba(255,255,255,0.05)" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: color, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains), monospace", width: 30, flexShrink: 0 }}>{p[skill]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── PARENT VIEW ────────────────────────────────────────────────────────
function ParentView({ player: p, group, onBack }) {
  const [seenVersion, setSeenVersion] = useState(null);
  const [parentNote, setParentNote] = useState("");
  const isNew = seenVersion !== null && seenVersion !== EVAL_VERSION;

  // Check storage for last-seen version + load parent note on mount
  useEffect(() => {
    const seenKey = "seen-" + PLAYER_PINS[p.name + "-" + group];
    const noteKey = "pnote-" + p.name + "-" + group;
    (async () => {
      try {
        const res = storage.get(seenKey);
        setSeenVersion(res ? res.value : "none");
      } catch { setSeenVersion("none"); }
      try {
        const noteRes = storage.get(noteKey, true);
        if (noteRes && noteRes.value) setParentNote(noteRes.value);
      } catch {}
    })();
  }, [p.name, group]);

  // Mark as seen
  useEffect(() => {
    if (seenVersion !== null) {
      const key = "seen-" + PLAYER_PINS[p.name + "-" + group];
      (async () => { try { storage.set(key, EVAL_VERSION); } catch {} })();
    }
  }, [seenVersion, p.name, group]);

  const placement = getPlacement(p.total);
  const positions = [p.pos1, p.pos2, p.pos3].filter(Boolean).join(" / ") || "\u2014";
  const summary = getReportSummary(p, group);
  const fmtV = v => v === Math.floor(v) ? String(Math.floor(v)) : String(v);
  const tier = getTier(p.total, group);
  const avg = p.total / 10;

  const noteFor = v => {
    if (v >= 4.5) return "Elite level \u2014 top of age group";
    if (v >= 4) return "Above average \u2014 strong performer";
    if (v >= 3.5) return "Solid \u2014 continue developing";
    if (v >= 3) return "Average \u2014 room to grow";
    if (v >= 2.5) return "Below avg \u2014 needs focused work";
    return "Priority development area";
  };

  const barColor = v => v >= 4.5 ? "#d4af37" : v >= 4 ? "#22c55e" : v >= 3.5 ? "#3b82f6" : v >= 3 ? "#a855f7" : "#ef4444";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "var(--font-outfit), sans-serif", color: "#f0f0f0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 12, fontFamily: "var(--font-jetbrains), monospace", marginBottom: 16, display: "block", margin: "0 auto 16px" }}>
            {"\u2190"} Back to Portal
          </button>
          <h1 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace" }}>
            GILBERT AIR STRIKE
          </h1>
          <h2 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {p.name}{"'"}s Evaluation
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains), monospace" }}>{group.toUpperCase()} Division</span>
            {positions !== "\u2014" && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains), monospace" }}>{"\u2022"} {positions}</span>}
            <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, background: tier.bg, padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5, border: `1px solid ${tier.color}33`, fontFamily: "var(--font-jetbrains), monospace" }}>
              {tier.label}
            </span>
          </div>
          {isNew && (
            <div style={{ marginTop: 12, padding: "8px 16px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 8, display: "inline-block" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#d4af37", fontFamily: "var(--font-jetbrains), monospace" }}>NEW UPDATE {"\u2022"} Evaluation updated by Coach Aaron</span>
            </div>
          )}
        </div>

        {/* Score Overview Card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Overall Score</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#d4af37" }}>{fmtV(p.total)}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }}>/50</span></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Average</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>{avg.toFixed(1)}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }}>/5.0</span></div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Recommended Placement</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: tier.color }}>{placement}</div>
        </div>

        {/* Skill Breakdown */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Skill Breakdown</div>
          {SKILL_KEYS.map(k => {
            const v = p[k];
            return (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{REPORT_SKILL_LABELS[k]}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: barColor(v), fontFamily: "var(--font-jetbrains), monospace" }}>{fmtV(v)}</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(v / 5) * 100}%`, background: barColor(v), borderRadius: 3, transition: "width 0.5s ease" }} />
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2, fontFamily: "var(--font-jetbrains), monospace" }}>{noteFor(v)}</div>
              </div>
            );
          })}
        </div>

        {/* Coach Summary */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Coach{"'"}s Summary</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#22c55e", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Top Strengths</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{summary.strengths}</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#a855f7", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Areas for Growth</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{summary.dev}</div>
          </div>
          <div style={{ marginTop: 16, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{summary.text}</div>
          </div>
        </div>

        {/* Coach's Note (if any) */}
        {parentNote && (
          <div style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#d4af37", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Note from Coach Aaron</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{parentNote}</div>
          </div>
        )}

        {/* Scoring Scale Reference */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Scoring Scale</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.8, fontFamily: "var(--font-jetbrains), monospace" }}>
            {"5 \u2014 Elite / Top of age group"}<br/>
            {"4 \u2014 Above average for age group"}<br/>
            {"3 \u2014 Average with room to grow"}<br/>
            {"2 \u2014 Below average for age group"}<br/>
            {"1 \u2014 Major development needed"}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-jetbrains), monospace", padding: "8px 0 20px" }}>
          Gilbert Air Strike Flag Football {"\u2022"} Development-Focused Evaluations {"\u2022"} Evaluated by Coach Aaron
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState("landing"); // landing | coach | parent
  const [parentPlayer, setParentPlayer] = useState(null);
  const [parentGroup, setParentGroup] = useState(null);

  if (mode === "parent" && parentPlayer) {
    return <ParentView player={parentPlayer} group={parentGroup} onBack={() => { setMode("landing"); setParentPlayer(null); }} />;
  }
  if (mode === "coach") {
    return <DashboardInner onLogout={() => setMode("landing")} />;
  }
  return (
    <LandingPage
      onCoachLogin={() => setMode("coach")}
      onParentAccess={(player, group) => { setParentPlayer(player); setParentGroup(group); setMode("parent"); }}
    />
  );
}

function DashboardInner({ onLogout }) {
  const [group, setGroup] = useState("14u");
  const [view, setView] = useState("roster"); // roster | player | compare | leaderboard | codes
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [comparePlayer, setComparePlayer] = useState(null);
  const [sortBy, setSortBy] = useState("total");
  const [filterTier, setFilterTier] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [reportPlayer, setReportPlayer] = useState(null);
  const [notes, setNotes] = useState({}); // { "Name-group": { internal: "", parent: "" } }

  // Load all notes for current group on mount / group change
  useEffect(() => {
    (async () => {
      const loaded = {};
      for (const p of PLAYERS_RAW[group]) {
        const k = p.name + "-" + group;
        let internal = "", parent = "";
        try {
          const r = storage.get("int-" + k);
          if (r && r.value) internal = r.value;
        } catch {}
        try {
          const r = storage.get("pnote-local-" + k);
          if (r && r.value) parent = r.value;
        } catch {}
        if (internal || parent) loaded[k] = { internal, parent };
      }
      setNotes(prev => ({ ...prev, ...loaded }));
    })();
  }, [group]);

  const getNote = (p) => notes[p.name + "-" + group] || { internal: "", parent: "" };

  const saveNote = (p, field, value) => {
    const k = p.name + "-" + group;
    const updated = { ...getNote(p), [field]: value };
    setNotes(prev => ({ ...prev, [k]: updated }));
    if (field === "internal") {
      (async () => { try { storage.set("int-" + k, value); } catch {} })();
    } else {
      // Save parent note to shared (for parents) AND private (for coach to read back)
      (async () => {
        try { storage.set("pnote-" + k, value, true); } catch {}
        try { storage.set("pnote-local-" + k, value); } catch {}
      })();
    }
  };

  const players = useMemo(() => {
    let list = [...PLAYERS_RAW[group]];
    if (filterTier !== "ALL") list = list.filter(p => getTier(p.total, group).label === filterTier);
    if (searchTerm) list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    list.sort((a, b) => typeof b[sortBy] === "number" ? b[sortBy] - a[sortBy] : 0);
    return list;
  }, [group, sortBy, filterTier, searchTerm]);

  const groupAvgs = useMemo(() => {
    const all = PLAYERS_RAW[group];
    const avgs = {};
    SKILL_KEYS.forEach(k => {
      avgs[k] = all.reduce((s, p) => s + p[k], 0) / all.length;
    });
    avgs.total = all.reduce((s, p) => s + p.total, 0) / all.length;
    return avgs;
  }, [group]);

  const tierCounts = useMemo(() => {
    const counts = { ELITE: 0, STARTER: 0, ROTATION: 0, DEVELOPMENTAL: 0, PROJECT: 0 };
    PLAYERS_RAW[group].forEach(p => { counts[getTier(p.total, group).label]++; });
    return counts;
  }, [group]);

  const openPlayer = (p) => { setSelectedPlayer(p); setView("player"); setComparePlayer(null); };

  // ── REPORT VIEW ─────────────────────────────────────────────────
  if (reportPlayer) {
    const rp = reportPlayer;
    const placement = getPlacement(rp.total);
    const positions = [rp.pos1, rp.pos2, rp.pos3].filter(Boolean).join(" / ") || "\u2014";
    const summary = getReportSummary(rp, group);
    const fmtV = v => v === Math.floor(v) ? String(Math.floor(v)) : String(v);
    const ck = { Academy: "\u2610", Select: "\u2610", Elite: "\u2610" };
    ck[placement] = "\u2611";
    const noteFor = v => {
      if (v >= 4.5) return "Elite level \u2014 top of age group";
      if (v >= 4) return "Above average \u2014 strong performer";
      if (v >= 3.5) return "Solid \u2014 continue developing";
      if (v >= 3) return "Average \u2014 room to grow";
      if (v >= 2.5) return "Below avg \u2014 needs focused work";
      return "Priority development area";
    };
    const rc = { padding: "7px 10px", border: "1px solid #ccc", fontSize: 13 };
    const rl = { ...rc, background: "#f2f2f2", fontWeight: "bold", width: "22%" };
    const rh = { padding: "8px 10px", border: "1px solid #ccc", background: "#CC0000", color: "white", fontSize: 12, textAlign: "left" };

    return (
      <div style={{ background: "#fff", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", padding: "16px 0", background: "#f0f0f0", borderBottom: "2px solid #CC0000" }}>
          <button onClick={() => setReportPlayer(null)} style={{ padding: "10px 28px", fontSize: 14, fontWeight: "bold", background: "#666", color: "white", border: "none", borderRadius: 6, cursor: "pointer", marginRight: 12 }}>
            Back to Dashboard
          </button>
          <span style={{ display: "inline-block", padding: "10px 20px", fontSize: 13, color: "#555", background: "#fff", border: "1px solid #ccc", borderRadius: 6 }}>
            Use Ctrl+P / Cmd+P to print or save as PDF
          </span>
        </div>

        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", color: "#1a1a1a", padding: "24px 40px 40px", maxWidth: 850, margin: "0 auto", lineHeight: 1.5 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <h1 style={{ fontSize: 22, color: "#CC0000", letterSpacing: 1, margin: "0 0 2px" }}>GILBERT AIR STRIKE | LADY AIR STRIKE</h1>
            <hr style={{ border: "none", borderTop: "2.5px solid #CC0000", margin: "8px 0 16px" }} />
            <h2 style={{ fontSize: 17, color: "#1a1a1a", margin: "0 0 8px" }}>GILBERT AIR STRIKE | PLAYER EVALUATION</h2>
            <p style={{ fontSize: 11, color: "#555", maxWidth: 600, margin: "0 auto 12px" }}>This evaluation is designed by Coach Aaron to assess player development, track progress, and assist with appropriate team placement within the Air Strike program. Evaluations are development-focused and intended to support long-term growth.</p>
          </div>

          <div style={{ fontSize: 14, fontWeight: "bold", color: "#CC0000", margin: "18px 0 8px", textTransform: "uppercase" }}>Scoring Scale</div>
          <div style={{ fontSize: 11, color: "#333", lineHeight: 1.8 }}>
            {"0 \u2013 No skill demonstrated"}<br/>
            {"1 \u2013 Major development needed"}<br/>
            {"2 \u2013 Below average for age group"}<br/>
            {"3 \u2013 Average with room to grow"}<br/>
            {"4 \u2013 Above average for age group"}<br/>
            {"5 \u2013 Elite / Top of age group"}
          </div>

          <div style={{ fontSize: 14, fontWeight: "bold", color: "#CC0000", margin: "18px 0 8px", textTransform: "uppercase" }}>Player Information</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4 }}><tbody>
            <tr><td style={rl}>Player Name</td><td style={rc}>{rp.name}</td><td style={rl}>Age Group</td><td style={rc}>{group}</td></tr>
            <tr><td style={rl}>Evaluator</td><td style={rc}>Coach Aaron</td><td style={rl}>Position(s)</td><td style={rc}>{positions}</td></tr>
          </tbody></table>

          <div style={{ fontSize: 14, fontWeight: "bold", color: "#CC0000", margin: "18px 0 8px", textTransform: "uppercase" }}>Skill Evaluation</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4 }}>
            <thead><tr><th style={rh}>Skill Category</th><th style={{ ...rh, textAlign: "center", width: 100 }}>{"Score (0\u20135)"}</th><th style={rh}>Coach Notes</th></tr></thead>
            <tbody>
              {SKILL_KEYS.map((k, i) => (
                <tr key={k} style={{ background: i % 2 === 1 ? "#f8f8f8" : "#fff" }}>
                  <td style={rc}>{REPORT_SKILL_LABELS[k]}</td>
                  <td style={{ ...rc, textAlign: "center", fontWeight: "bold" }}>{fmtV(rp[k])}</td>
                  <td style={{ ...rc, fontSize: 12, color: "#555" }}>{noteFor(rp[k])}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ fontSize: 14, fontWeight: "bold", color: "#CC0000", margin: "18px 0 8px", textTransform: "uppercase" }}>{"Total Score & Placement Recommendation"}</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4 }}><tbody>
            <tr><td style={{ ...rl, width: "30%" }}><b>Total Score</b></td><td style={rc}><b>{fmtV(rp.total)} / 50</b></td></tr>
            <tr><td style={{ ...rl, width: "30%" }}><b>Recommended Placement</b></td><td style={rc}>{ck.Academy} Academy{"    "}{ck.Select} Select{"    "}{ck.Elite} Elite</td></tr>
          </tbody></table>

          <div style={{ fontSize: 14, fontWeight: "bold", color: "#CC0000", margin: "18px 0 8px", textTransform: "uppercase" }}>Evaluation Summary</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4 }}><tbody>
            <tr><td style={{ ...rl, width: "30%", verticalAlign: "top" }}><b>Top Strength(s)</b></td><td style={rc}>{summary.strengths}</td></tr>
            <tr><td style={{ ...rl, width: "30%", verticalAlign: "top" }}><b>Primary Area(s) for Improvement</b></td><td style={rc}>{summary.dev}</td></tr>
            <tr><td colSpan={2} style={{ ...rc, fontSize: 12, lineHeight: 1.6, color: "#333" }}>{summary.text}</td></tr>
          </tbody></table>

          {getNote(rp).parent && (
            <div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#CC0000", margin: "18px 0 8px", textTransform: "uppercase" }}>Note from Coach Aaron</div>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4 }}><tbody>
                <tr><td style={{ ...rc, fontSize: 12, lineHeight: 1.6, color: "#333", whiteSpace: "pre-wrap" }}>{getNote(rp).parent}</td></tr>
              </tbody></table>
            </div>
          )}

          <div style={{ textAlign: "center", fontSize: 9, color: "#999", marginTop: 20, borderTop: "1px solid #ddd", paddingTop: 8, fontStyle: "italic" }}>{"Gilbert Air Strike Flag Football \u2014 Development-Focused Evaluations \u2014 Confidential"}</div>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD VIEW ─────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f0f0f0", fontFamily: "var(--font-outfit), sans-serif", position: "relative", overflow: "hidden" }}>
      
      {/* Background texture */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 20% 0%, rgba(212,175,55,0.03) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(59,130,246,0.02) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 60L60 0' stroke='%23ffffff' stroke-width='0.3' opacity='0.02'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='60' height='60' fill='url(%23g)'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "20px 16px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ width: 4, height: 36, background: "linear-gradient(180deg, #d4af37, #b8941e)", borderRadius: 2 }} />
            <div>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                GILBERT AIR STRIKE
              </h1>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 2, textTransform: "uppercase" }}>
                Tryout Evaluation Command Center
              </p>
            </div>
          </div>
        </div>

        {/* Age Group Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["10u", "12u", "14u"].map(g => (
            <button
              key={g}
              onClick={() => { setGroup(g); setView("roster"); setSelectedPlayer(null); setFilterTier("ALL"); setSearchTerm(""); }}
              style={{
                padding: "8px 20px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 15, fontWeight: 700, letterSpacing: 1, transition: "all 0.2s",
                background: group === g ? "linear-gradient(135deg, #d4af37, #b8941e)" : "rgba(255,255,255,0.04)",
                color: group === g ? "#0a0a0f" : "rgba(255,255,255,0.4)",
                border: group === g ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {g.toUpperCase()}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {["roster", "leaderboard", "codes"].map(v => (
            <button
              key={v}
              onClick={() => { setView(v); setSelectedPlayer(null); }}
              style={{
                padding: "8px 14px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 13, fontWeight: 600, letterSpacing: 0.5, transition: "all 0.2s", textTransform: "uppercase",
                background: view === v ? "rgba(255,255,255,0.08)" : "transparent",
                color: view === v ? "#f0f0f0" : "rgba(255,255,255,0.3)",
                border: view === v ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
              }}
            >
              {v === "roster" ? "\ud83d\udccb Roster" : v === "leaderboard" ? "\ud83c\udfc6 Leaders" : "\ud83d\udd11 Codes"}
            </button>
          ))}
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                padding: "8px 14px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 13, fontWeight: 600, letterSpacing: 0.5, background: "transparent",
                color: "rgba(255,255,255,0.2)", marginLeft: 4,
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginBottom: 20 }}>
          {[
            { label: "Total Players", value: PLAYERS_RAW[group].length, accent: "#d4af37" },
            { label: "Avg Score", value: groupAvgs.total.toFixed(1), accent: "#22c55e" },
            { label: "Elite", value: tierCounts.ELITE, accent: "#d4af37" },
            { label: "Starters", value: tierCounts.STARTER, accent: "#22c55e" },
            { label: "Rotation", value: tierCounts.ROTATION, accent: "#3b82f6" },
          ].map((card, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: card.accent }}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* ROSTER VIEW */}
        {view === "roster" && (
          <div>
            {/* Controls */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ padding: "7px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#f0f0f0", fontFamily: "var(--font-jetbrains), monospace", fontSize: 13, outline: "none", width: 180 }}
              />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#f0f0f0", fontFamily: "var(--font-jetbrains), monospace", fontSize: 13, outline: "none" }}
              >
                <option value="total">Sort: Total</option>
                {SKILL_KEYS.map(k => <option key={k} value={k}>Sort: {SKILL_LABELS[k]}</option>)}
              </select>
              <div style={{ display: "flex", gap: 4 }}>
                {["ALL", "ELITE", "STARTER", "ROTATION", "DEVELOPMENTAL", "PROJECT"].map(t => {
                  const tierInfo = t === "ALL" ? { color: "#f0f0f0" } : getTier(t === "ELITE" ? 50 : t === "STARTER" ? 40 : t === "ROTATION" ? 36 : t === "DEVELOPMENTAL" ? 33 : 30, group);
                  return (
                    <button
                      key={t}
                      onClick={() => setFilterTier(t)}
                      style={{
                        padding: "5px 10px", borderRadius: 4, border: "none", cursor: "pointer",
                        fontSize: 11, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 0.5,
                        background: filterTier === t ? (t === "ALL" ? "rgba(255,255,255,0.12)" : tierInfo.bg) : "rgba(255,255,255,0.02)",
                        color: filterTier === t ? (t === "ALL" ? "#f0f0f0" : tierInfo.color) : "rgba(255,255,255,0.25)",
                        border: filterTier === t ? `1px solid ${t === "ALL" ? "rgba(255,255,255,0.15)" : tierInfo.color + "44"}` : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {t === "ALL" ? "ALL" : t.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Player Table */}
            <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <th style={{ ...thStyle, width: 30 }}>#</th>
                    <th style={{ ...thStyle, textAlign: "left", minWidth: 120 }}>Player</th>
                    <th style={{ ...thStyle, width: 40 }}></th>
                    <th style={thStyle}>Tier</th>
                    {SKILL_KEYS.map(k => (
                      <th key={k} style={{ ...thStyle, cursor: "pointer" }} onClick={() => setSortBy(k)}>
                        {SKILL_LABELS[k].split(" ")[0].slice(0, 3).toUpperCase()}
                        {sortBy === k && " ▼"}
                      </th>
                    ))}
                    <th style={{ ...thStyle, cursor: "pointer" }} onClick={() => setSortBy("total")}>TOT{sortBy === "total" && " ▼"}</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p, i) => {
                    const tier = getTier(p.total, group);
                    return (
                      <tr
                        key={p.name + i}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td onClick={() => openPlayer(p)} style={{ ...tdStyle, color: "rgba(255,255,255,0.25)", textAlign: "center", cursor: "pointer" }}>{i + 1}</td>
                        <td onClick={() => openPlayer(p)} style={{ ...tdStyle, fontWeight: 600, color: "#f0f0f0", cursor: "pointer" }}>
                          {p.name}
                          {p.pos1 && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>{p.pos1}</span>}
                        </td>
                        <td style={{ ...tdStyle, textAlign: "center", padding: "4px" }}>
                          <button
                            onClick={() => setReportPlayer(p)}
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              cursor: "pointer", fontSize: 11, padding: "4px 8px",
                              borderRadius: 4, border: "1px solid rgba(255,255,255,0.15)",
                              background: "rgba(255,255,255,0.05)",
                              color: "rgba(255,255,255,0.5)", lineHeight: 1,
                              fontFamily: "var(--font-jetbrains), monospace",
                            }}
                          >PDF</button>
                        </td>
                        <td onClick={() => openPlayer(p)} style={{ ...tdStyle, textAlign: "center", cursor: "pointer" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, background: tier.bg, padding: "3px 8px", borderRadius: 3, letterSpacing: 0.5, border: `1px solid ${tier.color}22` }}>
                            {tier.label}
                          </span>
                        </td>
                        {SKILL_KEYS.map(k => {
                          const val = p[k];
                          const diff = val - groupAvgs[k];
                          const cellColor = val >= 4.5 ? "#d4af37" : val >= 4 ? "#22c55e" : val >= 3.5 ? "rgba(255,255,255,0.6)" : val >= 3 ? "#a855f7" : "#ef4444";
                          return (
                            <td key={k} onClick={() => openPlayer(p)} style={{ ...tdStyle, color: cellColor, textAlign: "center", fontWeight: val >= 4 ? 600 : 400, cursor: "pointer" }}>
                              {val.toFixed(1)}
                            </td>
                          );
                        })}
                        <td onClick={() => openPlayer(p)} style={{ ...tdStyle, textAlign: "center", fontWeight: 700, color: "#d4af37", fontSize: 15, cursor: "pointer" }}>{p.total.toFixed(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 8, fontFamily: "var(--font-jetbrains), monospace" }}>
              Click any player for detailed analysis • PDF button opens parent report • White line on skill bars = group average
            </div>
          </div>
        )}

        {/* LEADERBOARD VIEW */}
        {view === "leaderboard" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#d4af37", marginBottom: 16, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 1 }}>
              🏆 TOP 5 BY SKILL — {group.toUpperCase()}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
              {SKILL_KEYS.map(k => (
                <div key={k} style={{ padding: 14, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <RankBar players={PLAYERS_RAW[group]} skill={k} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PARENT ACCESS CODES VIEW */}
        {view === "codes" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#d4af37", marginBottom: 8, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 1 }}>
              {"\ud83d\udd11"} Parent Access Codes — {group.toUpperCase()}
            </h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains), monospace", marginBottom: 16 }}>
              Share these codes with parents so they can view their player{"'"}s evaluation in the Parent Portal.
            </p>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, textAlign: "left", paddingLeft: 16 }}>Player</th>
                    <th style={{ ...thStyle, textAlign: "left" }}>PIN</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>Score</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAYERS_RAW[group].map((p, i) => {
                    const code = PLAYER_PINS[p.name + "-" + group];
                    const tier = getTier(p.total, group);
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <td style={{ ...tdStyle, paddingLeft: 16, fontWeight: 600 }}>{p.name}</td>
                        <td style={{ ...tdStyle }}>
                          <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 12, color: "#d4af37", background: "rgba(212,175,55,0.08)", padding: "3px 8px", borderRadius: 4, letterSpacing: 1 }}>
                            {code}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700, color: "#d4af37" }}>{p.total.toFixed(1)}</td>
                        <td style={{ ...tdStyle, textAlign: "center" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, background: tier.bg, padding: "3px 8px", borderRadius: 3, letterSpacing: 0.5, border: `1px solid ${tier.color}22` }}>
                            {tier.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 12, fontFamily: "var(--font-jetbrains), monospace" }}>
              Parents enter their 5-digit PIN at the landing page {">"} Parent Portal tab to view their evaluation.
            </p>
          </div>
        )}

        {/* PLAYER DETAIL VIEW */}
        {view === "player" && selectedPlayer && (() => {
          const p = selectedPlayer;
          const tier = getTier(p.total, group);
          const { rec, posSuggestion } = getCoachRec(p, group);
          const physAvg = PHYSICAL_SKILLS.reduce((s, k) => s + p[k], 0) / PHYSICAL_SKILLS.length;
          const intAvg = INTANGIBLE_SKILLS.reduce((s, k) => s + p[k], 0) / INTANGIBLE_SKILLS.length;
          const rank = [...PLAYERS_RAW[group]].sort((a, b) => b.total - a.total).findIndex(x => x.name === p.name) + 1;
          
          // Find strengths and weaknesses
          const sorted = SKILL_KEYS.map(k => ({ key: k, val: p[k] })).sort((a, b) => b.val - a.val);
          const strengths = sorted.slice(0, 3);
          const weaknesses = sorted.slice(-2);

          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <button onClick={() => { setView("roster"); setSelectedPlayer(null); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 14, fontFamily: "var(--font-jetbrains), monospace", padding: 0 }}>
                  ← Back to Roster
                </button>
                <button
                  onClick={() => setReportPlayer(p)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace",
                    letterSpacing: 0.5, background: "linear-gradient(135deg, #CC0000, #aa0000)",
                    color: "#fff", transition: "opacity 0.2s", boxShadow: "0 2px 8px rgba(204,0,0,0.3)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  🖨️ Print Parent Report
                </button>
              </div>

              {/* Player Header */}
              <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 300px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>{p.name}</h2>
                    <span style={{ fontSize: 12, fontWeight: 700, color: tier.color, background: tier.bg, padding: "5px 12px", borderRadius: 4, letterSpacing: 1, border: `1px solid ${tier.color}33` }}>
                      {tier.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>Age Group</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#d4af37" }}>{group.toUpperCase()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>Rank</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>#{rank} <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>of {PLAYERS_RAW[group].length}</span></div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>Total Score</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#d4af37" }}>{p.total.toFixed(1)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>Rec. Position</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#22c55e" }}>{posSuggestion}</div>
                    </div>
                    {p.pos1 && (
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>Listed Pos</div>
                        <div style={{ fontSize: 18, fontWeight: 600 }}>{[p.pos1, p.pos2, p.pos3].filter(Boolean).join(" / ")}</div>
                      </div>
                    )}
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <div style={{ flex: 1, padding: 10, borderRadius: 6, background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
                      <div style={{ fontSize: 11, color: "#22c55e", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>💪 Strengths</div>
                      {strengths.map(s => (
                        <div key={s.key} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>
                          {SKILL_LABELS[s.key]} <span style={{ color: "#22c55e", fontWeight: 700 }}>{s.val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1, padding: 10, borderRadius: 6, background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.08)" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>📈 Develop</div>
                      {weaknesses.map(w => (
                        <div key={w.key} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>
                          {SKILL_LABELS[w.key]} <span style={{ color: "#ef4444", fontWeight: 700 }}>{w.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Composite scores */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                    {[
                      { label: "Physical", val: physAvg, color: "#3b82f6" },
                      { label: "Intangibles", val: intAvg, color: "#a855f7" },
                      { label: "Overall Avg", val: p.total / 10, color: "#d4af37" },
                    ].map(c => (
                      <div key={c.label} style={{ flex: 1, padding: 10, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: c.color }}>{c.val.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radar */}
                <div style={{ flexShrink: 0 }}>
                  <RadarChart player={p} size={250} compare={comparePlayer} />
                  {comparePlayer && (
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 4 }}>
                      <span style={{ fontSize: 12, color: "#d4af37" }}>● {p.name}</span>
                      <span style={{ fontSize: 12, color: "#ef4444" }}>● {comparePlayer.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skill Bars */}
              <div style={{ padding: 16, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Detailed Skill Breakdown</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "4px 20px" }}>
                  {SKILL_KEYS.map(k => <SkillBar key={k} label={SKILL_LABELS[k]} value={p[k]} groupAvg={groupAvgs[k]} />)}
                </div>
              </div>

              {/* Coach's Report */}
              <div style={{ padding: 16, borderRadius: 8, background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.1)", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "#d4af37", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🏈 Coach's Scouting Report</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>{rec}</p>
              </div>

              {/* Coach Notes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div style={{ padding: 14, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>
                      {"\ud83d\udd12"} Internal Notes
                    </div>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-jetbrains), monospace" }}>(coach only)</span>
                  </div>
                  <textarea
                    value={getNote(p).internal}
                    onChange={e => saveNote(p, "internal", e.target.value)}
                    placeholder="Private notes... (not visible to parents)"
                    rows={4}
                    style={{
                      width: "100%", padding: 10, borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.7)", fontSize: 13,
                      fontFamily: "var(--font-jetbrains), monospace", resize: "vertical", outline: "none",
                      boxSizing: "border-box", lineHeight: 1.5,
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>
                <div style={{ padding: 14, borderRadius: 8, background: "rgba(212,175,55,0.02)", border: "1px solid rgba(212,175,55,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: "#d4af37", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1 }}>
                      {"\ud83d\udce4"} Parent Note
                    </div>
                    <span style={{ fontSize: 9, color: "rgba(212,175,55,0.4)", fontFamily: "var(--font-jetbrains), monospace" }}>(visible on report)</span>
                  </div>
                  <textarea
                    value={getNote(p).parent}
                    onChange={e => saveNote(p, "parent", e.target.value)}
                    placeholder="Note for parents... (shown on their evaluation)"
                    rows={4}
                    style={{
                      width: "100%", padding: 10, borderRadius: 6, border: "1px solid rgba(212,175,55,0.1)",
                      background: "rgba(212,175,55,0.03)", color: "rgba(255,255,255,0.7)", fontSize: 13,
                      fontFamily: "var(--font-jetbrains), monospace", resize: "vertical", outline: "none",
                      boxSizing: "border-box", lineHeight: 1.5,
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.25)"}
                    onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.1)"}
                  />
                </div>
              </div>

              {/* Compare selector */}
              <div style={{ padding: 14, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Compare With Another Player</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {PLAYERS_RAW[group].filter(x => x.name !== p.name).map((x, i) => (
                    <button
                      key={x.name + i}
                      onClick={() => setComparePlayer(comparePlayer?.name === x.name ? null : x)}
                      style={{
                        padding: "4px 10px", borderRadius: 4, border: "none", cursor: "pointer",
                        fontSize: 12, fontWeight: 500, fontFamily: "var(--font-jetbrains), monospace",
                        background: comparePlayer?.name === x.name ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)",
                        color: comparePlayer?.name === x.name ? "#ef4444" : "rgba(255,255,255,0.4)",
                        border: comparePlayer?.name === x.name ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {x.name}
                    </button>
                  ))}
                </div>
                {comparePlayer && (
                  <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                    {SKILL_KEYS.map(k => {
                      const diff = p[k] - comparePlayer[k];
                      return (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", borderRadius: 4, background: "rgba(255,255,255,0.02)" }}>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-jetbrains), monospace" }}>{SKILL_LABELS[k]}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace", color: diff > 0 ? "#22c55e" : diff < 0 ? "#ef4444" : "rgba(255,255,255,0.3)" }}>
                            {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "10px 8px",
  fontSize: 11,
  fontWeight: 700,
  color: "rgba(255,255,255,0.35)",
  fontFamily: "var(--font-jetbrains), monospace",
  textTransform: "uppercase",
  letterSpacing: 0.5,
  textAlign: "center",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "10px 8px",
  fontFamily: "var(--font-jetbrains), monospace",
  fontSize: 13,
  whiteSpace: "nowrap",
};
