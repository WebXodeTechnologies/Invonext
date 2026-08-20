"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import {
  PlusCircle,
  Search,
  Download,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Receipt,
  Sparkles,
} from "lucide-react";

export default function InvoiceHeader({
  invoices = [],
  onSearch,
  activeFilter = "all",
  setActiveFilter,
}) {
  const router = useRouter();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  const handleExport = (format) => {
    if (!invoices || invoices.length === 0) {
      toast.error("No invoice data available to export");
      return;
    }

    try {
      const data = invoices.map((inv, index) => ({
        "S.No": index + 1,
        "Invoice Number": inv.invoiceNumber || "N/A",
        "Client Name":
          inv.clientId?.companyName ||
          inv.clientId?.name ||
          inv.clientName ||
          "N/A",
        "Client Email": inv.clientId?.email || "N/A",
        "Issue Date": inv.issueDate
          ? new Date(inv.issueDate).toLocaleDateString("en-IN")
          : "N/A",
        "Due Date": inv.dueDate
          ? new Date(inv.dueDate).toLocaleDateString("en-IN")
          : "N/A",
        "Sub Total (₹)": inv.subTotal || 0,
        "Tax Amount (₹)": inv.tax?.amount || 0,
        "Total Amount (₹)": inv.totalAmount || 0,
        "Payment Mode": inv.paymentMode || "Bank Transfer",
        Status: (inv.status || "draft").toUpperCase(),
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Invoices");

      const fileName = `Invoices_Report_${Date.now()}`;
      if (format === "excel") {
        const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
        toast.success("Exported to Excel! 📊");
      } else {
        const buf = XLSX.write(wb, { bookType: "csv", type: "array" });
        saveAs(new Blob([buf]), `${fileName}.csv`);
        toast.success("Exported to CSV! 📄");
      }
    } catch (err) {
      console.error(err);
      toast.error("Export operation failed");
    }
    setIsExportOpen(false);
  };

  const totalCount = invoices.length;
  const paidCount = invoices.filter(
    (i) => (i.status || "").toLowerCase() === "paid",
  ).length;
  const pendingCount = invoices.filter((i) =>
    ["pending", "sent"].includes((i.status || "").toLowerCase()),
  ).length;
  const overdueCount = invoices.filter(
    (i) => (i.status || "").toLowerCase() === "overdue",
  ).length;
  const draftCount = invoices.filter(
    (i) => (i.status || "").toLowerCase() === "draft",
  ).length;

  const totalPaidRevenue = invoices
    .filter((i) => (i.status || "").toLowerCase() === "paid")
    .reduce((sum, i) => sum + Number(i.totalAmount || 0), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Main Header Card */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-indigo-100/50 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Title & Revenue Badge */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-indigo-50 to-indigo-100/60 text-indigo-700 text-[11px] sm:text-xs font-bold border border-indigo-200/60 shadow-xs">
                <Receipt size={13} className="text-indigo-600" /> GST Billing
                Engine
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
                ₹{totalPaidRevenue.toLocaleString("en-IN")} Realized Revenue
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Invoice Ledger <span className="text-2xl">🧾</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Create GST-compliant tax invoices, track payment reconciliation,
              and audit live receivables.
            </p>
          </div>

          {/* Search Bar & Export Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-64 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoice #, client, email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div className="flex items-center gap-2.5">
              {/* Export Dropdown */}
              <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsExportOpen(!isExportOpen)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Export</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExportOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isExportOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-2xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => handleExport("excel")}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <span>Export to Excel</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExport("csv")}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Export to CSV</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Create Invoice Primary CTA */}
              <button
                type="button"
                onClick={() => router.push("/dashboard/Invoices/new")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-indigo-200 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="whitespace-nowrap">New Invoice</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Filter Status Tab Bar */}
        <div className="flex items-center justify-start pt-5 mt-6 border-t border-slate-100/90 overflow-x-auto gap-2 text-xs">
          {[
            { key: "all", label: "All Invoices", count: totalCount },
            {
              key: "paid",
              label: "Paid",
              count: paidCount,
              dot: "bg-emerald-500",
            },
            {
              key: "pending",
              label: "Pending",
              count: pendingCount,
              dot: "bg-amber-500",
            },
            {
              key: "overdue",
              label: "Overdue",
              count: overdueCount,
              dot: "bg-rose-500",
            },
            { key: "draft", label: "Drafts", count: draftCount },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter && setActiveFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                activeFilter === tab.key
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {tab.dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
              )}
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  activeFilter === tab.key
                    ? "bg-indigo-700/60 text-white"
                    : "bg-white text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
