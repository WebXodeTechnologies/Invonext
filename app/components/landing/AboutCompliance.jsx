"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Landmark,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  QrCode,
  Lock,
  Copy,
  Check,
  Building,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutCompliance() {
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText("mail2meak22frcrio@okaxis");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const complianceBadges = [
    {
      title: "State of Supply Match",
      desc: "Auto-detects POS vs Billed To",
    },
    {
      title: "Digital Signature Injection",
      desc: "Stamp PNG signatures automatically",
    },
    {
      title: "Custom Note & Clause Memory",
      desc: "Saves default terms & bank info",
    },
    {
      title: "GSTR Audit Alignment",
      desc: "Compliant with GST Rule 26 & 46",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-linear-to-tr from-purple-500/10 via-indigo-500/10 to-violet-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Glassmorphic Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950/90 text-white p-7 sm:p-12 lg:p-14 border border-slate-800/80 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.6)] hover:shadow-[0_25px_70px_-12px_rgba(147,51,234,0.25)] hover:border-purple-500/30 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        {/* Subtle Ambient Mesh Inside Card */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        {/* Left Side: Copy & Feature Badges */}
        <div className="lg:col-span-7 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/80 shadow-inner backdrop-blur-md">
            <ShieldCheck size={13} className="text-purple-400" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-purple-300 uppercase">
              Compliance Standard
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight leading-[1.12]">
              Engineered specifically for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-indigo-300 to-white">
                Indian Agencies & Developers.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-medium max-w-xl">
              Handling interstate trade and international exports requires more
              than generic US-centric templates. InvoNext automates Indian
              banking coordinates, QR/UPI payloads, numeric roundings, and
              official PAN/GSTIN validation.
            </p>
          </div>

          {/* Interactive Compliance Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {complianceBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, x: 2 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-2xl bg-white/4 hover:bg-white/8 border border-white/8 hover:border-purple-500/30 backdrop-blur-md transition-all duration-200 flex items-start gap-2.5"
              >
                <CheckCircle2
                  size={16}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-100">
                    {badge.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: High-End Glassmorphic Settlement Card */}
        <div className="lg:col-span-5 relative z-10">
          <motion.div
            whileHover={{ y: -4, rotate: 0.5 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white/6 hover:bg-white/9 p-6 border border-white/10 hover:border-purple-500/40 shadow-2xl backdrop-blur-xl space-y-5 transition-all duration-300"
          >
            {/* Settlement Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                  <Landmark size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wide">
                    Bank & UPI Settlement Relay
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Auto-injected into invoice footers
                  </p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Structured Coordinates Grid */}
            <div className="space-y-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">BANK NAME</span>
                <span className="text-white font-bold">
                  Union Bank of India
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">ACCOUNT NO</span>
                <span className="text-purple-300 font-bold tracking-wider">
                  216911010000095
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">IFSC CODE</span>
                <span className="text-white font-bold">UBIN0821691</span>
              </div>

              {/* Interactive Copyable UPI Row */}
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <span className="text-purple-300/80 text-[10px] block font-sans">
                    DIRECT VPA / UPI
                  </span>
                  <span className="text-purple-200 font-bold text-[10px] sm:text-[11px]">
                    mail2meak22frcrio@okaxis
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyUPI}
                  className="p-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copied ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
            </div>

            {/* Card Status Indicator */}
            <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Lock size={11} className="text-purple-400" /> AES-256 Encrypted
                Profile
              </span>
              <span className="text-emerald-400 font-semibold font-mono">
                100% Synced
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
