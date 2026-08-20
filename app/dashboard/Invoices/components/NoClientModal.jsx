"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Building2, UserPlus, ArrowRight, X } from "lucide-react";

export default function NoClientModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X size={18} />
        </button>

        {/* Icon & Graphic */}
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
          <Building2 size={32} />
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Client Profile Required
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            You must register at least one client entity in your directory
            before issuing tax invoices.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-1/2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/clients/newclient")}
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition active:scale-95 cursor-pointer"
          >
            <UserPlus size={14} />
            <span>Create Client</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
