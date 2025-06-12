import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { Nunito, Montserrat } from "next/font/google";
import PageTransition from "./components/PageTransition";
import ClientMotionProvider from "././components/ClientMotionProvider";

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

export const metadata: Metadata = {
  title: "Andishi",
  description: "Democratizing Tech Talent for Everyone",
  other: {
    "font-subset": "latin",
    "font-display": "swap",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${montserrat.variable}`}>
      <body className="relative font-sans antialiased text-white bg-dark">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/bg-gradient-overlay.svg')] bg-center bg-cover opacity-75" />

        <ClientMotionProvider>
          <Navbar />

          {/* Smooth transition wrapper */}
          <main className="pt-16">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />
        </ClientMotionProvider>
      </body>
    </html>
  );
}
