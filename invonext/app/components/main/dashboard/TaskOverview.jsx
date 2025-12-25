"use client";

import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// Sample tasks with optional priority
const tasks = [
  { title: "Design homepage", status: "Pending", priority: "High" },
  { title: "Create invoice template", status: "Completed", priority: "Medium" },
  { title: "Call client Akash", status: "Due Today", priority: "High" },
  { title: "Setup payment gateway", status: "Pending", priority: "Medium" },
  { title: "Update client database", status: "Due Today", priority: "Low" },
];

export default function TaskOverview() {
  const stats = [
    {
      title: "Pending",
      value: tasks.filter((t) => t.status === "Pending").length,
      icon: <Clock className="w-5 h-5 text-yellow-700" />,
      color: "bg-yellow-100",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
      icon: <CheckCircle className="w-5 h-5 text-green-700" />,
      color: "bg-green-100",
    },
    {
      title: "Due Today",
      value: tasks.filter((t) => t.status === "Due Today").length,
      icon: <XCircle className="w-5 h-5 text-red-700" />,
      color: "bg-red-100",
    },
  ];

  const statuses = ["Pending", "Completed", "Due Today"];
  const statusColors = {
    Pending: "bg-yellow-50 border-yellow-200",
    Completed: "bg-green-50 border-green-200",
    "Due Today": "bg-red-50 border-red-200",
  };

  const priorityColors = {
    High: "bg-red-200 text-red-800",
    Medium: "bg-yellow-200 text-yellow-800",
    Low: "bg-green-200 text-green-800",
  };

  return (
    <div className="space-y-6 mb-6">
      {/* Section Heading */}
      <h3 className="text-xl font-semibold text-gray-800">Task Updates</h3>

      {/* Task Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center p-4 rounded-xl shadow-md hover:shadow-xl transition bg-white"
          >
            <div
              className={`p-3 rounded-full ${stat.color} flex items-center justify-center mr-4`}
            >
              {stat.icon}
            </div>
            <div className="flex-1 text-right">
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div
            key={status}
            className={`flex flex-col rounded-xl shadow-md p-4 border ${statusColors[status]}`}
          >
            {/* Column Header */}
            <h4 className="text-gray-800 font-semibold mb-3 flex items-center justify-between">
              {status}{" "}
              <span className="text-sm text-gray-500">
                {tasks.filter((t) => t.status === status).length}
              </span>
            </h4>

            {/* Tasks */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {tasks
                .filter((t) => t.status === status)
                .map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer border-l-4 border-indigo-500 flex justify-between items-center"
                  >
                    <span>{task.title}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
