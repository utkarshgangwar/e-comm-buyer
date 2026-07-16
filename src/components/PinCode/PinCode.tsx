"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LuPin } from "../../constants/Icons";
import InputModal from "../Modals/InputModal";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import { setPincodeStore } from "../../lib/store/features/userSlice";

const PinCode = () => {
  const t = useTranslations("pinCode");
  const dispatch = useAppDispatch();

  // 1. Tracks whether the component has successfully mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pincode = useAppSelector((state) => state.user.pincode);
  const [isOpen, setIsOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);

  const handleIsOpen = useCallback(() => {
    if (!isOpen) {
      setTempPincode(pincode);
    }
    setIsOpen((prev) => !prev);
  }, [isOpen, pincode]);

  const handleSavePincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim().length > 0) {
      dispatch(setPincodeStore(tempPincode));
      setIsOpen(false);
    }
  };

  const children = (
    <form onSubmit={handleSavePincode} className="flex flex-col gap-4">
      <input
        type="number"
        value={tempPincode}
        onChange={(e) => setTempPincode(e.target.value)}
        placeholder={t("placeholder")}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
      >
        {t("save") || "Save"}
      </button>
    </form>
  );

  return (
    <>
      <button
        className="flex items-center gap-2 cursor-pointer group text-left"
        onClick={handleIsOpen}
        type="button"
      >
        <LuPin className="text-gray-600 group-hover:text-gray-900 transition-colors" />

        <div className="flex flex-col items-start">
          <span className="text-xs whitespace-nowrap text-gray-500">
            {t("deliver")}
          </span>
          {/* 💡 FIX: If not mounted yet, show the fallback default pin code string. 
            Once mounted, display the dynamic, actual local-storage values safely.
          */}
          <span className="text-sm font-semibold text-gray-900">
            {mounted ? pincode : ""}
          </span>
        </div>
      </button>

      <InputModal isOpen={isOpen} onClose={handleIsOpen} title={t("title")}>
        {children}
      </InputModal>
    </>
  );
};

export default PinCode;
