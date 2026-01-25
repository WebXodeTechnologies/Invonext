"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

export default function TaskOverview() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Constants for styling
  const statuses = ["Pending", "Completed", "Due Today"];
  
  const statusConfig = {
    Pending: { color: "bg-yellow-100", icon: <Clock className="w-5 h-5 text-yellow-700" />, card: "bg-yellow-50 border-yellow-200" },
    Completed: { color: "bg-green-100", icon: <CheckCircle className="w-5 h-5 text-green-700" />, card: "bg-green-50 border-green-200" },
    "Due Today": { color: "bg-red-100", icon: <XCircle className="w-5 h-5 text-red-700" />, card: "bg-red-50 border-red-200" },
  };

  const priorityColors = {
    High: "bg-red-200 text-red-800",
    Medium: "bg-yellow-200 text-yellow-800",
    Low: "bg-green-200 text-green-800",
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/stats");
        const result = await response.json();
        if (result.success) {
          // Accessing tasks from the top-level key we set in the backend
          setTasks(result.data.tasks || []);
        }
      } catch (error) {
        console.error("❌ Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800">Task Updates</h3>

      {/* 1. Dynamic Task Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statuses.map((status) => {
          const count = tasks.filter((t) => t.status === status).length;
          const config = statusConfig[status];
          
          return (
            <div key={status} className="flex items-center p-4 rounded-xl shadow-md bg-white">
              <div className={`p-3 rounded-full ${config.color} flex items-center justify-center mr-4`}>
                {config.icon}
              </div>
              <div className="flex-1 text-right">
                <p className="text-gray-500 text-sm">{status}</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Mini Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className={`flex flex-col rounded-xl shadow-md p-4 border ${statusConfig[status].card}`}>
            <h4 className="text-gray-800 font-semibold mb-3 flex items-center justify-between">
              {status}
              <span className="text-sm text-gray-500">
                {tasks.filter((t) => t.status === status).length}
              </span>
            </h4>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {tasks.filter((t) => t.status === status).length > 0 ? (
                tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition border-l-4 border-indigo-500 flex justify-between items-center"
                    >
                      <span className="text-sm font-medium text-gray-700 truncate mr-2">
                        {task.title}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="text-xs text-center py-4 text-gray-400">No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}