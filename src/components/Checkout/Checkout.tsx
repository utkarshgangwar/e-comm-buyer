"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { clearCart } from "@/src/lib/store/features/cartSlice";
import AuthModal from "@/src/components/AuthModal/AuthModal";

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Primary Forms
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "cod",
  });

  // Modal & Async Loading triggers
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-950"></div>
      </div>
    );
  }

  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No items to checkout
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Your shopping cart is currently empty.
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
          >
            Go back shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gatekeeper: If unauthenticated, halt form submission and slide up authentication modal
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert(
        `Order placed successfully using ${formData.paymentMethod.toUpperCase()}!`,
      );
      dispatch(clearCart());
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Shipping Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                    placeholder="Utkarsh Gangwar"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                    placeholder="Apartment, suite, unit, block number"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                      placeholder="Bhopal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      PIN / Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Payment Option
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === "cod" ? "border-gray-950 bg-gray-50/50 ring-1 ring-gray-950" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gray-900 accent-gray-950"
                    />
                    <span className="text-sm font-bold text-gray-800">
                      Cash on Delivery
                    </span>
                  </div>
                </label>
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === "online" ? "border-gray-950 bg-gray-50/50 ring-1 ring-gray-950" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === "online"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gray-900 accent-gray-950"
                    />
                    <span className="text-sm font-bold text-gray-800">
                      UPI / Cards / Net Banking
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Review Order
            </h2>
            <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 pr-1 space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-xs pt-2 first:pt-0"
                >
                  <div className="truncate max-w-[70%]">
                    <span className="font-bold text-gray-800">{item.name}</span>
                    <span className="text-gray-400 block">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-extrabold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Items</span>
              <span className="font-semibold text-gray-900">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping cost</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-900">
                Final Total
              </span>
              <span className="text-xl font-black text-gray-900">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-gray-950 text-white text-center py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-colors text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing Order...
                </>
              ) : !isAuthenticated ? (
                "Login to Place Order"
              ) : (
                "Place Order Now"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Render the modular login/signup AuthModal component state wrapper */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
