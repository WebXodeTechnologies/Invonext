"use client";

import React, { useState } from "react";
import {
  Kanban,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
  GripVertical,
  Calendar,
  IndianRupee,
  MoreVertical,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_BOARD_DATA = {
  in_progress: {
    id: "in_progress",
    title: "Sprint Pipeline",
    icon: Clock3,
    color: "amber",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    accentBorder: "border-amber-400/50",
    cards: [
      {
        id: "c1",
        title: "Cloud Infrastructure Setup",
        client: "Webxode Technologies",
        amount: "₹40,000",
        due: "28 Aug",
        tag: "DevOps",
        tagColor: "bg-purple-50 text-purple-700 border-purple-100",
        priority: "Medium",
        priorityColor: "bg-slate-100 text-slate-700",
      },
      {
        id: "c2",
        title: "Next.js E-Commerce Micro-Frontend",
        client: "Aura Studio Inc.",
        amount: "₹85,000",
        due: "02 Sept",
        tag: "Frontend",
        tagColor: "bg-blue-50 text-blue-700 border-blue-100",
        priority: "High",
        priorityColor: "bg-rose-50 text-rose-700 border-rose-200/60",
      },
    ],
  },
  urgent: {
    id: "urgent",
    title: "Urgent Review & Audit",
    icon: AlertCircle,
    color: "rose",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80",
    iconBg: "bg-rose-50 text-rose-600 border-rose-100",
    accentBorder: "border-rose-400/50",
    cards: [
      {
        id: "c3",
        title: "Q3 GST Reconciliation & LUT Review",
        client: "Internal Audit",
        amount: "18% IGST",
        due: "Tomorrow",
        tag: "Compliance",
        tagColor: "bg-rose-50 text-rose-700 border-rose-100",
        priority: "Urgent",
        priorityColor: "bg-rose-500 text-white font-bold",
      },
      {
        id: "c4",
        title: "Foreign LUT Supply Dispatch",
        client: "Voxel Global (US)",
        amount: "$3,400",
        due: "30 Aug",
        tag: "Export 0%",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
        priority: "High",
        priorityColor: "bg-rose-50 text-rose-700 border-rose-200/60",
      },
    ],
  },
  settled: {
    id: "settled",
    title: "Settled & Dispatched",
    icon: CheckCircle2,
    color: "emerald",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    accentBorder: "border-emerald-400/50",
    cards: [
      {
        id: "c5",
        title: "INV-2026-012 Settlement",
        client: "Webxode Technologies",
        amount: "₹47,200",
        due: "Paid",
        tag: "Direct UPI",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
        priority: "Settled",
        priorityColor: "bg-emerald-100 text-emerald-800",
        completed: true,
      },
    ],
  },
};

export default function WorkflowKanbanPreview() {
  const [boardData, setBoardData] = useState(INITIAL_BOARD_DATA);
  const [activeCardId, setActiveCardId] = useState(null);

  return (
    <section
      id="workflow"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-14 relative"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-linear-to-tr from-purple-200/30 via-indigo-100/30 to-amber-100/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Section */}
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
            Operational Agility
          </span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
          Agile sprint pipelines,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-600 to-violet-700">
            synced with receivables.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          Manage invoices and deliverables through intuitive sprint stages.
          Real-time status changes instantly reflect on your live business
          analytics.
        </p>
      </div>

      {/* Interactive Kanban Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white/70 border border-white p-3 sm:p-6 shadow-[0_25px_60px_-15px_rgba(147,51,234,0.12)] backdrop-blur-2xl"
      >
        {/* Kanban Board Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-200/80 px-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <Layers size={17} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Active Sprint & Revenue Board
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Live automated pipeline linking tasks with GSTR ledgers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
              Real-time DB Sync
            </span>
          </div>
        </div>

        {/* 3 Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {Object.values(boardData).map((col) => {
            const ColumnIcon = col.icon;

            return (
              <div
                key={col.id}
                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3.5 hover:border-slate-300 transition-colors"
              >
                {/* Column Title & Counter */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg border ${col.iconBg}`}>
                      <ColumnIcon size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {col.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${col.badgeClass}`}
                  >
                    {col.cards.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 min-h-[220px]">
                  {col.cards.map((card) => (
                    <motion.div
                      key={card.id}
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setActiveCardId(card.id)}
                      onMouseLeave={() => setActiveCardId(null)}
                      className={`group relative p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-[0_8px_20px_-6px_rgba(147,51,234,0.15)] transition-all duration-200 space-y-3 ${
                        card.completed ? "opacity-85" : ""
                      }`}
                    >
                      {/* Card Header & Priority */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span
                            className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${card.tagColor}`}
                          >
                            {card.tag}
                          </span>
                          <h4
                            className={`text-xs font-bold text-slate-900 leading-snug group-hover:text-purple-700 transition-colors ${
                              card.completed
                                ? "line-through text-slate-500"
                                : ""
                            }`}
                          >
                            {card.title}
                          </h4>
                        </div>

                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${card.priorityColor} shrink-0`}
                        >
                          {card.priority}
                        </span>
                      </div>

                      {/* Card Client & Date / Amount Details */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                        <span className="truncate max-w-[110px] text-slate-600 font-semibold">
                          {card.client}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">
                            {card.amount}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Calendar size={10} />
                            {card.due}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Column Action */}
                <div className="pt-2 border-t border-slate-200/70">
                  <div className="w-full py-1.5 rounded-xl text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1 hover:text-purple-700 hover:bg-white transition-colors cursor-default">
                    <Plus size={12} />
                    <span>Connected to Sprint Queue</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
