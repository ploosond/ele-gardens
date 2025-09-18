import HeroSection from "../utils/HeroSection";
import { assets } from "../assets/assets";
import NewsletterSignup from "../utils/NewsletterSignup";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  const { t } = useTranslation("about");
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title={t("hero_title")}
        highlight={t("hero_highlight")}
        description={t("hero_description")}
      />

      {/* Our Roots & Philosophy Section (updated layout: centered intro + CTA) */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="mb-8 text-base text-gray-700 sm:text-lg md:text-xl">
            {t("roots_intro")}
          </p>

          <p className="text-end text-xs italic text-gray-500 sm:text-sm">
            {t("roots_signature")}
          </p>
        </div>
      </section>

      {/* Milestones Along the Way (grid layout, seamless images/text) */}
      <section className="bg-white px-2 sm:px-4 md:px-10 lg:px-40">
        <div className="mx-auto max-w-6xl px-0 sm:px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
              {t("milestones_title")}
            </h2>
          </div>
          {/* Milestone 1 */}
          <div className="grid grid-cols-1 md:min-h-[20rem] md:grid-cols-2 md:items-center md:gap-12">
            <img
              src={assets.about_us_001}
              alt="Milestone 1"
              className="h-full w-full rounded-md object-cover"
            />
            <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:px-0">
              <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
                {t("milestone1_title")}
              </h2>
              <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
                <span className="font-bold text-text">
                  {t("milestone1_sub1")}
                </span>{" "}
                {t("milestone1_desc1")}
              </p>

              <p className="text-justify text-sm text-gray-700 sm:text-base">
                <span className="font-bold text-text">
                  {t("milestone1_sub2")}
                </span>{" "}
                {t("milestone1_desc2")}
              </p>
            </div>
          </div>
          {/* Milestone 2 */}
          <div className="grid grid-cols-1 md:min-h-[20rem] md:grid-cols-2 md:items-center md:gap-12">
            <img
              src={assets.about_us_002}
              alt="Milestone 2"
              className="order-1 h-full w-full rounded-md object-cover md:order-2"
            />
            <div className="order-2 flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:order-1 md:px-0">
              <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
                {t("milestone2_title")}
              </h2>
              <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
                <span className="font-bold text-text">
                  {t("milestone2_sub1")}
                </span>{" "}
                {t("milestone2_desc1")}
              </p>

              <p className="text-justify text-sm text-gray-700 sm:text-base">
                <span className="font-bold text-text">
                  {t("milestone2_sub2")}
                </span>{" "}
                {t("milestone2_desc2")}
              </p>
            </div>
          </div>
          {/* Milestone 3 */}
          <div className="grid grid-cols-1 md:min-h-[20rem] md:grid-cols-2 md:items-center md:gap-12">
            <img
              src={assets.about_us_003}
              alt="Milestone 3"
              className="h-full w-full rounded-md object-cover"
            />
            <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:px-0">
              <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
                {t("milestone3_title")}
              </h2>
              <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
                <span className="font-bold text-text">
                  {t("milestone3_sub1")}
                </span>{" "}
                {t("milestone3_desc1")}
              </p>

              <p className="text-justify text-sm text-gray-700 sm:text-base">
                <span className="font-bold text-text">
                  {t("milestone3_sub2")}
                </span>{" "}
                {t("milestone3_desc2")}
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
                <h2 className="mb-4 text-3xl font-extrabold text-secondary">
                  {t("our_story_title")}
                </h2>
                <p className="mb-4 text-justify text-base text-gray-700">
                  <span className="font-bold text-text">
                    {t("our_mission")}
                  </span>{" "}
                  {t("our_mission_desc")}
                </p>

                <p className="mb-4 text-justify text-base text-gray-700">
                  <span className="font-bold text-text">{t("our_vision")}</span>{" "}
                  {t("our_vision_desc")}
                </p>

                <p className="text-justify text-base text-gray-700">
                  <span className="font-bold">{t("our_values")}</span> —
                  {t("our_values_desc")}
                </p>
              </div>
            </div>

            {/* Right: CEO image with overlay and caption */}
            <div className="overflow-hiddenshadow-lg relative order-2 flex items-center md:order-none md:min-h-[20rem] lg:min-h-[24rem]">
              <img
                src={assets.about_us_ceo}
                alt="Founding CEO"
                className="h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10"></div>
              <div className="absolute bottom-6 left-6 w-[calc(100%-3rem)] text-white md:w-auto">
                <h3 className="text-lg font-bold">{t("ceo_title")}</h3>
                <p className="mt-1 text-sm">{t("ceo_desc")}</p>
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
}
