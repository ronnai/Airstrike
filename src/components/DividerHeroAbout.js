/**
 * "The Rip" — diagonal slash cutting upper-left to lower-right.
 * Black fill bleeds down from Hero, thin red accent line along the edge.
 * Dark-to-white, high contrast. Height: 120px
 */
export default function DividerHeroAbout() {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, marginTop: "-1px", backgroundColor: "#fff" }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "120px", display: "block" }}
      >
        <polygon points="0,0 1200,0 1200,20 0,100" fill="#111" />
        <line
          x1="0" y1="100" x2="1200" y2="20"
          stroke="#CC0000" strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
