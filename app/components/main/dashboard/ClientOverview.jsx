"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  Receipt,
} from "lucide-react";
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
        if (json?.success) {
          setData({
            chart: json.data?.chart || [],
            clients: json.data?.recentClients || [],
          });
        }
      } catch (error) {
        console.error("Dashboard Overview Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  const revenueData = {
    labels:
      data.chart.length > 0
        ? data.chart.map((d) => d.month)
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data:
          data.chart.length > 0
            ? data.chart.map((d) => d.total)
            : [0, 0, 0, 0, 0, 0],
        borderColor: "#4f46e5",
        borderWidth: 2.5,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, "rgba(79, 70, 229, 0.20)");
          gradient.addColorStop(1, "rgba(79, 70, 229, 0.0)");
          return gradient;
        },
        tension: 0.38,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleFont: { size: 12, weight: "700" },
        bodyFont: { size: 11, weight: "500" },
        padding: 10,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: (context) =>
            ` Revenue: ₹${Number(context.raw || 0).toLocaleString("en-IN")}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(226, 232, 240, 0.6)" },
        ticks: {
          color: "#64748b",
          font: { weight: "600", size: 10 },
          callback: (value) => `₹${value >= 1000 ? value / 1000 + "k" : value}`,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748b",
          font: { weight: "600", size: 10 },
          maxRotation: 0,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {[1, 2].map((n) => (
          <div
            key={n}
            className="h-80 bg-white border border-slate-200/80 rounded-3xl p-6 animate-pulse space-y-4 shadow-xs"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-36 bg-slate-100 rounded-md" />
              <div className="h-7 w-24 bg-slate-100 rounded-full" />
            </div>
            <div className="h-56 w-full bg-slate-100/70 rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
      {/* 1. REVENUE ANALYTICS CHART CARD */}
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <TrendingUp size={16} />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Revenue Analytics
              </h2>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-indigo-700 bg-indigo-50/90 px-3 py-1 rounded-full border border-indigo-100">
              <Sparkles size={11} className="text-indigo-600" /> Monthly
              Trajectory
            </span>
          </div>

          <div className="h-56 sm:h-64 w-full">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </div>

        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Real-time aggregation</span>
          <span className="text-indigo-600 font-bold">INR (₹) Base</span>
        </div>
      </div>

      {/* 2. RECENT CLIENTS CARD */}
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Users size={16} />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Recent Entities
              </h2>
            </div>

            <button
              onClick={() => router.push("/dashboard/clients")}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <UserPlus size={13} />
              <span>Add Client</span>
            </button>
          </div>

          {data.clients.length > 0 ? (
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-left border-collapse min-w-[280px]">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-3 px-2">Entity</th>
                    <th className="pb-3 px-2 hidden sm:table-cell">
                      Contact Email
                    </th>
                    <th className="pb-3 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.clients.slice(0, 5).map((client) => {
                    const displayName =
                      client.companyName || client.name || "Client Entity";
                    const initial = displayName.charAt(0).toUpperCase() || "C";
                    const email = client.email || "No email";
                    const taxBadge =
                      client.taxRegion || client.type || "Active";

                    return (
                      <tr
                        key={client._id || client.id || displayName}
                        className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                        onClick={() => router.push(`/dashboard/clients`)}
                      >
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 text-indigo-700 flex items-center justify-center font-black text-xs border border-indigo-100/80 shrink-0">
                              {initial}
                            </div>
                            <div className="flex flex-col truncate">
                              <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                                {displayName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium sm:hidden truncate">
                                {email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-2.5 px-2 text-xs text-slate-500 hidden sm:table-cell font-medium truncate max-w-[150px]">
                          {email}
                        </td>

                        <td className="py-2.5 px-2 text-right">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            {taxBadge}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State Container */
            <div className="my-2 bg-linear-to-br from-indigo-50/50 via-slate-50 to-blue-50/30 rounded-2xl border border-dashed border-indigo-200 p-6 text-center flex flex-col items-center justify-center space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <Building2 size={20} />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-xs font-bold text-slate-900">
                  No Clients Added Yet
                </h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Register your business clients to generate GST invoices and
                  track payments.
                </p>
              </div>
              <button
                onClick={() => router.push("/dashboard/clients")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer mt-1"
              >
                <span>Add First Client</span>
                <ArrowRight size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold">Directory Hub</span>
          <button
            onClick={() => router.push("/dashboard/clients")}
            className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
          >
            View All →
          </button>
        </div>
      </div>
    </div>
  );
}
