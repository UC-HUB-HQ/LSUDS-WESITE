import { useState } from "react";
import {
  MobileSideBar,
  HeroSection,
  FloatingCardSection,
  WelcomeContent,
  Events,
  ContactSection,
  Footer,
  
} from "../components";

const Home = () => {

  const [navBarOpen, setNavBarOpen] = useState(false);

  const openSideBar = () => {
    setNavBarOpen(true);
  };

  const closeSideBar = () => {
    setNavBarOpen(false);
  };

  return (
    <>
      <MobileSideBar navBarOpen={navBarOpen} closeSideBar={closeSideBar} />
      <HeroSection OpenSideBar={openSideBar} />
      <FloatingCardSection />
      <WelcomeContent />
      <Events />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
