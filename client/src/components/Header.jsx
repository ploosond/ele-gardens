import { useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },
  { name: "PRODUCTS", path: "/product" },
  {
    name: "OUR WORK",
    dropdown: true,
    subItems: [
      { name: "PROJECTS", path: "/project" },
      { name: "BLOGS", path: "/blog" },
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

  // Handle hover for desktop
  const handleMouseEnter = () => setDropdownOpen(true);
  const handleMouseLeave = () => setDropdownOpen(false);

  // Handle click for mobile
  const toggleDropdownMobile = () => setDropdownMobileOpen(!dropdownMobileOpen);

  // Toggle search box visibility
  const toggleSearchBox = () => setSearchVisible(!searchVisible);

  return (
    <nav className="top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto">
        {/* Container for logo, search box, and menu button */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
          {/* Menu/Close Button for Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none md:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <CloseSharpIcon /> : <MenuSharpIcon />}
          </button>

          {/* Logo (Always on the left side on Desktop, centered on Mobile) */}
          <NavLink
            to="/"
            className="mx-auto flex items-center justify-start md:mx-0"
          >
            <img src={logo} className="w-36" alt="Logo" />
          </NavLink>

          {/* Search Box / Icon */}
          <div className="flex items-center">
            {/* Search Box for Desktop */}
            <div className="relative ml-auto hidden items-center md:flex">
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full rounded-full bg-gray-100 px-8 py-3 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-lime-600 p-2 text-white transition hover:bg-lime-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
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

        {/* Navigation Items for Desktop */}
        <div className="hidden items-center justify-center gap-4 bg-gradient-to-r from-lime-600 to-lime-400 md:flex lg:gap-12">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <div
                key={index}
                className="group relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="hover:text-white-600 flex items-center p-4 font-semibold text-white focus:outline-none">
                  {item.name}
                </button>
                <div
                  className={`absolute left-0 w-48 bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg transition-opacity duration-300 ${
                    dropdownOpen ? "visible opacity-100" : "invisible opacity-0"
                  } `}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className="mx-4 block px-4 py-2 font-semibold text-white"
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
                className="p-4 font-semibold text-white"
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
            >
              {item.name}
            </NavLink>
          ),
        )}
      </div>

      {/* Mobile Search Box */}
      {searchVisible && (
        <div className="relative mx-10 bg-white p-4 md:hidden">
          <input
            type="text"
            placeholder="Quick seach..."
            className="w-full rounded-full bg-gray-100 px-10 py-3 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
            aria-label="Mobile search"
          />
          <button class="absolute right-2 top-1/2 mr-5 -translate-y-1/2 transform rounded-full bg-lime-600 p-2 text-white transition hover:bg-lime-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
