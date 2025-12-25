"use client";

import React from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  DollarSign,
  Clipboard,
  Users,
  UserPlus,
  UserMinus,
} from "lucide-react";

export default function StatsCards() {
  // Row 1 – Invoice Stats
  const invoiceStats = [
    {
      title: "Total Invoices",
      value: 120,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Paid",
      value: 80,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Unpaid",
      value: 30,
      icon: <XCircle className="w-6 h-6" />,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Revenue",
      value: 12500,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  // Row 2 – Client Stats
  const clientStats = [
    {
      title: "Total Clients",
      value: 200,
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "New Clients",
      value: 15,
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: "Active Clients",
      value: 180,
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Inactive Clients",
      value: 20,
      icon: <UserMinus className="w-6 h-6" />,
      color: "bg-red-100 text-red-700",
    },
  ];

  // Render a single card
  const renderCard = (stat) => (
    <div
      key={stat.title}
      className="flex items-center p-4 rounded-xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-1"
    >
      <div
        className={`p-3 rounded-full ${stat.color} flex items-center justify-center mr-4`}
      >
        {stat.icon}
      </div>
      <div className="flex-1 text-right">
        <p className="text-gray-500 text-sm">{stat.title}</p>
        <p className="text-2xl font-bold text-gray-800">
          {stat.title === "Revenue"
            ? `₹${stat.value.toLocaleString("en-IN")}`
            : stat.value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 mb-6">
      {/* Row 1 – Invoice Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {invoiceStats.map(renderCard)}
      </div>

      {/* Row 2 – Client Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientStats.map(renderCard)}
      </div>
    </div>
  );
}
