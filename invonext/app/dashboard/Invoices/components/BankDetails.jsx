"use client";

import React from "react";
import { LuBanknote } from "react-icons/lu";

export default function BankDetailsSection({ formData, setFormData }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
        <LuBanknote className="text-indigo-600" /> Payment Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Bank Name</label>
          <input 
            type="text" 
            placeholder="e.g. HDFC Bank"
            value={formData?.bankName || ""}
            onChange={(e) => setFormData({...formData, bankName: e.target.value})}
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Account Number</label>
          <input 
            type="text" 
            placeholder="0000 0000 0000"
            value={formData?.accountNo || ""}
            onChange={(e) => setFormData({...formData, accountNo: e.target.value})}
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">IFSC Code / SWIFT</label>
          <input 
            type="text" 
            placeholder="HDFC0001234"
            value={formData?.ifsc || ""}
            onChange={(e) => setFormData({...formData, ifsc: e.target.value})}
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">UPI ID</label>
          <input 
            type="text" 
            placeholder="yourname@upi"
            value={formData?.upiId || ""}
            onChange={(e) => setFormData({...formData, upiId: e.target.value})}
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}