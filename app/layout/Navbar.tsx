"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  // Handle navigation clicks
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const elementId = href.substring(1);
      smoothScrollTo(elementId);
    } else {
      setIsOpen(false);
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg"
          : "bg-white/5 backdrop-blur-lg border-b border-white/10"
      }`}
    >
      <div className="mx-auto flex items-center justify-between py-4 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-2xl font-bold font-montserrat text-white"
            onClick={() => setIsOpen(false)}
          >
            <img src="./logo.svg" alt="logo" className="w-10 h-10" />
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <motion.ul
          className="hidden md:flex items-center gap-8 text-white monty uppercase text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => handleNavClick("#why")}
              className="hover:text-[#02A4E6] transition-colors duration-150 cursor-pointer uppercase"
            >
              Why Andishi
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => handleNavClick("#services")}
              className="hover:text-[#02A4E6] transition-colors duration-150 cursor-pointer uppercase"
            >
              Services
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => handleNavClick("#blogs")}
              className="hover:text-[#02A4E6] transition-colors duration-150 cursor-pointer uppercase"
            >
              Blogs
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => handleNavClick("#projects")}
              className="hover:text-[#02A4E6] transition-colors duration-150 cursor-pointer uppercase"
            >
              Projects
            </button>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/start-project"
              className="px-4 py-2 bg-[#02A4E6] rounded-lg font-semibold hover:bg-[#0291CC] transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Start Project
            </Link>
          </motion.li>
        </motion.ul>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/10 monty uppercase text-sm"
          >
            <motion.ul
              className="flex flex-col gap-4 p-6 text-white"
              initial="hidden"
              animate="visible"
            >
              <motion.li
                custom={0}
                variants={linkItemVariants}
                className="border-b border-white/20 pb-2"
              >
                <button
                  onClick={() => handleNavClick("#why")}
                  className="hover:text-[#02A4E6] transition-colors duration-200 w-full text-left uppercase"
                >
                  Why Andishi
                </button>
              </motion.li>
              <motion.li
                custom={1}
                variants={linkItemVariants}
                className="border-b border-white/20 pb-2"
              >
                <button
                  onClick={() => handleNavClick("#services")}
                  className="hover:text-[#02A4E6] transition-colors duration-200 w-full text-left uppercase"
                >
                  Services
                </button>
              </motion.li>

              <motion.li
                custom={3}
                variants={linkItemVariants}
                className="border-b border-white/20 pb-2"
              >
                <button
                  onClick={() => handleNavClick("#blogs")}
                  className="hover:text-[#02A4E6] transition-colors duration-200 w-full text-left uppercase"
                >
                  Blogs
                </button>
              </motion.li>

              <motion.li
                custom={2}
                variants={linkItemVariants}
                className="border-b border-white/20 pb-2"
              >
                <button
                  onClick={() => handleNavClick("#projects")}
                  className="hover:text-[#02A4E6] transition-colors duration-200 w-full text-left uppercase"
                >
                  Projects
                </button>
              </motion.li>

              <motion.li custom={4} variants={linkItemVariants}>
                <Link
                  href="/start-project"
                  className="inline-block px-4 py-2 bg-[#02A4E6] rounded-lg font-semibold hover:bg-[#0291CC] transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Start Project
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
