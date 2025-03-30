import React from "react";
import HeroSection from "../components/HeroSection";

const Careers = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Build Your Career with"
        highlight="Us"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, quam pariatur. Animi, quia libero."
      />

      {/* Why Work With Us Section */}
      <div className="bg-one py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Why Work With Us?
          </h2>
          <p className="mb-16 text-center text-lg text-gray-900">
            Garden Harmony offers a fulfilling work environment where your
            talents and passion for landscaping can flourish.
          </p>
          <div className="grid grid-cols-1 gap-24">
            {/* Growth & Learning */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Growth & Learning
              </h3>
              <p className="text-gray-700">
                Continuous professional development and learning opportunities
                in horticulture and sustainable practices.
              </p>
            </div>
            {/* Passionate Team */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Passionate Team
              </h3>
              <p className="text-gray-700">
                Join a team that genuinely cares about creating beautiful,
                sustainable outdoor spaces.
              </p>
            </div>
            {/* Work-Life Balance */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Work-Life Balance
              </h3>
              <p className="text-gray-700">
                We value your well-being and provide a supportive environment
                that respects your time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className="container mx-auto px-16 py-12">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Currently No Open Positions
        </h2>
        <p className="mb-6 text-center text-gray-600">
          We're not currently hiring for any positions, but we're always
          interested in meeting talented individuals who are passionate about
          gardening and sustainable landscaping.
        </p>
        <p className="mb-6 text-center text-gray-600">
          If there will be any open positions in the future, we will post them
          here. Feel free to check back later or send your resume for future
          consideration.
        </p>
        <div className="flex justify-center">
          <a
            href="/contact"
            className="rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};
export default Careers;
