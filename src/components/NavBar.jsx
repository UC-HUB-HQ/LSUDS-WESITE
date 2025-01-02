import NavLinks from "./NavLinks";
import logo from "../assets/logo.png";

const NavBar = () => {
    return (
        <nav className=" flex justify-between items-center py-3">
            <div>
                <img className="h-[60px] w-[130px] cursor-pointer" src={logo} alt="LSUDS LOGO" />
            </div>
            <ul className="flex justify-between items-center gap-4 text-white font-semibold">
                <li>
                   <a href="">Home</a>
                </li>
                <li>
                    <a href="">Events</a>
                </li>
                <li>
                    <a href="">About Us</a>
                </li>
                <li>
                    <a href="https://lasudebatesociety.blogspot.com/" target="_blank" rel="noopener noreferrer">
                        Blog
                    </a>
                </li>
                <li>
                    <a href="">Contact Us</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;