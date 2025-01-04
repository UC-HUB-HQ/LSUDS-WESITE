import HeroSection from "../components/HeroSection";
import Events from "../components/Events";
import FloatingCardSection from "../components/FloatingCardSection";
import WelcomeContent from "../components/WelcomeContent";
import ContactSection from "../components/ContactSection.JSX";
const Home = () => {
  return (
    <>
      <HeroSection />
      <FloatingCardSection />
      <WelcomeContent />
      <section id="Events">
        <Events />
      </section>
      <section id="Contact">
        <ContactSection />
      </section>
    </>
  );
};

export default Home;
