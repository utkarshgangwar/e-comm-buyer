import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// 1. Import your Store Provider
import StoreProvider from "@/src/app/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce by Utkarsh Gangwar",
  description: "E-Commerce buyer website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {/* 2. Wrap everything inside the internationalization provider with Redux */}
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
