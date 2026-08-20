"use client";

import React from "react";
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Receipt,
  FileSpreadsheet,
  FileText,
  Calendar,
} from "lucide-react";

export default function ReportHeader({
  invoices = [],
  timeRange = "all",
  setTimeRange = () => {},
  onExport = () => {},
}) {
  const totalBilled = invoices.reduce(
    (sum, i) => sum + Number(i.totalAmount || 0),
    0,
  );
  const paidRevenue = invoices
    .filter((i) => (i.status || "").toLowerCase() === "paid")
    .reduce((sum, i) => sum + Number(i.totalAmount || 0), 0);
  const pendingRevenue = invoices
    .filter((i) =>
      ["pending", "sent", "draft"].includes((i.status || "").toLowerCase()),
    )
    .reduce((sum, i) => sum + Number(i.totalAmount || 0), 0);
  const overdueRevenue = invoices
    .filter((i) => (i.status || "").toLowerCase() === "overdue")
    .reduce((sum, i) => sum + Number(i.totalAmount || 0), 0);
  const totalTax = invoices.reduce(
    (sum, i) => sum + Number(i.tax?.amount || 0),
    0,
  );

  const collectionRate =
    totalBilled > 0 ? Math.round((paidRevenue / totalBilled) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Clean White Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-7 sm:p-9 text-slate-900 shadow-xs border border-slate-200/80">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-linear-to-br from-indigo-100/60 to-purple-50/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 w-60 h-60 bg-linear-to-tr from-blue-50/50 to-emerald-50/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100/80 shadow-xs">
                <Receipt size={13} className="text-indigo-600" /> Financial
                Intelligence & Audit
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                {invoices.length} Documents Synced
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Billing & Collections Ledger
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Track settlement velocity, outstanding debt aging, and tax
              liability reconciliation in real time.
            </p>
          </div>

          {/* Filter & Action Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-9 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition cursor-pointer"
              >
                <option value="all">All-Time History</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Quarterly (90 Days)</option>
                <option value="365">Current Fiscal Year</option>
              </select>
              <Calendar
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onExport("excel")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-2xl border border-emerald-200/80 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <FileSpreadsheet size={15} />
                <span>Excel</span>
              </button>

              <button
                type="button"
                onClick={() => onExport("csv")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-2xl border border-indigo-200/80 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <FileText size={15} />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Realized Cash */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Collected Cash
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{paidRevenue.toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-600">
              <span>{collectionRate}% collection efficiency</span>
            </div>
          </div>
        </div>

        {/* Pending Receivables */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Balance
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{pendingRevenue.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] font-semibold text-amber-600">
              Unsettled / In-Transit
            </span>
          </div>
        </div>

        {/* Overdue Debt */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Overdue Balance
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{overdueRevenue.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] font-semibold text-rose-600">
              Requires Settlement Follow-up
            </span>
          </div>
        </div>

        {/* Output GST */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tax Liability
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-600 tracking-tight">
              ₹{totalTax.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] font-semibold text-indigo-600">
              GSTR-1 Output Tax
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
