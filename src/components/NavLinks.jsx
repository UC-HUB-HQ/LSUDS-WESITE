import { Link } from "react-router-dom";
import { useUser } from "../context/User";

const NavLinks = ({ isMobileNav, closeSideBar }) => {
  const user = useUser();

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
          {user.current ? (
            <Link onClick={closeSideBar} to="/admin">
              Admin
            </Link>
          ) : (
            <Link onClick={closeSideBar} to="/signin">
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
