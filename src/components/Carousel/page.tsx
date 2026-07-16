"use client";

import React, { useRef } from "react";
import ProductCard, { ProductData } from "../ProductCard/ProductCard";
import { useTranslations } from "next-intl";

type Props = {
  heading?: string;
  items: ProductData[];
  itemWidthClass?: string;
  aspectRatioClass?: string;
  gapClass?: string;
  cardPaddingClass?: string;
  plainImages?: boolean;
};

const Carousel = ({
  heading,
  items,
  itemWidthClass = "w-[55vw] sm:w-[35vw] md:w-[24vw] lg:w-[18vw]",
  aspectRatioClass = "aspect-[4/3]",
  gapClass = "gap-4",
  cardPaddingClass = "p-2.5",
  plainImages = false,
}: Props) => {
  const t = useTranslations("home");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;

      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto py-4 relative group/carousel">
      {heading && (
        <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
          {t(heading)}
        </h2>
      )}

      {/* Navigation Controls */}
      <button
        onClick={() => scroll("left")}
        type="button"
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-800 p-2.5 rounded-full shadow-md hover:bg-gray-50  group-hover/carousel:opacity-100 cursor-pointer"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => scroll("right")}
        type="button"
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-800 p-2.5 rounded-full shadow-md hover:bg-gray-50  group-hover/carousel:opacity-100 cursor-pointer"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Scroll Track */}
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-2 ${gapClass}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex-none snap-start ${itemWidthClass}`}
          >
            {/* Render the extracted standalone card element component */}
            <ProductCard
              item={item}
              aspectRatioClass={aspectRatioClass}
              cardPaddingClass={cardPaddingClass}
              plainImages={plainImages}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
