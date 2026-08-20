"use client";

import React, { useEffect, useState } from "react";
import { User, Calendar, Hash, UserPlus } from "lucide-react";
import Link from "next/link";

export default function ClientSection({
  onClientSelect,
  selectedClient,
  nextInvoiceNumber,
  formData = {},
  setFormData,
}) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedClients() {
      try {
        const res = await fetch("/api/clients");
        const json = await res.json();
        if (json.success) {
          setClients(json.data || []);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedClients();
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="font-bold text-slate-900 flex items-center gap-2 text-base">
          <User className="text-indigo-600" size={18} /> Select Client & Invoice Dates
        </h2>
        <Link href="/dashboard/clients">
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1 hover:bg-indigo-100 transition cursor-pointer">
            <UserPlus size={12} /> Manage Clients
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Client Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Saved Business Client *
          </label>

          {loading ? (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 animate-pulse">
              Loading saved clients...
            </div>
          ) : clients.length > 0 ? (
            <select
              value={selectedClient?._id || ""}
              onChange={(e) => {
                const found = clients.find((c) => c._id === e.target.value);
                onClientSelect(found || null);
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            >
              <option value="">-- Select Saved Client --</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.email || c.phone || "Saved Record"})
                </option>
              ))}
            </select>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-2">
              <p className="font-semibold">No saved clients found in your directory.</p>
              <Link href="/dashboard/clients">
                <button className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition">
                  <UserPlus size={12} /> Add First Client
                </button>
              </Link>
            </div>
          )}

          {selectedClient && (
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs space-y-1 mt-2">
              <p className="font-bold text-slate-900">{selectedClient.name}</p>
              <p className="text-slate-600 font-medium">{selectedClient.email} | {selectedClient.phone || "No Phone"}</p>
              {selectedClient.gstNumber && (
                <p className="font-mono text-[11px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 inline-block uppercase mt-1">
                  GST: {selectedClient.gstNumber}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Invoice Number */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Invoice Document ID
          </label>
          <input
            type="text"
            value={nextInvoiceNumber || "INV-2026-001"}
            disabled
            className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-mono font-bold cursor-not-allowed"
          />
        </div>

        {/* Issue Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Invoice Issue Date
          </label>
          <input
            type="date"
            value={formData.issueDate || ""}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Payment Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate || ""}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}