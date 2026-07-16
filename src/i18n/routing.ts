// src/i18n/routing.ts
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "hi"],

  // Used when no locale matches an incoming request
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);