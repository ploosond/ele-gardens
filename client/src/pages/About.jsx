import React from "react";
import { Leaf, Users, Heart } from "lucide-react";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Born from"
        highlight="Passion"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
              ab velit  et consequatur quam voluptatibus incidunt obcaecati,
              explicabo vel tempore."
      />

      {/* Core Values Section */}
      <section className="bg-three py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Custom Title and Subtitle */}
          <div className="mb-12 text-center">
            <h2 className="mt-2 text-4xl font-bold text-gray-800 md:text-5xl">
              What Guides Us Every Day
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sit
              corrupti tempora consequuntur quod aspernatur, sequi consectetur
              quos minima?
            </p>
          </div>

          {/* Values Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Leaf size={32} />,
                title: "Sustainability",
                text: "We prioritize eco-friendly practices and strive for a greener planet.",
              },
              {
                icon: <Heart size={32} />,
                title: "Passion",
                text: "Gardening is at the heart of everything we do.",
              },
              {
                icon: <Users size={32} />,
                title: "Community",
                text: "We believe in the power of working together to cultivate beauty.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-two py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Custom Title and Subtitle */}
          <div className="mb-12 text-center">
            <h2 className="mt-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Milestones Along the Way
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              optio nobis dicta.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Timeline Line */}
            <div className="absolute bottom-0 left-0 top-0 w-0.5 transform bg-tertiary md:left-1/2 md:translate-x-px"></div>

            {/* Timeline Events */}
            <div className="space-y-16">
              {[
                {
                  year: "2010",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.  consequuntur rerum? Blanditiis",
                },
                {
                  year: "2013",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.  consequuntur rerum? Blanditiis",
                },
                {
                  year: "2015",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.  consequuntur rerum? Blanditiis",
                },
                {
                  year: "2018",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.  consequuntur rerum? Blanditiis",
                },
                {
                  year: "2021",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.  consequuntur rerum? Blanditiis",
                },
                {
                  year: "Today",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.  consequuntur rerum? Blanditiis",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center md:flex-row md:items-start"
                >
                  {/* Left Content */}
                  <div
                    className={`${
                      index % 2 === 0
                        ? "md:order-1 md:pr-12 md:text-right"
                        : "md:order-2 md:pl-12"
                    } mt-6 md:mt-0 md:w-1/2`}
                  >
                    <div className="inline-block rounded-lg border border-green-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                      <h4 className="mb-2 text-xl font-medium text-gray-800">
                        {event.year}
                      </h4>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline Marker */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white md:absolute md:left-1/2 md:-translate-x-1/2 md:transform">
                    {index + 1}
                  </div>

                  {/* Right Content */}
                  <div
                    className={`${
                      index % 2 === 0
                        ? "md:order-2 md:pl-12"
                        : "md:order-1 md:pr-12 md:text-right"
                    } invisible md:visible md:w-1/2`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
