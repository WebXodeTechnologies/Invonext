import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const items = body.items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
    }));

    const subTotal = items.reduce((sum, i) => sum + i.amount, 0);
    const tax = body.tax || 0;
    const total = subTotal + tax;

    const invoice = await Invoice.create({
      clerkUserId: userId,
      clientId: body.clientId,
      items,
      subTotal,
      tax,
      total,
      status: "draft",
    });

    return NextResponse.json({ success: true, data: invoice });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const invoices = await Invoice.find({ clerkUserId: userId })
      .populate("clientId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
