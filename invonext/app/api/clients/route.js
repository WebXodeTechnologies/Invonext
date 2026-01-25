import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Client from "@/models/Client";

export async function POST(req) {
  try {
    const { userId } = await auth(); // Added await
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    // 1. Check if client already exists for this user (by email or GST)
    const existingClient = await Client.findOne({ 
      userId, 
      $or: [{ email: body.email }, { gstNumber: body.gstNumber }] 
    });

    if (existingClient && body.gstNumber) {
      return NextResponse.json(
        { success: false, message: "Client with this Email or GST already exists" },
        { status: 400 }
      );
    }

    // 2. Create client
    const client = await Client.create({
      userId,
      ...body // Spread body if keys match schema exactly
    });

    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth(); // Added await
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    // Scoped to specific user and sorted by newest
    const clients = await Client.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}