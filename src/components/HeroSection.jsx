import NavBar from "./NavBar";
const HeroSection = () => {
    return (
        <section id="hero_container" className=" h-screen customHeroBg bg-cover bg-center bg-no-repeat flex flex-col">
            <header>
                <NavBar />
            </header>
            <section id="hero_content" className="h-full flex justify-center flex-col px-[5em] text-white">
                <h4 className="text-2xl font-semibold">Inspire Debate Excel.</h4>
                <h1 className=" font-semibold text-[5em] w-[40%]">Where Ideas Ignite Minds</h1>
                <button className=" bg-green-900 w-[100px]">About Us</button>
            </section>
        </section>
    )
}


export default HeroSection;