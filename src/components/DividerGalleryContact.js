/**
 * "The Blackout" — three stacked offset wave curves cascading
 * from white (#fff) to dark (#111).
 * Layer 1: gray, Layer 2: translucent red tint, Layer 3: solid #111.
 * Small teal dot accents along the curves.
 * White-to-dark, high contrast. Height: 140px
 */
export default function DividerGalleryContact() {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, backgroundColor: "#111" }}>
      <svg
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "140px", display: "block" }}
      >
        <rect x="0" y="0" width="1200" height="140" fill="#fff" />

        {/* Layer 1: gray wave */}
        <path
          d="M0,40 C200,20 400,70 600,50 C800,30 1000,60 1200,35 L1200,140 L0,140 Z"
          fill="#888"
        />

        {/* Layer 2: translucent red tint wave */}
        <path
          d="M0,65 C150,50 350,90 550,70 C750,50 950,80 1200,60 L1200,140 L0,140 Z"
          fill="rgba(204, 0, 0, 0.15)"
        />

        {/* Layer 3: solid dark */}
        <path
          d="M0,90 C300,70 500,110 700,85 C900,65 1100,95 1200,80 L1200,140 L0,140 Z"
          fill="#111"
        />

        {/* Teal dot accents */}
        <circle cx="150" cy="58" r="3" fill="#1a9e75" opacity="0.5" />
        <circle cx="450" cy="72" r="2.5" fill="#1a9e75" opacity="0.4" />
        <circle cx="750" cy="52" r="3" fill="#1a9e75" opacity="0.5" />
        <circle cx="1050" cy="65" r="2" fill="#1a9e75" opacity="0.35" />
      </svg>
    </div>
  );
}
