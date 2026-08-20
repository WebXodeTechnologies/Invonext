import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Notification;
}

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["invoice", "task", "profile", "client", "system"],
      default: "system",
    },
    link: { type: String, default: "/dashboard" },
    isRead: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
