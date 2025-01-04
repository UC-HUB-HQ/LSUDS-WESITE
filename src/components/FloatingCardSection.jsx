import React, { useEffect, useState } from "react";

const FloatingCardSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

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
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % floatingCardContent.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [floatingCardContent.length]);

  return (
    <section className="tab:overflow-hidden relative -mt-[8em] tab:mt-5 flex min-h-72 w-full items-start justify-center flex-wrap gap-8 py-8 ">
      {floatingCardContent.map((content, index) => {
        return (
          <div
            key={index}
            className={`tab:absolute inset-0 tab:h-full tab:w-full flex h-52 w-52 flex-col items-center justify-center bg-softBlue text-white text-center tab:transition-transform tab:transform ${
              index === currentIndex ? 'tab:translate-x-0' : 'tab:translate-x-full'
            }`}
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
