"use client";

import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Zap,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientsTable({
  clients = [],
  onDelete,
  onLoadDemoClients,
}) {
  const router = useRouter();

  if (!clients.length) {
    return (
      <div className="relative overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 text-center shadow-xs hover:border-indigo-200 transition-all duration-300 group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-tr from-indigo-500/15 via-purple-500/10 to-blue-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-indigo-200 ring-8 ring-indigo-50 border border-indigo-400/40">
            <Building2 size={34} className="text-white" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
              Directory Empty
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              No Client Accounts Registered
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
              Add your customers to issue instant GST invoices, track
              receivables, and manage billing profiles.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] font-bold text-slate-600">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              <Zap size={12} className="text-amber-500 fill-amber-500" />{" "}
              Instant Invoicing
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              <ShieldCheck size={12} className="text-emerald-500" /> GST
              Verified
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
              <BarChart3 size={12} className="text-indigo-500" />{" "}
              Auto-Reconciliation
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <button
              type="button"
              onClick={() => router.push("/dashboard/clients/newclient")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              <UserPlus size={16} />
              <span>Add First Client</span>
            </button>

            {onLoadDemoClients && (
              <button
                type="button"
                onClick={onLoadDemoClients}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95 text-slate-700 text-xs sm:text-sm font-bold rounded-2xl border border-slate-200/80 transition-all cursor-pointer"
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
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs hover:border-slate-300 transition-all duration-300">
      <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[620px] sm:min-w-full">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 px-3 sm:px-4 w-12">#</th>
              <th className="pb-3 px-3 sm:px-4">Entity Details</th>
              <th className="pb-3 px-3 sm:px-4 hidden md:table-cell">
                Contact Phone
              </th>
              <th className="pb-3 px-3 sm:px-4 hidden lg:table-cell">
                GST Identification
              </th>
              <th className="pb-3 px-3 sm:px-4 hidden xl:table-cell">
                Jurisdiction
              </th>
              <th className="pb-3 px-3 sm:px-4 text-center">Status</th>
              <th className="pb-3 px-3 sm:px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50 text-xs">
            {clients.map((client, index) => {
              const displayName =
                client.companyName || client.name || "Client Entity";
              const contactPerson =
                client.name && client.name !== client.companyName
                  ? client.name
                  : `${client.firstName || ""} ${client.lastName || ""}`.trim();
              const initial = displayName.charAt(0).toUpperCase() || "C";
              const avatarUrl = client.profileImage || "";

              return (
                <tr
                  key={client._id || index}
                  className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/clients/view/${client._id}`)
                  }
                >
                  <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-400">
                    {index + 1}
                  </td>

                  <td className="py-3.5 px-3 sm:px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-100/80 overflow-hidden shrink-0 flex items-center justify-center font-black text-xs group-hover:scale-105 transition-transform duration-200">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          initial
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 max-w-40 sm:max-w-xs">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {displayName}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium truncate">
                          {contactPerson && (
                            <span className="truncate">{contactPerson}</span>
                          )}
                          {contactPerson && client.email && <span>•</span>}
                          {client.email && (
                            <span className="truncate flex items-center gap-1">
                              <Mail size={10} className="shrink-0" />
                              {client.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 sm:px-4 hidden md:table-cell font-semibold text-slate-600">
                    {client.phone ? (
                      <span className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        {client.phone}
                      </span>
                    ) : (
                      <span className="text-slate-300">N/A</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 sm:px-4 hidden lg:table-cell">
                    {client.gstNumber ? (
                      <span className="font-mono text-[11px] font-bold bg-slate-100/80 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200/60 uppercase">
                        {client.gstNumber}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-[11px] font-semibold">
                        Unregistered
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 sm:px-4 hidden xl:table-cell text-slate-600 font-medium">
                    {client.address?.city || client.address?.state ? (
                      <span className="flex items-center gap-1.5">
                        <MapPin
                          size={12}
                          className="text-indigo-500 shrink-0"
                        />
                        {[client.address?.city, client.address?.state]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    ) : (
                      <span className="text-slate-300">N/A</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 sm:px-4 text-center">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      Active 🟢
                    </span>
                  </td>

                  <td
                    className="py-3.5 px-3 sm:px-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {/* View Action */}
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/dashboard/clients/newclient?id=${client._id}&mode=view`,
                          )
                        }
                        className="p-2 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-700 transition cursor-pointer"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Action */}
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/dashboard/clients/newclient?id=${client._id}&mode=edit`,
                          )
                        }
                        className="p-2 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-700 transition cursor-pointer"
                        title="Edit Entity"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete && onDelete(client)}
                        className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Record"
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
