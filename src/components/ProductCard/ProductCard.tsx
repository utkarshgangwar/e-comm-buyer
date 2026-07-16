"use client";

import React from "react";
import { Link } from "../../i18n/routing";
import { useAppDispatch } from "../../lib/store/hooks";
import { addToCart } from "../../lib/store/features/cartSlice"; // Explicit path fixed

export interface ProductData {
  id: string | number;
  title?: string;
  price?: number;
  image: string;
}

type ProductCardProps = {
  item: ProductData;
  aspectRatioClass?: string;
  cardPaddingClass?: string;
  plainImages?: boolean;
  showActions?: boolean;
};

const ProductCard = ({
  item,
  aspectRatioClass = "aspect-[4/3]",
  cardPaddingClass = "p-2.5",
  plainImages = false,
  showActions = false,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // 🌟 Prevents the parent <Link> navigation when clicking 'Add'
    dispatch(
      addToCart({
        id: item.id,
        name: item.title || "Unnamed Product",
        price: item.price || 0,
      }),
    );
  };

  // 🌟 Construct the query param object safely
  const queryParams = new URLSearchParams({
    id: String(item.id),
    title: item.title || "",
    price: String(item.price || 0),
    image: item.image,
  }).toString();

  return (
    <Link
      href={`/product?${queryParams}`}
      className={`block w-full transition-all duration-200 cursor-pointer group ${cardPaddingClass} ${
        plainImages
          ? ""
          : "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Image Canvas Frame */}
      <div
        className={`w-full bg-gray-50 rounded-lg overflow-hidden relative border border-gray-100 ${aspectRatioClass}`}
      >
        <img
          src={item.image}
          alt={item.title || "Product item"}
          className="block h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
        />
      </div>

      {/* Content Specifications */}
      {showActions && (item.title || item.price) && !plainImages && (
        <div className="mt-2 space-y-0.5 px-0.5">
          {item.title && (
            <h3 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-gray-900 transition-colors">
              {item.title}
            </h3>
          )}
          <div className="flex items-center justify-between pt-0.5">
            {item.price !== undefined && (
              <span className="text-sm font-extrabold text-gray-900">
                ₹{item.price.toLocaleString("en-IN")}
              </span>
            )}
            <button
              type="button"
              onClick={handleAddToCart}
              className="text-[10px] font-bold bg-gray-900 text-white px-2.5 py-1 rounded-md hover:bg-gray-800 transition-colors cursor-pointer z-10"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
