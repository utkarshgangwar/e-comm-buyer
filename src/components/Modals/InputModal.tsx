"use client";

import React, { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const InputModal = ({ isOpen, onClose, title, children }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="cursor-pointer">
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {/* <div className="flex items-center border-t pb-3 text-center">
          <button onClick={onClose} className="cursor-pointer">
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default InputModal;
