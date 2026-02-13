import { getProgram } from "@/data/programs";
import { AGE_GROUPS, getTeamData, getAgeGroup } from "@/data/teams";
import Navbar from "@/components/Navbar";
import AgeGroupPage from "@/components/AgeGroupPage";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return AGE_GROUPS.map((ag) => ({ age: ag.slug }));
}

export async function generateMetadata({ params }) {
  const { age } = await params;
  const ag = getAgeGroup(age);
  return {
    title: `${ag?.label || age} Boys | Gilbert Air Strike`,
    description: `Gilbert Air Strike ${ag?.label || age} boys flag football \u2014 coaches, tryout info, and practice schedule.`,
  };
}

export default async function BoysAgePage({ params }) {
  const { age } = await params;
  const program = getProgram("boys");
  const ageGroup = getAgeGroup(age);
  const team = getTeamData("boys", age);

  return (
    <>
      <Navbar />
      <AgeGroupPage program={program} ageGroup={ageGroup} team={team} />
      <Footer />
    </>
  );
}
