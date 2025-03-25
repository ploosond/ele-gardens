import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import AddIcCallSharpIcon from "@mui/icons-material/AddIcCallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
const Footer = () => {
  return (
    <footer>
      <div className="bg-gradient-to-r from-lime-600 to-lime-400">
        <div className="my-10 flex flex-col gap-6 px-4 py-6 text-sm sm:grid-cols-[3fr_1fr_1fr] sm:px-8 md:grid md:px-16 lg:px-32 xl:px-64">
          <div>
            <img src={logo} alt="logo" className="mb-5 w-32" />
            <p className="text-justify text-gray-800 md:w-3/4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              quidem culpa omnis magnam earum a temporibus, eveniet reiciendis
              optio aliquid, eaque unde. Soluta sunt exercitationem commodi
              adipisci culpa veniam. Cum?
            </p>
          </div>

          <div>
            <p className="mb-4 text-lg font-medium text-gray-800">Company</p>
            <ul className="space-y-2 text-gray-800">
              <li>
                <NavLink to="/" className="hover:text-lime-600">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-lime-600">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/location" className="hover:text-lime-600">
                  Location
                </NavLink>
              </li>
              <li>
                <NavLink to="/career" className="hover:text-lime-600">
                  Career
                </NavLink>
              </li>
              <li>
                <NavLink to="/policy" className="hover:text-lime-600">
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-lg font-medium text-gray-800">
              Get in Touch
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>
                <AddIcCallSharpIcon /> +49-3213-321-3213
              </li>
              <li>
                <EmailSharpIcon /> contact@elegardens.com
              </li>
              <li>
                <p className="mb-4 mt-8 text-lg font-medium text-gray-800">
                  Follow Us:
                </p>
                <ul className="flex gap-6">
                  <li>
                    <a href="https://www.facebook.com/">
                      <FaFacebookF className="hover:text-blue-500" />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/">
                      <FaXTwitter className="hover:text-gray-800" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">
                      <IoLogoInstagram className="hover:text-pink-500" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/">
                      <IoLogoYoutube className="hover:text-red-500" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300" />
        <p className="py-5 text-center text-sm text-gray-700">
          Copyright © 2025 Ele Gardens Ltd. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
