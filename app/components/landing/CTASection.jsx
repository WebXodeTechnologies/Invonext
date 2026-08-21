"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  const perks = [
    "No credit card required",
    "Instant Google OAuth",
    "Full GST & LUT support",
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-linear-to-tr from-purple-400/20 via-indigo-400/20 to-violet-300/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Glassmorphic CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-purple-950/90 p-8 sm:p-14 lg:p-16 text-white text-center space-y-7 border border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.6)] hover:shadow-[0_30px_70px_-12px_rgba(147,51,234,0.3)] hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
      >
        {/* Animated Light Streaks & Mesh in Card */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Micro Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/8 border border-white/10 shadow-inner backdrop-blur-md">
          <Sparkles size={13} className="text-purple-300" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-purple-200 uppercase">
            Zero Onboarding Friction
          </span>
        </div>

        {/* Heading */}
        <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-black tracking-tight leading-[1.1]">
            Experience modern billing intelligence{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-indigo-300 to-white">
              in under 60 seconds.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
            Create compliant tax invoices, test dynamic print themes, configure
            digital signature stamps, and automate your sprint pipeline
            immediately.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-in"
            className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-[0_10px_25px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_30px_-5px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Login with Google & Explore</span>
            <ArrowRight
              size={15}
              className="text-purple-600 group-hover/btn:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Trust & Assurance Perks */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] font-semibold text-slate-400 border-t border-white/8">
          {perks.map((perk, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              {perk}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
