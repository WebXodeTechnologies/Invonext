"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  PlusCircle,
  ArrowRight,
  Receipt,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Building2,
} from "lucide-react";

export default function ClientPaymentTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json?.success) {
          setPayments(json.data?.recentPayments || []);
        }
      } catch (error) {
        console.error("Payment Feed Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || "draft").toLowerCase();
    if (s === "paid") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
    }
    if (s === "overdue") {
      return "bg-rose-50 text-rose-700 border-rose-200/80";
    }
    if (s === "pending" || s === "sent") {
      return "bg-amber-50 text-amber-700 border-amber-200/80";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusDot = (status) => {
    const s = (status || "draft").toLowerCase();
    if (s === "paid") return "bg-emerald-500";
    if (s === "overdue") return "bg-rose-500 animate-pulse";
    if (s === "pending" || s === "sent") return "bg-amber-500";
    return "bg-slate-400";
  };

  if (loading) {
    return (
      <div className="w-full rounded-3xl bg-white/95 border border-slate-200/80 p-5 sm:p-7 shadow-xs animate-pulse space-y-4">
        <div className="flex justify-between items-center pb-2">
          <div className="h-6 w-48 bg-slate-100 rounded-lg" />
          <div className="h-6 w-24 bg-slate-100 rounded-full" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 w-full bg-slate-50 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-100 shrink-0">
            <CreditCard size={19} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Recent Transactions & Invoices
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Live settlement and billing activity
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <ShieldCheck size={13} className="text-indigo-600" />{" "}
            Auto-Reconciled
          </span>
          <Link
            href="/dashboard/Invoices"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {payments.length > 0 ? (
        <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
          <table className="w-full text-left border-collapse min-w-[580px] sm:min-w-full">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 px-3 sm:px-4">Client / Document</th>
                <th className="pb-3 px-3 sm:px-4">Amount</th>
                <th className="pb-3 px-3 sm:px-4 hidden md:table-cell">
                  Payment Mode
                </th>
                <th className="pb-3 px-3 sm:px-4">Status</th>
                <th className="pb-3 px-3 sm:px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {payments.map((invoice) => {
                const clientName =
                  invoice.clientId?.companyName ||
                  invoice.clientId?.name ||
                  invoice.clientName ||
                  "Client Entity";
                const initial = clientName.charAt(0).toUpperCase() || "C";
                const invoiceNumber =
                  invoice.invoiceNumber ||
                  `INV-${invoice._id?.slice(-5) || "001"}`;
                const amount = Number(
                  invoice.totalAmount || invoice.amount || 0,
                );
                const currency = invoice.currency || "INR";

                return (
                  <tr
                    key={invoice._id || invoiceNumber}
                    className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                  >
                    {/* 1. Client Identity & Invoice ID */}
                    <td className="py-3.5 px-3 sm:px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 text-indigo-700 flex items-center justify-center font-black text-xs border border-indigo-100/80 shrink-0 group-hover:scale-105 transition-transform duration-200">
                          {initial}
                        </div>
                        <div className="flex flex-col truncate max-w-[150px] sm:max-w-xs">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {clientName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight truncate">
                            {invoiceNumber}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Amount */}
                    <td className="py-3.5 px-3 sm:px-4">
                      <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                        {currency === "USD" ? "$" : "₹"}
                        {amount.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* 3. Payment Mode */}
                    <td className="py-3.5 px-3 sm:px-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/50">
                        {invoice.paymentMode || "Bank Transfer"}
                      </span>
                    </td>

                    {/* 4. Payment Status */}
                    <td className="py-3.5 px-3 sm:px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border transition-colors ${getStatusBadge(
                          invoice.status,
                        )}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDot(invoice.status)}`}
                        />
                        {invoice.status?.toUpperCase() || "DRAFT"}
                      </span>
                    </td>

                    {/* 5. Timestamp */}
                    <td className="py-3.5 px-3 sm:px-4 text-right text-[11px] sm:text-xs text-slate-400 font-semibold whitespace-nowrap">
                      {invoice.createdAt
                        ? new Date(invoice.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "Recent"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-linear-to-br from-indigo-50/50 via-slate-50 to-blue-50/30 rounded-2xl border border-dashed border-indigo-200 p-8 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
            <Receipt size={24} />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-sm font-bold text-slate-900">
              No Billing History Recorded
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Generate invoices to track client settlements and auto-reconcile
              incoming payments.
            </p>
          </div>
          <Link href="/dashboard/Invoices/new">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer">
              <PlusCircle size={15} />
              <span>Create Invoice</span>
              <ArrowRight size={13} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
