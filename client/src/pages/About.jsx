import React from "react";
import { Leaf, Users, Heart, ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router";
import MemberCard from "../components/MemberCard";
import { assets } from "../assets/assets";

const About = ({ members }) => {
  // Get featured team members (first 4)
  const featuredTeam = members.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Born from"
        highlight="Passion"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ab velit  et consequatur quam voluptatibus incidunt obcaecati, explicabo vel tempore."
      />

      {/* Our Roots & Philosophy Section (updated layout: centered intro + CTA) */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-8 text-base text-gray-700 sm:text-lg md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Roots run
            deep — we plant ideas and grow stories. Random words to stand in
            while we polish the real content.
          </p>

          <p className="text-xs italic text-gray-500 sm:text-sm">
            — A short, friendly sign-off from the team
          </p>
        </div>
      </section>

      {/* Milestones Along the Way (grid layout, seamless images/text) */}
      <section className="bg-white px-2 sm:px-4 md:px-10 lg:px-40">
        <div className="mx-auto max-w-6xl px-0 sm:px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
              Milestones Along the Way
            </h2>
          </div>
          {/* Milestone 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src={assets.about_us_001}
              alt="Milestone 1"
              className="h-48 w-full object-cover sm:h-64 md:h-full md:min-h-[220px] lg:min-h-[260px]"
            />
            <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6">
              <h2 className="mb-4 text-xl font-extrabold sm:mb-6 sm:text-2xl">
                OUR POWER OF CONTENT
              </h2>
              <p className="mb-2 text-sm sm:mb-4 sm:text-base">
                <span className="font-bold">
                  “Shopping is an experience, but repair isn't.”
                </span>{" "}
                Even worse, repair is a hassle seen as outdated and dusty.
                That’s why we tell a fresh story of keeping clothes in play.
                From a viral campaign with BN’ers, to an Interview-series on the
                streets of Amsterdam, or our co-created brand content. We have
                shown that it works.
              </p>

              <p className="text-sm sm:text-base">
                <span className="font-bold">Our unfair advantage?</span> An
                in-house influencer. Our founder Agnes is reaching millions with
                her content. After a decade, she knows what it takes to inspire
                people around this topic.
              </p>
            </div>
          </div>
          {/* Milestone 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src={assets.about_us_002}
              alt="Milestone 2"
              className="order-1 h-48 w-full object-cover sm:h-64 md:order-2 md:h-full md:min-h-[220px] lg:min-h-[260px]"
            />
            <div className="order-2 flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:order-1">
              <h2 className="mb-4 text-xl font-extrabold sm:mb-6 sm:text-2xl">
                OUR POWER OF CONTENT
              </h2>
              <p className="mb-2 text-sm sm:mb-4 sm:text-base">
                <span className="font-bold">
                  “Shopping is an experience, but repair isn't.”
                </span>{" "}
                Even worse, repair is a hassle seen as outdated and dusty.
                That’s why we tell a fresh story of keeping clothes in play.
                From a viral campaign with BN’ers, to an Interview-series on the
                streets of Amsterdam, or our co-created brand content. We have
                shown that it works.
              </p>

              <p className="text-sm sm:text-base">
                <span className="font-bold">Our unfair advantage?</span> An
                in-house influencer. Our founder Agnes is reaching millions with
                her content. After a decade, she knows what it takes to inspire
                people around this topic.
              </p>
            </div>
          </div>
          {/* Milestone 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src={assets.about_us_003}
              alt="Milestone 3"
              className="h-48 w-full object-cover sm:h-64 md:h-full md:min-h-[220px] lg:min-h-[260px]"
            />
            <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6">
              <h2 className="mb-4 text-xl font-extrabold sm:mb-6 sm:text-2xl">
                OUR POWER OF CONTENT
              </h2>
              <p className="mb-2 text-sm sm:mb-4 sm:text-base">
                <span className="font-bold">
                  “Shopping is an experience, but repair isn't.”
                </span>{" "}
                Even worse, repair is a hassle seen as outdated and dusty.
                That’s why we tell a fresh story of keeping clothes in play.
                From a viral campaign with BN’ers, to an Interview-series on the
                streets of Amsterdam, or our co-created brand content. We have
                shown that it works.
              </p>

              <p className="text-sm sm:text-base">
                <span className="font-bold">Our unfair advantage?</span> An
                in-house influencer. Our founder Agnes is reaching millions with
                her content. After a decade, she knows what it takes to inspire
                people around this topic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Founding CEO */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-2 sm:px-4">
          <div className="mx-auto mb-6 max-w-3xl px-2 text-center sm:px-4 md:px-32">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
              Meet the Founding CEO
            </h2>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
              A short note on vision and leadership
            </p>
          </div>
          <div className="relative overflow-hidden shadow-lg">
            <img
              src={assets.about_us_ceo}
              alt="CEO"
              className="h-48 w-full object-cover object-bottom sm:h-64 md:h-80"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-two py-10 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Section Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-2 text-base text-gray-600 sm:text-lg">
                The experts behind our beautiful gardens
              </p>
            </div>
            <Link
              to="/team"
              className="text-garden-green-dark hover:text-garden-green-light hidden items-center transition-colors md:flex"
            >
              View full team <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {featuredTeam.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>

          {/* Mobile View Full Team Link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/team"
              className="text-garden-green-dark hover:text-garden-green-light inline-flex items-center transition-colors"
            >
              View full team <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
