import React, { useEffect, useRef } from "react";

const FloatingCardSection = () => {
  const currentIndex = useRef(0);

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

  useEffect(() => {
    document.querySelectorAll(".floating-cards").forEach((card, index) => {
      if (index !== currentIndex.current) {
        card.classList.add("tab:hidden");
      }
    });

    const interval = setInterval(() => {
      // Get the current card
      const currentCard = cardRef.current[currentIndex.current];

      // Add slideOut animation
      currentCard.classList.add("tab:animate-slideOut");

      // Listen for animation end
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
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative -mt-[8em] flex w-full items-start justify-center gap-8 py-8 tab:mt-10 tab:overflow-hidden">
      {floatingCardContent.map((content, index) => {
        return (
          <div
            ref={(element) => (cardRef.current[index] = element)}
            key={index}
            className={`floating-cards flex h-52 w-52 flex-col items-center justify-center bg-softBlue text-center text-white duration-500 tab:transform tab:transition-all animate-slideIn tab:rounded-md`}
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
