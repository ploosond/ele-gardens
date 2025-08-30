import { useState } from "react";
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
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center rounded-md border border-gray-200 p-2 text-gray-800 transition hover:bg-gray-50 focus:outline-none md:col-start-1 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <CloseSharpIcon fontSize="small" />
              ) : (
                <MenuSharpIcon fontSize="small" />
              )}
            </button>

            {/* Logo - centered on mobile, left on desktop */}
            <a
              href="/"
              className="absolute left-1/2 mx-auto flex -translate-x-1/2 transform items-center md:static md:col-start-1 md:ml-0 md:transform-none md:justify-self-start"
            >
              <img src={logo} className="h-10 w-auto md:h-12" alt="Logo" />
            </a>

            {/* Navigation bar */}
            <div className="hidden items-center md:col-start-2 md:flex md:justify-self-center">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="group relative inline-block overflow-hidden rounded-full border border-transparent px-3 py-2 font-outfit text-sm font-semibold uppercase text-gray-800 transition-all duration-300 hover:border-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 z-0 rounded-full bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              ))}
            </div>

            <div className="mr-4 flex items-center space-x-4 md:col-start-3 md:mr-0 md:justify-self-end">
              {/* Language toggle button */}
              <button
                onClick={() => setLanguage(language === "EN" ? "DE" : "EN")}
                className="group flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-outfit text-xs font-semibold text-gray-800 transition hover:bg-gray-200"
                title={
                  language === "EN" ? "Switch to German" : "Switch to English"
                }
              >
                <IoLanguageSharp className="text-sm" />
                {language === "EN" ? "ENG" : "DEU"}
              </button>

              {/* Contact button */}
              <a
                href="/contact"
                className="group relative ml-2 hidden items-center gap-2 overflow-hidden rounded-full border border-gray-500 px-4 py-1.5 font-outfit transition-all duration-300 lg:flex"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  Contact
                  <ArrowUpRight
                    width={18}
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
          <a
            key={index}
            href={item.path}
            className="block px-6 py-2 font-outfit text-sm font-semibold uppercase text-gray-800 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            {item.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
