"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  UserPlus,
  Search,
  Download,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const ClientHeader = ({
  clients = [],
  onSearch,
  activeFilter,
  setActiveFilter,
  onLoadDemoClients,
}) => {
  const router = useRouter();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  const handleExport = (format) => {
    if (!clients.length) {
      toast.error("No client records to export");
      return;
    }

    const data = clients.map((c, index) => ({
      "S.No": index + 1,
      Name: c.name,
      Email: c.email,
      Phone: c.phone || "N/A",
      "GST Number": c.gstNumber || "N/A",
      City: c.address?.city || "N/A",
      State: c.address?.state || "N/A",
      Status: c.status || "Active",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");

    const fileName = `Clients_Directory_${Date.now()}`;
    if (format === "excel") {
      const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
      toast.success("Exported to Excel! 📊");
    } else {
      const buf = XLSX.write(wb, { bookType: "csv", type: "array" });
      saveAs(new Blob([buf]), `${fileName}.csv`);
      toast.success("Exported to CSV! 📄");
    }
    setIsExportOpen(false);
  };

  const totalClients = clients.length;
  const gstClients = clients.filter((c) => c.gstNumber && c.gstNumber.length > 5).length;

  return (
    <div className="space-y-6">
      {/* 1. Live Header Banner Card */}
      <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-indigo-200 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Header Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Client Registry
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/50">
                {totalClients} Customer Profiles
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Client Management 👥
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl">
              Organize customer contacts, verify GSTIN details, and track live billing relationships.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, GST..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Export & Add Buttons */}
            <div className="flex items-center gap-2.5">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsExportOpen(!isExportOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Export</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExportOpen ? "rotate-180" : ""}`} />
                </button>

                {isExportOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 p-1 animate-in fade-in duration-150">
                    <button
                      onClick={() => handleExport("excel")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <span>Export to Excel</span>
                    </button>
                    <button
                      onClick={() => handleExport("csv")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Export to CSV</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => router.push("/dashboard/clients/newclient")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Filter Tabs & Quick Action Bar */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/50 text-xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                activeFilter === "all"
                  ? "bg-white text-indigo-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Clients ({totalClients})
            </button>
            <button
              onClick={() => setActiveFilter("gst")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                activeFilter === "gst"
                  ? "bg-white text-indigo-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              GST Registered 📄 ({gstClients})
            </button>
          </div>

          {totalClients === 0 && (
            <button
              onClick={onLoadDemoClients}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-3.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              <Sparkles size={14} className="text-indigo-600" /> Load Sample Clients
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;