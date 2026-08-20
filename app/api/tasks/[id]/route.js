import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { createNotification } from "@/lib/createNotification";

export async function PATCH(req, { params }) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
        $or: [{ userId: clerkUser.id }, { clerkUserId: clerkUser.id }],
      },
      { $set: body },
      { new: true },
    ).lean();

    if (!updatedTask) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    // Trigger notification if status stage changed
    if (body.status) {
      const stageName = body.status.toUpperCase().replace("_", " ");
      await createNotification({
        userId: clerkUser.id,
        title: "Task Stage Updated",
        message: `"${updatedTask.title}" shifted to ${stageName}.`,
        type: "task",
        link: "/dashboard/tasks",
      });
    }

    return NextResponse.json(
      { success: true, data: updatedTask },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/tasks/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectDB();

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      $or: [{ userId: clerkUser.id }, { clerkUserId: clerkUser.id }],
    });

    if (!deletedTask) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    await createNotification({
      userId: clerkUser.id,
      title: "Task Deleted",
      message: `Task "${deletedTask.title}" was removed.`,
      type: "task",
      link: "/dashboard/tasks",
    });

    return NextResponse.json(
      { success: true, message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete task" },
      { status: 500 },
    );
  }
}
