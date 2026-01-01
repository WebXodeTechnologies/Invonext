"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { LuPlus, LuSearch, LuDownload, LuChevronDown, LuFileText, LuTable } from "react-icons/lu";

const InvoiceHeader = ({ invoices = [] }) => {
  const router = useRouter();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportData = (format) => {
    // Check if invoices actually exist
    if (!invoices || invoices.length === 0) {
      toast.error("No data available to export");
      return;
    }

    try {
      const data = invoices.map((inv) => ({
        "Invoice Number": inv.invoiceNumber,
        "Client": inv.clientId?.name || "N/A",
        "Issue Date": new Date(inv.issueDate).toLocaleDateString(),
        "Due Date": new Date(inv.dueDate).toLocaleDateString(),
        "Sub Total": inv.subTotal,
        "Tax Amount": inv.tax?.amount || 0,
        "Total Amount": inv.totalAmount,
        "Status": inv.status.toUpperCase(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

      if (format === "excel") {
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer]), `Invoices_${Date.now()}.xlsx`);
        toast.success("Excel exported!");
      } else {
        const csvBuffer = XLSX.write(workbook, { bookType: "csv", type: "array" });
        saveAs(new Blob([csvBuffer]), `Invoices_${Date.now()}.csv`);
        toast.success("CSV exported!");
      }
    } catch (err) {
      toast.error("Export failed!");
    }
    setIsExportOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate">Invoices</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">Track and manage your billings</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3">
          <div className="relative w-full lg:w-64">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
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
                <LuChevronDown className={`w-4 h-4 transition-transform ${isExportOpen ? 'rotate-180' : ''}`} />
              </button>

              {isExportOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[60] py-1 overflow-hidden">
                  <button onClick={() => exportData("excel")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                    <LuTable className="w-4 h-4 text-green-600" /> Export to Excel
                  </button>
                  <button onClick={() => exportData("csv")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                    <LuFileText className="w-4 h-4 text-blue-600" /> Export to CSV
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push("/dashboard/Invoices/create")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
            >
              <LuPlus className="w-4 h-4 shrink-0" />
              <span>New Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;