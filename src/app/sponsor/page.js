import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorContent from "@/components/SponsorContent";

export const metadata = {
  title: "Sponsor | Gilbert Air Strike",
  description: "Support Gilbert Air Strike youth flag football. Sponsorship tiers from $500 to $5,000+. Gilbert, Arizona.",
};

export default function SponsorPage() {
  return (
    <>
      <Navbar />
      <SponsorContent />
      <Footer />
    </>
  );
}
