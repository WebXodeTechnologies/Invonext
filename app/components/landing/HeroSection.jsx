"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileCheck2,
  ArrowUpRight,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("domestic");

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, -60]);
  const rotateMockup = useTransform(scrollY, [0, 600], [5, 0]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Dynamic Ambient Mesh with Randomized Drifting Purple / Violet Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Primary Purple Orb */}
        <motion.div
          animate={{
            x: [0, 140, -100, 80, 0],
            y: [0, -80, 110, -50, 0],
            scale: [1, 1.25, 0.95, 1.15, 1],
            opacity: [0.35, 0.65, 0.4, 0.7, 0.35],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 left-1/4 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] rounded-full bg-linear-to-tr from-purple-400/40 via-violet-300/35 to-indigo-300/30 blur-[130px]"
        />

        {/* Secondary Lavender Glow */}
        <motion.div
          animate={{
            x: [0, -120, 90, -70, 0],
            y: [0, 100, -80, 60, 0],
            scale: [1.1, 0.9, 1.2, 0.95, 1.1],
            opacity: [0.3, 0.6, 0.35, 0.55, 0.3],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-1/3 right-1/4 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full bg-linear-to-br from-fuchsia-300/30 via-purple-200/35 to-violet-400/25 blur-[140px]"
        />

        {/* Tertiary Accent Orb */}
        <motion.div
          animate={{
            x: [0, 90, -60, 110, 0],
            y: [0, -60, 90, -40, 0],
            scale: [0.95, 1.15, 0.9, 1.1, 0.95],
            opacity: [0.25, 0.5, 0.3, 0.6, 0.25],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-10 left-1/3 w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-linear-to-tl from-indigo-300/30 via-purple-200/25 to-sky-200/20 blur-[120px]"
        />

        {/* Precision Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f018_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f018_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        {/* Dynamic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-purple-100/90 shadow-[0_2px_12px_-2px_rgba(168,85,247,0.12)] backdrop-blur-xl"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-800">
            GST Dual-Split + Foreign LUT Engine
          </span>
          <span className="text-[9px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
            v2.4
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] max-w-3xl mx-auto"
        >
          Billing intelligence for Indian SMEs with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-violet-700">
            zero tax miscalculations.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed"
        >
          Automate Intrastate (CGST+SGST), Interstate (IGST), and zero-rated
          international client supplies with signature stamping and Kanban
          synchronization.
        </motion.p>

        {/* Action Buttons with Interactive Micro-Animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1 max-w-sm mx-auto"
        >
          <Link
            href="/sign-in"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-[0_4px_16px_-2px_rgba(147,51,234,0.35)] hover:shadow-[0_8px_24px_-4px_rgba(147,51,234,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <span>Live Dashboard</span>
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
          <a
            href="#gst-calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-white/90 hover:bg-white text-slate-800 hover:text-purple-700 font-bold text-xs rounded-xl border border-slate-200 hover:border-purple-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-95 backdrop-blur-md transition-all duration-200"
          >
            <span>Test Calculator</span>
          </a>
        </motion.div>

        {/* Social Proof Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-semibold text-slate-500"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-600" />
            Auto GSTR-1 Match
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-600" />
            Auto Signature Stamping
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-600" />
            Sprint Kanban Board
          </span>
        </motion.div>

        {/* Compact Glassmorphism UI Mockup */}
        <motion.div
          style={{ y: yParallax, rotateX: rotateMockup, opacity: opacityFade }}
          transition={{ ease: "easeOut" }}
          className="pt-6 max-w-4xl mx-auto perspective-[1000px]"
        >
          <div className="relative rounded-2xl bg-white/80 p-3 sm:p-4 border border-white shadow-[0_20px_50px_-12px_rgba(147,51,234,0.12)] backdrop-blur-2xl transition-all duration-300">
            {/* Top Toolbar in Window */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400 ml-2 hidden sm:inline">
                  https://app.invonxt.com/dashboard
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 rounded-lg text-[11px] font-bold backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("domestic")}
                  className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    activeTab === "domestic"
                      ? "bg-white text-purple-700 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Intrastate (TN)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("export")}
                  className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    activeTab === "export"
                      ? "bg-white text-purple-700 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Foreign (0% LUT)
                </button>
              </div>
            </div>

            {/* Dashboard Content Display */}
            <div className="pt-3 grid grid-cols-1 lg:grid-cols-12 gap-3 text-left">
              {/* Left Live Metrics Panel */}
              <div className="lg:col-span-8 bg-slate-950 text-white rounded-xl p-4 sm:p-5 space-y-4 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                      Active Stream
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      {activeTab === "domestic"
                        ? "Domestic Entity (Tamil Nadu)"
                        : "International Client (Zero-Rated Supply)"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Ledger
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-slate-400">
                      Settled Invoices
                    </span>
                    <p className="text-base sm:text-lg font-black font-mono text-white">
                      {activeTab === "domestic" ? "₹14,80,000" : "$18,450"}
                    </p>
                    <p className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <TrendingUp size={10} /> +24% YoY
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-slate-400">
                      Tax Liability
                    </span>
                    <p className="text-base sm:text-lg font-black font-mono text-purple-400">
                      {activeTab === "domestic" ? "₹1,33,200" : "$0.00"}
                    </p>
                    <p className="text-[9px] text-slate-400 font-semibold">
                      {activeTab === "domestic"
                        ? "9% CGST + 9% SGST"
                        : "LUT Zero-Rated"}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-slate-400">
                      Pipeline Status
                    </span>
                    <p className="text-base sm:text-lg font-black font-mono text-amber-400">
                      {activeTab === "domestic" ? "3 Sprints" : "1 Review"}
                    </p>
                    <p className="text-[9px] text-slate-400 font-semibold">
                      Kanban Synced
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Fast Invoice Item Mock */}
              <div className="lg:col-span-4 bg-white/95 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                      <FileCheck2 size={13} className="text-purple-600" />
                      Invoice Preview
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100">
                      INV-2026-012
                    </span>
                  </div>

                  <div className="text-[11px] space-y-1 text-slate-600 font-medium">
                    <div className="flex justify-between">
                      <span>Base Rate:</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {activeTab === "domestic" ? "₹40,000.00" : "$2,500.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (Applied):</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {activeTab === "domestic"
                          ? "+ ₹7,200.00"
                          : "$0.00 (LUT)"}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-100 text-[10px] font-medium text-slate-500">
                    Signature:{" "}
                    <span className="text-slate-900 font-bold">
                      Auto-Stamped
                    </span>
                  </div>
                </div>

                <Link
                  href="/sign-in"
                  className="w-full inline-flex items-center justify-center gap-1 py-2 bg-slate-900 hover:bg-purple-600 text-white text-[11px] font-bold rounded-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 shadow-2xs"
                >
                  <span>Test Inside App</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
