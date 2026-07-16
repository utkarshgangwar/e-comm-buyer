import { configureStore, Middleware, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
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

    const serializedUser = localStorage.getItem("redux_user");
    if (serializedUser) {
      preloadedState.user = JSON.parse(serializedUser);
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
    localStorage.setItem("redux_user", JSON.stringify(state.user));
  }

  return result;
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// 💡 ADDED TYPE EXPORTS FOR NEXT.JS & REDUX TOOLKIT COMPATIBILITY
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
