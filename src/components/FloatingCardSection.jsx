import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FloatingCardSection = () => {
  const [tabFocus, setTabFocus] = useState(true);
  const currentIndex = useRef(0);
  const intervalRef = useRef(null); // Holds the interval ID

  const cardRef = useRef([]);

  const floatingCardContent = [
    {
      number: 32,
      title: "Awards Won",
    },
    {
      number: 18,
      title: "Events Hosted",
    },
    {
      number: 125,
      title: "Active Members",
    },
    {
      number: 2010,
      title: "Established Since",
    },
  ];

  console.log("render occured");

  const cardCarouselAnimation = () => {
    // Get the current card
    const currentCard = cardRef.current[currentIndex.current];

    // Remove slideIn class and Add slideOut animation
    currentCard.classList.remove("tab:animate-slideIn");
    currentCard.classList.add("tab:animate-slideOut");

    // Listen for current card animation to end
    const handleAnimationEnd = () => {
      currentCard.classList.remove("tab:animate-slideOut");
      currentCard.classList.add("tab:hidden");
      currentCard.removeEventListener("animationend", handleAnimationEnd);

      // Move to the next card
      currentIndex.current =
        (currentIndex.current + 1) % floatingCardContent.length;
      const nextCard = cardRef.current[currentIndex.current];
      nextCard.classList.remove("tab:hidden");
      nextCard.classList.add("tab:animate-slideIn");
    };

    currentCard.addEventListener("animationend", handleAnimationEnd);
  };

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      cardCarouselAnimation();
    }, 5000);
  };

  const stopCarousel = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {

    document.querySelectorAll(".floating-cards").forEach((card, index) => {
      if (index !== currentIndex.current) {
        card.classList.add("tab:hidden");
      }
    });
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTabFocus(true);
        startCarousel(); // Resume carousel
      } else {
        setTabFocus(false);
        stopCarousel(); // Pause carousel
      }
    };

    // Listen for tab visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the carousel on mount
    if (document.visibilityState === "visible") {
      startCarousel();
    }

    return () => {
      stopCarousel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="relative -mt-[8em] flex w-full items-start justify-center gap-8 py-8 tab:mt-10 tab:overflow-hidden">
      {floatingCardContent.map((content, index) => {
        return (
          <div
            ref={(element) => (cardRef.current[index] = element)}
            key={index}
            className={`floating-cards flex h-52 w-52 flex-col items-center justify-center bg-softBlue text-center text-white duration-500 tab:transform tab:rounded-md tab:transition-all`}
          >
            <h1 className="mx-5 px-5 text-5xl font-semibold">
              {content.number}+
            </h1>
            <h3>{content.title}</h3>
          </div>
        );
      })}
    </section>
  );
};

export default FloatingCardSection;
