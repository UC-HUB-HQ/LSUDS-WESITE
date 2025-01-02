import NavBar from "./NavBar";
const HeroSection = () => {
    return (
        <section id="hero_container" className=" h-screen customHeroBg bg-cover bg-center bg-no-repeat flex flex-col">
            <header>
                <NavBar />
            </header>
            <section id="hero_content" className="h-full flex justify-center flex-col px-[5em] text-white">
                <h4 className="text-2xl font-semibold mb-4">Inspire Debate Excel.</h4>
                <h1 className=" font-semibold text-[5em] w-[45%] leading-[1em] tracking-wide">Where Ideas Ignite Minds</h1>
                <div className="mt-4">
                    <button className=" bg-softBlue text-white rounded-sm px-8 py-2">About Us</button>
                </div>
            </section>
        </section>
    )
}


export default HeroSection;