"use client";

import React, { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  DollarSign,
  Users,
  UserPlus,
  UserMinus,
} from "lucide-react";

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) setStats(json.data);
      } catch (err) {
        console.error("🔴 Stats Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6 space-y-6 animate-pulse bg-gray-50 rounded-xl h-64" />;

  const statsGroups = [
    {
      id: "invoices",
      data: [
        { title: "Total Invoices", value: stats?.totalInvoices || 0, icon: FileText, color: "bg-blue-100 text-blue-700" },
        { title: "Paid Revenue", value: stats?.totalRevenue || 0, icon: CheckCircle, color: "bg-green-100 text-green-700", isCurrency: true },
        { title: "Pending Amt", value: stats?.pendingAmount || 0, icon: XCircle, color: "bg-red-100 text-red-700", isCurrency: true },
        { title: "Net Worth", value: (stats?.totalRevenue || 0) + (stats?.pendingAmount || 0), icon: DollarSign, color: "bg-yellow-100 text-yellow-700", isCurrency: true },
      ],
    },
    {
      id: "clients",
      data: [
        { title: "Total Clients", value: stats?.totalClients || 0, icon: Users, color: "bg-purple-100 text-purple-700" },
        { title: "Active", value: stats?.totalClients || 0, icon: UserPlus, color: "bg-green-100 text-green-700" }, 
        { title: "New", value: 0, icon: UserPlus, color: "bg-pink-100 text-pink-700" },
        { title: "Inactive", value: 0, icon: UserMinus, color: "bg-red-100 text-red-700" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-2 md:p-6">
      {statsGroups.map((group) => (
        <div 
          key={group.id} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {group.data.map((stat) => (
            <div
              key={stat.title}
              className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">
                  {stat.isCurrency 
                    ? `₹${stat.value.toLocaleString("en-IN")}` 
                    : stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;