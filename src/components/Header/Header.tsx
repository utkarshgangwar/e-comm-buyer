"use client";

import React, { useState } from "react";
import PinCode from "../PinCode/PinCode";
import SearchBar from "../SearchBar/SearchBar";
import Localization from "../Localization/Localization";
import NavProfile from "../NavProfile/NavProfile";
import NavCart from "../NavCart/NavCart";
import Navbar from "../Navbar/Navbar";
import { RiExchange2Line } from "../../constants/Icons";
import Link from "next/link";
import Notification from "../Notification/Notification";
import { useTranslations } from "next-intl";

type Props = {};

const Header = (props: Props) => {
  const t = useTranslations("navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-300 bg-orange-300 px-4 py-3">
        {/* Main Grid Structure */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-3 gap-x-6 max-w-8xl mx-auto w-full">
          {/* Left Side Layout Group */}
          <div className="flex items-center justify-between lg:justify-start gap-4 w-full lg:w-auto lg:flex-1 order-1">
            {/* Logo Group */}
            <Link href={"/"} className="shrink-0">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <RiExchange2Line className="text-xl" />
                <span>{t("brand")}</span>
              </div>
            </Link>

            {/* Desktop-only Pincode (Left Aligned) */}
            <div className="hidden lg:block shrink-0">
              <PinCode />
            </div>

            {/*  Mobile Action Group (Always Visible on Mobile/Tablet) */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-3">
              {/* Added Notification here so mobile shoppers can check updates instantly */}
              <Notification />
              <NavProfile />
              <NavCart />

              {/* Hamburger Toggle Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="text-gray-900 p-1.5 hover:bg-orange-400/50 rounded-lg transition-colors focus:outline-none ml-1"
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Input Block */}
          <div className="w-full lg:max-w-xl xl:max-w-2xl order-2 flex justify-center">
            <SearchBar />
          </div>

          {/* Desktop-only Utility System Actions Group */}
          <div className="hidden lg:flex items-center justify-end gap-5 min-w-max lg:flex-1 order-3">
            <Localization />
            <Notification />
            <NavProfile />
            <NavCart />
          </div>
        </div>

        {/* --- Mobile Hamburger Navigation Drawer --- */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? "max-h-[200px] opacity-100 mt-3 pt-3 border-t border-orange-400/30"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 pb-2">
            {/* Mobile Pincode Box */}
            <div className="bg-orange-200/40 p-2 rounded-lg inline-flex w-full">
              <PinCode />
            </div>

            {/* Miscellaneous Mobile Controls */}
            <div className="flex items-center justify-between border-t border-orange-400/20 pt-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">
                  Region:
                </span>
                <Localization />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navbar layout link line wrapper */}
      <div className="text-center border-b border-gray-400 bg-yellow-500 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
