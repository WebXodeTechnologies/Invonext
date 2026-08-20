"use client";

import React, { useState, useEffect } from "react";
import TaskHeader from "./components/TaskHeader";
import KanbanBoard from "./components/KanbanBoard";
import CreateTaskModal from "./components/CreateTaskModal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const json = await res.json();
      if (json.success) {
        setTasks(json.data || []);
      } else {
        toast.error(json.message || "Failed to load tasks");
      }
    } catch (err) {
      console.error("Tasks fetch error:", err);
      toast.error("Network error retrieving tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 1. Drag & Drop Handling (Optimistic update + DB Sync)
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    // Optimistic UI state update
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: targetStatus } : t)),
    );

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Task stage updated!");
      } else {
        toast.error(json.message || "Could not sync stage update");
        fetchTasks();
      }
    } catch {
      toast.error("Network error updating task stage");
      fetchTasks();
    }
  };

  // 2. Create Task Handler
  const handleCreateTask = async (taskPayload) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskPayload),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTasks((prev) => [json.data, ...prev]);
        toast.success("New task added to backlog! 🚀");
        setIsModalOpen(false);
      } else {
        toast.error(json.message || "Failed to create task");
      }
    } catch {
      toast.error("Network error creating task");
    }
  };

  // 3. Delete Task Handler
  const handleDeleteTask = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Task deleted");
      } else {
        toast.error(json.message || "Failed to delete task");
        fetchTasks();
      }
    } catch {
      toast.error("Network error deleting task");
      fetchTasks();
    }
  };

  // 4. Filtering Engine
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (task.tag || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      filterPriority === "all" ||
      (task.priority || "").toLowerCase() === filterPriority.toLowerCase();

    return matchesSearch && matchesPriority;
  });

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white/95 border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold text-slate-500">
          Loading agile task pipeline...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Toolbar */}
      <TaskHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        onOpenModal={() => setIsModalOpen(true)}
        totalTasks={tasks.length}
      />

      {/* 2. Drag & Drop Kanban Canvas */}
      <KanbanBoard
        tasks={filteredTasks}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDelete={handleDeleteTask}
      />

      {/* 3. Task Creation Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
