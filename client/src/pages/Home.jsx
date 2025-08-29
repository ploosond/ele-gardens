import { Link } from "react-router";
import { useState } from "react";
import {
  ArrowRight,
  Package,
  ShieldCheck,
  TreeDeciduous,
  TrendingUp,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import MemberCard from "../components/MemberCard";

const Home = ({ products, members }) => {
  const featuredProducts = products?.slice(0, 6);
  const featuredTeam = members.slice(0, 4);

  // Local hero video (place your MP4 at public/videos/intro.mp4)
  const localHero = "/videos/intro.mp4";
  // If you can't commit the local file, fallback to a hosted MP4 URL
  const [useFallback, setUseFallback] = useState(false);
  const fallbackHero = "https://www.w3schools.com/html/mov_bbb.mp4"; // change to your hosted URL if desired

  return (
    <div className="pt-16">
      {/* Fullscreen Intro Video Hero */}
      <section className="relative h-[50vh] w-full overflow-hidden md:h-[calc(100vh-4rem)]">
        {/* Video background (native file for clean cover) */}
        <div className="absolute inset-0 -z-10">
          {!useFallback ? (
            <video
              className="h-full w-full object-cover"
              src={localHero}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setUseFallback(true)}
            />
          ) : (
            <video
              className="h-full w-full object-cover"
              src={fallbackHero}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Overlay content (centered) */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Transform Your Space with{" "}
              <span className="text-green-300">Nature's Beauty</span>
            </h1>
            <p className="mx-auto mb-6 max-w-lg text-base text-white/80 sm:text-lg">
              Discover the perfect plants and designs to create your dream
              garden.
            </p>

            {/* CTA Buttons: stacked on mobile, inline on larger screens */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4 sm:px-0">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow transition-colors duration-150 hover:bg-gray-200 sm:w-auto"
              >
                Explore Products
              </Link>

              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow transition-colors duration-150 hover:bg-green-700 sm:w-auto"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1: Freshly Handpicked */}
            <div className="flex flex-col items-center text-center">
              <ShieldCheck
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-green-600"
              />
              <div className="mt-2 text-xl font-extrabold">
                Certified EU BIO Quality
              </div>
              <div className="mt-1 text-base text-gray-700">
                Independent certification guarantees compliance with the
                strictest European organic standards
              </div>
            </div>

            {/* Feature 2: Seasonal & Local */}
            <div className="flex flex-col items-center text-center">
              <TreeDeciduous
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-green-600"
              />
              <div className="mt-2 text-xl font-extrabold">
                Biodiversity-Enhancing
              </div>
              <div className="mt-1 text-base text-gray-700">
                Every plant is a pollinator-friendly asset, enriching gardens
                and supporting environmental balance
              </div>
            </div>

            {/* Feature 3: Premium Quality Blooms */}
            <div className="flex flex-col items-center text-center">
              <Package
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-green-600"
              />
              <div className="mt-2 text-xl font-extrabold">
                Retail-Ready Design
              </div>
              <div className="mt-1 text-base text-gray-700">
                Modern, eco-conscious branding enhances shelf appeal and
                strengthens consumer trust
              </div>
            </div>

            {/* Feature 4: Sustainable Choice */}
            <div className="flex flex-col items-center text-center">
              <TrendingUp
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-green-600"
              />
              <div className="mt-2 text-xl font-extrabold">Long-Term Value</div>
              <div className="mt-1 text-base text-gray-700">
                Premium quality and ecological responsibility without compromise
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Discover our selection of premium plants
              </p>
            </div>
            <Link
              to="/products"
              className="text-garden-green-dark hover:text-garden-green-light hidden items-center transition-colors md:flex"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {featuredProducts.map((product) => (
              <Link key={product._id} to={`/products/${product.tag}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>

          {/* Mobile View All Products Link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="text-garden-green-dark hover:text-garden-green-light inline-flex items-center transition-colors"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-two py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
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

      {/* CTA Section */}
      <section className="relative overflow-hidden py-6 md:py-8">
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Whether you're designing a new garden, renovating an existing space,
            or simply adding a few plants to your home, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 font-medium text-white transition hover:border-white hover:bg-green-700"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
