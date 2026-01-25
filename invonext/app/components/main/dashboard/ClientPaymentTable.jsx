"use client";

import React, { useEffect, useState } from "react";
import { Users, Loader2 } from "lucide-react";

export default function ClientPaymentTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) {
          // Getting data from Function 5 in the backend
          setPayments(json.data.recentPayments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center bg-white rounded-xl border border-gray-100">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-0 mb-6">
      <div className="flex items-center justify-between mb-6 ml-5 py-4">
        <h3 className="text-lg font-semibold text-gray-800">Client Payments</h3>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded mr-5">
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
              {payments.length > 0 ? (
                payments.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {invoice.clientId?.name || "Deleted Client"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-sm font-semibold text-gray-800">
                      ₹{invoice.totalAmount.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                        {invoice.paymentMode || "Bank Transfer"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status.toLowerCase() === "paid" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {invoice.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-500 hidden sm:table-cell whitespace-nowrap">
                      {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400 text-sm">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}