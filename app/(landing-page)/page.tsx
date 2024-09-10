import HeroSection from "./hero-section";
import FirstSection from "./first-section";
import Footer from "@/components/footer";
import LastAction from "./last-action";
import LandingNavbar from "@/components/landing/landingNavbar/landingNavbar";

const LandingPage = () => {
  return (
    <div className="overflow-visible">
      <HeroSection />
      <FirstSection />
      <LastAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
