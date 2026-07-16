"use client";

import React, { useEffect, useState } from "react";
// 1. Import Next.js Link component
import { Link } from "../../i18n/routing";
import { useAppSelector } from "../../lib/store/hooks";
import { LuShoppingCart } from "../../constants/Icons";

type Props = {};

const NavCart = (props: Props) => {
  const cartItems = useAppSelector((state) => state.cart.items);

  // 1. Add a mounted state to prevent hydration flickering
  const [isMounted, setIsMounted] = useState(false);

  // 2. Set mounted to true once running entirely on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    // 2. Wrap the layout in a Link pointing to the "/cart" page we just created
    <Link
      href="/cart"
      className="relative inline-block p-2 cursor-pointer group"
    >
      <LuShoppingCart className="w-6 h-6 text-gray-700 transition-colors group-hover:text-gray-900" />

      {/* 3. Only show the badge after mounting to avoid server/client mismatch */}
      {isMounted && totalItemsCount > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white transform translate-x-1/4 -translate-y-1/4 animate-in fade-in zoom-in-75 duration-200">
          {totalItemsCount}
        </span>
      )}
    </Link>
  );
};

export default NavCart;
