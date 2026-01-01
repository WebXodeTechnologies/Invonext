"use client";

import React from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LuUserRoundPlus, LuSearch, LuDownload } from "react-icons/lu";

const ClientHeader = ({ clients = [] }) => {
  const router = useRouter();

  const exportToExcel = () => {
    if (!clients.length) return alert("No data to export");
    const ws = XLSX.utils.json_to_sheet(
      clients.map((c, index) => ({
        SNo: index + 1,
        Name: c.name,
        Email: c.email,
        Phone: c.phone,
        GSTNumber: c.gstNumber,
        City: c.address?.city || "N/A",
        State: c.address?.state || "N/A",
        Status: c.status,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "clients.xlsx");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-2 w-[60%] md:w-[95%] lg:w-full mb-5">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Row 1: Title Block */}
        <div className="text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Clients
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Manage your customer database and records
          </p>
        </div>

        
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto">
          
          {/* Row 2: Search Box */}
          <div className="relative w-full lg:w-72 xl:w-80">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Row 3 (Mobile): Export Select */}
          <div className="relative w-full lg:w-36">
            <select
              onChange={(e) => e.target.value === "excel" && exportToExcel()}
              className="w-full appearance-none pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer hover:border-gray-400 transition-all"
            >
              <option value="">Export Options</option>
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
            </select>
            <LuDownload className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Row 4 (Mobile): Add Client Button */}
          <button
            onClick={() => router.push("/dashboard/clients/newclient")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
          >
            <LuUserRoundPlus className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Add Client</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ClientHeader;