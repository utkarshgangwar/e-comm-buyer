import { configureStore, Middleware, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";

// Explicitly combine the slices to give TypeScript an unambiguous state blueprint
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const loadState = () => {
  if (typeof window === "undefined") return undefined;

  try {
    const preloadedState: any = {};

    const serializedCart = localStorage.getItem("redux_cart");
    if (serializedCart) {
      preloadedState.cart = JSON.parse(serializedCart);
    }

    const serializedAuth = localStorage.getItem("redux_auth");
    if (serializedAuth) {
      preloadedState.auth = JSON.parse(serializedAuth);
    }

    return Object.keys(preloadedState).length > 0 ? preloadedState : undefined;
  } catch {
    return undefined;
  }
};

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== "undefined") {
    const state = store.getState();
    localStorage.setItem("redux_cart", JSON.stringify(state.cart));
    localStorage.setItem("redux_auth", JSON.stringify(state.auth));
  }

  return result;
};

export const makeStore = () => {
  return configureStore({
    // Pass the explicitly typed root reducer variable here
    reducer: rootReducer,
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
