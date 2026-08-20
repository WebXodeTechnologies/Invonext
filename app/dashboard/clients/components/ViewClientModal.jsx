"use client";

import React from "react";
import { X, Mail, Phone, Globe, FileText, MapPin, Building2, Pencil, Trash2, FileSpreadsheet } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ViewClientModal({ isOpen, onClose, client, onEdit, onDelete }) {
  const router = useRouter();

  if (!isOpen || !client) return null;

  const avatarUrl =
    client.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=4f46e5&color=fff`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={client.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-100 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{client.name}</h2>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active 🟢
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{client.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Client Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Company & Phone */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
              <Building2 size={14} className="text-indigo-600" /> Company Info
            </h3>
            <div className="space-y-1.5 text-slate-700 pt-1">
              <p><span className="text-slate-400">Trade Name:</span> <strong className="font-semibold">{client.companyName || client.name}</strong></p>
              <p><span className="text-slate-400">Phone:</span> <strong className="font-semibold">{client.phone || "N/A"}</strong></p>
              <p><span className="text-slate-400">Website:</span> <strong className="font-semibold text-indigo-600">{client.website || "N/A"}</strong></p>
            </div>
          </div>

          {/* Tax & GST */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
              <FileText size={14} className="text-indigo-600" /> Tax Identification
            </h3>
            <div className="space-y-1.5 text-slate-700 pt-1">
              <p>
                <span className="text-slate-400">GSTIN:</span>{" "}
                {client.gstNumber ? (
                  <span className="font-mono text-[11px] font-semibold bg-white text-slate-900 px-2 py-0.5 rounded border border-slate-200 uppercase">
                    {client.gstNumber}
                  </span>
                ) : (
                  <span className="text-slate-400">Unregistered</span>
                )}
              </p>
              <p><span className="text-slate-400">Status:</span> <strong className="font-semibold text-emerald-600">Tax Compliant</strong></p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-1 text-xs">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5 pb-1">
            <MapPin size={14} className="text-indigo-600" /> Billing Address
          </h3>
          <p className="text-slate-600 font-medium">
            {[client.address?.street, client.address?.city, client.address?.state, client.address?.country, client.address?.pincode].filter(Boolean).join(", ") || "No address specified"}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              router.push(`/dashboard/Invoices/new?clientId=${client._id}`);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-200/80 transition cursor-pointer"
          >
            <FileSpreadsheet size={15} />
            <span>Create Invoice</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(client);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer shadow-2xs"
            >
              <Pencil size={14} /> Edit Profile
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(client);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl border border-rose-200 transition cursor-pointer"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
