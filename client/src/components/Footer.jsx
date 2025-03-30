import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto bg-primary px-4 py-16 text-gray-300 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-medium">Ele Gardens</h3>
            <p className="text-garden-100/80 md:max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              dolores incidunt asperiores ex ullam libero exercitationem, nemo
              totam suscipit deserunt!
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-garden-100/80 transition-colors hover:text-blue-600"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-garden-100/80 transition-colors hover:text-gray-900"
                aria-label="Twitter"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-garden-100/80 transition-colors hover:text-pink-500"
                aria-label="Instagram"
              >
                <IoLogoInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-garden-100/80 transition-colors hover:text-red-600"
                aria-label="Instagram"
              >
                <IoLogoYoutube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/our-work"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  to="/teams"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/career"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/location"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Our Locations
                </Link>
              </li>
              <li>
                <Link
                  to="/our-work/projects"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/our-work/blogs"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-2 mt-0.5 flex-shrink-0 text-garden-300"
                />
                <span className="text-garden-100/80">
                  123 Garden Avenue, Greenville, Nature Valley, 54321
                </span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={20}
                  className="mr-2 flex-shrink-0 text-garden-300"
                />
                <a
                  href="mailto:info@gardenoasis.com"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  info@gardenoasis.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-2 flex-shrink-0 text-garden-300"
                />
                <a
                  href="tel:+1234567890"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-garden-800 pt-8 text-center">
          <p className="text-sm text-garden-100/70">
            &copy; {currentYear} Garden Oasis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
