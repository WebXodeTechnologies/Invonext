"use client";

import React from "react";
import { Eye, Pencil, Trash2, UserPlus, Mail, Phone, MapPin, Zap, ShieldCheck, BarChart3, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientsTable({ clients = [], onDelete, onLoadDemoClients }) {
  const router = useRouter();

  if (!clients.length) {
    return (
      <div className="relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 text-center shadow-xs hover:border-indigo-200 transition-all duration-300 group">
        {/* Background Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-blue-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          {/* Animated 3D Floating Graphic Container */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-indigo-100/70 rotate-6 scale-95 border border-indigo-200/80 animate-float shadow-sm" />
            <div className="absolute inset-0 rounded-3xl bg-purple-100/60 -rotate-6 scale-90 border border-purple-200/60 animate-float-reverse shadow-2xs" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600 text-white flex flex-col items-center justify-center shadow-xl shadow-indigo-600/30 ring-8 ring-indigo-100/70 border border-indigo-400/40 animate-float group-hover:scale-110 transition-all duration-300 cursor-pointer">
              <span className="text-3xl filter drop-shadow-md animate-pulse">🤗</span>
            </div>
          </div>

          {/* Copy section */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Client System Ready
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              No Clients Registered Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
              Build lasting client relationships. Add your business customers to issue instant GST invoices, track overdue payments, and manage contact profiles seamlessly.
            </p>
          </div>

          {/* Feature Perk Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              <Zap size={12} className="text-amber-500 fill-amber-500" /> Instant GST Invoicing
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              <ShieldCheck size={12} className="text-emerald-500" /> 100% Encrypted Records
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              <BarChart3 size={12} className="text-indigo-500" /> Payment Tracking
            </span>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => router.push("/dashboard/clients/newclient")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <UserPlus size={16} />
              <span>Add Your First Client</span>
            </button>

            {onLoadDemoClients && (
              <button
                onClick={onLoadDemoClients}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-slate-700 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200/80 transition-all cursor-pointer"
              >
                <Sparkles size={16} className="text-amber-500 fill-amber-500" />
                <span>Load Live Sample Data</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-xs hover:border-indigo-200 transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-slate-400 uppercase border-b border-slate-100">
              <th className="pb-3 px-3 w-12">#</th>
              <th className="pb-3 px-3">Client Information</th>
              <th className="pb-3 px-3 hidden md:table-cell">Contact Phone</th>
              <th className="pb-3 px-3 hidden lg:table-cell">GST Identification</th>
              <th className="pb-3 px-3 hidden xl:table-cell">City & State</th>
              <th className="pb-3 px-3 text-center">Status</th>
              <th className="pb-3 px-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {clients.map((client, index) => {
              const avatarUrl =
                client.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=4f46e5&color=fff`;

              return (
                <tr
                  key={client._id}
                  className="hover:bg-indigo-50/40 transition-colors group cursor-pointer"
                  onClick={() => router.push(`/dashboard/clients/view/${client._id}`)}
                >
                  <td className="py-3.5 px-3 font-semibold text-slate-400">
                    {index + 1}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 overflow-hidden shrink-0 flex items-center justify-center font-bold text-indigo-700">
                        <img
                          src={avatarUrl}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                          {client.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1">
                          <Mail size={11} className="text-slate-400 shrink-0" />
                          {client.email || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 hidden md:table-cell font-medium text-slate-600">
                    {client.phone ? (
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-slate-400" />
                        {client.phone}
                      </span>
                    ) : (
                      <span className="text-slate-300">N/A</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 hidden lg:table-cell">
                    {client.gstNumber ? (
                      <span className="font-mono text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200/60 uppercase">
                        {client.gstNumber}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-[11px]">Unregistered</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 hidden xl:table-cell text-slate-600 font-medium">
                    {client.address?.city || client.address?.state ? (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-indigo-500" />
                        {[client.address?.city, client.address?.state].filter(Boolean).join(", ")}
                      </span>
                    ) : (
                      <span className="text-slate-300">N/A</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active 🟢
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => router.push(`/dashboard/clients/view/${client._id}`)}
                        className="p-1.5 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-700 transition cursor-pointer"
                        title="View Client Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => router.push(`/dashboard/clients/edit/${client._id}`)}
                        className="p-1.5 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-700 transition cursor-pointer"
                        title="Edit Client Profile"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete && onDelete(client)}
                        className="p-1.5 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Client Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
