"use client";

import React from "react";
import { Package, PieChart } from "lucide-react";

export default function RevenueBreakdown({ data = [] }) {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <PieChart size={17} className="text-indigo-600" /> Revenue by Line
            Item
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Top services and products by gross volume.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-800 flex items-center gap-2 truncate max-w-[200px]">
                <Package size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">{item.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({item.count} qty)
                </span>
              </span>
              <span className="text-slate-900 font-extrabold shrink-0">
                ₹{Number(item.total).toLocaleString("en-IN")}{" "}
                <span className="text-[10px] text-slate-400 font-medium">
                  ({item.percentage}%)
                </span>
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(5, item.percentage))}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
