"use client";

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null; // Hide pagination if there is only one page

  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${
              currentPage === page
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
