"use client";

import React from "react";
import { ReceiptText } from "lucide-react";

export default function TaxSection({
  taxType = "NONE",
  setTaxType,
  isReadOnly = false,
}) {
  const options = [
    { id: "NONE", label: "Zero GST (Exempt / LUT)", sub: "0% Rate" },
    {
      id: "CGST_SGST",
      label: "Intrastate GST (CGST 9% + SGST 9%)",
      sub: "18% Total",
    },
    { id: "IGST", label: "Interstate GST (IGST 18%)", sub: "18% Integrated" },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base tracking-tight">
        <ReceiptText size={17} className="text-indigo-600" /> Tax Jurisdiction
      </h2>

      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected =
            taxType === opt.id ||
            (taxType === "NO_GST" && opt.id === "NONE") ||
            (taxType === "GST_TN" && opt.id === "CGST_SGST");
          return (
            <label
              key={opt.id}
              onClick={() => !isReadOnly && setTaxType(opt.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/60 shadow-xs"
                  : "border-slate-200/80 hover:bg-slate-50/70"
              } ${isReadOnly ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="taxType"
                  disabled={isReadOnly}
                  checked={isSelected}
                  onChange={() => setTaxType(opt.id)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span
                  className={`text-xs font-bold ${isSelected ? "text-indigo-900" : "text-slate-700"}`}
                >
                  {opt.label}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {opt.sub}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
