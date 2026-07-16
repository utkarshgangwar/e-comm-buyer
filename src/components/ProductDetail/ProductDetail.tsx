"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "@/src/lib/store/features/cartSlice"; // Explicit path fixed
import Link from "next/link";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  const id = searchParams.get("id") || "";
  const title = searchParams.get("title") || "Product Details";
  const price = Number(searchParams.get("price")) || 0;
  const image = searchParams.get("image") || "";

  // 🌟 1. Read the real-time cart items state directly from Redux
  const cartItems = useAppSelector((state) => state.cart.items);

  // 🌟 2. Find if this specific product is already inside the Redux cart list
  const existingCartItem = cartItems.find(
    (item) => String(item.id) === String(id),
  );
  const currentQuantityInCart = existingCartItem
    ? existingCartItem.quantity
    : 0;

  const mockReviews: Review[] = [
    {
      id: "r1",
      author: "Aman Sharma",
      rating: 5,
      date: "14 July 2026",
      comment:
        "Absolutely fantastic value! Built robustly and highly premium look.",
    },
    {
      id: "r2",
      author: "Priya Patel",
      rating: 4,
      date: "02 July 2026",
      comment: "Very good product. Delivery was quick, packaging was secure.",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 🌟 3. Handle changing quantities through the real store actions
  const handleIncrease = () => {
    dispatch(addToCart({ id, name: title, price }));
  };

  const handleDecrease = () => {
    if (currentQuantityInCart === 1) {
      // If reducing from 1 to 0, completely drop it out of the cart
      dispatch(removeFromCart(id));
    } else if (currentQuantityInCart > 1) {
      // Otherwise decrement by passing the updated count value
      dispatch(updateQuantity({ id, quantity: currentQuantityInCart - 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>{" "}
          / <span className="text-gray-900">{title}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm mb-8">
          {/* Product Image Canvas */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 aspect-square max-h-[450px]">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                No image provided
              </div>
            )}
          </div>

          {/* Core Product Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-gray-900 bg-yellow-400 px-2 py-0.5 rounded">
                  ★ 4.5
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  ({mockReviews.length} verified reviews)
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900 pt-2">
                ₹{price.toLocaleString("en-IN")}
              </p>

              <hr className="border-gray-100 pt-2" />

              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Product Features
              </span>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Premium grade production materials guaranteed</li>
                <li>Comprehensive 1-year domestic brand assurance coverage</li>
                <li>Ergonomic design build suitable for regular use options</li>
              </ul>
            </div>

            {/* 🌟 4. Fully Synchronized Actions Panel */}
            <div className="pt-4 space-y-4">
              {currentQuantityInCart > 0 ? (
                /* State A: Product is already in the cart -> Show inline counter dashboard controls */
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      In Your Cart:
                    </span>
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        className="w-8 h-8 flex items-center justify-center text-sm text-gray-600 hover:text-gray-950 font-black rounded-lg hover:bg-white cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 text-xs font-extrabold text-gray-900 min-w-[32px] text-center select-none">
                        {currentQuantityInCart}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrease}
                        className="w-8 h-8 flex items-center justify-center text-sm text-gray-600 hover:text-gray-950 font-black rounded-lg hover:bg-white cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-medium text-gray-400">
                      Subtotal: ₹
                      {(price * currentQuantityInCart).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Subtle helper prompt */}
                  <p className="text-[11px] font-medium text-green-600 bg-green-50 p-2 rounded-lg text-center border border-green-100">
                    ✓ This item is in your cart. You can manage checkout
                    quantities here.
                  </p>
                </div>
              ) : (
                /* State B: Product is not in the cart -> Show primary CTA add button */
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="w-full bg-gray-950 text-white text-center py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors text-sm shadow-sm cursor-pointer"
                >
                  Add to Shopping Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customer Product Reviews Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
            Customer Ratings & Reviews
          </h2>

          <div className="divide-y divide-gray-100 space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="pt-4 first:pt-0 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">
                    {review.author}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400">
                    {review.date}
                  </span>
                </div>
                <div className="text-xs font-bold text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-950"></div>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
