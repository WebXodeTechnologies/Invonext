import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Client from "@/models/Client";
import { auth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectDB();

    const client = await Client.findOne({ _id: id, userId });
    if (!client) return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    await connectDB();

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

export async function DELETE(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectDB();

    await Client.findOneAndDelete({ _id: id, userId });

    return NextResponse.json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}