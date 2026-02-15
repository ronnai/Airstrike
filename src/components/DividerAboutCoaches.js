/**
 * "The Yard Line" — three horizontal lines like football field markings.
 * Center line uses red-to-teal gradient. Outer lines are light gray
 * with short hash-mark ticks every ~80px.
 * White-to-gray transition. Height: 48px
 */
const TICKS = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200];

export default function DividerAboutCoaches() {
  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, background: "linear-gradient(180deg, #fff 0%, #f5f5f5 100%)" }}>
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "48px", display: "block" }}
      >
        <defs>
          <linearGradient id="yardLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CC0000" />
            <stop offset="100%" stopColor="#1a9e75" />
          </linearGradient>
        </defs>

        {/* Top line with hash marks */}
        <line x1="0" y1="12" x2="1200" y2="12" stroke="#ddd" strokeWidth="1" />
        {TICKS.map(x => (
          <line key={`t${x}`} x1={x} y1="8" x2={x} y2="16" stroke="#ddd" strokeWidth="1" />
        ))}

        {/* Center accent line */}
        <line x1="0" y1="24" x2="1200" y2="24" stroke="url(#yardLineGrad)" strokeWidth="2" />

        {/* Bottom line with hash marks */}
        <line x1="0" y1="36" x2="1200" y2="36" stroke="#ddd" strokeWidth="1" />
        {TICKS.map(x => (
          <line key={`b${x}`} x1={x} y1="32" x2={x} y2="40" stroke="#ddd" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}
