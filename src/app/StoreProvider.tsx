"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { clearCart } from "../lib/store/features/cartSlice"; // Adjusted path & action

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode; // 1. Fixed unused 'count' in type definition
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // 2. Initial state is already handled by the slice definition,
    // but if you explicitly want to make sure it's clean on boot:
    // storeRef.current.dispatch(clearCart());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
