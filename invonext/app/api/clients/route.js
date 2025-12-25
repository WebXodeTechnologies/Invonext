import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Client from "../../../models/Client";

// CREATE CLIENT
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const client = await Client.create(body);

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET CLIENTS
export async function GET() {
  try {
    await connectDB();

    const clients = await Client.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: clients,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
