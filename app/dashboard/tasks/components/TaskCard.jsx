"use client";

import React from "react";
import { Calendar, Tag, Trash2 } from "lucide-react";

export default function TaskCard({ task, onDragStart, onDelete }) {
  const getPriorityStyle = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "urgent":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "high":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "medium":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200/80";
    }
  };

  const taskId = task._id || task.id;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, taskId)}
      className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing group space-y-3 relative"
    >
      {/* Top Tag & Delete Action */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getPriorityStyle(
            task.priority,
          )}`}
        >
          {task.priority || "Medium"}
        </span>

        <button
          type="button"
          onClick={() => onDelete(taskId)}
          className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-600 transition rounded-md cursor-pointer"
          title="Delete Task"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Task Content */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-slate-600 font-semibold text-[10px]">
            <Tag size={10} className="text-slate-400" />
            {task.tag || "General"}
          </span>
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
              <Calendar size={10} />
              {task.dueDate}
            </span>
          )}
        </div>

        {/* Assignee Initial */}
        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[9px] border border-indigo-200 uppercase">
          {task.assignee?.avatar || task.assignee?.name?.charAt(0) || "U"}
        </div>
      </div>
    </div>
  );
}
