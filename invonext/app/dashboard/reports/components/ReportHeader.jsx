"use client";
import React, { useState } from "react";
import { LuDownload, LuFileSpreadsheet, LuCalendarDays } from "react-icons/lu";

export default function ReportHeader({ title, onFilterChange }) {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newRange = { ...dateRange, [name]: value };
    setDateRange(newRange);
    if (onFilterChange) onFilterChange(newRange);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-4 md:p-6 rounded-3xl border border-gray-200 shadow-sm">
      
      {/* Title Section: Responsive text sizes */}
      <div className="space-y-1 w-full lg:w-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-md font-black text-indigo-600 tracking-loose">
            Financial Analysis
          </span>
        </div>
      </div>
      
      {/* Controls Container: Stacks on mobile, row on tablet+ */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
        
        {/* Date Filter: Flex-wrap or horizontal scroll on very small screens */}
        <div className="flex items-center bg-indigo-50/50 border border-indigo-100 p-1.5 rounded-2xl w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 px-2 md:px-4">
            <LuCalendarDays className="text-indigo-600 hidden xs:block" size={18} />
            <div className="flex flex-col">
              <label className="text-xs font-black text-indigo-400 uppercase leading-none">From</label>
              <input 
                type="date" 
                name="from"
                value={dateRange.from}
                onChange={handleDateChange}
                className="bg-transparent text-sm md:text-md font-bold text-gray-800 outline-none cursor-pointer mt-0.5 w-28 md:w-auto"
              />
            </div>
          </div>
          
          <div className="h-8 w-px bg-indigo-100 mx-1 md:mx-2" />
          
          <div className="flex flex-col px-2 md:px-4">
            <label className="text-xs font-black text-indigo-400 uppercase leading-none">To Date</label>
            <input 
              type="date" 
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              className="bg-transparent text-sm md:text-md font-bold text-gray-800 outline-none cursor-pointer mt-0.5 w-28 md:w-auto"
            />
          </div>
        </div>

        {/* Action Buttons: Side-by-side on all screens */}
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-3 border-2 border-indigo-50 text-indigo-600 rounded-lg text-sm font-black tracking-widest hover:bg-indigo-600 hover:text-white transition-all duration-300 group">
            <LuFileSpreadsheet size={18} className="group-hover:scale-110 transition-transform" /> 
            <span>CSV</span>
          </button>
          
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-indigo-600 text-white rounded-lg text-sm font-black tracking-widest hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 group">
            <LuDownload size={18} className="group-hover:scale-110" /> 
            <span className="whitespace-nowrap">Export PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}