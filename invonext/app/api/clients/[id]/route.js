import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Client from "@/models/Client";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = await auth();
    const { id } = params;
    const body = await req.json(); // For simple field updates

    await connectDB();
    
    // Scoped update: only update if it belongs to this user
    const updatedClient = await Client.findOneAndUpdate(
      { _id: id, userId },
      { $set: body },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedClient });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}