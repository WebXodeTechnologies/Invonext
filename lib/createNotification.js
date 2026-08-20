import { connectDB } from "@/lib/db";
import Notification from "@/models/Notification";

export async function createNotification({
  userId,
  title,
  message,
  type = "system",
  link = "/dashboard",
}) {
  try {
    if (!userId || !title || !message) return null;
    await connectDB();
    return await Notification.create({
      userId,
      title,
      message,
      type,
      link,
      isRead: false,
    });
  } catch (err) {
    console.error("Failed to create background notification:", err);
    return null;
  }
}
