import React from "react";

const FloatingCardSection = () => {
  const floatingCardContent = [1, 2, 3, 4];

  return (
    <section className="flex space-x-6 absolute top-3/4 right-16 pagePadding py-8 min-h-40 my-5 mx-20">
      {floatingCardContent.map((index, content) => {
        return (
          <div key={index} className="h-52 w-52 bg-blue-950 text-white flex items-center justify-center">{content}</div>
        );
      })}
    </section>
  );
};

export default FloatingCardSection;
