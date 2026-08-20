import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const invoices = await Invoice.find({ userId }).populate("clientId", "name email companyName").sort({ createdAt: -1 });

    // Generate CSV data
    const headers = "Invoice Number,Client Name,Client Email,Issue Date,Due Date,Subtotal,Tax,Total Amount,Status\n";
    const rows = invoices.map(inv => {
      const clientName = inv.clientId?.name || "N/A";
      const clientEmail = inv.clientId?.email || "N/A";
      const issueStr = inv.issueDate ? new Date(inv.issueDate).toISOString().split('T')[0] : "";
      const dueStr = inv.dueDate ? new Date(inv.dueDate).toISOString().split('T')[0] : "";
      return `"${inv.invoiceNumber}","${clientName}","${clientEmail}","${issueStr}","${dueStr}",${inv.subTotal},${inv.tax?.amount || 0},${inv.totalAmount},"${inv.status}"`;
    }).join("\n");

    const csvContent = headers + rows;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=invoices_export_${Date.now()}.csv`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
