"use client";

import React from "react";
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
  const statsGroups = [
    {
      id: "invoices",
      data: [
        { title: "Total Invoices", value: 120, icon: FileText, color: "bg-blue-100 text-blue-700" },
        { title: "Paid", value: 80, icon: CheckCircle, color: "bg-green-100 text-green-700" },
        { title: "Unpaid", value: 30, icon: XCircle, color: "bg-red-100 text-red-700" },
        { title: "Revenue", value: 12500, icon: DollarSign, color: "bg-yellow-100 text-yellow-700", isCurrency: true },
      ],
    },
    {
      id: "clients",
      data: [
        { title: "Total Clients", value: 200, icon: Users, color: "bg-purple-100 text-purple-700" },
        { title: "New Clients", value: 15, icon: UserPlus, color: "bg-pink-100 text-pink-700" },
        { title: "Active Clients", value: 180, icon: UserPlus, color: "bg-green-100 text-green-700" },
        { title: "Inactive Clients", value: 20, icon: UserMinus, color: "bg-red-100 text-red-700" },
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