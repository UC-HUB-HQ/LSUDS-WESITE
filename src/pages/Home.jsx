import { useEffect, useRef, useState } from "react";
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
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hidden, setHidden] = useState(true)
  const refScrollUp = useRef()

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

  const handleVisibleButton = () => {
    const position = window.scrollY
    setScrollPosition(position)

    if(scrollPosition > 80){
      setHidden(false)
    }else{
      setHidden(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton)
  })

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };
  

  return (
    <>
      <div ref={refScrollUp}> </div>
      <MobileSideBar navBarOpen={navBarOpen} closeSideBar={closeSideBar} />
      <HeroSection OpenSideBar={openSideBar} />
      <FloatingCardSection />
      <WelcomeContent />
      <Events />
      <AboutSection />
      <ContactSection />
      <Footer />
      <button onClick={handleScrollUp} className={`${hidden ? "hidden" : "block"} fixed bottom-4 right-4 z-50 cursor-pointer p-3`}>
        <i  className={`bi bi-arrow-up-circle-fill text-5xl text-softBlue`}></i>
      </button>
    </>
  );
};

export default Home;
