"use client";

import React from "react";
import { LuUser, LuHash, LuCalendarDays } from "react-icons/lu";

export default function ClientSection({ onClientSelect, selectedClient, nextInvoiceNumber, formData = {}, setFormData }) {
  const mockClients = [
    { _id: "1", name: "Annaai Agro Tradings", state: "Tamil Nadu", gstNo: "33AAEPM1234C1Z5" },
    { _id: "2", name: "Green Field Exports", state: "Maharashtra", gstNo: "27AAEPM5678D1Z2" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
        <LuUser className="text-indigo-600" /> Client & Timeline
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Client Details *</label>
          <select
            onChange={(e) => onClientSelect(mockClients.find((c) => c._id === e.target.value))}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="">Select Client</option>
            {mockClients.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          {selectedClient && (
            <p className="text-[10px] mt-1 text-indigo-600 font-bold uppercase">GST: {selectedClient.gstNo} ({selectedClient.state})</p>
          )}
        </div>

        {/* Invoice Number (Rule 2) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Invoice Number</label>
          <input
            type="text"
            value={nextInvoiceNumber || "INV-2026-001"}
            disabled
            className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed font-mono font-bold"
          />
        </div>

        {/* Billing Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Issue Date</label>
          <input
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500"
          />
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}