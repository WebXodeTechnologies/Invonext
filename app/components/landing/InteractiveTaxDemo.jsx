"use client";

import React, { useState } from "react";
import {
  Percent,
  Building2,
  Globe2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  ReceiptCheck,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveTaxDemo() {
  const [amount, setAmount] = useState(50000);
  const [clientType, setClientType] = useState("intrastate");
  const [taxRate, setTaxRate] = useState(18);

  const calculateTaxes = () => {
    const base = Number(amount) || 0;
    if (clientType === "foreign") {
      return {
        subTotal: base,
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: base,
        taxTypeBadge: "0% Export (LUT)",
        ruleTitle: "Zero-Rated Foreign Export",
        ruleText:
          "Export of services treated under Section 16 of IGST Act under Letter of Undertaking (LUT) with 0% tax liability.",
      };
    }
    if (clientType === "interstate") {
      const igst = (base * taxRate) / 100;
      return {
        subTotal: base,
        cgst: 0,
        sgst: 0,
        igst,
        total: base + igst,
        taxTypeBadge: `IGST ${taxRate}%`,
        ruleTitle: "Interstate Integrated Supply",
        ruleText: `Cross-border domestic supply: ${taxRate}% IGST allocated directly to Central Tax clearing ledger.`,
      };
    }
    const halfRate = taxRate / 2;
    const splitAmount = (base * halfRate) / 100;
    return {
      subTotal: base,
      cgst: splitAmount,
      sgst: splitAmount,
      igst: 0,
      total: base + splitAmount * 2,
      taxTypeBadge: `CGST ${halfRate}% + SGST ${halfRate}%`,
      ruleTitle: "Intrastate Dual Bifurcation",
      ruleText: `Within-state supply: Even 50/50 division into CGST (${halfRate}%) and SGST (${halfRate}%).`,
    };
  };

  const results = calculateTaxes();

  const presets = [25000, 50000, 100000, 250000];

  return (
    <section
      id="gst-calculator"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative"
    >
      {/* Background Ambient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-linear-to-tr from-purple-200/40 via-indigo-100/30 to-sky-100/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-purple-100/90 shadow-[0_2px_12px_-2px_rgba(168,85,247,0.1)] backdrop-blur-md"
        >
          <Sparkles size={13} className="text-purple-600" />
          <span className="text-[11px] font-bold text-slate-800 tracking-wide uppercase">
            Real-Time Taxation Engine
          </span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
          Precision tax compliance,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-violet-700">
            modeled live.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
          Simulate how InvoNext computes domestic CGST/SGST splits, out-of-state
          IGST invoices, and foreign export LUT declarations.
        </p>
      </div>

      {/* Main Glassmorphic Interactive Playground */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white/70 border border-white p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(147,51,234,0.12)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-5"
      >
        {/* Left Side: Controls Panel */}
        <div className="lg:col-span-6 p-5 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* 1. Client Jurisdiction Selectors */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                1. Select Client Supply Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setClientType("intrastate")}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                    clientType === "intrastate"
                      ? "bg-white border-purple-500 shadow-[0_4px_16px_-4px_rgba(147,51,234,0.2)] ring-2 ring-purple-100"
                      : "bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      clientType === "intrastate"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    <Building2 size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Intrastate
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Same State (TN)
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setClientType("interstate")}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                    clientType === "interstate"
                      ? "bg-white border-purple-500 shadow-[0_4px_16px_-4px_rgba(147,51,234,0.2)] ring-2 ring-purple-100"
                      : "bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      clientType === "interstate"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    <Percent size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Interstate
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Other State (IGST)
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setClientType("foreign")}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                    clientType === "foreign"
                      ? "bg-white border-purple-500 shadow-[0_4px_16px_-4px_rgba(147,51,234,0.2)] ring-2 ring-purple-100"
                      : "bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      clientType === "foreign"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    <Globe2 size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Foreign Client
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Export 0% LUT
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Billing Base Amount Input & Quick Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  2. Service Base Amount (₹)
                </label>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  INR Base
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-slate-50/90 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-purple-500 rounded-2xl text-base font-mono font-bold text-slate-900 outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="50000"
                />
              </div>

              {/* Quick Click Preset Tags */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-semibold text-slate-400">
                  Presets:
                </span>
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      amount === preset
                        ? "bg-purple-100 text-purple-700 font-black"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    ₹
                    {preset >= 100000
                      ? `${preset / 100000}L`
                      : `${preset / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. GST Slab Selection (Conditional) */}
            {clientType !== "foreign" && (
              <div className="space-y-2.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  3. Standard GST Slabs
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setTaxRate(rate)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        taxRate === rate
                          ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-white"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>Automatic round-off compliance with GST Rule 26</span>
          </div>
        </div>

        {/* Right Side: High-End Dark Terminal & Ledger Breakdown */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Top Header of the Ledger */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                Invoice Breakdown
              </span>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{results.ruleTitle}</span>
              </h3>
            </div>
            <span className="text-[10px] font-mono font-extrabold text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800">
              {results.taxTypeBadge}
            </span>
          </div>

          {/* Itemized Calculations */}
          <div className="space-y-3.5 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span>Taxable Base Value:</span>
              <span className="text-white font-bold">
                ₹
                {results.subTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {clientType === "intrastate" && (
                <motion.div
                  key="intra"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2.5 pt-1 border-t border-slate-800/80"
                >
                  <div className="flex justify-between items-center text-purple-300">
                    <span>Central GST ({taxRate / 2}%):</span>
                    <span>
                      + ₹
                      {results.cgst.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-purple-300">
                    <span>State GST ({taxRate / 2}%):</span>
                    <span>
                      + ₹
                      {results.sgst.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </motion.div>
              )}

              {clientType === "interstate" && (
                <motion.div
                  key="inter"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-1 border-t border-slate-800/80"
                >
                  <div className="flex justify-between items-center text-purple-300">
                    <span>Integrated Tax (IGST {taxRate}%):</span>
                    <span>
                      + ₹
                      {results.igst.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </motion.div>
              )}

              {clientType === "foreign" && (
                <motion.div
                  key="foreign"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-1 border-t border-slate-800/80"
                >
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Export GST Rate (LUT):</span>
                    <span>0.00% (Nil-Rated)</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Total Amount Due */}
            <div className="pt-4 border-t-2 border-slate-800 flex justify-between items-baseline">
              <div>
                <p className="text-[10px] font-sans uppercase font-bold text-slate-400">
                  Total Payable Amount
                </p>
                <p className="text-xl sm:text-2xl font-black text-white">
                  ₹
                  {results.total.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <span className="text-[10px] font-sans font-semibold text-slate-400">
                Inclusive of all taxes
              </span>
            </div>
          </div>

          {/* Legal Compliance Hint Box */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-300 font-sans leading-relaxed">
            <CheckCircle2
              size={15}
              className="text-emerald-400 shrink-0 mt-0.5"
            />
            <span>{results.ruleText}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
