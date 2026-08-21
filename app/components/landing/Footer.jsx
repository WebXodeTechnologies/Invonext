import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, ArrowUpRight, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "GST Engine", href: "#gst-calculator" },
    { name: "Capabilities", href: "#features" },
    { name: "Compliance & Bank", href: "#about" },
    { name: "Kanban Board", href: "#workflow" },
    { name: "Dashboard Login", href: "/sign-in" },
  ];

  const complianceBadges = [
    "CGST / SGST Intrastate Split",
    "Interstate IGST Engine",
    "Zero-Rated Export LUT (Sec 16)",
    "Rule 26 & 46 Invoicing Standards",
  ];

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/80 backdrop-blur-xl overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[180px] bg-linear-to-tr from-purple-200/30 via-indigo-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Identity & Summary */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="items-center gap-2.5 group inline-flex">
              <div className="h-8 w-8 rounded-xl bg-linear-to-br from-purple-600 via-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                <Zap size={16} className="fill-white/30" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  Invo<span className="text-purple-600 ml-1">Next</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                  <Sparkles size={9} /> SME Edition
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
              Minimal, high-velocity invoice generator and financial engine
              engineered for Indian SMEs, independent developers, and global
              digital agencies.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>GSTR-1 & Financial Audit Ready</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">
              Platform Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-purple-600 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-purple-500"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & System Standards */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">
              Tax Compliances Supported
            </p>
            <div className="flex flex-wrap gap-1.5">
              {complianceBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-900">
          <p>© {currentYear} InvoNext. All rights reserved.</p>

          {/* Developed By Webxode Technologies Attribution */}
          <div className="flex items-center gap-1.5 text-slate-900 font-semibold bg-slate-50/80 border border-slate-200/70 px-3 py-1 rounded-full">
            <span>Developed with</span>
            <Heart
              size={12}
              className="text-rose-500 fill-rose-500 animate-pulse"
            />
            <span>by</span>
            <a
              href="https://www.webxode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 font-bold hover:text-purple-600 transition-colors cursor-pointer"
            >
              Webxode Technologies
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <a
              href="#about"
              className="hover:text-purple-600 transition-colors"
            >
              Privacy & Security
            </a>
            <span>•</span>
            <a
              href="#features"
              className="hover:text-purple-600 transition-colors"
            >
              Terms of Supply
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
