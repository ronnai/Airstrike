import { getProgram } from "@/data/programs";
import Navbar from "@/components/Navbar";
import ProgramHero from "@/components/ProgramHero";
import DividerHeroAbout from "@/components/DividerHeroAbout";
import AgeGroupGrid from "@/components/AgeGroupGrid";
import DividerContactFooter from "@/components/DividerContactFooter";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Girls Program | Lady Air Strike",
  description: "Lady Air Strike girls flag football. Age groups from 8U through High School in Gilbert, Arizona.",
};

export default function GirlsPage() {
  const program = getProgram("girls");

  return (
    <>
      <Navbar />
      <ProgramHero program={program} />
      <DividerHeroAbout />
      <section style={{ padding: "64px 0 80px", background: "#f5f5f5" }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto", marginBottom: 48 }}>
          <div className="sec-label" style={{ color: "var(--teal)", marginBottom: 12 }}>
            Age Groups
          </div>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 6vw, 64px)",
            letterSpacing: 2, color: "#111",
          }}>
            FIND YOUR <span style={{ color: "var(--teal)" }}>TEAM</span>
          </h2>
        </div>
        <AgeGroupGrid program="girls" />
      </section>
      <DividerContactFooter />
      <Footer />
    </>
  );
}
