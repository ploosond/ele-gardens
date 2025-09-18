import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact", formData);
      setFormStatus({
        submitted: true,
        error: false,
        message: response.data.message || t("form_success"),
      });
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      const errorMessage = error.response?.data?.error || t("form_error");
      setFormStatus({
        submitted: true,
        error: true,
        message: errorMessage,
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}

      <HeroSection
        title={t("hero_title")}
        highlight={t("hero_highlight")}
        description={t("hero_description")}
      />

      {/* Contact Info & Form */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold">{t("contact_us")}</h2>
            <p className="mt-2 text-gray-600">{t("contact_us_desc")}</p>

            <div className="mt-6 space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">{t("location_title")}</h3>
                  <p>{t("location_address1")}</p>
                  <p>{t("location_address2")}</p>
                  <p>{t("location_address3")}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">{t("phone_title")}</h3>
                  <p>
                    <a href="tel:+49282691500" className="hover:text-primary">
                      {t("phone_number")}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">[t('email_title')]</h3>
                  <p>
                    <a
                      href="mailto:info@elegardens.com"
                      className="hover:text-primary"
                    >
                      {t("email_address")}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">{t("hours_title")}</h3>
                  <p>{t("hours_value")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-muted bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-medium">
              {t("send_message_title")}
            </h2>

            {formStatus.submitted && (
              <div
                className={`mb-6 rounded-md p-4 ${formStatus.error ? "bg-red-100 text-red-800" : "bg-primary/10 text-primary"}`}
              >
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("form_firstname")}
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border p-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("form_lastname")}
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border p-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("form_email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border p-2 focus:outline-none"
                  />
                </div>

                <div className="">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      {t("form_phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border p-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium">
                  {t("form_message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-md border p-2 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-primary py-3 text-on-dark hover:bg-primary-dark"
              >
                {t("form_submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
