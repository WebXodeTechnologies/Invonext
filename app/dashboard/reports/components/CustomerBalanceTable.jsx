"use client";

import React from "react";
import { Building2, Users } from "lucide-react";

export default function CustomerBalanceTable({ data = [] }) {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users size={17} className="text-indigo-600" /> Client Receivables
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Settled collections versus unpaid balances.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[380px]">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 px-3">Client</th>
              <th className="pb-3 px-3">Billed</th>
              <th className="pb-3 px-3">Settled</th>
              <th className="pb-3 px-3 text-right">Outstanding</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100/70 text-xs font-medium">
            {data.map((c, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                  <Building2 size={13} className="text-slate-400 shrink-0" />
                  <span className="truncate max-w-[130px]">{c.client}</span>
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  ₹{Number(c.total).toLocaleString("en-IN")}
                </td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">
                  ₹{Number(c.paid).toLocaleString("en-IN")}
                </td>
                <td className="py-3 px-3 text-right font-bold text-rose-600">
                  ₹{Number(c.pending).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
