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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ClientOverview() {
  // Revenue Data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ₹",
        data: [12000, 15000, 12500, 18000, 20000, 22000],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        ticks: {
          callback: (value) => `₹${value.toLocaleString("en-IN")}`,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Left Column – Revenue Graph */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Revenue Chart
        </h3>
        <Line data={revenueData} options={revenueOptions} />
      </div>

      {/* Right Column – Recent Clients Table */}
      <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Clients
          </h3>
          <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <UserPlus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentClients.map((client, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-100"
                >
                  <td className="py-2 px-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    {client.name}
                  </td>
                  <td className="py-2 px-3">{client.email}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        client.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
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
  );
}
