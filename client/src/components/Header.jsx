import { useState } from "react";
import { NavLink } from "react-router";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Arrow from "./util/Arrow";
import logo from "../assets/logo.png";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },
  { name: "PRODUCTS", path: "/products" },
  {
    name: "OUR WORK",
    dropdown: true,
    subItems: [
      { name: "PROJECTS", path: "/projects" },
      { name: "BLOGS", path: "/blogs" },
    ],
  },
  { name: "TEAM", path: "/team" },
  { name: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownMobileOpen, setDropdownMobileOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  // Handle click for mobile
  const toggleDropdownMobile = () => setDropdownMobileOpen(!dropdownMobileOpen);

  // Toggle search box visibility
  const toggleSearchBox = () => setSearchVisible(!searchVisible);

  return (
    <header>
      <div className="bg-primary">
        {/* Top bar with logo and search */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none md:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <CloseSharpIcon /> : <MenuSharpIcon />}
            </button>

            {/* Logo - centered on mobile, left on desktop */}
            <NavLink
              to="/"
              className="mx-auto flex items-center justify-start md:mx-0"
            >
              <img src={logo} className="h-10 w-auto md:h-12" alt="Logo" />{" "}
              {/* <span className="font-serif text-2xl font-semibold text-white md:text-3xl">
                Ele <span className="text-garden-300">Gardens</span>
              </span> */}
            </NavLink>

            {/* Search */}
            <div className="flex items-center space-x-4">
              {/* Desktop search box */}
              <div className="relative hidden items-center md:flex">
                <input
                  type="text"
                  placeholder="Search plants..."
                  className="w-48 rounded-full bg-gray-100 py-2 pl-4 pr-10 focus:outline-none lg:w-64"
                />
                <button className="absolute right-3 rounded-full bg-secondary p-2 py-2 text-white transition hover:bg-accent hover:text-white">
                  <Arrow />
                </button>
              </div>

              {/* Search Icon for Mobile */}
              <div className="md:hidden">
                <button
                  onClick={toggleSearchBox}
                  className="text-gray-800"
                  aria-label="Toggle search box"
                >
                  <SearchSharpIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation bar */}
        <div className="hidden items-center justify-center space-x-2 bg-secondary md:flex lg:gap-12">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setDropdownOpen(index)} // Set the index of the open dropdown
                onMouseLeave={() => setDropdownOpen(null)} // Reset the open dropdown
              >
                <button className="inline-block rounded-md px-3 py-2 font-semibold text-white transition-colors duration-300 hover:bg-accent">
                  {item.name}
                </button>
                <div
                  className={`w-42 absolute left-0 z-20 my-2 rounded-md bg-accent px-3 py-2 text-white shadow-lg transition-all duration-300 ${
                    dropdownOpen === index
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className="block rounded px-3 py-2 font-semibold text-white transition-colors duration-300 hover:bg-tertiary"
                      onClick={() => setDropdownOpen(null)} // Close dropdown on click
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={index}
                to={item.path}
                className="my-1 inline-block rounded-md px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-accent"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                {item.name}
              </NavLink>
            ),
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden ${menuOpen ? "block" : "hidden"} space-y-4 border-t bg-white py-4`}
      >
        {navItems.map((item, index) =>
          item.dropdown ? (
            <div key={index} className="relative">
              <button
                className="flex w-full justify-between px-6 py-2 text-left text-gray-800 hover:bg-gray-100"
                onClick={toggleDropdownMobile}
                aria-expanded={dropdownMobileOpen ? "true" : "false"}
              >
                {item.name}
              </button>
              {dropdownMobileOpen && (
                <div className="space-y-2 pl-6">
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setMenuOpen(false); // Close menu
                        setDropdownMobileOpen(false); // Close dropdown
                      }}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className="block px-6 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {item.name}
            </NavLink>
          ),
        )}
      </div>

      {/* Repalce the search box with language option EN/DE */}
      {/* Mobile Search Box */}
      {searchVisible && (
        <div className="flex justify-center bg-secondary px-4 py-3 md:hidden">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full rounded-full bg-gray-100 py-2 pl-4 pr-10 focus:outline-none lg:w-64"
              aria-label="Mobile search"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 transform rounded-full bg-secondary p-2 py-2 text-white transition hover:bg-accent hover:text-white">
              <Arrow />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
