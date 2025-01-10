import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="pagePadding mt-16 bg-[#001F3F] py-16 text-white">
      <section className="flex items-center justify-between tab:flex-col tab:gap-8">
        <div>
          <img className="h-[70px] w-[140px]" src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-8">
          <p>
            Empowering voices by bridging <br /> gaps in oratory and expression
          </p>
          <div className="flex flex-row gap-8 tab:justify-center">
            <i className="bi bi-instagram cursor-pointer text-xl"></i>
            <i className="bi bi-twitter cursor-pointer text-xl"></i>
            <i className="bi bi-linkedin cursor-pointer text-xl"></i>
            <i className="bi bi-facebook cursor-pointer text-xl"></i>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-softBlue">Valour In Speech</h2>
        </div>
      </section>
      <section className="mt-16 text-center text-gray-400">
        <p>
          © 2025 LSUDS, All rights reserved. Powered by{" "}
          <a href="https://theuchub.com/">UCHUB</a>
        </p>
      </section>
    </footer>
  );
};


export default Footer;
