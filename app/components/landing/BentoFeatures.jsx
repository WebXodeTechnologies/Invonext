"use client";

import React, { useState } from "react";
import {
  Receipt,
  Kanban,
  FileSpreadsheet,
  Palette,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    id: "tax-engine",
    icon: Receipt,
    badge: "Automated GST",
    title: "GST Dual-Split & Foreign LUT Engine",
    desc: "Intelligently bifurcates CGST/SGST for domestic buyers, computes IGST for out-of-state trade, and generates zero-rated supplies under LUT.",
    accent: "purple",
    tag: "Rule 26 Compliant",
    stat: "100% Audit Ready",
    gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
    borderGlow: "group-hover:border-purple-300",
    iconColor: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    id: "print-engine",
    icon: Palette,
    badge: "Multi-Theme PDF",
    title: "3 Print-Ready Invoice Formats",
    desc: "Switch between Corporate Purple, Emerald Minimalist, and Sky Double-Bordered designs with automated signature png stamping.",
    accent: "emerald",
    tag: "Vector Sharp A4",
    stat: "Auto Signature",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderGlow: "group-hover:border-emerald-300",
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    id: "kanban-sync",
    icon: Kanban,
    badge: "Agile Workflow",
    title: "Sprint Kanban & Milestone Tracker",
    desc: "Drag-and-drop task progression directly tied to client accounts to visualize receivable statuses and team deliverable stages.",
    accent: "amber",
    tag: "Live Drag & Drop",
    stat: "Real-time Sync",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderGlow: "group-hover:border-amber-300",
    iconColor: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    id: "export-reports",
    icon: FileSpreadsheet,
    badge: "Audit Ledgers",
    title: "GSTR-1 & Financial Excel Exports",
    desc: "Extract structured customer directories, itemized revenue logs, and tax liabilities formatted for monthly filing and accountant review.",
    accent: "indigo",
    tag: "Instant .XLSX",
    stat: "1-Click Download",
    gradient: "from-indigo-500/10 via-blue-500/5 to-transparent",
    borderGlow: "group-hover:border-indigo-300",
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
];

export default function BentoFeatures() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 relative"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-linear-to-tr from-purple-200/30 via-indigo-100/25 to-pink-100/25 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-purple-100 shadow-[0_2px_12px_-2px_rgba(168,85,247,0.12)] backdrop-blur-md"
        >
          <Sparkles size={13} className="text-purple-600" />
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            Enterprise Architecture
          </span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
          Engineered for velocity,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-violet-700">
            built for scale.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          A cohesive ecosystem that combines tax compliance calculations,
          multi-theme document generation, and sprint pipelines in one unified
          interface.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          const isHovered = hoveredCard === feature.id;

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onHoverStart={() => setHoveredCard(feature.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(147,51,234,0.12)] transition-all duration-300 ${feature.borderGlow}`}
            >
              {/* Dynamic Inner Background Gradient Glow on Hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="space-y-5 relative z-10">
                {/* Top Row: Icon + Badges */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-105 ${feature.iconColor}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                      {feature.stat}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-purple-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs">
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Feature Pill Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100/90 flex items-center justify-between text-xs relative z-10">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  {feature.tag}
                </span>

                <span className="text-[11px] font-bold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                  <span>Explore module</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
