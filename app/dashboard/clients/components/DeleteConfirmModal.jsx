"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  client,
}) {
  const [loading, setLoading] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !client) return null;

  const clientDisplayName =
    client.companyName || client.name || "this client entity";

  const handleConfirmDelete = async () => {
    setLoading(true);
    await onConfirm(client._id, clientDisplayName);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl border border-rose-100/80 shrink-0">
            <AlertTriangle size={24} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Delete Directory Entity
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-slate-900 font-bold">
                {clientDisplayName}
              </strong>
              ? All associated invoices and metadata will be affected.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            <span>{loading ? "Purging..." : "Confirm Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
