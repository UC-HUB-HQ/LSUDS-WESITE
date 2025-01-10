
import { Link } from "react-router-dom";
const NavLinks = ({ isMobileNav, closeSideBar }) => {
  return (
    <>
      <ul
        className={isMobileNav ? `mobileNavLinkStyle` : `desktopNavLinksStyle`}
      >
        <li>
          <Link onClick={closeSideBar} className="text-softBlue" to="/">
            Home
          </Link>
        </li>
        <li>
          <a onClick={closeSideBar} href="#events">
            Events
          </a>
        </li>
        <li>
          <a onClick={closeSideBar} href="#about">
            About Us
          </a>
        </li>
        <li>
          <a
            onClick={closeSideBar}
            href="https://lasudebatesociety.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>
        <li>
          <a onClick={closeSideBar} href="#contact">
            Contact Us
          </a>
        </li>
        <li>
          <Link onClick={closeSideBar} to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
