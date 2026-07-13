"use client";

import React, { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { LuPin } from "../../constants/Icons";
import InputModal from "../Modals/InputModal";

const PinCode = () => {
  const t = useTranslations("pinCode");

  const [isOpen, setIsOpen] = useState(false);
  const [pincode, setPincode] = useState("450289");

  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const children = (
    <div>
      <input type="number" placeholder={t("placeholder")} />
    </div>
  );

  return (
    <>
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleIsOpen}
      >
        <LuPin />

        <div className="flex flex-col items-start">
          <span className="text-xs whitespace-nowrap">{t("deliver")}</span>

          <span>{pincode}</span>
        </div>
      </button>

      <InputModal isOpen={isOpen} onClose={handleIsOpen} title={t("title")}>
        {children}
      </InputModal>
    </>
  );
};

export default PinCode;
