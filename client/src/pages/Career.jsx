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
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-text mb-6 text-center text-3xl font-bold">
            Why Work With Us?
          </h2>
          <p className="text-text mb-16 text-center text-lg">
            Garden Harmony offers a fulfilling work environment where your
            talents and passion for landscaping can flourish.
          </p>
          <div className="grid grid-cols-1 gap-24">
            {/* Growth & Learning */}
            <div className="text-center">
              <h3 className="text-text mb-2 text-xl font-semibold">
                Growth & Learning
              </h3>
              <p className="text-text/70">
                Continuous professional development and learning opportunities
                in horticulture and sustainable practices.
              </p>
            </div>
            {/* Passionate Team */}
            <div className="text-center">
              <h3 className="text-text mb-2 text-xl font-semibold">
                Passionate Team
              </h3>
              <p className="text-text/70">
                Join a team that genuinely cares about creating beautiful,
                sustainable outdoor spaces.
              </p>
            </div>
            {/* Work-Life Balance */}
            <div className="text-center">
              <h3 className="text-text mb-2 text-xl font-semibold">
                Work-Life Balance
              </h3>
              <p className="text-text/70">
                We value your well-being and provide a supportive environment
                that respects your time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className="container mx-auto px-16 py-12">
        <h2 className="text-text mb-6 text-center text-3xl font-bold">
          Currently No Open Positions
        </h2>
        <p className="text-text/70 mb-6 text-center">
          We're not currently hiring for any positions, but we're always
          interested in meeting talented individuals who are passionate about
          gardening and sustainable landscaping.
        </p>
        <p className="text-text/70 mb-6 text-center">
          If there will be any open positions in the future, we will post them
          here. Feel free to check back later or send your resume for future
          consideration.
        </p>
        <div className="flex justify-center">
          <a
            href="/contact"
            className="text-on-dark hover:bg-primary-dark rounded-md bg-primary px-6 py-3"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};
export default Careers;
