"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Pencil,
  Trash2,
  Receipt,
  PlusCircle,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function InvoicesTable({ invoices = [], onDelete }) {
  const router = useRouter();

  const getStatusBadge = (status) => {
    const s = (status || "draft").toLowerCase();
    if (s === "paid")
      return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
    if (s === "overdue") return "bg-rose-50 text-rose-700 border-rose-200/80";
    if (s === "pending" || s === "sent")
      return "bg-amber-50 text-amber-700 border-amber-200/80";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusDot = (status) => {
    const s = (status || "draft").toLowerCase();
    if (s === "paid") return "bg-emerald-500";
    if (s === "overdue") return "bg-rose-500 animate-pulse";
    if (s === "pending" || s === "sent") return "bg-amber-500";
    return "bg-slate-400";
  };

  if (!invoices.length) {
    return (
      <div className="relative overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 text-center shadow-xs">
        <div className="max-w-md mx-auto space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <Receipt size={32} />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              No Invoices Found
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Generate your first tax invoice with itemized line totals,
              auto-calculated CGST/SGST/IGST, and payment terms.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/dashboard/Invoices/new")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-2xl shadow-md shadow-indigo-200 transition cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Create First Invoice</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs hover:border-slate-300 transition-all duration-300">
      <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[640px] sm:min-w-full">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 px-3 sm:px-4 w-12">#</th>
              <th className="pb-3 px-3 sm:px-4">Invoice Details</th>
              <th className="pb-3 px-3 sm:px-4">Billed Client</th>
              <th className="pb-3 px-3 sm:px-4 hidden sm:table-cell">
                Due Date
              </th>
              <th className="pb-3 px-3 sm:px-4">Total (₹)</th>
              <th className="pb-3 px-3 sm:px-4 hidden md:table-cell">
                Payment Mode
              </th>
              <th className="pb-3 px-3 sm:px-4 text-center">Status</th>
              <th className="pb-3 px-3 sm:px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50 text-xs">
            {invoices.map((invoice, index) => {
              const clientName =
                invoice.clientId?.companyName ||
                invoice.clientId?.name ||
                invoice.clientName ||
                "Client Entity";
              const clientEmail = invoice.clientId?.email || "";
              const invoiceId = invoice._id;
              const formattedTotal = Number(
                invoice.totalAmount || 0,
              ).toLocaleString("en-IN");
              const dueDateStr = invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <tr
                  key={invoiceId}
                  className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/dashboard/Invoices/new?id=${invoiceId}&mode=view`,
                    )
                  }
                >
                  {/* Row Number */}
                  <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-400">
                    {index + 1}
                  </td>

                  {/* Invoice Number */}
                  <td className="py-3.5 px-3 sm:px-4">
                    <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100/70">
                      {invoice.invoiceNumber || "INV-000"}
                    </span>
                  </td>

                  {/* Client Info */}
                  <td className="py-3.5 px-3 sm:px-4">
                    <div className="flex flex-col truncate max-w-[170px] sm:max-w-xs">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {clientName}
                      </span>
                      {clientEmail && (
                        <span className="text-[10px] text-slate-400 font-medium truncate">
                          {clientEmail}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-3 sm:px-4 hidden sm:table-cell text-slate-600 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {dueDateStr}
                    </span>
                  </td>

                  {/* Total Amount */}
                  <td className="py-3.5 px-3 sm:px-4">
                    <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                      ₹{formattedTotal}
                    </span>
                  </td>

                  {/* Payment Mode */}
                  <td className="py-3.5 px-3 sm:px-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/50">
                      <CreditCard size={11} className="text-slate-400" />
                      {invoice.paymentMode || "Bank Transfer"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3 sm:px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border transition-colors ${getStatusBadge(
                        invoice.status,
                      )}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${getStatusDot(invoice.status)}`}
                      />
                      {(invoice.status || "draft").toUpperCase()}
                    </span>
                  </td>

                  {/* Actions */}
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
                            `/dashboard/Invoices/${invoiceId}?mode=view`,
                          )
                        }
                        className="p-2 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-700 transition cursor-pointer"
                        title="View / Print Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Action */}
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/dashboard/Invoices/${invoiceId}?mode=edit`,
                          )
                        }
                        className="p-2 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-700 transition cursor-pointer"
                        title="Edit Invoice"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDelete && onDelete(invoice)}
                        className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Invoice"
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
