"use client";

import React, { useState, useEffect } from "react";
import Filter, { FilterState } from "@/src/components/Filter/Filter";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import Pagination from "@/src/components/Pagination/Pagination";
import { browsedProducts } from "@/src/DummyData/caraousel";

const ITEMS_PER_PAGE = 8; // Adjust this number based on your grid preferences

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset back to page 1 whenever filters or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Perform Filtering & Sorting on the complete client-side array
  const filteredAndSortedProducts = browsedProducts
    .filter((product) => {
      // Price range match
      const productPrice = product.price ?? 0;
      const priceMatch =
        productPrice >= filters.minPrice && productPrice <= filters.maxPrice;

      return priceMatch;
    })
    .sort((a, b) => {
      const priceA = a.price ?? 0;
      const priceB = b.price ?? 0;

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "newest") return Number(b.id) - Number(a.id);
      return 0;
    });

  // 3. Calculate dynamic pagination constraints
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Slice down to only the active page's elements
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      {/* Render the interactive Filter Component */}
      <Filter onFilterChange={setFilters} onSortChange={setSortBy} />

      <div className="max-w-8xl mx-auto">
        {/* Main Shelves Result Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                aspectRatioClass="aspect-square"
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm font-medium">
            No products match your filter criteria.
          </div>
        )}

        {/* Dynamic Pagination Grid Footer Control */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
