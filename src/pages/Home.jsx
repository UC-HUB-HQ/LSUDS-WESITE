import HeroSection from "../components/HeroSection";
import Events from "../components/Events";
import FloatingCardSection from "../components/FloatingCardSection";
import WelcomeContent from "../components/WelcomeContent";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FloatingCardSection />
      <WelcomeContent />
      <section id="Events">
        <Events />
      </section>
    </>
  );
};

export default Home;
