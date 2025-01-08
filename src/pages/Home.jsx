import { useState } from "react";
import {
  MobileSideBar,
  HeroSection,
  FloatingCardSection,
  WelcomeContent,
  AboutSection,
  Events,
  ContactSection,
  Footer,
  
} from "../components";

const Home = () => {

  const [navBarOpen, setNavBarOpen] = useState(false);

  const openSideBar = () => {
    setNavBarOpen(!navBarOpen);
  };

  const closeSideBar = () => {
    setNavBarOpen(!navBarOpen);
  };

  // check if this is the second reload after user has submitted details in the contact section
  const checkIfContactFormSubmitted = localStorage.getItem("contactFormSubmitted");
  if (checkIfContactFormSubmitted && checkIfContactFormSubmitted === "true"){
    alert("Thank you for reaching out to us. We will get back to you shortly.");
  }
  localStorage.setItem("contactFormSubmitted", "false");


  return (
    <>
      <MobileSideBar navBarOpen={navBarOpen} closeSideBar={closeSideBar} />
      <HeroSection OpenSideBar={openSideBar} />
      <FloatingCardSection />
      <WelcomeContent />
      <Events />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
