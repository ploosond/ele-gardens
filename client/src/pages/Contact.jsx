import { useState } from "react";
import Information from "../components/Information";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    });
    await axios.post("http://localhost:3001/api/contact", formData);
    alert("Thank you! We’ll be in touch soon.");
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <div className="rounded-sm bg-gray-100 p-4 shadow-md sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5 font-semibold">
            <p className="mt-2 text-justify text-gray-600">
              If you have any questions or suggestions, please do not hesitate
              to contact us.
            </p>
            <div className="grid grid-cols-2 gap-4 font-medium">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full rounded-sm p-2 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full rounded-sm p-2 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="font-medium">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-sm p-2 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
                required
              />
            </div>

            <div className="font-medium">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-sm p-2 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
                required
              />
            </div>

            <div className="font-medium">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-sm p-2 focus:shadow-[inset_0px_0px_5px_0px_#84cc16] focus:outline-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-sm bg-lime-600 py-2 text-white transition hover:bg-lime-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <Information />
      </div>
    </div>
  );
};

export default Contact;
