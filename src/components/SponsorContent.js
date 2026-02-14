"use client";

import { useInView, fadeUp } from "@/hooks/useInView";

const TIERS = [
  {
    name: "MVP",
    price: "$5,000+",
    accent: "#D4A017",
    benefits: [
      'Recognition as the club\'s "Official Sponsor"',
      "Club sponsored entry up to 4 guests at any tournament",
      "Advertisement on team pop-up tent",
      "Premium logo placement on promotional materials",
      "2 Swag GAS t-shirts",
      "Logo and name on team banner and shirts",
      "Social media announcement of sponsorship",
      "Personalized thank you card",
      "The great feeling of supporting youth athletics",
    ],
  },
  {
    name: "All Star",
    price: "$2,500",
    accent: "var(--teal)",
    benefits: [
      "Advertisement on team pop-up tent",
      "Premium logo placement on promotional materials",
      "2 Swag GAS t-shirts",
      "Logo and name on team banner and shirts",
      "Social media announcement of sponsorship",
      "Personalized thank you card",
      "The great feeling of supporting youth athletics",
    ],
  },
  {
    name: "Captain",
    price: "$1,500",
    accent: "var(--red)",
    benefits: [
      "2 Swag GAS t-shirts",
      "Logo and name on team banner and shirts",
      "Social media announcement of sponsorship",
      "Personalized thank you card",
      "The great feeling of supporting youth athletics",
    ],
  },
  {
    name: "Super Fan",
    price: "$500",
    accent: "#888",
    benefits: [
      "Social media announcement of sponsorship",
      "Personalized thank you card",
      "The great feeling of supporting youth athletics",
    ],
  },
];

export default function SponsorContent() {
  const [ref, visible] = useInView();

  return (
    <div ref={ref}>
      <SponsorHero visible={visible} />
      <TierGrid visible={visible} />
      <MissionSection visible={visible} />
      <DirectorMessage visible={visible} />
      <ContactSection visible={visible} />
    </div>
  );
}

function SponsorHero({ visible }) {
  return (
    <section style={{
      background: "#111", padding: "160px 0 80px",
      position: "relative", overflow: "hidden",
    }} className="section-pad">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/images/action-9.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.15,
      }} />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div className="sec-label" style={{
          color: "var(--teal)", marginBottom: 12, ...fadeUp(visible),
        }}>
          Spring 2026 Season
        </div>
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 8vw, 96px)",
          letterSpacing: 2, color: "#fff", lineHeight: 1,
          ...fadeUp(visible, 0.1),
        }}>
          CLUB <span style={{ color: "var(--red)" }}>SPONSORSHIP</span>
        </h1>
        <p style={{
          fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)",
          maxWidth: 600, marginTop: 16, fontWeight: 300,
          ...fadeUp(visible, 0.2),
        }}>
          As a nonprofit organization, Gilbert Air Strike relies on the generous
          support of individuals, businesses, and community partners to sustain
          and expand our programs.
        </p>
      </div>
    </section>
  );
}

function TierGrid({ visible }) {
  const [mvp, ...rest] = TIERS;
  return (
    <section style={{ padding: "64px 0", background: "#f5f5f5" }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <MvpCard tier={mvp} style={fadeUp(visible, 0.1)} />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 24, marginTop: 24,
        }}>
          {rest.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} style={fadeUp(visible, 0.2 + i * 0.08)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MvpCard({ tier, style }) {
  return (
    <div style={{
      background: "#111", borderRadius: 16, overflow: "hidden",
      position: "relative", border: "1px solid rgba(212,160,23,0.25)", ...style,
    }}>
      <div style={{
        position: "absolute", top: 20, right: 20, background: tier.accent,
        color: "#111", fontFamily: "var(--font-barlow-condensed)",
        fontSize: 11, fontWeight: 700, letterSpacing: 2,
        padding: "6px 16px", borderRadius: 100,
      }}>
        BEST VALUE
      </div>
      <div style={{ padding: "40px 40px 32px" }}>
        <div style={{
          fontFamily: "var(--font-barlow-condensed)", fontSize: 13,
          letterSpacing: 3, color: tier.accent, fontWeight: 600, marginBottom: 8,
        }}>
          SPONSORSHIP TIER
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
          <span style={{
            fontFamily: "var(--font-bebas)", fontSize: 48,
            letterSpacing: 2, color: "#fff",
          }}>
            {tier.name.toUpperCase()}
          </span>
          <span style={{
            fontFamily: "var(--font-barlow-condensed)", fontSize: 28,
            fontWeight: 700, color: tier.accent,
          }}>
            {tier.price}
          </span>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "14px 40px",
        }}>
          {tier.benefits.map((b, i) => (
            <div key={i} style={{
              fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.7)",
              paddingLeft: 18, borderLeft: `2px solid ${tier.accent}`,
            }}>
              {b}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 24, fontFamily: "var(--font-barlow-condensed)",
          fontSize: 14, letterSpacing: 2, color: "rgba(255,255,255,0.3)",
        }}>
          {tier.benefits.length} BENEFITS INCLUDED
        </div>
      </div>
    </div>
  );
}

