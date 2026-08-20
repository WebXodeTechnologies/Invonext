import mongoose from "mongoose";

// Invalidate cache during hot reload
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Task;
}

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    clerkUserId: {
      type: String,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "todo",
        "in_progress",
        "review",
        "done",
        "Pending",
        "Completed",
        "Due Today",
      ],
      default: "todo",
      index: true,
    },
    priority: {
      type: String,
      enum: [
        "urgent",
        "high",
        "medium",
        "low",
        "Urgent",
        "High",
        "Medium",
        "Low",
      ],
      default: "medium",
    },
    tag: {
      type: String,
      default: "Billing",
      trim: true,
    },
    dueDate: {
      type: String,
      default: "",
    },
    assignee: {
      name: { type: String, default: "Owner" },
      avatar: { type: String, default: "U" },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
