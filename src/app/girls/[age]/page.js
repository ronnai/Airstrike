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
    title: `${ag?.label || age} Girls | Lady Air Strike`,
    description: `Lady Air Strike ${ag?.label || age} girls flag football \u2014 coaches, tryout info, and practice schedule.`,
  };
}

export default async function GirlsAgePage({ params }) {
  const { age } = await params;
  const program = getProgram("girls");
  const ageGroup = getAgeGroup(age);
  const team = getTeamData("girls", age);

  return (
    <>
      <Navbar />
      <AgeGroupPage program={program} ageGroup={ageGroup} team={team} />
      <Footer />
    </>
  );
}
