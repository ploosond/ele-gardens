import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Package,
  ShieldCheck,
  TreeDeciduous,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import ProductCard from "../components/ProductCard";
import MemberCard from "../components/MemberCard";
import PartnersCarousel from "../components/PartnersCarousel";
import { useQuery } from "@tanstack/react-query";
import productService from "../api/productService";
import employeeService from "../api/employeeService";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useTranslation("home");
  const {
    isPending: isPendingProducts,
    isError: isErrorProducts,
    data: products,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAllProducts(),
    staleTime: 30000,
  });

  const {
    isPending: isPendingEmployees,
    isError: isErrorEmployees,
    data: employees,
    error: errorEmployees,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeService.getAllEmployees(),
    staleTime: 30000,
  });

  // Local hero video (place your MP4 at public/videos/intro.mp4)
  const localHero = "/videos/intro.mp4";
  // If you can't commit the local file, fallback to a hosted MP4 URL
  const [useFallback, setUseFallback] = useState(false);
  const fallbackHero = "https://www.w3schools.com/html/mov_bbb.mp4"; // change to your hosted URL if desired

  if (isPendingProducts) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isPendingEmployees) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isErrorProducts) {
    return (
      <div>
        <h2>Error: {errorProducts.message}</h2>
      </div>
    );
  }

  if (isErrorEmployees) {
    return (
      <div>
        <h2>Error: {errorEmployees.message}</h2>
      </div>
    );
  }

  return (
    <div>
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
              {t("welcome1")}
              <span className="text-accent">{t("welcome2")}</span>
            </h1>
            <p className="mx-auto mb-6 max-w-lg text-base text-white/80 sm:text-lg">
              {t("welcome3")}
            </p>

            {/* CTA Buttons: stacked on mobile, inline on larger screens */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4 sm:px-0">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-text shadow transition-colors duration-150 hover:bg-surface sm:w-auto"
              >
                {t("explore_products")}
              </Link>

              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-dark shadow transition-colors duration-150 hover:bg-primary-dark sm:w-auto"
              >
                {t("contact_our_team")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1: Freshly Handpicked */}
            <div className="flex flex-col items-center text-center">
              <ShieldCheck
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-primary"
              />
              <div className="mt-2 text-xl font-extrabold text-secondary">
                {t("feature1_title")}
              </div>
              <div className="mt-1 text-base text-text">
                {t("feature1_desc")}
              </div>
            </div>

            {/* Feature 2: Seasonal & Local */}
            <div className="flex flex-col items-center text-center">
              <TreeDeciduous
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-primary"
              />
              <div className="mt-2 text-xl font-extrabold text-secondary">
                {t("feature2_title")}
              </div>
              <div className="mt-1 text-base text-text">
                {t("feature2_desc")}
              </div>
            </div>

            {/* Feature 3: Premium Quality Blooms */}
            <div className="flex flex-col items-center text-center">
              <Package strokeWidth={1} className="mb-2 h-8 w-8 text-primary" />
              <div className="mt-2 text-xl font-extrabold text-secondary">
                {t("feature3_title")}
              </div>
              <div className="mt-1 text-base text-text">
                {t("feature3_desc")}
              </div>
            </div>

            {/* Feature 4: Sustainable Choice */}
            <div className="flex flex-col items-center text-center">
              <TrendingUp
                strokeWidth={1}
                className="mb-2 h-8 w-8 text-primary"
              />
              <div className="mt-2 text-xl font-extrabold text-secondary">
                {t("feature4_title")}
              </div>
              <div className="mt-1 text-base text-text">
                {t("feature4_desc")}
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
              <h2 className="text-3xl font-bold text-primary md:text-4xl">
                {t("featured_products")}
              </h2>
              <p className="mt-2 text-lg text-text">
                {t("discover_premium_plants")}
              </p>
            </div>
            <Link
              to="/products"
              className="hidden items-center text-primary transition-colors hover:text-primary-dark md:flex"
            >
              {t("view_all_products")}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {products.slice(0, 6).map((product) => (
              <Link key={product._id} to={`/products/${product.tag}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>

          {/* Mobile View All Products Link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center text-primary transition-colors hover:text-primary-dark"
            >
              {t("view_all_products")}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-0">
            <div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                {t("meet_our_team")}
              </h2>
              <p className="mt-2 text-base text-text sm:text-lg">
                {t("team_experts")}
              </p>
            </div>
            <Link
              to="/teams"
              className="hidden items-center text-primary transition-colors hover:text-primary-dark md:flex"
            >
              {t("view_full_team")}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-6">
            {employees.slice(0, 6).map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>

          {/* Mobile View Full Team Link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/teams"
              className="inline-flex items-center text-primary transition-colors hover:text-primary-dark"
            >
              {t("view_full_team")}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners carousel (logos) */}
      <PartnersCarousel />

      {/* CTA Section */}
      <section className="relative overflow-hidden py-6 md:py-8">
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {t("ready_transform")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text">
            {t("cta_desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 font-medium text-on-dark transition hover:border-white hover:bg-primary-dark"
            >
              {t("contact_our_team")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
