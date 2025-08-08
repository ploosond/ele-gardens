import { useState } from "react";
import { NavLink } from "react-router";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import logo from "../assets/logo.png";
import { ArrowUpRight, Globe } from "lucide-react";
import { IoLanguageSharp } from "react-icons/io5";
const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow">
      <div>
        {/* Top bar with logo and search */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none md:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <CloseSharpIcon /> : <MenuSharpIcon />}
            </button>

            {/* Logo - centered on mobile, left on desktop */}
            <NavLink to="/" className="ml-4 flex items-center md:ml-6 lg:ml-8">
              <img src={logo} className="h-10 w-auto md:h-12" alt="Logo" />
            </NavLink>

            {/* Navigation bar */}
            <div className="hidden items-center justify-center md:flex">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="text-md group relative inline-block overflow-hidden rounded-full border border-transparent px-4 py-2 font-outfit font-normal text-gray-800 transition-all duration-300 hover:border-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 z-0 rounded-full bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </NavLink>
              ))}
            </div>

            <div className="mr-4 flex items-center space-x-4 md:mr-6 lg:mr-8">
              {/* Language toggle button */}
              <button
                onClick={() => setLanguage(language === "EN" ? "DE" : "EN")}
                className="group flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 font-outfit text-sm font-semibold text-gray-800 transition hover:bg-gray-200"
                title={
                  language === "EN" ? "Switch to German" : "Switch to English"
                }
              >
                <IoLanguageSharp className="text-lg" />
                {language === "EN" ? "ENG" : "DEU"}
              </button>

              {/* Contact button */}
              <a
                href="/contact"
                className="group relative ml-4 hidden items-center gap-3 overflow-hidden rounded-full border border-gray-500 px-10 py-3 font-outfit transition-all duration-300 lg:flex"
              >
                <span className="relative z-10 flex items-center gap-3 text-gray-800">
                  Contact
                  <ArrowUpRight
                    width={24}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 rounded-full bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden ${menuOpen ? "block" : "hidden"} space-y-4 border-t bg-white py-4`}
      >
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="block px-6 py-2 font-outfit font-medium text-gray-800 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
