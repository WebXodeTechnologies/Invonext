"use client";
import React from "react";
import { LuCircleDot } from "react-icons/lu";

export default function PaymentStatusTable({ data = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Payment Collection Report</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase">
          <tr>
            <th className="px-6 py-4">Invoice ID</th>
            <th className="px-6 py-4">Client</th>
            <th className="px-6 py-4">Due Date</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono font-bold text-indigo-600">{item.id}</td>
              <td className="px-6 py-4 font-medium">{item.client}</td>
              <td className="px-6 py-4 text-gray-500">{item.date}</td>
              <td className="px-6 py-4 font-bold text-gray-900">{item.amount}</td>
              <td className="px-6 py-4">
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                  item.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  <LuCircleDot size={10} /> {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}