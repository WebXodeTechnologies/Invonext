"use client";
import React from "react";

export default function RevenueBreakdown({ data = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Service Revenue Breakdown</h3>
      </div>
      <div className="p-6 space-y-6">
        {data.map((service, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-gray-800">{service.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold">{service.count} Projects</p>
              </div>
              <p className="text-sm font-black text-gray-900">{service.total}</p>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500" 
                style={{ width: `${service.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}