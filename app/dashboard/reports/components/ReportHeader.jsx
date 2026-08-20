"use client";

import React, { useState } from "react";
import { LuDownload, LuFileSpreadsheet, LuCalendarDays } from "react-icons/lu";

export default function ReportHeader({ title, onFilterChange }) {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newRange = { ...dateRange, [name]: value };
    setDateRange(newRange);
    if (onFilterChange) onFilterChange(newRange);
  };

  const handleExportCSV = () => {
    window.open("/api/export/excel", "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="space-y-1 w-full lg:w-auto">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Financial & Invoicing Analysis
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
        <div className="flex items-center bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 p-1.5 rounded-2xl w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 px-2 md:px-4">
            <LuCalendarDays className="text-indigo-600 dark:text-indigo-400 hidden xs:block" size={18} />
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-indigo-400 dark:text-indigo-300 uppercase leading-none">From</label>
              <input
                type="date"
                name="from"
                value={dateRange.from}
                onChange={handleDateChange}
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer mt-0.5"
              />
            </div>
          </div>

          <div className="h-8 w-px bg-indigo-100 dark:bg-slate-700 mx-1 md:mx-2" />

          <div className="flex flex-col px-2 md:px-4">
            <label className="text-[10px] font-bold text-indigo-400 dark:text-indigo-300 uppercase leading-none">To Date</label>
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer mt-0.5"
            />
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-indigo-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all duration-200 group"
          >
            <LuFileSpreadsheet size={16} className="group-hover:scale-110 transition-transform" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all duration-200 shadow-md group"
          >
            <LuDownload size={16} className="group-hover:scale-110" />
            <span className="whitespace-nowrap">Print / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}