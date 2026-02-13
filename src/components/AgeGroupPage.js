"use client";

import { useInView, fadeUp } from "@/hooks/useInView";
import CoachCard from "./CoachCard";
import TryoutInfo from "./TryoutInfo";
import Breadcrumb from "./Breadcrumb";

export default function AgeGroupPage({ program, ageGroup, team }) {
  const [ref, visible] = useInView();
  const accent = program.color;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: program.shortName, href: `/${program.slug}` },
    { label: ageGroup.label },
  ];

  return (
    <div ref={ref} style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Header visible={visible} accent={accent} program={program} ageGroup={ageGroup} team={team} crumbs={crumbs} />
      <Content accent={accent} team={team} />
    </div>
  );
}

function Header({ visible, accent, program, ageGroup, team, crumbs }) {
  return (
    <div style={{ background: "#111", padding: "140px 0 60px" }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 24, ...fadeUp(visible) }}>
          <Breadcrumb items={crumbs} />
        </div>
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 8vw, 80px)",
          letterSpacing: 2, color: "#fff", lineHeight: 1,
          ...fadeUp(visible, 0.1),
        }}>
          {ageGroup.label}{" "}
          <span style={{ color: accent }}>{program.shortName.toUpperCase()}</span>
        </h1>
        {team.description && (
          <p style={{
            fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)",
            maxWidth: 600, marginTop: 16, fontWeight: 300,
            ...fadeUp(visible, 0.2),
          }}>
            {team.description}
          </p>
        )}
      </div>
    </div>
  );
}

function Content({ accent, team }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 0 80px" }} className="section-pad">
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24, marginBottom: 48,
      }}>
        <TryoutInfo {...team.tryoutInfo} />
        <ScheduleCard schedule={team.practiceSchedule} />
      </div>
      <div className="sec-label" style={{ color: accent, marginBottom: 24 }}>
        Coaching Staff
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
      }}>
        {team.coaches.map((coach, i) => (
          <CoachCard key={i} {...coach} accent={accent} />
        ))}
      </div>
    </div>
  );
}

function ScheduleCard({ schedule }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: 32,
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
    }}>
      <h3 style={{
        fontFamily: "var(--font-bebas)", fontSize: 28,
        letterSpacing: 1, color: "#111", marginBottom: 16,
      }}>
        Practice Schedule
      </h3>
      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>
        {schedule}
      </p>
    </div>
  );
}
