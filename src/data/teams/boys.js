const DEFAULTS = {
  coaches: [
    { name: "Coach TBD", role: "Head Coach", img: null, bio: "Coaching position open. Looking for development-focused coaches." },
    { name: "Coach TBD", role: "Assistant Coach", img: null, bio: "Coaching position open. Looking for development-focused coaches." },
  ],
  tryoutInfo: { status: "coming-soon", dates: "Summer 2025", location: "Gilbert Regional Park" },
  practiceSchedule: "Tuesdays & Thursdays, 6:00\u20137:30 PM",
  heroImage: null,
};

function team(description, overrides = {}) {
  return { ...DEFAULTS, description, ...overrides };
}

export const BOYS_TEAMS = {
  "boys-8u": team("Introduction to flag football fundamentals. Focus on coordination, teamwork, and love of the game."),
  "boys-9u": team("Building on fundamentals with basic route concepts and defensive positioning."),
  "boys-10u": team("Expanding playbook complexity. Players begin learning multiple positions and reading defenses."),
  "boys-11u": team("Intermediate skill development with emphasis on game IQ and situational awareness."),
  "boys-12u": team("Advanced concepts and competitive preparation. Players refine their primary positions."),
  "boys-13u": team("Pre-high school development. Focus on speed, decision-making, and leadership on the field."),
  "boys-14u": team("Elite development track preparing players for high school competition."),
  "boys-high-school": team("Highest level of competition. Full playbook, advanced schemes, and college-prep fundamentals."),
};
