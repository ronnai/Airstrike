"use client";

const STATUS_STYLES = {
  open: { label: "Open", bg: "#e6f9e6", color: "#1a7a1a" },
  closed: { label: "Closed", bg: "#fce4e4", color: "#cc0000" },
  "coming-soon": { label: "Coming Soon", bg: "#fff3e0", color: "#b36b00" },
};

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <span style={{
        fontFamily: "var(--font-barlow-condensed)", fontSize: 12,
        letterSpacing: 3, textTransform: "uppercase", fontWeight: 700,
        color: "#999", minWidth: 80,
      }}>
        {label}
      </span>
      <span style={{ fontSize: 14, color: "#555", fontWeight: 400 }}>
        {value}
      </span>
    </div>
  );
}

export default function TryoutInfo({ status, dates, location }) {
  const badge = STATUS_STYLES[status] || STATUS_STYLES["coming-soon"];

  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: 32,
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <h3 style={{
          fontFamily: "var(--font-bebas)", fontSize: 28,
          letterSpacing: 1, color: "#111",
        }}>
          Tryout Info
        </h3>
        <span style={{
          padding: "4px 14px", borderRadius: 20, fontSize: 11,
          fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          fontFamily: "var(--font-barlow-condensed)",
          background: badge.bg, color: badge.color,
        }}>
          {badge.label}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <InfoRow label="Dates" value={dates} />
        <InfoRow label="Location" value={location} />
      </div>
    </div>
  );
}
