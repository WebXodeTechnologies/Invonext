"use client";

import React from "react";
import { Users, CreditCard, Banknote, Laptop } from "lucide-react";

export default function ClientPaymentTable() {
  const clients = [
    { name: "Akash S M", lastPayment: 5000, paymentMode: "UPI", status: "Paid", date: "25 Dec 2025" },
    { name: "Ramesh K", lastPayment: 3000, paymentMode: "Credit Card", status: "Unpaid", date: "22 Dec 2025" },
    { name: "Sneha P", lastPayment: 7000, paymentMode: "Net Banking", status: "Paid", date: "20 Dec 2025" },
    { name: "Vikram T", lastPayment: 4500, paymentMode: "UPI", status: "Unpaid", date: "18 Dec 2025" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-0 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Client Payments</h3>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Recent Transactions
        </span>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Client</th>
                <th className="pb-3 px-4">Amount</th>
                <th className="pb-3 px-4 hidden md:table-cell">Method</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4 hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  {/* Client Info */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{client.name}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-4 text-sm font-semibold text-gray-800">
                    ₹{client.lastPayment.toLocaleString("en-IN")}
                  </td>

                  {/* Payment Mode - Hidden on mobile */}
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                        {client.paymentMode}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === "Paid" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {client.status}
                    </span>
                  </td>

                  {/* Date - Hidden on extra small */}
                  <td className="py-4 px-4 text-sm text-gray-500 hidden sm:table-cell whitespace-nowrap">
                    {client.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}