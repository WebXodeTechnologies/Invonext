"use client";

import React from "react";
import { Users, UserPlus } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ClientOverview() {
  // Revenue Data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 15000, 12500, 18000, 20000, 22000],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height via parent div
    plugins: { 
      legend: { display: false } 
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { 
          // Shortens numbers (e.g., 12000 to ₹12k) for better mobile fit
          callback: (value) => `₹${value / 1000}k`,
        },
      },
    },
  };

  // Sample Recent Clients
  const recentClients = [
    { name: "Akash S M", email: "akash@webxode.com", status: "Active" },
    { name: "Ramesh K", email: "ramesh@webxode.com", status: "Active" },
    { name: "Sneha P", email: "sneha@webxode.com", status: "Inactive" },
    { name: "Vikram T", email: "vikram@webxode.com", status: "Active" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-0">
      
      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
        <div className="h-[250px] md:h-[300px] w-full">
          <Line data={revenueData} options={revenueOptions} />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Clients</h3>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition font-medium">
            <UserPlus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 px-4">Client</th>
                  <th className="pb-3 px-4 hidden sm:table-cell">Email</th>
                  <th className="pb-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentClients.map((client, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell">
                      {client.email}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}