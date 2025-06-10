"use client";

import "./globals.css";
import { useEffect } from "react";
import type { Metadata } from "next";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { usePathname } from "next/navigation";
import { Nunito, Montserrat } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";

// Fonts
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
});

// Metadata
export const metadata: Metadata = {
  title: "Andishi",
  description: "Democratizing Tech Talent for Everyone",
  other: {
    "font-subset": "latin",
    "font-display": "swap",
  },
};

// ScrollToTop component
function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

// Client-side wrapper for animations
function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${montserrat.variable}`}>
      <body className="relative font-sans antialiased text-white bg-dark scroll-smooth">
        {/* Background overlay */}
        <div
          className="
            pointer-events-none
            fixed inset-0 -z-10
            bg-[url('/bg-gradient-overlay.svg')]
            bg-center bg-cover
            opacity-75
          "
        />

        <ScrollToTop />
        <Navbar />

        <main className="pt-16">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>

        <Footer />
      </body>
    </html>
  );
}
