import React from "react";
import { LuSearch } from "react-icons/lu";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="flex w-full max-w-2xl overflow-hidden rounded-lg border border-gray-300 bg-white col-4 flex-1">
      {/* Category Dropdown */}
      <select className="border-r border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none">
        <option>All</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Lifestyle</option>
        <option>Fitness</option>
        <option>Kids</option>
        <option>Men</option>
        <option>Women</option>
        <option>Sports</option>
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-1 px-4 py-2 outline-none"
      />

      {/* Search Button */}
      <button
        type="button"
        className="flex items-center justify-center bg-blue-600 px-4 text-white transition-colors hover:bg-blue-700"
      >
        <LuSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
