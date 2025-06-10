import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { Nunito, Montserrat } from "next/font/google";

// Optimized font loading with subsets and display swap
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito", // Matches var name in Tailwind config
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat", // Matches var name in Tailwind config
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Andishi",
  description: "Democratizing Tech Talent for Everyone",
  // Optional: Add metadata for your fonts
  other: {
    "font-subset": "latin",
    "font-display": "swap",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${montserrat.variable}`}>
      <body className="relative font-sans antialiased text-white bg-dark">
        {/* Full-screen SVG overlay from public/bg-gradient-overlay.svg */}
        <div
          className="
            pointer-events-none
            fixed inset-0 -z-10
            bg-[url('/bg-gradient-overlay.svg')]
            bg-center bg-cover
            opacity-75
          "
        />

        <Navbar />

        <main className="pt-16">
          {" "}
          {/* add top padding equal to navbar height */}
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
