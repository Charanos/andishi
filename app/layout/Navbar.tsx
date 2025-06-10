"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="mx-auto flex items-center justify-between py-4 px-6 md:px-20">
        <Link
          href="/"
          className="text-2xl font-bold font-montserrat text-white"
        >
          <img src="./logo.svg" alt="logo" className="w-10 h-10" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-white monty uppercase text-sm">
          <li>
            <Link href="#why" onClick={() => setIsOpen(false)}>
              Why Andishi
            </Link>
          </li>
          <li>
            <Link href="#services" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="#Blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/start-project"
              className="px-4 py-2 bg-[#02A4E6] rounded-lg font-semibold hover:opacity-90 transition"
              onClick={() => setIsOpen(false)}
            >
              Start Project
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-lg border-t border-white/10 monty uppercase text-sm">
          <ul className="flex flex-col gap-4 p-6 text-white">
            <li className="border-b border-white/20 pb-2">
              <Link href="#why" onClick={() => setIsOpen(false)}>
                Why Andishi
              </Link>
            </li>
            <li className="border-b border-white/20 pb-2">
              <Link href="#services" onClick={() => setIsOpen(false)}>
                Services
              </Link>
            </li>
            <li className="border-b border-white/20 pb-2">
              <Link href="#projects" onClick={() => setIsOpen(false)}>
                Projects
              </Link>
            </li>
            <li className="border-b border-white/20 pb-2">
              <Link href="#blogs" onClick={() => setIsOpen(false)}>
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/start-project"
                className="inline-block px-4 py-2 bg-[#02A4E6] rounded-lg font-semibold hover:opacity-90 transition"
                onClick={() => setIsOpen(false)}
              >
                Start Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
