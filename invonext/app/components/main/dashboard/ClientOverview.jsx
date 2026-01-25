"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Loader2 } from "lucide-react";
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
  Filler,
);

export default function ClientOverview() {
  const router = useRouter();
  const [data, setData] = useState({ chart: [], clients: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) {
          setData({
            chart: json.data.chart,
            clients: json.data.recentClients,
          });
        }
      } catch (error) {
        console.error("Frontend Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  // Revenue Chart Configuration
  const revenueData = {
    labels: data.chart.map((d) => d.month),
    datasets: [
      {
        label: "Revenue",
        data: data.chart.map((d) => d.total),
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
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value >= 1000 ? value / 1000 + "k" : value}`,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-0">
      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Revenue Overview
        </h3>
        <div className="h-[250px] md:h-[300px] w-full">
          {data.chart.length > 0 ? (
            <Line data={revenueData} options={revenueOptions} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              No revenue data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Clients Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Clients
          </h3>
          <button
            onClick={() => router.push("/dashboard/clients/newclient")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            <UserPlus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Client</th>
                <th className="pb-3 px-4 hidden sm:table-cell">Email</th>
                <th className="pb-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.clients.map((client) => (
                <tr
                  key={client._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {client.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell">
                    {client.email}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {client.status || "Active"}
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
