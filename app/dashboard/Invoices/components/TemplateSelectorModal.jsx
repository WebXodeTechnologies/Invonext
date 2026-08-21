"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Printer,
  Layout,
  Sparkles,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic GST Tax Invoice",
    badge: "Official & Standard",
    description:
      "Formal Indian tax compliance layout with clear separation for CGST, SGST, IGST, and bank credentials.",
    accent: "border-indigo-500 ring-2 ring-indigo-200",
    gradient: "from-indigo-600 to-indigo-800",
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    badge: "Creative & Clean",
    description:
      "Contemporary typography, rounded cards, colored summary banners, and inline line-item breakdown.",
    accent: "border-purple-500 ring-2 ring-purple-200",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: "corporate",
    name: "Compact Corporate",
    badge: "High-Density Ledger",
    description:
      "Monochrome high-contrast design optimized for enterprises, large item catalogs, and B2B vendor billings.",
    accent: "border-slate-800 ring-2 ring-slate-300",
    gradient: "from-slate-800 to-slate-950",
  },
];

export default function TemplateSelectorModal({ isOpen, onClose, invoiceId }) {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  if (!isOpen) return null;

  const handleProceed = () => {
    router.push(
      `/dashboard/Invoices/${invoiceId}/print?template=${selectedTemplate}`,
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Layout size={18} className="text-indigo-600" /> Select Printable
              Invoice Template
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Choose the layout style you want for print and PDF generation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Templates Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 text-left relative ${
                  isSelected
                    ? `${tmpl.accent} bg-indigo-50/20`
                    : "border-slate-200/80 hover:border-slate-300 bg-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 text-indigo-600">
                    <CheckCircle2 size={16} />
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {tmpl.badge}
                  </span>
                  <h3 className="text-xs font-black text-slate-900">
                    {tmpl.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                {/* Micro Visual Preview Skeleton */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="h-10 bg-slate-50 rounded-lg border border-slate-100 p-1.5 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div
                        className={`h-2 w-8 rounded-full bg-linear-to-r ${tmpl.gradient}`}
                      />
                      <div className="h-1.5 w-4 bg-slate-200 rounded-full" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-slate-200 rounded-full" />
                      <div className="h-1 w-2/3 bg-slate-200 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition cursor-pointer"
          >
            <Printer size={15} />
            <span>Generate Print Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
