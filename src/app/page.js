import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DividerHeroAbout from "@/components/DividerHeroAbout";
import About from "@/components/About";
import DividerAboutCoaches from "@/components/DividerAboutCoaches";
import Coaches from "@/components/Coaches";
import DividerCoachesGallery from "@/components/DividerCoachesGallery";
import Gallery from "@/components/Gallery";
import DividerGalleryContact from "@/components/DividerGalleryContact";
import Contact from "@/components/Contact";
import DividerContactFooter from "@/components/DividerContactFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DividerHeroAbout />
      <About />
      <DividerAboutCoaches />
      <Coaches />
      <DividerCoachesGallery />
      <Gallery />
      <DividerGalleryContact />
      <Contact />
      <DividerContactFooter />
      <Footer />
    </>
  );
}
