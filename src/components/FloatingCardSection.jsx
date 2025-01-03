import React from "react";

const FloatingCardSection = () => {
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

  return (
    <section className=" -mt-[6em] tab:mt-5 flex min-h-40 w-full items-start justify-center flex-wrap gap-8 py-8 tab:hidden">
      {floatingCardContent.map((content, index) => {
        return (
          <div
            key={index}
            className="flex h-52 w-52 flex-col items-center justify-center bg-softBlue text-white text-center"
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
