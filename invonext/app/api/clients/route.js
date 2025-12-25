import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Client from "@/models/Client";

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    const client = await Client.create({
      userId, // ✅ matches schema
      name: body.name,
      email: body.email,
      phone: body.phone,
      gstNumber: body.gstNumber,
      address: body.address,
    });

    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const clients = await Client.find({ userId }) // ✅ FIX
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
