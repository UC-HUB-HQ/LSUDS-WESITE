import { NavLink } from "react-router-dom";

const NavLinks = ({ text, path }) => {
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) => {
          return isActive ? "active-link" : "";
        }}
      >
        {text}
      </NavLink>
      <i class="bi bi-plus"></i>
    </>
  );
};

export default NavLinks;
