import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { createNotification } from "@/lib/createNotification";

export async function GET() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();
    const tasks = await Task.find({
      $or: [{ userId: clerkUser.id }, { clerkUserId: clerkUser.id }],
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Task title is required" },
        { status: 400 },
      );
    }

    const ownerName =
      `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
      clerkUser.username ||
      "Owner";

    await connectDB();
    const newTask = await Task.create({
      ...body,
      userId: clerkUser.id,
      clerkUserId: clerkUser.id,
      assignee: {
        name: ownerName,
        avatar: ownerName.charAt(0).toUpperCase() || "U",
      },
    });

    // Create background notification
    await createNotification({
      userId: clerkUser.id,
      title: "New Task Created",
      message: `Task "${newTask.title}" added to your backlog.`,
      type: "task",
      link: "/dashboard/tasks",
    });

    return NextResponse.json({ success: true, data: newTask }, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create task" },
      { status: 500 },
    );
  }
}