function TierCard({ tier, style }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
      borderTop: `4px solid ${tier.accent}`, ...style,
    }}>
      <div style={{ padding: "24px 24px 8px" }}>
        <span style={{
          fontFamily: "var(--font-bebas)", fontSize: 32,
          letterSpacing: 2, color: "#111",
        }}>
          {tier.name.toUpperCase()}
        </span>
        <div style={{
          fontFamily: "var(--font-barlow-condensed)", fontSize: 20,
          fontWeight: 700, color: tier.accent, letterSpacing: 1,
        }}>
          {tier.price}
        </div>
      </div>
      <div style={{ padding: "16px 24px 24px" }}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {tier.benefits.map((b, i) => (
            <li key={i} style={{
              fontSize: 13, lineHeight: 1.6, color: "#555",
              paddingLeft: 14, borderLeft: `2px solid ${tier.accent}`,
            }}>
              {b}
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: 16, fontFamily: "var(--font-barlow-condensed)",
          fontSize: 11, letterSpacing: 2, color: "#aaa",
        }}>
          {tier.benefits.length} BENEFITS
        </div>
      </div>
    </div>
  );
}

function MissionSection({ visible }) {
  return (
    <section style={{ padding: "64px 0", background: "#fff" }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(40px, 6vw, 64px)",
          letterSpacing: 2, color: "#111", textAlign: "center",
          marginBottom: 48, ...fadeUp(visible, 0.1),
        }}>
          ABOUT <span style={{ color: "var(--red)" }}>GILBERT AIR STRIKE</span>
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
        }}>
          <div style={fadeUp(visible, 0.2)}>
            <h3 style={{
              fontFamily: "var(--font-bebas)", fontSize: 28,
              letterSpacing: 1, color: "#111", marginBottom: 16,
            }}>
              Mission and Values
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#666" }}>
              Our mission is to empower young athletes to reach their full potential
              both on and off the field. We believe in the transformative power of sports,
              particularly flag football, to instill valuable life skills such as teamwork,
              leadership, discipline, and resilience. Our values center around inclusivity,
              integrity, and the belief that every child deserves the chance to participate
              in organized sports regardless of background or ability.
            </p>
          </div>
          <div style={fadeUp(visible, 0.3)}>
            <h3 style={{
              fontFamily: "var(--font-bebas)", fontSize: 28,
              letterSpacing: 1, color: "#111", marginBottom: 16,
            }}>
              Programs and Initiatives
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#666" }}>
              Gilbert Air Strike offers a range of flag football programs designed to
              cater to children of all ages and skill levels. From introductory clinics
              for beginners to competitive leagues for seasoned players, we create
              opportunities for kids to develop their athletic abilities and build
              confidence in a safe and supportive environment. We also organize outreach
              initiatives and collaborative partnerships with local schools and youth
              organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectorMessage({ visible }) {
  return (
    <section style={{ padding: "64px 0", background: "#f5f5f5" }} className="section-pad">
      <div style={{ maxWidth: 800, margin: "0 auto", ...fadeUp(visible, 0.2) }}>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(36px, 5vw, 56px)",
          letterSpacing: 2, color: "#111", textAlign: "center", marginBottom: 32,
        }}>
          MESSAGE FROM THE <span style={{ color: "var(--red)" }}>DIRECTOR</span>
        </h2>
        <div style={{
          fontSize: 15, lineHeight: 1.9, color: "#555",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          <p>
            Hello, my name is Aaron Largo, and I am a 10-year youth flag football coach.
            I am reaching out on behalf of the Gilbert Air Strike, a non-profit organization
            based in Gilbert, Arizona. Our mission is to foster the development of both youth
            boys and girls through the sport of flag football, empowering kids to grow both
            athletically and personally while learning valuable lessons in sportsmanship.
          </p>
          <p>
            At Gilbert Air Strike, we believe that every child deserves the opportunity to
            participate in sports and develop important life skills along the way. Through our
            flag football programs, we aim to provide a supportive and inclusive environment
            where kids can learn, compete, and have fun.
          </p>
          <p>
            Your contribution can make a meaningful difference in the lives of these children,
            helping them build confidence, teamwork, and resilience. Donations contribute directly
            to scholarships, equipment, facilities, engagement programs, team building, team
            outings, traveling, league dues and more.
          </p>
        </div>
        <p style={{
          marginTop: 32, fontFamily: "var(--font-barlow-condensed)",
          fontSize: 14, fontWeight: 600, color: "#111",
        }}>
          Warm regards,<br />Aaron Largo<br />Gilbert Air Strike
        </p>
      </div>
    </section>
  );
}

function ContactSection({ visible }) {
  return (
    <section style={{ padding: "64px 0", background: "#111" }} className="section-pad">
      <div style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center",
        ...fadeUp(visible, 0.1),
      }}>
        <div className="sec-label" style={{ color: "var(--teal)", marginBottom: 12 }}>
          Get Involved
        </div>
        <h2 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(36px, 5vw, 56px)",
          letterSpacing: 2, color: "#fff", marginBottom: 32,
        }}>
          BECOME A <span style={{ color: "var(--red)" }}>SPONSOR</span>
        </h2>
        <p style={{
          fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 32, lineHeight: 1.7,
        }}>
          For sponsorships and donations, contact us directly.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 16, color: "#fff", fontWeight: 600 }}>Aaron Largo</span>
          <a href="mailto:gilbertairstrike@gmail.com" style={{
            color: "var(--teal)", textDecoration: "none", fontSize: 15,
          }}>
            gilbertairstrike@gmail.com
          </a>
          <a href="tel:4802171261" style={{
            color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 15,
          }}>
            (480) 217-1261
          </a>
          <div style={{
            display: "flex", gap: 16, marginTop: 12,
            fontFamily: "var(--font-barlow-condensed)", fontSize: 13,
            letterSpacing: 2, color: "rgba(255,255,255,0.4)",
          }}>
            <span>@GilbertAirStrike</span>
            <span>@LadyAirStrike</span>
          </div>
        </div>
      </div>
    </section>
  );
}
