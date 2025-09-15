import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import axios from "axios";
import HeroSection from "../components/HeroSection";

export const Route = createLazyFileRoute("/contact")({
  component: Contact,
});

function Contact() {
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
        message:
          response.data.message || "Your message has been sent successfully!",
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

      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
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
        title="Contact"
        highlight="Us"
        description="Have a question or need help planning your garden? Our team at Ele Gardens is here to help — visit our center, call, or send a message and we'll respond promptly."
      />

      {/* Contact Info & Form */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold">Contact Us</h2>
            <p className="mt-2 text-gray-600">
              Reach out to us for inquiries or assistance.
            </p>

            <div className="mt-6 space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p>Drüller Weg 14</p>
                  <p>47559 Kranenburg</p>
                  <p>Germany</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>
                    <a href="tel:+49282691500" className="hover:text-primary">
                      +49 2826 91500
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>
                    <a
                      href="mailto:info@elegardens.com"
                      className="hover:text-primary"
                    >
                      info@elegardens.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock size={24} className="mr-4 text-primary" />
                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p>Mon-Fri: 9 AM - 4 PM | Sat: Closed | Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-muted bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-medium">Send Us a Message</h2>

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
                    First Name *
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
                    Last Name *
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
                    Email *
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
                      Phone Number
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
                  Your Message *
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
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
