"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { 
  LuUserRoundPlus, LuSearch, LuDownload, 
  LuChevronDown, LuTable, LuFileText 
} from "react-icons/lu";

const ClientHeader = ({ clients = [], onSearch }) => {
  const router = useRouter();
  const [isExportOpen, setIsExportOpen] = useState(false);
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

  const handleExport = (format) => {
    if (!clients.length) return alert("No data to export");

    const data = clients.map((c, index) => ({
      SNo: index + 1,
      Name: c.name,
      Email: c.email,
      Phone: c.phone,
      GST: c.gstNumber,
      City: c.address?.city || "N/A",
      Status: c.status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");

    const fileName = `Clients_${Date.now()}`;
    if (format === "excel") {
      const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } else {
      const buf = XLSX.write(wb, { bookType: "csv", type: "array" });
      saveAs(new Blob([buf]), `${fileName}.csv`);
    }
    setIsExportOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Clients</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">Manage customer records</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto">
          {/* Search Logic Implementation */}
          <div className="relative w-full lg:w-72">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
              <button
                onClick={() => setIsExportOpen(!isExportOpen)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all text-gray-700"
              >
                <LuDownload className="w-4 h-4" />
                <span>Export</span>
                <LuChevronDown className={`w-4 h-4 transition-transform ${isExportOpen ? "rotate-180" : ""}`} />
              </button>

              {isExportOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                  <button onClick={() => handleExport("excel")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                    <LuTable className="w-4 h-4 text-green-600" /> Export to Excel
                  </button>
                  <button onClick={() => handleExport("csv")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                    <LuFileText className="w-4 h-4 text-blue-600" /> Export to CSV
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push("/dashboard/clients/newclient")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
            >
              <LuUserRoundPlus className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Add Client</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;