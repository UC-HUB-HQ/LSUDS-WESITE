import NavBar from "./NavBar";
const HeroSection = () => {
    return (
        <section id="hero_container" className=" h-screen customHeroBg bg-cover bg-center flex flex-col pagePadding ">
            <header>
                <NavBar />
            </header>
            <section id="hero_content" className="h-full flex justify-center flex-col text-white">
                <h4 className="text-xl font-semibold mb-4">Inspire, Debate, Excel.</h4>
                <h1 className=" font-semibold text-[4.5em] w-[42%] leading-[1em] tracking-wide">Where Ideas Ignite Minds</h1>
                <div className="mt-4">
                    <button className=" bg-softBlue text-white rounded-md px-8 py-3 font-medium"><a href="">ABOUT US</a></button>
                </div>
            </section>
        </section>
    )
}


export default HeroSection;