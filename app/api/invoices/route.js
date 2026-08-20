import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import Client from "@/models/Client";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();

    // 1. Fetch Client to create a Snapshot (Protect against future client edits)
    const client = await Client.findOne({ _id: body.clientId, userId });
    if (!client) return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });

    // 2. Calculate Item Amounts & Subtotal
    const items = body.items.map(item => ({
      ...item,
      amount: Number(item.quantity) * Number(item.rate)
    }));

    const subTotal = items.reduce((sum, item) => sum + item.amount, 0);

    // 3. Indian GST Logic (CGST/SGST or IGST)
    const taxRate = body.taxPercent || 18; // Default 18%
    const taxAmount = (subTotal * taxRate) / 100;

    let taxData = {
      type: body.taxType, // "CGST_SGST" or "IGST"
      percent: taxRate,
      amount: taxAmount,
      cgst: body.taxType === "CGST_SGST" ? taxAmount / 2 : 0,
      sgst: body.taxType === "CGST_SGST" ? taxAmount / 2 : 0,
      igst: body.taxType === "IGST" ? taxAmount : 0,
    };

    // 4. Create Invoice with Snapshot
    const invoice = await Invoice.create({
      userId, 
      clientId: body.clientId,
      invoiceNumber: body.invoiceNumber,
      issueDate: body.issueDate || new Date(),
      dueDate: body.dueDate,
      items,
      subTotal,
      tax: taxData,
      totalAmount: subTotal + taxAmount,
      status: "draft",
      notes: body.notes
    });

    return NextResponse.json({ success: true, data: invoice }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();

    // Matching your schema field "userId"
    const invoices = await Invoice.find({ userId })
      .populate("clientId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}