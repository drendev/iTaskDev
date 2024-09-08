import LandingNavbar from "@/components/landing/landingNavbar/landingNavbar";
import HeroSection from "./hero-section";
import FirstSection from "./first-section";
import Footer from "@/components/footer";

const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />
      <HeroSection />
      <FirstSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
