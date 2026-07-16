"use client";

import React from "react";
import { Link } from "../../i18n/routing";
import { RiExchange2Line } from "../../constants/Icons";
import { useTranslations } from "next-intl";

type Props = {};

const Footer = (props: Props) => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      {/* Top Section: Navigation Grid & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Column 1: Brand & Description */}
        <div className="space-y-4 lg:col-span-2">
          <Link href="/">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <RiExchange2Line className="text-2xl text-orange-400" />
              <span>e-Comm</span>
            </div>
          </Link>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            {t("shopHeading")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/shop/fitness"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.fitness")}
              </Link>
            </li>
            <li>
              <Link
                href="/shop/apparel"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.apparel")}
              </Link>
            </li>
            <li>
              <Link
                href="/shop/footwear"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.footwear")}
              </Link>
            </li>
            <li>
              <Link
                href="/shop/accessories"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.accessories")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Support Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            {t("supportHeading")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/support/track-order"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.trackOrder")}
              </Link>
            </li>
            <li>
              <Link
                href="/support/returns"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.returns")}
              </Link>
            </li>
            <li>
              <Link
                href="/support/shipping"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.shipping")}
              </Link>
            </li>
            <li>
              <Link
                href="/support/contact"
                className="hover:text-orange-400 transition-colors"
              >
                {t("links.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
            {t("stayTunedHeading")}
          </h4>
          <p className="text-xs text-gray-400">{t("newsletterText")}</p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="w-full bg-gray-800 text-white text-xs px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-400 transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {t("joinButton")}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section: Copyright & Legal */}
      <div className="bg-gray-950 border-t border-gray-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          {/* Copyright Tag with Mismatch Suppression */}
          <div suppressHydrationWarning>
            &copy; {currentYear} e-Comm /{" "}
            <Link
              href="https://www.kridastudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline decoration-2 decoration-orange-500/30 hover:decoration-orange-600 transition-all inline-flex items-center gap-1 group"
            >
              Krida Studios
            </Link>{" "}
            {t("rightsReserved")}
          </div>

          {/* Legal Links Row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-gray-400 transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-400 transition-colors"
            >
              {t("termsOfService")}
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-gray-400 transition-colors"
            >
              {t("sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
