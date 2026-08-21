"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      name: "Why InvoNxt",
      href: "#about",
      desc: "Built for Indian tax & compliance",
    },
    {
      name: "GST Engine",
      href: "#gst-calculator",
      desc: "Interactive tax calculations",
    },
    {
      name: "Capabilities",
      href: "#features",
      desc: "Multi-theme PDF & reports",
    },
    {
      name: "Kanban Board",
      href: "#workflow",
      desc: "Agile task pipeline sync",
    },
  ];

  // Drawer Animation Variants
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 35,
        when: "afterChildren",
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 40 },
    open: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.3 } },
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-6xl pointer-events-auto transition-all duration-500 rounded-2xl md:rounded-full ${
            scrolled
              ? "bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(79,70,229,0.08)] py-2.5 px-4 sm:px-6"
              : "bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_4px_24px_0_rgba(15,23,42,0.03)] py-3 px-5 sm:px-7"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-8 w-8 rounded-xl bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Zap size={16} className="fill-white/30" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900 tracking-tight">
                  Invo<span className="text-indigo-600">Nxt</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-full border border-indigo-200/50 backdrop-blur-sm">
                  <Sparkles size={9} className="text-indigo-600" /> SME Suite
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/3 p-1 rounded-full border border-slate-900/4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-900 hover:text-slate-950 hover:bg-white/80 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950 text-white font-bold text-xs shadow-md shadow-slate-950/15 hover:shadow-indigo-500/20 hover:bg-indigo-600 active:scale-95 transition-all duration-300"
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/sign-in"
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 hover:text-slate-950 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-in"
                    className="group relative inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 active:scale-95 transition-all duration-300"
                  >
                    <span>Get Started</span>
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.div>
      </header>

      {/* ================= FULL-SCREEN RIGHT SLIDE DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
            />

            {/* Full Screen Slide-in Drawer */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative w-full h-full bg-white/95 backdrop-blur-2xl p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200/80 z-10 overflow-y-auto"
            >
              {/* Top Header inside Drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                    <Zap size={20} className="fill-white/30" />
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    Invo<span className="text-indigo-600">Nxt</span>
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-900 hover:text-slate-900 hover:bg-slate-200 transition-colors active:scale-95"
                  aria-label="Close Navigation"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Staggered Navigation Items */}
              <div className="py-8 space-y-3">
                <p className="text-lg font-black uppercase tracking-wider text-slate-900 px-3">
                  Menu
                </p>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      variants={itemVariants}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-100 transition-all duration-200"
                    >
                      <div>
                        <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors block">
                          {link.name}
                        </span>
                        <span className="text-[14px] font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                          {link.desc}
                        </span>
                      </div>
                      <ChevronRight
                        size={24}
                        className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <motion.div
                variants={itemVariants}
                className="space-y-4 pt-6 border-t border-slate-100"
              >
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-900">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-600 shrink-0"
                  />
                  <span>GST & LUT Compliant Invoice Engine</span>
                </div>

                {isSignedIn ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-950/20 active:scale-95 transition-all"
                  >
                    <span>Launch Dashboard</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 active:scale-95 transition-all"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-3 text-xs font-bold text-slate-900 hover:text-slate-900 transition-colors"
                    >
                      Already have an account? Sign In
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
