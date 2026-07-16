"use client";

import React, { useState, useEffect } from "react";

export interface FilterState {
  minPrice: number;
  maxPrice: number;
}

type Props = {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sortBy: string) => void;
};

const Filter = ({ onFilterChange, onSortChange }: Props) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    onFilterChange({
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
    });
  }, [minPrice, maxPrice, onFilterChange]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleClearAll = () => {
    setMinPrice("");
    maxPrice && setMaxPrice("");
    handleSortChange("featured");
  };

  const hasActiveFilters = minPrice || maxPrice || sortBy !== "featured";

  return (
    <div className="w-full backdrop-blur-md border border-b-slate-200/80 p-2 px-3 shadow-xs mb-6 transition-all bg-gray-600">
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 justify-start sm:justify-end">
        {/* Price Range Pill - Fixed Alignment & Spacing */}
        <div className="flex items-center justify-center gap-x-2 bg-white border border-slate-200 px-3 py-1 shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400 transition-all h-[34px] rounded-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase select-none tracking-wider">
            Price
          </span>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-14 bg-transparent text-xs text-slate-700 font-medium placeholder-slate-400 focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-slate-300 text-xs select-none flex items-center justify-center">
            —
          </span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-14 bg-transparent text-xs text-slate-700 font-medium placeholder-slate-400 focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Sorter Selector Select Dropdown Pill */}
        <div className="relative flex items-center bg-white border border-slate-200 px-2.5 py-1 shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400 transition-all h-[34px] rounded-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-1.5 select-none whitespace-nowrap tracking-wider">
            Sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-transparent text-xs text-slate-700 font-bold focus:outline-none cursor-pointer pr-1"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Smoothly Animated Reset Button Container */}
        <div
          className={`transition-all duration-300 ease-in-out flex items-center overflow-hidden ${
            hasActiveFilters
              ? "max-w-[100px] opacity-100 ml-1"
              : "max-w-0 opacity-0 ml-0 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-1.5 hover:bg-rose-50 rounded-lg transition-colors duration-200 cursor-pointer flex items-center h-[34px] whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
