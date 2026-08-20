"use client";
import React from "react";

export default function CustomerBalanceTable({ data = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-widest">Client Receivables</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100">
          <tr>
            <th className="px-6 py-4">Client Name</th>
            <th className="px-6 py-4">Total Billed</th>
            <th className="px-6 py-4">Paid</th>
            <th className="px-6 py-4">Outstanding</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-medium">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50">
              <td className="px-6 py-4 text-gray-900">{row.client}</td>
              <td className="px-6 py-4">₹{row.total}</td>
              <td className="px-6 py-4 text-green-600">₹{row.paid}</td>
              <td className="px-6 py-4 text-red-600 font-bold">₹{row.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}