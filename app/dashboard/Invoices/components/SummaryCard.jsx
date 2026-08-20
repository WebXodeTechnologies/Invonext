"use client";

import React from "react";
import { LuInfo } from "react-icons/lu";

export default function SummaryCard({ totals, taxType }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
          Invoice Summary
        </h2>
        <LuInfo size={16} className="text-gray-400" />
      </div>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Sub Total</span>
          <span className="text-gray-900 font-semibold">₹{totals.subTotal.toLocaleString()}</span>
        </div>

        {/* Dynamic Tax Display */}
        {taxType === "GST_TN" && (
          <div className="space-y-3 pt-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">CGST (9%)</span>
              <span className="text-gray-900 font-medium">₹{totals.cgst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">SGST (9%)</span>
              <span className="text-gray-900 font-medium">₹{totals.sgst.toLocaleString()}</span>
            </div>
          </div>
        )}

        {taxType === "IGST" && (
          <div className="flex justify-between text-sm pt-1">
            <span className="text-gray-500">IGST (18%)</span>
            <span className="text-gray-900 font-medium">₹{totals.igst.toLocaleString()}</span>
          </div>
        )}

        {taxType === "NO_GST" && (
          <div className="py-2 px-3 bg-gray-50 rounded-lg border border-gray-100 text-[11px] text-gray-400 text-center font-medium">
            Non-GST Invoice
          </div>
        )}

        {/* Grand Total */}
        <div className="pt-5 border-t border-gray-900 mt-2 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-900 uppercase">Total Amount</span>
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            ₹{totals.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}