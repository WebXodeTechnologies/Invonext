"use client";

import React from "react";
import { LuCreditCard, LuZap } from "react-icons/lu";

export default function PaymentSection({ formData, setFormData }) {
  const paymentModes = [
    "UPI", "Google Pay", "PhonePe", "Paytm", "Bank Transfer", 
    "RazorPay", "PayPal", "Wise", "Cash"
  ];

  const statuses = [
    { id: "unpaid", label: "Unpaid", color: "text-red-600 bg-red-50" },
    { id: "paid", label: "Paid", color: "text-green-600 bg-green-50" },
    { id: "pending", label: "Pending", color: "text-yellow-600 bg-yellow-50" },
    { id: "rejected", label: "Rejected", color: "text-gray-600 bg-gray-50" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
        <LuCreditCard className="text-indigo-600" /> Payment & Status
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode of Payment */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment Mode</label>
          <select
            value={formData.paymentMode}
            onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Mode</option>
            {paymentModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
          </select>
        </div>

        {/* Invoice Status */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment Status</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFormData({...formData, status: s.id})}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  formData.status === s.id 
                  ? `${s.color} border-current ring-2 ring-offset-1 ring-indigo-100` 
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}