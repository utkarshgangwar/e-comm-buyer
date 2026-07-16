"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/src/lib/store/hooks";
import { loginSuccess } from "@/src/lib/store/features/authSlice";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "signup";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<AuthMode>("login");

  // Single unified state tracking for all potential form updates
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Standardize user details fallback if registering a new profile
    const userName = mode === "login" ? "Utkarsh Gangwar" : formData.name;

    dispatch(loginSuccess({ name: userName, email: formData.email }));
    alert(`Successfully ${mode === "login" ? "logged in" : "registered"}!`);
    onClose();
  };

  return (
    <>
      {/* Dynamic blurred backdrop click-away anchor layer */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all"
      />

      {/* Main Form Dashboard Body wrapper Container */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-sm p-6 rounded-2xl border border-gray-200 shadow-2xl z-50 animate-in zoom-in-95 duration-200">
        {/* Header Controller row panel */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
          <h3 className="text-base font-black text-gray-900 capitalize">
            {mode === "login" ? "Sign In Account" : "Create Account"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 text-sm cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Sign Up Specific Layout Field Addition */}
          {mode === "signup" && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Utkarsh Gangwar"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password Verification input block */}
          {mode === "signup" && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-950 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 shadow-sm transition-colors cursor-pointer mt-2"
          >
            {mode === "login" ? "Sign In & Continue" : "Register Account"}
          </button>
        </form>

        {/* Auth Mode Toggle Link line helper footer */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[11px] font-bold text-gray-500 hover:text-gray-900 hover:underline cursor-pointer transition-colors"
          >
            {mode === "login"
              ? "New here? Create an account"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </>
  );
}
