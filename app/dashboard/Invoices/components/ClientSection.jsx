"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Hash,
  UserPlus,
  Building2,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function ClientSection({
  onClientSelect,
  selectedClient,
  formData = {},
  setFormData,
  isReadOnly = false,
  onClientsLoaded = () => {}, // <--- ADDED PROP WITH DEFAULT FALLBACK
}) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedClients() {
      try {
        const res = await fetch("/api/clients");
        const json = await res.json();
        if (json?.success) {
          const list = json.data || [];
          setClients(list);
          if (typeof onClientsLoaded === "function") {
            onClientsLoaded(list); // Safely execute callback
          }
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedClients();
  }, [onClientsLoaded]);

  const handleClientChange = (e) => {
    const found = clients.find((c) => (c._id || c.id) === e.target.value);
    if (onClientSelect) onClientSelect(found || null);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base tracking-tight">
          <User className="text-indigo-600" size={18} /> Client & Document
          Details
        </h2>
        {!isReadOnly && (
          <Link href="/dashboard/clients/newclient">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50/90 px-3.5 py-1.5 rounded-xl border border-indigo-100 flex items-center gap-1.5 hover:bg-indigo-100 transition-all cursor-pointer active:scale-95 shadow-xs">
              <UserPlus size={13} /> Add Client
            </span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Saved Client Dropdown / Profile Display */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Billed Customer *
          </label>

          {isReadOnly ? (
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800">
              {selectedClient?.companyName ||
                selectedClient?.name ||
                "No Client Assigned"}
            </div>
          ) : loading ? (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-400 animate-pulse">
              Retrieving client accounts...
            </div>
          ) : clients.length > 0 ? (
            <select
              value={selectedClient?._id || selectedClient?.id || ""}
              onChange={handleClientChange}
              className="w-full p-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
            >
              <option value="">-- Select Saved Client --</option>
              {clients.map((c) => {
                const displayName = c.companyName || c.name || "Client Entity";
                const email = c.email || c.phone || "Active";
                return (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {displayName} ({email})
                  </option>
                );
              })}
            </select>
          ) : (
            <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-900 space-y-2">
              <p className="font-semibold">
                No saved clients found in your directory.
              </p>
              <Link href="/dashboard/clients/newclient">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 active:scale-95 transition shadow-xs cursor-pointer"
                >
                  <UserPlus size={13} /> Add First Client
                </button>
              </Link>
            </div>
          )}

          {selectedClient && (
            <div className="p-3.5 bg-linear-to-br from-indigo-50/60 to-blue-50/40 border border-indigo-100/90 rounded-2xl text-xs space-y-1.5 mt-2.5">
              <div className="flex items-center gap-2">
                <Building2 size={13} className="text-indigo-600 shrink-0" />
                <span className="font-bold text-slate-900">
                  {selectedClient.companyName || selectedClient.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                {selectedClient.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={11} className="text-slate-400" />{" "}
                    {selectedClient.email}
                  </span>
                )}
                {selectedClient.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={11} className="text-slate-400" />{" "}
                    {selectedClient.phone}
                  </span>
                )}
              </div>
              {selectedClient.gstNumber && (
                <div className="pt-1">
                  <span className="font-mono text-[10px] font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-lg border border-indigo-200/80 uppercase inline-block">
                    GSTIN: {selectedClient.gstNumber}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Invoice Number */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Invoice Document ID *
          </label>
          <div className="relative">
            <Hash className="absolute left-3.5 top-3 size-4 text-slate-400" />
            <input
              type="text"
              value={formData.invoiceNumber || ""}
              disabled={isReadOnly}
              onChange={(e) =>
                setFormData({ ...formData, invoiceNumber: e.target.value })
              }
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Issue Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Issue Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3 size-4 text-slate-400" />
            <input
              type="date"
              value={formData.issueDate || ""}
              disabled={isReadOnly}
              onChange={(e) =>
                setFormData({ ...formData, issueDate: e.target.value })
              }
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all disabled:bg-slate-100"
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Payment Due Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3 size-4 text-slate-400" />
            <input
              type="date"
              value={formData.dueDate || ""}
              disabled={isReadOnly}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all disabled:bg-slate-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
