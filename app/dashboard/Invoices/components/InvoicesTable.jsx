"use client";

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

// Uniform status colors to match Clients page
const statusColors = {
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
  sent: "bg-blue-100 text-blue-800",
  draft: "bg-gray-100 text-gray-800",
};

export default function InvoicesTable({ invoices }) {
  // Integrated dummy data logic
  const dummyInvoices = [
    {
      _id: "1",
      invoiceNumber: "INV-2026-001",
      clientId: { name: "Annaai Agro Tradings", email: "contact@annaaiagro.com" },
      issueDate: new Date("2025-12-20"),
      dueDate: new Date("2026-01-05"),
      totalAmount: 14750,
      status: "paid",
    },
    {
      _id: "2",
      invoiceNumber: "INV-2026-002",
      clientId: { name: "Green Field Exports", email: "info@greenfield.com" },
      issueDate: new Date("2025-12-22"),
      dueDate: new Date("2026-01-02"),
      totalAmount: 53100,
      status: "overdue",
    },
     {
      _id: "3",
      invoiceNumber: "INV-2026-003",
      clientId: { name: "Webxode Technologies", email: "webxode@gmail.com" },
      issueDate: new Date("2025-12-22"),
      dueDate: new Date("2026-01-02"),
      totalAmount: 20000,
      status: "paid",
    },
  ];

  const data = invoices || dummyInvoices;

  return (
    <div className="w-full mx-auto">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 table-fixed lg:table-auto">
          <thead className="bg-gray-50">
            <tr className="text-xs 4xl:text-lg font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-left w-16 4xl:w-24">S.No</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-left">Invoice</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-left">Client</th>
              <th className="hidden md:table-cell px-4 py-4 4xl:px-8 4xl:py-6 text-left">Due Date</th>
              <th className="hidden lg:table-cell px-4 py-4 4xl:px-8 4xl:py-6 text-left">Amount</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-center">Status</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-right pr-10">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white text-sm 4xl:text-xl text-gray-700">
            {data.map((invoice, index) => (
              <tr key={invoice._id} className="hover:bg-gray-50/50 transition-colors group">
                {/* S.No */}
                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-gray-500 font-medium">
                  {index + 1}
                </td>

                {/* Invoice Number */}
                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap">
                  <span className="font-bold text-indigo-600">#{invoice.invoiceNumber}</span>
                </td>

                {/* Client Details */}
                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap">
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-gray-900 truncate max-w-[140px] lg:max-w-full">
                      {invoice.clientId?.name}
                    </span>
                    <span className="text-xs 4xl:text-lg text-gray-500 truncate">
                      {invoice.clientId?.email}
                    </span>
                  </div>
                </td>

                {/* Due Date */}
                <td className="hidden md:table-cell px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-gray-600">
                  {new Date(invoice.dueDate).toLocaleDateString('en-IN')}
                </td>

                {/* Amount */}
                <td className="hidden lg:table-cell px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap">
                  <span className="font-bold text-gray-900">
                    ₹{invoice.totalAmount.toLocaleString('en-IN')}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-center">
                  <span className={`inline-flex px-3 py-1 4xl:px-6 4xl:py-2 rounded-full text-xs 4xl:text-lg font-bold shadow-sm ${statusColors[invoice.status] || "bg-gray-100 text-gray-800"}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>

                {/* Uniform Action Buttons */}
                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center gap-2 4xl:gap-4">
                    <button className="p-2 4xl:p-4 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-all">
                      <Eye className="h-4 w-4 4xl:h-6 4xl:w-6" />
                    </button>
                    <button className="p-2 4xl:p-4 hover:bg-indigo-50 rounded-full text-indigo-600 transition-all">
                      <Pencil className="h-4 w-4 4xl:h-6 4xl:w-6" />
                    </button>
                    <button className="p-2 4xl:p-4 hover:bg-red-50 rounded-full text-red-600 transition-all">
                      <Trash2 className="h-4 w-4 4xl:h-6 4xl:w-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}