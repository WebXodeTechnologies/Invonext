"use client";

import React from "react";
import { Search, Plus, Kanban } from "lucide-react";

export default function TaskHeader({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  onOpenModal,
  totalTasks,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-indigo-100/60 to-purple-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100/80 shadow-xs">
              <Kanban size={13} className="text-indigo-600" /> Task Engine
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              {totalTasks} Active Work Items
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sprint & Invoicing Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Organize business tasks, audit reconciliations, and payment
            follow-ups in an agile workflow.
          </p>
        </div>

        {/* Filter & Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks or tags..."
              className="w-full sm:w-56 pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Priority Dropdown */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* New Task Button */}
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-2xl shadow-md shadow-indigo-200 transition cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
