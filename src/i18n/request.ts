// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Await the dynamic segment parameter safely
  const requested = await requestLocale;

  // 2. Validate it against the configured locales without hitting headers()
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // 3. Import target dictionary based on clean fallback logic
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
