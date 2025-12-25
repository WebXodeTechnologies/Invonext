import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";

// CREATE INVOICE
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Calculate amounts safely on backend
    const items = body.items.map((item) => ({
      ...item,
      amount: item.quantity * item.rate,
    }));

    const subTotal = items.reduce((sum, i) => sum + i.amount, 0);
    const tax = body.tax || 0;
    const total = subTotal + tax;

    const invoice = await Invoice.create({
      ...body,
      items,
      subTotal,
      total,
    });

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET INVOICES
export async function GET() {
  try {
    await connectDB();

    const invoices = await Invoice.find()
      .populate("clientId")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
