"use client";

import React from "react";
import { LuStickyNote } from "react-icons/lu";

export default function NotesSection({ formData, setFormData }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
        <LuStickyNote className="text-indigo-600" /> Notes & Terms
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Additional Notes
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Project scope details or thank you message..."
            value={formData?.notes || ""}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Terms & Conditions
          </label>
          <textarea
            rows={2}
            placeholder="e.g. 50% advance, 50% after completion..."
            value={formData?.terms || ""}
            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}