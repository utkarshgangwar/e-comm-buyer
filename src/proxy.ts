import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "hi"],
  defaultLocale: "en",
});

export const config = {
  // Matches all pages except static assets like images
  matcher: ["/", "/(en|hi)/:path*"],
};
