import React from "react";

const ClientHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 md:p-6 rounded-lg border border-gray-200">
      
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Clients
        </h1>
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
          className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Export</option>
          <option value="csv">Export as CSV</option>
          <option value="excel">Export as Excel</option>
        </select>

        {/* Add Client */}
        <button
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          + Add Client
        </button>
      </div>
    </div>
  );
};

export default ClientHeader;
