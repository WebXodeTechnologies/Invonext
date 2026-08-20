import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json(
      { success: true, data: notifications, unreadCount },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/notifications error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch notifications",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => ({}));
    await connectDB();

    if (body.notificationId) {
      await Notification.findOneAndUpdate(
        { _id: body.notificationId, userId },
        { $set: { isRead: true } },
      );
    } else {
      // Mark all as read
      await Notification.updateMany(
        { userId, isRead: false },
        { $set: { isRead: true } },
      );
    }

    return NextResponse.json(
      { success: true, message: "Notifications updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/notifications error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update notifications",
      },
      { status: 500 },
    );
  }
}
