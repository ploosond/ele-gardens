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
      <div className="from-primary-dark text-on-dark mx-auto bg-gradient-to-l to-primary px-4 pb-4 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-serif text-2xl font-medium">Ele Gardens</h3>
            <p className="text-on-dark/80 md:max-w-md">
              Ele Gardens combines horticultural expertise with sustainable
              practices to help you create lasting outdoor beauty — expert
              plants, personalized design, and dependable service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-on-dark/90 p-2 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="hover:text-on-dark/90 p-2 transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 transition-colors hover:text-accent"
                aria-label="Instagram"
              >
                <IoLogoInstagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 transition-colors hover:text-accent"
                aria-label="Instagram"
              >
                <IoLogoYoutube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">Quick Links</h4>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              <li>
                <Link
                  to="/"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/location"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Our Locations
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-on-dark/80 hover:text-on-dark transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="text-garden-300 mr-2 mt-0.5 flex-shrink-0"
                />
                <span className="text-garden-100/80">
                  Drüller Weg 14, 47559 Kranenburg
                </span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={20}
                  className="text-garden-300 mr-2 flex-shrink-0"
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
                  className="text-garden-300 mr-2 flex-shrink-0"
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

        <div className="border-on-dark/10 mt-12 border-t pt-8 text-center">
          <p className="text-on-dark/70 text-sm">
            Copyright ©{currentYear} Ele gardens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
