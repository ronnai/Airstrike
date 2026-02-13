const DEFAULTS = {
  coaches: [
    { name: "Coach TBD", role: "Head Coach", img: null, bio: "Coaching position open. Looking for development-focused coaches." },
    { name: "Coach TBD", role: "Assistant Coach", img: null, bio: "Coaching position open. Looking for development-focused coaches." },
  ],
  tryoutInfo: { status: "coming-soon", dates: "Summer 2025", location: "Gilbert Regional Park" },
  practiceSchedule: "Mondays & Wednesdays, 6:00\u20137:30 PM",
  heroImage: null,
};

function team(description, overrides = {}) {
  return { ...DEFAULTS, description, ...overrides };
}

export const GIRLS_TEAMS = {
  "girls-8u": team("Introduction to flag football fundamentals. Building confidence, coordination, and love of the game."),
  "girls-9u": team("Developing core skills with basic offensive and defensive concepts."),
  "girls-10u": team("Expanding playbook complexity with multi-position development and game awareness."),
  "girls-11u": team("Intermediate skill development emphasizing game IQ, teamwork, and leadership."),
  "girls-12u": team("Advanced concepts and competitive preparation. Players sharpen their primary positions."),
  "girls-13u": team("Pre-high school development with focus on speed, strategy, and on-field leadership."),
  "girls-14u": team("Elite development track preparing players for high school-level competition."),
  "girls-high-school": team("Highest level of competition. Full playbook, advanced schemes, and college-prep fundamentals."),
};
