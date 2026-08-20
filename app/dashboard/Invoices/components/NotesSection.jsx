"use client";

import React from "react";
import { FileEdit } from "lucide-react";

export default function NotesSection({
  formData = {},
  setFormData,
  isReadOnly = false,
}) {
  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm sm:text-base tracking-tight">
        <FileEdit className="text-indigo-600" size={18} /> Notes & Settlement
        Terms
      </h2>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Customer Memo / Additional Notes
          </label>
          <textarea
            rows={3}
            disabled={isReadOnly}
            placeholder="e.g. Project milestones achieved or payment transfer reference..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all resize-none disabled:bg-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Terms & Conditions
          </label>
          <textarea
            rows={2}
            disabled={isReadOnly}
            placeholder="e.g. Invoices not paid within 15 days will incur a 2% monthly interest fee."
            value={formData.terms || ""}
            onChange={(e) =>
              setFormData({ ...formData, terms: e.target.value })
            }
            className="w-full p-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all resize-none disabled:bg-slate-100"
          />
        </div>
      </div>
    </div>
  );
}
