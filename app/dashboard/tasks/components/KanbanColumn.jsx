"use client";

import React, { useState } from "react";
import TaskCard from "./TaskCard";

export default function KanbanColumn({
  column,
  tasks,
  onDragStart,
  onDrop,
  onDelete,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDropInternal = (e) => {
    setIsDragOver(false);
    onDrop(e, column.id);
  };

  const getAccentDot = (accent) => {
    if (accent === "emerald") return "bg-emerald-500";
    if (accent === "amber") return "bg-amber-500";
    if (accent === "purple") return "bg-purple-500";
    return "bg-indigo-600";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropInternal}
      className={`flex flex-col bg-slate-50/70 border rounded-3xl p-4 transition-all min-h-[500px] ${
        isDragOver
          ? "border-indigo-400 bg-indigo-50/30 ring-2 ring-indigo-200"
          : "border-slate-200/80"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-200/70 px-1">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${getAccentDot(column.accent)}`}
          />
          <h2 className="text-xs font-extrabold text-slate-800 tracking-tight uppercase">
            {column.title}
          </h2>
        </div>
        <span className="text-[11px] font-black text-slate-500 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
          {tasks.length}
        </span>
      </div>

      {/* Task Stack */}
      <div className="space-y-3 flex-1">
        {tasks.map((task) => (
          <TaskCard
            key={task._id || task.id}
            task={task}
            onDragStart={onDragStart}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-[11px] font-bold text-slate-400">
            Drop items here
          </div>
        )}
      </div>
    </div>
  );
}
