import NavBar from "./NavBar";
const HeroSection = () => {
  return (
    <section
      id="hero_container"
      className="customHeroBg pagePadding container flex h-[110vh] flex-col bg-cover bg-center tab:h-screen mobile:h-screen"
    >
      <header>
        <NavBar />
      </header>
      <section
        id="hero_content"
        className="flex h-full flex-col pt-[5em] text-white tab:justify-center tab:pt-0"
      >
        <h4 className="mb-4 text-xl font-semibold">Inspire, Debate, Excel.</h4>
        <h1 className="w-[42%] text-[4.5em] font-semibold leading-[1em] tracking-wide tab:w-[66%] mobile:w-[100%] mobile:text-5xl">
          Where Ideas Ignite Minds
        </h1>
        <div className="mt-4">
          <button className="rounded-md bg-softBlue px-8 py-3 font-medium text-white">
            <a href="">ABOUT US</a>
          </button>
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
