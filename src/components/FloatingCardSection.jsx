import React, { useEffect, useRef } from "react";

const FloatingCardSection = () => {
  const currentIndex = useRef(0);
  const intervalRef = useRef(null); // Holds the setInterval

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
      currentIndex.current = (currentIndex.current + 1) % floatingCardContent.length;
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

    // hide other cards except the first card
    cardRef.current.forEach((card, index) => {
      if (index !== currentIndex.current) {
        card.classList.add("tab:hidden");
      }
    });

    // check if user is currently viewing the tab if yes start the carousel else stop it
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startCarousel(); 
      } else {
        stopCarousel();
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
    <section className="relative -mt-[7em] flex w-full items-start justify-center gap-8 py-8 tab:my-6 tab:overflow-hidden tab:py-0">
      {floatingCardContent.map((content, index) => {
        return (
          <div
            ref={(element) => (cardRef.current[index] = element)}
            key={index}
            className={`floating-cards flex h-52 w-52 tab:w-[80%] flex-col items-center justify-center bg-softBlue text-center text-white duration-500 tab:transform tab:rounded-md tab:transition-all`}
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
