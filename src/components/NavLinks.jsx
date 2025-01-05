
import { Link } from "react-router-dom";
const NavLinks = ({ isMobileNav }) => {
  return (
    <>
      <ul
        className={isMobileNav ? `mobileNavLinkStyle` : `desktopNavLinksStyle`}
      >
        <li>
          <Link className="text-softBlue" to="/">
            Home
          </Link>
        </li>
        <li>
          <a href="#events">Events</a>
        </li>
        <li>
          <a href="#about">About Us</a>
        </li>
        <li>
          <a
            href="https://lasudebatesociety.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
