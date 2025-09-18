import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(["header", "footer"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto bg-gradient-to-l from-primary-dark to-primary px-4 pb-4 pt-16 text-on-dark sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-serif text-3xl font-medium">
              {t("brand", { ns: "footer" })}
            </h3>
            <p className="text-on-dark/80 md:max-w-md">
              {t("description", { ns: "footer" })}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">
              {t("quick_links", { ns: "footer" })}
            </h4>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              <li>
                <Link
                  to="/"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("home", { ns: "header" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("about", { ns: "header" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("products", { ns: "header" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/teams"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("our_team", { ns: "header" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("contact", { ns: "header" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/career"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("careers", { ns: "footer" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("projects", { ns: "header" })}
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="text-on-dark/80 transition-colors hover:text-on-dark"
                >
                  {t("privacy_policy", { ns: "footer" })}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-medium">
              {t("contact_us", { ns: "footer" })}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="text-garden-300 mr-2 mt-0.5 flex-shrink-0"
                />
                <span className="text-garden-100/80">
                  {t("address", { ns: "footer" })}
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
                  {t("email", { ns: "footer" })}
                </a>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="text-garden-300 mr-2 flex-shrink-0"
                />
                <a
                  href="tel:+49282691500"
                  className="text-garden-100/80 transition-colors hover:text-white"
                >
                  {t("phone", { ns: "footer" })}
                </a>
              </li>
            </ul>
            {/* Socials under Contact Us */}
            <div className="mt-4 flex space-x-4">
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
        </div>

        <div className="border-on-dark/10 mt-12 border-t pt-8 text-center">
          <p className="text-on-dark/70 text-sm">
            {t("copyright", { year: currentYear, ns: "footer" })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
