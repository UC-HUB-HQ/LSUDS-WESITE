import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import NavLinks from "./NavLinks";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between py-3">
      <div className="">
        <img
          className="h-[60px] w-[130px] cursor-pointer"
          src={logo}
          alt="LSUDS LOGO"
        />
      </div>
      <NavLinks />
      {/* mobile hamburger */}
      <div className="hidden mobile:flex flex-col gap-1">
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </div>
    </nav>
  );
};

export default NavBar;
