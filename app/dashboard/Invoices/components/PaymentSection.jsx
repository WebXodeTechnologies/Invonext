"use client";

import React from "react";
import { CreditCard, Landmark } from "lucide-react";

export default function PaymentSection({
  formData = {},
  setFormData,
  isReadOnly = false,
}) {
  const paymentModes = [
    "Bank Transfer / UPI",
    "Credit Card",
    "Cash",
    "Cheque",
    "Online Gateway",
  ];

  const statuses = [
    {
      id: "draft",
      label: "Draft",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
      id: "sent",
      label: "Pending",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "paid",
      label: "Paid",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "overdue",
      label: "Overdue",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <h2 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm sm:text-base tracking-tight">
        <CreditCard className="text-indigo-600" size={18} /> Payment Mode &
        Settlement Status
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Payment Mode */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Settlement Method
          </label>
          <select
            value={formData.paymentMode || "Bank Transfer / UPI"}
            disabled={isReadOnly}
            onChange={(e) =>
              setFormData({ ...formData, paymentMode: e.target.value })
            }
            className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all disabled:bg-slate-100"
          >
            {paymentModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        {/* Invoice Status Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Document Status
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {statuses.map((s) => {
              const isSelected =
                (formData.status || "draft").toLowerCase() === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={isReadOnly}
                  onClick={() => setFormData({ ...formData, status: s.id })}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? `${s.badge} ring-2 ring-indigo-200 ring-offset-1 shadow-xs`
                      : "bg-slate-50/70 border-slate-200 text-slate-500 hover:border-slate-300"
                  } ${isReadOnly ? "cursor-default" : "cursor-pointer"}`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
