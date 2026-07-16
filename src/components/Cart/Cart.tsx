"use client";

import React, { useEffect, useState } from "react";
import { Link } from "../../i18n/routing";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/src/lib/store/features/cartSlice";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const dispatch = useAppDispatch();

  // Guard against hydration flickering
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-950"></div>
      </div>
    );
  }

  // If the cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs font-semibold text-red-600 hover:text-red-500 hover:underline transition-colors cursor-pointer"
          >
            Clear All Items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm gap-4"
              >
                {/* 💡 PRODUCT IMAGE BLOCK */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100 flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-medium bg-gray-100 text-center px-1">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Price: ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 flex-shrink-0">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="px-2.5 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-gray-800 select-none min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="px-2.5 py-1 text-gray-600 hover:text-gray-900 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right flex flex-col items-end gap-1 flex-shrink-0 min-w-[70px]">
                  <span className="text-sm font-extrabold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-[10px] font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal Items</span>
              <span className="font-semibold text-gray-900">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>

            <hr className="border-gray-100 my-2" />

            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-900">
                Total Amount
              </span>
              <span className="text-xl font-black text-gray-900">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center mt-2 bg-gray-950 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm shadow-sm cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
