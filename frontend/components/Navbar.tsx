"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Menu, X, Sparkles, ArrowRight, Activity } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Intelligence Lab", href: "/intelligence-lab" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 dark:bg-agri-950/90 backdrop-blur-md shadow-sm border-b border-soil-200/50 dark:border-agri-800/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" showTagline={true} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-soil-100/60 dark:bg-agri-900/50 px-3 py-1.5 rounded-full border border-soil-200/60 dark:border-agri-800/50 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-agri-700 text-white dark:bg-agri-600 dark:text-white shadow-sm"
                      : "text-soil-700 dark:text-agri-200 hover:text-agri-800 dark:hover:text-white hover:bg-soil-200/40 dark:hover:bg-agri-800/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Model Status Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-agri-100/80 dark:bg-agri-900/60 border border-agri-300/50 dark:border-agri-700/50 text-[11px] font-mono text-agri-800 dark:text-agri-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Model Online</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-soil-700 dark:text-agri-200 hover:bg-soil-200/60 dark:hover:bg-agri-800/60 transition-colors border border-transparent hover:border-soil-300/40 dark:hover:border-agri-700/40"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-agri-800" />
              ) : (
                <Sun className="w-4 h-4 text-harvest-400" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/intelligence-lab"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-agri-700 to-agri-600 dark:from-agri-600 dark:to-agri-500 hover:from-agri-800 hover:to-agri-700 rounded-xl shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-harvest-300" />
              <span>Launch Lab</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-soil-700 dark:text-agri-200"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-harvest-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-soil-800 dark:text-agri-100 hover:bg-soil-200/50 dark:hover:bg-agri-800/50"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory dark:bg-agri-950 border-b border-soil-200 dark:border-agri-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-agri-700 text-white dark:bg-agri-600"
                      : "text-soil-800 dark:text-agri-200 hover:bg-soil-100 dark:hover:bg-agri-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-soil-200 dark:border-agri-800 mt-2">
              <Link
                href="/intelligence-lab"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-agri-700 dark:bg-agri-600 rounded-lg shadow"
              >
                <Sparkles className="w-4 h-4 text-harvest-300" />
                <span>Launch Intelligence Lab</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

