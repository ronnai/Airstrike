import { BOYS_TEAMS } from "./boys";
import { GIRLS_TEAMS } from "./girls";

export const AGE_GROUPS = [
  { slug: "8u", label: "8U", fullName: "8 & Under" },
  { slug: "9u", label: "9U", fullName: "9 & Under" },
  { slug: "10u", label: "10U", fullName: "10 & Under" },
  { slug: "11u", label: "11U", fullName: "11 & Under" },
  { slug: "12u", label: "12U", fullName: "12 & Under" },
  { slug: "13u", label: "13U", fullName: "13 & Under" },
  { slug: "14u", label: "14U", fullName: "14 & Under" },
  { slug: "high-school", label: "High School", fullName: "High School" },
];

const TEAMS = { ...BOYS_TEAMS, ...GIRLS_TEAMS };

export function getTeamData(program, age) {
  return TEAMS[`${program}-${age}`] || null;
}

export function getAgeGroup(slug) {
  return AGE_GROUPS.find((ag) => ag.slug === slug) || null;
}
