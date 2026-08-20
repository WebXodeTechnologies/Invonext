import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import { createNotification } from "@/lib/createNotification";

export async function GET(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectDB();

    const invoice = await Invoice.findOne({ _id: id, userId })
      .populate("clientId", "name companyName email phone gstNumber address")
      .lean();

    if (!invoice) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: invoice }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const existing = await Invoice.findOne({ _id: id, userId });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 },
      );
    }

    if (body.items || body.tax || body.taxType) {
      const rawItems = body.items || existing.items || [];
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
        Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) /
        100;
      const rawTaxType =
        body.tax?.type || body.taxType || existing.tax?.type || "NONE";
      const taxType =
        rawTaxType === "NO_GST"
          ? "NONE"
          : rawTaxType === "GST_TN"
            ? "CGST_SGST"
            : rawTaxType;
      const isTaxExempt = taxType === "NONE";

      const taxPercent = isTaxExempt
        ? 0
        : Number(body.tax?.percent ?? existing.tax?.percent ?? 18);
      const taxAmount = isTaxExempt
        ? 0
        : Math.round(((subTotal * taxPercent) / 100) * 100) / 100;

      body.items = items;
      body.subTotal = subTotal;
      body.tax = {
        type: taxType,
        percent: taxPercent,
        amount: taxAmount,
      };
      body.totalAmount = Math.round((subTotal + taxAmount) * 100) / 100;
    }

    if (body.status) {
      body.status = body.status.toLowerCase();
    }

    const updated = await Invoice.findOneAndUpdate(
      { _id: id, userId },
      { $set: body },
      { new: true, runValidators: true },
    ).populate("clientId", "name companyName email phone gstNumber address");

    // Trigger notification if status was updated
    if (body.status && body.status !== existing.status) {
      await createNotification({
        userId,
        title: "Invoice Status Updated",
        message: `Invoice #${updated.invoiceNumber} status marked as ${body.status.toUpperCase()}.`,
        type: "invoice",
        link: `/dashboard/Invoices/${id}?mode=view`,
      });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(req, ctx) {
  return PATCH(req, ctx);
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Invoice.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 },
      );
    }

    await createNotification({
      userId,
      title: "Invoice Deleted",
      message: `Invoice #${deleted.invoiceNumber} was removed from records.`,
      type: "invoice",
      link: "/dashboard/Invoices",
    });

    return NextResponse.json(
      { success: true, message: "Invoice deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
