"use client";

import React from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LuUserRoundPlus } from "react-icons/lu";

// Receive clients as prop for export
const ClientHeader = ({ clients }) => {
  const router = useRouter();

  // Export Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      clients.map((c, index) => ({
        SNo: index + 1,
        Name: c.name,
        Email: c.email,
        Phone: c.phone,
        GSTNumber: c.gstNumber,
        City: c.address.city,
        State: c.address.state,
        Status: c.status,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      "clients.xlsx"
    );
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 md:p-6 rounded-lg border border-gray-200 mb-6">
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
        <p className="text-sm text-gray-500">
          Manage your customers and billing information
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full sm:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Export */}
        <select
          onChange={(e) => {
            if (e.target.value === "csv") return; // handled by CSVLink below
            if (e.target.value === "excel") exportToExcel();
          }}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Export</option>
          <option value="csv">Export as CSV</option>
          <option value="excel">Export as Excel</option>
        </select>

        {/* CSV Export */}

        {/* Add Client */}
        <button
          onClick={() => router.push("/dashboard/clients/newclient")}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
        >
          <LuUserRoundPlus className="h-5 w-5" />
          Add Client
        </button>
      </div>
    </div>
  );
};

export default ClientHeader;
