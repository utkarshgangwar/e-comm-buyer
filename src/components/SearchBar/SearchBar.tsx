"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "../../i18n/routing";
import { useParams } from "next/navigation";
import { LuSearch } from "../../constants/Icons";
import { useTranslations } from "next-intl";

// Mock database for suggestions
const MOCK_SUGGESTIONS: Record<string, string[]> = {
  electronics: [
    "Laptop Pro",
    "Wireless Earbuds",
    "Smart Watch v2",
    "Mechanical Keyboard",
  ],
  fashion: [
    "Leather Jacket",
    "Denim Jeans",
    "Sneakers Running",
    "Cotton T-Shirt",
  ],
  lifestyle: ["Scented Candle", "Ceramic Mug", "Desk Mat", "Organizer Tray"],
  fitness: [
    "Yoga Mat",
    "Dumbbells 5kg",
    "Resistance Bands",
    "Water Bottle Stainless",
  ],
  kids: ["Building Blocks", "Plush Bear", "Story Books", "Toy Car"],
  men: ["Men's Suit", "Men's Wallet", "Men's Boots"],
  women: ["Women's Handbag", "Women's Heels", "Women's Sunglasses"],
  sports: ["Football", "Tennis Racket", "Basketball", "Running Shoes"],
};

type Props = {};

const SearchBar = (props: Props) => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const currentParams = useParams(); // <-- Captures dynamic route parameters like [slug]

  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Debounce the search input query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // 2. Fetch dummy suggestions based on debounced query & selected category
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const currentCategory = category.toLowerCase();
    let pool: string[] = [];

    if (currentCategory === "all") {
      pool = Object.values(MOCK_SUGGESTIONS).flat();
    } else {
      pool = MOCK_SUGGESTIONS[currentCategory] || [];
    }

    const filtered = pool.filter((item) =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );

    if (filtered.length === 0) {
      setSuggestions([
        `Buy ${debouncedQuery}`,
        `${debouncedQuery} best price`,
        `New ${debouncedQuery} arrivals`,
      ]);
    } else {
      setSuggestions(filtered);
    }
  }, [debouncedQuery, category]);

  // 3. Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Execution function to handle actual search navigation
  const handleSearchSubmit = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setIsOpen(false);

    const params = new URLSearchParams();
    params.set("q", searchTerm.trim());

    // Dropdown value assignment
    if (category !== "All") {
      params.set("category", category);
    }

    // Capture the contextual page type (e.g. if URL is /shop/electronics, currentParams.slug will be "electronics")
    if (currentParams?.slug) {
      params.set("type", String(currentParams.slug));
    }

    // Results in: /shop/search?q=laptop&type=electronics
    router.push(`/shop/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(query);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* Search Bar Main Container */}
      <div className="flex w-full overflow-hidden rounded-lg border border-gray-300 bg-white h-[38px] md:h-[42px] transition-all focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400">
        {/* Category Dropdown */}
        <div className="relative flex shrink-0 items-center bg-gray-50 border-r border-gray-300">
          <select
            className="h-full bg-transparent pl-3 pr-2 sm:px-4 text-xs md:text-sm text-gray-600 font-medium outline-none cursor-pointer appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">{t("categories.all")}</option>
            <option value="Electronics">{t("categories.electronics")}</option>
            <option value="Fashion">{t("categories.fashion")}</option>
            <option value="Lifestyle">{t("categories.lifestyle")}</option>
            <option value="Fitness">{t("categories.fitness")}</option>
            <option value="Kids">{t("categories.kids")}</option>
            <option value="Men">{t("categories.men")}</option>
            <option value="Women">{t("categories.women")}</option>
            <option value="Sports">{t("categories.sports")}</option>
          </select>

          <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 block sm:hidden">
            <svg
              className="h-3 w-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={() => handleSearchSubmit(query)}
          className="flex shrink-0 items-center justify-center bg-blue-600 px-4 text-white transition-colors hover:bg-blue-700 cursor-pointer"
          aria-label="Submit search"
        >
          <LuSearch size={18} className="md:w-[20px] md:h-[20px]" />
        </button>
      </div>

      {/* Floating Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                handleSearchSubmit(suggestion);
              }}
              className="flex w-full items-center px-4 py-2 text-left text-xs md:text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <LuSearch size={14} className="mr-2 text-gray-400 shrink-0" />
              <span className="truncate">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
