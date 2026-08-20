"use client";

import React from "react";
import { Info, ShieldCheck } from "lucide-react";

export default function SummaryCard({
  totals = { subTotal: 0, total: 0 },
  taxType = "NONE",
}) {
  const isCgstSgst = taxType === "CGST_SGST" || taxType === "GST_TN";
  const isIgst = taxType === "IGST";
  const isZeroGst = taxType === "NONE" || taxType === "NO_GST";

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Invoice Summary
        </h2>
        <Info size={15} className="text-slate-400" />
      </div>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-500">Gross Subtotal</span>
          <span className="text-slate-900 font-bold">
            ₹{Number(totals.subTotal || 0).toLocaleString("en-IN")}
          </span>
        </div>

        {/* CGST + SGST */}
        {isCgstSgst && (
          <div className="space-y-2 pt-1 border-t border-dashed border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">CGST (9%)</span>
              <span className="text-slate-900 font-semibold">
                ₹{Number(totals.cgst || 0).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">SGST (9%)</span>
              <span className="text-slate-900 font-semibold">
                ₹{Number(totals.sgst || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}

        {/* IGST */}
        {isIgst && (
          <div className="flex justify-between text-xs pt-1 border-t border-dashed border-slate-100">
            <span className="text-slate-500">IGST (18%)</span>
            <span className="text-slate-900 font-semibold">
              ₹{Number(totals.igst || 0).toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Non GST Banner */}
        {isZeroGst && (
          <div className="py-2 px-3 bg-slate-50 rounded-xl border border-slate-200/60 text-[11px] text-slate-500 text-center font-medium">
            Zero-Rated / Non-GST Supply
          </div>
        )}

        {/* Grand Total */}
        <div className="pt-4 border-t border-slate-900 mt-2 flex justify-between items-center">
          <span className="text-xs font-black text-slate-900 uppercase tracking-tight">
            Total Payable
          </span>
          <span className="text-xl sm:text-2xl font-black text-indigo-600 tracking-tight">
            ₹{Number(totals.total || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="pt-2 text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>GST & Audit Reconciled</span>
        </div>
      </div>
    </div>
  );
}
