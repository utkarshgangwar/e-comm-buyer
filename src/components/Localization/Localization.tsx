"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

type Props = {};

const Localization = (props: Props) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const activeLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <>
      {/* 📱 1. MOBILE DEVICE VIEW: Clean native select system (immune to overflow:hidden constraints) */}
      <div className="block lg:hidden relative">
        <select
          value={currentLocale}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="cursor-pointer appearance-none bg-orange-400/30 hover:bg-orange-400/50 text-gray-900 font-bold text-xs rounded-xl pl-9 pr-8 py-2 border border-orange-500/20 focus:outline-none transition-all"
        >
          {languages.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              className="text-gray-900 bg-white"
            >
              {lang.label}
            </option>
          ))}
        </select>
        {/* Flag Icon absolute layer decoration overlay */}
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-sm select-none">
          {activeLang.flag}
        </span>
        {/* Dropdown chevron visual layout piece */}
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* 💻 2. DESKTOP VIEW: Premium smooth hover menu layout */}
      <div
        className="hidden lg:inline-block relative text-left pb-2"
        ref={dropdownRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Dropdown Trigger Button */}
        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center gap-x-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 shadow-sm hover:bg-gray-50 transition-colors border border-transparent"
        >
          <span>{activeLang.flag}</span>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Options Menu */}
        {isOpen && (
          <div className="absolute right-0 z-50 mt-1 w-36 origin-top-right rounded-xl bg-white p-1 shadow-xl border border-gray-100 focus:outline-none overflow-hidden animate-in fade-in slide-in-from-top-1 duration-100">
            <div className="py-0.5 space-y-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`cursor-pointer flex w-full items-center gap-x-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    currentLocale === lang.code
                      ? "bg-gray-950 text-white font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Localization;
