import React from "react";
import { Leaf, Users, Heart, ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router";
import MemberCard from "../components/MemberCard";
import { assets } from "../assets/assets";
import NewsletterSignup from "../components/NewsletterSignup";

const About = ({}) => {
  // Get featured team members (first 4)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Born from"
        highlight="Passion"
        description="Cultivating BIO‑certified perennials that bring beauty, resilience, and biodiversity to gardens and retail."
      />

      {/* Our Roots & Philosophy Section (updated layout: centered intro + CTA) */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="mb-8 text-base text-gray-700 sm:text-lg md:text-xl">
            Rooted in generations of horticultural expertise, Elegardens®
            blends traditional knowledge with sustainable innovation. We
            cultivate resilient, BIO-certified perennials designed to support
            biodiversity, delight customers, and perform reliably in the garden
            and at retail.
          </p>

          <p className="text-end text-xs italic text-gray-500 sm:text-sm">
            — The Elegardens Team
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
          <div className="grid grid-cols-1 md:min-h-[20rem] md:grid-cols-2 md:items-center md:gap-12">
            <img
              src={assets.about_us_001}
              alt="Milestone 1"
              className="h-full w-full object-cover"
            />
            <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:px-0">
              <h2 className="mb-4 text-xl font-extrabold sm:mb-6 sm:text-2xl">
                A Legacy of Horticultural Excellence
              </h2>
              <p className="mb-2 text-justify text-sm sm:mb-4 sm:text-base">
                <span className="font-bold">
                  A Family Tradition of Horticultural Excellence Since 1953
                </span>{" "}
                Elegardens® is the Bio Collection brand of Stauden Peters GbR,
                a family-owned company with over seven decades of horticultural
                tradition. Founded in 1953 in Kranenburg, Germany, Stauden
                Peters has grown from a small flower nursery into one of
                Europe’s leading producers of perennials, ornamental grasses,
                and peonies.
              </p>

              <p className="text-justify text-sm sm:text-base">
                <span className="font-bold">
                  Delivering Premium Plants Across Europe
                </span>{" "}
                Through its brands—Elegrass, Elerose, and Elegardens—the company
                delivers innovative, high-quality plant solutions to garden
                centers, nurseries, and wholesalers across Europe. With
                cultivation sites in both Germany and Portugal, Stauden Peters
                combines expertise with modern production methods and reliable
                logistics to ensure consistent availability and premium quality
                throughout the season.
              </p>
            </div>
          </div>
          {/* Milestone 2 */}
          <div className="grid grid-cols-1 md:min-h-[20rem] md:grid-cols-2 md:items-center md:gap-12">
            <img
              src={assets.about_us_002}
              alt="Milestone 2"
              className="order-1 h-full w-full object-cover md:order-2"
            />
            <div className="order-2 flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:order-1 md:px-0">
              <h2 className="mb-4 text-xl font-extrabold sm:mb-6 sm:text-2xl">
                Growth, Innovation, and Sustainability
              </h2>
              <p className="mb-2 text-justify text-sm sm:mb-4 sm:text-base">
                <span className="font-bold">
                  Cultivating Across Germany and Portugal
                </span>{" "}
                In Portugal, the company operates on 25 hectares, including 22
                hectares of open-field cultivation and 3 hectares under
                protective cover. In Germany, production spans three sites
                totaling 27 hectares, with 20 hectares of open fields and 7
                hectares equipped with advanced greenhouses.
              </p>

              <p className="text-justify text-sm sm:text-base">
                <span className="font-bold">
                  Innovation Meets Horticultural Heritage
                </span>{" "}
                A major milestone occurred in 2020 with the integration of the
                Reichswalde branch, formerly Nursery Stefan Wolf, into the
                family business. This 7-hectare site—featuring 3 hectares of
                state-of-the-art greenhouses and 4 hectares of open
                fields—blends horticultural heritage with innovation. It was
                here in 2024 that the Elegardens® BIO collection was launched,
                reflecting the company’s dedication to sustainable and
                forward-looking horticulture.
              </p>
            </div>
          </div>
          {/* Milestone 3 */}
          <div className="grid grid-cols-1 md:min-h-[20rem] md:grid-cols-2 md:items-center md:gap-12">
            <img
              src={assets.about_us_003}
              alt="Milestone 3"
              className="h-full w-full object-cover"
            />
            <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:px-0">
              <h2 className="mb-4 text-xl font-extrabold sm:mb-6 sm:text-2xl">
                The Elegardens® BIO Collection
              </h2>
              <p className="mb-2 text-justify text-sm sm:mb-4 sm:text-base">
                <span className="font-bold">
                  Certified Organic and Eco-Friendly
                </span>{" "}
                The Elegardens® BIO collection represents the next chapter in
                Stauden Peters’ journey, combining certified organic cultivation
                with a strong commitment to aesthetics and environmental care.
                Built on the principles of biodiversity, resilience, and
                sustainability, the collection features EU BIO-certified plants
                that grow naturally without the use of synthetic chemicals.
              </p>

              <p className="text-justify text-sm sm:text-base">
                <span className="font-bold">
                  Strengthening Your Assortment, Greening the Planet
                </span>{" "}
                By partnering with Stauden Peters, customers can enhance their
                assortment with premium perennials that not only offer visual
                appeal but also convey a meaningful ecological message. This
                collaboration strengthens market position, meets evolving
                customer expectations, and contributes to a greener, healthier
                planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO + Mission/Values combined section */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Left: condensed Mission/Vision/Values in one block */}
            <div className="order-1 flex items-center px-2 sm:px-4 md:order-none md:min-h-[20rem] md:px-0 lg:min-h-[24rem]">
              <div className="w-full px-4 py-4 sm:px-8 sm:py-6 md:px-0">
                <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
                  Our Story
                </h2>
                <p className="mb-4 text-justify text-base text-gray-700">
                  <span className="font-bold">Our Mission</span> — Our mission
                  is to cultivate BIO-certified perennials that enrich people
                  and the planet. We focus on resilient plants that support
                  biodiversity and strengthen ecosystems, with sustainability at
                  the heart of our approach.
                </p>

                <p className="mb-4 text-justify text-base text-gray-700">
                  <span className="font-bold">Our Vision</span> — Our vision is
                  to set new standards in sustainable horticulture by gradually
                  transitioning toward 100% BIO-certified cultivation, creating
                  plants that combine elegance with ecological value.
                </p>

                <p className="text-justify text-base text-gray-700">
                  <span className="font-bold">Our Values</span> — Sustainability
                  guides everything we do. We prioritize partnerships with
                  retailers, ensuring our collections are attractive,
                  eco-friendly, and market-ready. We blend decades of
                  horticultural expertise with innovation to produce
                  high-quality, climate-resilient plants.
                </p>
              </div>
            </div>

            {/* Right: CEO image with overlay and caption */}
            <div className="relative order-2 flex items-center overflow-hidden shadow-lg md:order-none md:min-h-[20rem] lg:min-h-[24rem]">
              <img
                src={assets.about_us_ceo}
                alt="Founding CEO"
                className="h-48 w-full object-cover sm:h-64 md:h-80 lg:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10"></div>
              <div className="absolute bottom-6 left-6 w-[calc(100%-3rem)] text-white md:w-auto">
                <h3 className="text-lg font-bold">Meet the Founding CEO</h3>
                <p className="mt-1 text-sm">
                  Leader in sustainable horticulture, guiding Elegardens' BIO
                  transition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup (moved to page end) */}
      <section className="py-2 sm:py-4">
        <div className="mx-auto max-w-6xl px-2 sm:px-4">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
};

export default About;
