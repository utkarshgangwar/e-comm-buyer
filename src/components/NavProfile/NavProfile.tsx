"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "../../i18n/routing";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import { logout } from "../../lib/store/features/authSlice";
import { LuUser } from "../../constants/Icons";
import AuthModal from "@/src/components/AuthModal/AuthModal";
import { useTranslations } from "next-intl";

type Props = {};

const NavProfile = (props: Props) => {
  const t = useTranslations("profileDropdown");
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Close the dropdown cleanly if a user clicks completely outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logout());
    alert(t("logoutAlert"));
  };

  return (
    <>
      {/* Subtle backdrop overlay to focus attention and manage clicks easily */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-40 transition-all duration-300"
        />
      )}

      <div className="relative inline-block text-left z-50" ref={dropdownRef}>
        {/* Toggle Button Profile Icon */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-full transition-colors inline-flex items-center justify-center cursor-pointer focus:outline-none ${
            isOpen
              ? "bg-gray-100 text-gray-950"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          }`}
          aria-label="Toggle profile menu"
        >
          <LuUser className="w-6 h-6" />
        </button>

        {/* Dropdown Options Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl bg-white p-1.5 shadow-2xl border border-gray-200/80 focus:outline-none overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
            {/* Authenticated Context greeting */}
            <div className="px-3 py-2 bg-gray-50/70 rounded-t-xl mb-1 border-b border-gray-100">
              <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {t("accountHeading")}
              </span>
              <span className="block text-xs font-bold text-gray-800 truncate mt-0.5">
                {isAuthenticated ? user?.name : t("guestUser")}
              </span>
            </div>

            <div className="space-y-0.5">
              {/* Profile Route Link */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center px-3 py-2 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-950 transition-colors"
              >
                {t("myProfile")}
              </Link>

              {/* Order History link */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center px-3 py-2 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-950 transition-colors"
              >
                {t("orderHistory")}
              </Link>

              {/* Contact Route */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center px-3 py-2 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-950 transition-colors"
              >
                {t("contactSupport")}
              </Link>

              <hr className="border-gray-100 my-1" />

              {/* Conditional Rendering Action: Login vs Logout */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer flex w-full items-center px-3 py-2 rounded-xl text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  {t("signOut")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="cursor-pointer flex w-full items-center px-3 py-2 rounded-xl text-left text-xs font-bold text-green-600 hover:bg-green-50 transition-colors"
                >
                  {t("signInRegister")}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Universal AuthModal integration hook */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default NavProfile;
