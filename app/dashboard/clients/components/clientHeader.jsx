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
  Users,
  Building2,
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
      Name: c.name || `${c.firstName || ""} ${c.lastName || ""}`.trim(),
      Company: c.companyName || "N/A",
      Email: c.email || "N/A",
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
  const gstClients = clients.filter(
    (c) => c.gstNumber && c.gstNumber.trim().length > 5,
  ).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Glass Header Card */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-indigo-100/50 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Header Title Section */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-indigo-50 to-indigo-100/60 text-indigo-700 text-[11px] sm:text-xs font-bold border border-indigo-200/60 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                Live Client Registry
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
                {totalClients} Registered Entities
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Client Management <span className="text-2xl">👥</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Organize customer accounts, verify GSTIN identification, and
              manage live invoice billing profiles.
            </p>
          </div>

          {/* Search and Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            {/* Search Input Box */}
            <div className="relative flex-1 sm:w-64 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, company, GST..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Export Dropdown & Add Button Group */}
            <div className="flex items-center gap-2.5">
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

              <button
                type="button"
                onClick={() => router.push("/dashboard/clients/newclient")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-indigo-200 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span className="whitespace-nowrap">Add Client</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-slate-100/90 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-center ${
                activeFilter === "all"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Clients ({totalClients})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("gst")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-center ${
                activeFilter === "gst"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              GST Registered ({gstClients})
            </button>
          </div>

          {totalClients === 0 && (
            <button
              type="button"
              onClick={onLoadDemoClients}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/80 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Sparkles size={14} className="text-indigo-600" /> Load Live
              Sample Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
