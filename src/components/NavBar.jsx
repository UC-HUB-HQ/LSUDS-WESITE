import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

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
      <ul className="flex items-center justify-between gap-4 font-semibold text-white mobile:hidden">
        <li>
          <Link to="/about">Home</Link>
        </li>
        <li>
          <a href="#events">Events</a>
        </li>
        <li>
          <a href="#about">About Us</a>
        </li>
        <li>
          <a href="https://lasudebatesociety.blogspot.com/" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
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
