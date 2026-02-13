import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav style={{
      display: "flex", alignItems: "center", gap: 8,
      fontFamily: "var(--font-barlow-condensed)", fontSize: 12,
      letterSpacing: 2, textTransform: "uppercase",
    }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>}
          {item.href ? (
            <Link href={item.href} style={{
              color: "rgba(255,255,255,0.4)", textDecoration: "none",
            }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
