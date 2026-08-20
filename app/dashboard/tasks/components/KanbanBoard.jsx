"use client";

import React from "react";
import KanbanColumn from "./KanbanColumn";

const COLUMNS = [
  { id: "todo", title: "Backlog / To-Do", accent: "indigo" },
  { id: "in_progress", title: "In Progress", accent: "amber" },
  { id: "review", title: "In Review / Audit", accent: "purple" },
  { id: "done", title: "Completed / Settled", accent: "emerald" },
];

export default function KanbanBoard({ tasks, onDragStart, onDrop, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
      {COLUMNS.map((col) => {
        const columnTasks = tasks.filter(
          (t) => (t.status || "").toLowerCase() === col.id.toLowerCase(),
        );
        return (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={columnTasks}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}
