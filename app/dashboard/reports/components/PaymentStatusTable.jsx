"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Calendar, Eye, Receipt, ArrowUpRight } from "lucide-react";

export default function PaymentStatusTable({ invoices = [] }) {
  const router = useRouter();

  const getStatusBadge = (status) => {
    const s = (status || "draft").toLowerCase();
    if (s === "paid")
      return "bg-emerald-50 text-emerald-700 border-emerald-200/70";
    if (s === "overdue") return "bg-rose-50 text-rose-700 border-rose-200/70";
    if (s === "pending" || s === "sent")
      return "bg-amber-50 text-amber-700 border-amber-200/70";
    return "bg-slate-100 text-slate-700 border-slate-200/70";
  };

  const getStatusDot = (status) => {
    const s = (status || "draft").toLowerCase();
    if (s === "paid") return "bg-emerald-500";
    if (s === "overdue") return "bg-rose-500 animate-pulse";
    if (s === "pending" || s === "sent") return "bg-amber-500";
    return "bg-slate-400";
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt size={17} className="text-indigo-600" /> Transaction Audit
            Stream
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Chronological audit of billed invoices, due dates, and settlement
            channels.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 px-3.5">Invoice</th>
              <th className="pb-3 px-3.5">Client</th>
              <th className="pb-3 px-3.5 hidden sm:table-cell">Issue Date</th>
              <th className="pb-3 px-3.5">Total Amount</th>
              <th className="pb-3 px-3.5 hidden md:table-cell">Payment Mode</th>
              <th className="pb-3 px-3.5 text-center">Status</th>
              <th className="pb-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100/70 text-xs font-medium">
            {invoices.map((inv) => {
              const invoiceId = inv._id;
              const clientName =
                inv.clientId?.companyName ||
                inv.clientId?.name ||
                inv.clientName ||
                "Direct Client";
              const issueDateStr = inv.issueDate
                ? new Date(inv.issueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <tr
                  key={invoiceId}
                  className="hover:bg-indigo-50/20 transition-colors group cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/Invoices/${invoiceId}?mode=view`)
                  }
                >
                  <td className="py-3.5 px-3.5">
                    <span className="font-mono text-xs font-extrabold text-indigo-600 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100/70">
                      {inv.invoiceNumber || "INV-000"}
                    </span>
                  </td>

                  <td className="py-3.5 px-3.5 font-bold text-slate-900 max-w-[170px] truncate">
                    {clientName}
                  </td>

                  <td className="py-3.5 px-3.5 hidden sm:table-cell text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {issueDateStr}
                    </span>
                  </td>

                  <td className="py-3.5 px-3.5 font-black text-slate-900">
                    ₹{Number(inv.totalAmount || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="py-3.5 px-3.5 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-slate-100/80 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-200/50">
                      <CreditCard size={11} className="text-slate-400" />
                      {inv.paymentMode || "Bank Transfer"}
                    </span>
                  </td>

                  <td className="py-3.5 px-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(inv.status)}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${getStatusDot(inv.status)}`}
                      />
                      {(inv.status || "draft").toUpperCase()}
                    </span>
                  </td>

                  <td
                    className="py-3.5 px-3.5 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/dashboard/Invoices/${invoiceId}?mode=view`,
                        )
                      }
                      className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                      title="View Invoice"
                    >
                      <Eye size={15} />
                    </button>
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
