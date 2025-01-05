import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="pagePadding my-20 flex flex-row gap-10 tab:flex-col">
      <div className="h-full w-1/2 tab:w-full">
        <img
          src="https://plus.unsplash.com/premium_photo-1679547202606-4d905471107f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwZWFraW5nJTIwdG8lMjBhbiUyMGF1ZGllbmNlfGVufDB8fDB8fHww"
          alt="image of a public speaker"
          className="w-full"
        />
      </div>
      <div className="flex w-1/2 flex-col justify-start px-16 tab:w-full">
        <h1 className="mb-2 text-sm font-semibold text-customRed">About us</h1>
        <h2 className="mb-6 text-3xl font-medium">
          We are trendsetters in Public Speaking.
        </h2>
        <p className="mb-8 text-sm text-gray-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
          quaerat inventore blanditiis tempora amet doloremque iste sunt non? At
          ratione dolorum, expedita nisi ad in ex commodi blanditiis id
          necessitatibus! Odio dolorum quas ratione placeat reprehenderit
          adipisci, dolorem aperiam rem voluptatibus repudiandae sed dolores
          voluptas quasi quisquam repellendus sequi incidunt dicta veniam
          nesciunt suscipit distinctio? Nam velit omnis ea est!
        </p>
        <Link to="/about">
          <button className="h-12 w-36 rounded bg-softBlue p-4 text-xs font-semibold text-white">
            DISCOVER MORE
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
