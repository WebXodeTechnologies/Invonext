"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  AlertCircle,
  Loader2,
  Plus,
  CalendarDays,
  ArrowUpRight,
  Sparkles,
  Layers,
} from "lucide-react";

export default function TaskOverview() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnKeys = ["pending", "urgent", "completed"];

  const statusConfig = {
    pending: {
      label: "In Progress / Backlog",
      icon: Clock3,
      badge: "bg-amber-50 text-amber-700 border-amber-200/80",
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
      emptyMsg: "No active tasks in pipeline",
    },
    urgent: {
      label: "Urgent & Reviews",
      icon: AlertCircle,
      badge: "bg-rose-50 text-rose-700 border-rose-200/80",
      iconColor: "text-rose-600 bg-rose-50 border-rose-100",
      emptyMsg: "No urgent deliverables due",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      emptyMsg: "No completed tasks yet",
    },
  };

  const priorityColors = {
    urgent: "bg-rose-50 text-rose-700 border-rose-200/70",
    high: "bg-rose-50 text-rose-700 border-rose-200/70",
    medium: "bg-amber-50 text-amber-700 border-amber-200/70",
    low: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // 1. Fetch from /api/stats first
        const statsRes = await fetch("/api/stats");
        const statsJson = await statsRes.json();

        if (
          statsJson?.success &&
          Array.isArray(statsJson.data?.tasks) &&
          statsJson.data.tasks.length > 0
        ) {
          setTasks(statsJson.data.tasks);
        } else {
          // 2. Direct fallback to /api/tasks
          const taskRes = await fetch("/api/tasks");
          const taskJson = await taskRes.json();
          if (taskJson?.success && Array.isArray(taskJson.data)) {
            setTasks(taskJson.data);
          }
        }
      } catch (error) {
        console.error("Task Overview Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Filter tasks to match both Kanban stages ("todo", "in_progress", "review", "done")
  const getTasksByColumn = (colKey) => {
    return tasks.filter((task) => {
      const s = (task.status || "").toLowerCase();
      const p = (task.priority || "").toLowerCase();

      if (colKey === "completed") {
        return s === "done" || s === "completed";
      }

      if (colKey === "urgent") {
        return (
          (p === "urgent" || s === "review" || s === "due today") &&
          s !== "done" &&
          s !== "completed"
        );
      }

      if (colKey === "pending") {
        return (
          (s === "todo" || s === "in_progress" || s === "pending" || !s) &&
          p !== "urgent" &&
          s !== "done" &&
          s !== "completed" &&
          s !== "review"
        );
      }

      return false;
    });
  };

  if (loading) {
    return (
      <div className="w-full rounded-3xl bg-white/95 border border-slate-200/80 p-5 sm:p-7 shadow-xs animate-pulse space-y-4">
        <div className="flex justify-between items-center pb-2">
          <div className="h-6 w-44 bg-slate-100 rounded-lg" />
          <div className="h-6 w-24 bg-slate-100 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 bg-slate-50 rounded-2xl border border-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-100 shrink-0">
            <Layers size={19} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Task & Workflow Engine
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Real-time milestone progression
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <Sparkles size={12} className="text-indigo-600" /> Automated
            Pipeline
          </span>
          <Link
            href="/dashboard/tasks"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Full Task Board</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* 3 Overview Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {columnKeys.map((key) => {
          const columnTasks = getTasksByColumn(key);
          const config = statusConfig[key];
          const StatusIcon = config.icon;

          return (
            <div
              key={key}
              className="bg-slate-50/60 border border-slate-200/70 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:bg-slate-50 hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-xl border ${config.iconColor}`}
                    >
                      <StatusIcon size={15} />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight">
                      {config.label}
                    </h3>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${config.badge}`}
                  >
                    {columnTasks.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {columnTasks.length > 0 ? (
                    columnTasks.map((task) => {
                      const priorityKey = (
                        task.priority || "medium"
                      ).toLowerCase();
                      const priorityStyle =
                        priorityColors[priorityKey] || priorityColors.medium;

                      return (
                        <div
                          key={task._id || task.id || task.title}
                          className="group/card p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-200 hover:shadow-xs transition-all duration-200 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 group-hover/card:text-indigo-600 transition-colors leading-snug line-clamp-2">
                              {task.title || "Untitled Task"}
                            </span>
                            <span
                              className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider shrink-0 ${priorityStyle}`}
                            >
                              {task.priority || "Medium"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-1 border-t border-slate-100">
                            <span className="truncate max-w-[130px] sm:max-w-[110px] text-slate-600 font-medium">
                              {task.tag || "General"}
                            </span>
                            {task.dueDate && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
                                <CalendarDays
                                  size={11}
                                  className="text-indigo-500"
                                />
                                {task.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 px-4 rounded-xl bg-white/70 border border-dashed border-slate-200 text-center space-y-1.5">
                      <p className="text-xs text-slate-600 font-bold">
                        {config.emptyMsg}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Pipeline clear & synced
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick-Add Action */}
              <div className="pt-3 mt-3 border-t border-slate-200/60">
                <Link
                  href="/dashboard/tasks"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-white transition-all border border-transparent hover:border-slate-200"
                >
                  <Plus size={14} />
                  <span>Open Task Board</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
