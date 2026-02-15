/**
 * "The Stripe Fade" — two diagonal racing stripes (red + teal)
 * that fade in opacity left-to-right, like helmet speed stripes.
 * A faint 1px horizontal rule at the bottom.
 * Dark-to-darker transition. Height: 32px
 */
export default function DividerContactFooter() {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, backgroundColor: "#0a0a0a" }}>
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "32px", display: "block" }}
      >
        <defs>
          <linearGradient id="redStripeFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CC0000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#CC0000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tealStripeFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a9e75" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1a9e75" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1200" height="32" fill="#111" />

        {/* Red racing stripe */}
        <polygon points="0,4 800,0 820,8 0,12" fill="url(#redStripeFade)" />

        {/* Teal racing stripe */}
        <polygon points="0,14 700,10 720,18 0,22" fill="url(#tealStripeFade)" />

        {/* Faint horizontal rule at bottom */}
        <line x1="0" y1="31" x2="1200" y2="31" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </svg>
    </div>
  );
}
