import { createLazyFileRoute, Link } from "@tanstack/react-router";
import React from "react";
import HeroSection from "../components/HeroSection";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/career")({
  component: Career,
});

function Career() {
  const { t } = useTranslation("career");
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title={t("hero_title")}
        highlight={t("hero_highlight")}
        description={t("hero_description")}
      />

      {/* Why Work With Us Section */}
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-text">
            {t("why_work_title")}
          </h2>
          <p className="mb-16 text-center text-lg text-text">
            {t("why_work_desc")}
          </p>
          <div className="grid grid-cols-1 gap-24">
            {/* Growth & Learning */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold text-text">
                {t("growth_title")}
              </h3>
              <p className="text-text/70">{t("growth_desc")}</p>
            </div>
            {/* Passionate Team */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold text-text">
                {t("team_title")}
              </h3>
              <p className="text-text/70">{t("team_desc")}</p>
            </div>
            {/* Work-Life Balance */}
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold text-text">
                {t("balance_title")}
              </h3>
              <p className="text-text/70">{t("balance_desc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className="container mx-auto px-16 py-12">
        <h2 className="mb-6 text-center text-3xl font-bold text-text">
          {t("no_positions_title")}
        </h2>
        <p className="text-text/70 mb-6 text-center">
          {t("no_positions_desc1")}
        </p>
        <p className="text-text/70 mb-6 text-center">
          {t("no_positions_desc2")}
        </p>
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="rounded-md bg-primary px-6 py-3 text-on-dark hover:bg-primary-dark"
          >
            {t("contact_us")}
          </Link>
        </div>
      </div>
    </div>
  );
}
