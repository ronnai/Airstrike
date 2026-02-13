export const PROGRAMS = {
  boys: {
    name: "Gilbert Air Strike",
    shortName: "Air Strike",
    slug: "boys",
    tagline: "Development-First Flag Football for Boys",
    color: "var(--red)",
    colorRaw: "#CC0000",
    colorGlow: "rgba(204,0,0,0.3)",
    logo: "/images/gas-logo.jpg",
    heroImage: "/images/hero-team-red.jpg",
  },
  girls: {
    name: "Lady Air Strike",
    shortName: "Lady Air Strike",
    slug: "girls",
    tagline: "Development-First Flag Football for Girls",
    color: "var(--teal)",
    colorRaw: "#4EEEB0",
    colorGlow: "rgba(78,238,176,0.3)",
    logo: "/images/las-logo.jpg",
    heroImage: "/images/hero-team.jpg",
  },
};

export function getProgram(slug) {
  return PROGRAMS[slug] || null;
}
