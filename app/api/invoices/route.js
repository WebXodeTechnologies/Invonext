import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import Client from "@/models/Client";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();

    const invoices = await Invoice.find({ userId })
      .populate("clientId", "name companyName email phone gstNumber address")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, data: invoices },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/invoices error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch invoices" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();
    const body = await req.json();

    if (!body.clientId) {
      return NextResponse.json(
        { success: false, message: "A valid client entity is required" },
        { status: 400 },
      );
    }

    // 1. Verify Client belongs to authenticated user
    const client = await Client.findOne({ _id: body.clientId, userId });
    if (!client) {
      return NextResponse.json(
        { success: false, message: "Client record not found in directory" },
        { status: 404 },
      );
    }

    // 2. Normalize and compute line items
    const rawItems = Array.isArray(body.items) ? body.items : [];
    const items = rawItems.map((item) => {
      const quantity = Number(item.quantity) || 1;
      const rate = Number(item.rate ?? item.price ?? 0);
      return {
        description: item.description || "Service item",
        quantity,
        rate,
        amount: Math.round(quantity * rate * 100) / 100,
      };
    });

    const subTotal =
      Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100;

    // 3. Robust Tax Handling (Handles NONE, CGST_SGST, IGST)
    const rawTaxType = body.tax?.type || body.taxType || "NONE";
    const taxType =
      rawTaxType === "NO_GST"
        ? "NONE"
        : rawTaxType === "GST_TN"
          ? "CGST_SGST"
          : rawTaxType;
    const isTaxExempt = taxType === "NONE";

    const taxPercent = isTaxExempt
      ? 0
      : Number(body.tax?.percent ?? body.taxPercent ?? 18);
    const taxAmount = isTaxExempt
      ? 0
      : Math.round(((subTotal * taxPercent) / 100) * 100) / 100;
    const totalAmount = Math.round((subTotal + taxAmount) * 100) / 100;

    // 4. Create document
    const invoice = await Invoice.create({
      userId,
      clientId: body.clientId,
      invoiceNumber:
        body.invoiceNumber ||
        `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: body.issueDate ? new Date(body.issueDate) : new Date(),
      dueDate: body.dueDate
        ? new Date(body.dueDate)
        : new Date(Date.now() + 15 * 86400000),
      items,
      subTotal,
      tax: {
        type: taxType,
        percent: taxPercent,
        amount: taxAmount,
      },
      totalAmount,
      paymentMode: body.paymentMode || "Bank Transfer / UPI",
      status: (body.status || "draft").toLowerCase(),
      notes: body.notes || "",
    });

    const populated = await Invoice.findById(invoice._id)
      .populate("clientId", "name companyName email phone gstNumber address")
      .lean();

    return NextResponse.json(
      { success: true, data: populated },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/invoices error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create invoice" },
      { status: 500 },
    );
  }
}
