/**
 * "The Chevron" — shallow downward-pointing V like a play-diagram arrow.
 * Gray fill pinches down, white fills the sides.
 * Teal (#1a9e75) accent stroke on the chevron edge.
 * Gray-to-white transition. Height: 80px
 */
export default function DividerCoachesGallery() {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, backgroundColor: "#fff" }}>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "80px", display: "block" }}
      >
        <polygon points="0,0 1200,0 600,60" fill="#f5f5f5" />
        <polyline
          points="0,0 600,60 1200,0"
          fill="none" stroke="#1a9e75" strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
