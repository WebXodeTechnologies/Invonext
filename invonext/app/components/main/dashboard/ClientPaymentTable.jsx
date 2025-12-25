"use client";

import React from "react";
import { Users } from "lucide-react";

export default function ClientPaymentTable() {
  // Sample data
  const clients = [
    { name: "Akash S M", lastPayment: 5000, paymentMode: "UPI", status: "Paid", date: "25 Dec 2025" },
    { name: "Ramesh K", lastPayment: 3000, paymentMode: "Credit Card", status: "Unpaid", date: "22 Dec 2025" },
    { name: "Sneha P", lastPayment: 7000, paymentMode: "Net Banking", status: "Paid", date: "20 Dec 2025" },
    { name: "Vikram T", lastPayment: 4500, paymentMode: "UPI", status: "Unpaid", date: "18 Dec 2025" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Payments</h3>
      <table className="w-full text-left text-gray-700 min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-3">Client</th>
            <th className="py-2 px-3">Last Payment</th>
            <th className="py-2 px-3">Payment Mode</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-100"
            >
              <td className="py-2 px-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                {client.name}
              </td>
              <td className="py-2 px-3">₹{client.lastPayment.toLocaleString("en-IN")}</td>
              <td className="py-2 px-3">{client.paymentMode}</td>
              <td className="py-2 px-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    client.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {client.status}
                </span>
              </td>
              <td className="py-2 px-3">{client.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
