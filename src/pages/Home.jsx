import HeroSection from "../components/HeroSection";
import Events from "../components/Events";
import FloatingCardSection from "../components/FloatingCardSection";
const Home = () => {
  return (
    <>
      <HeroSection />
      <FloatingCardSection />
      <section id="Events">
        <Events />
      </section>
    </>
  );
};

export default Home;
