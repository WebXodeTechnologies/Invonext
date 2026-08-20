import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import Client from "@/models/Client";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();

    const [totalClients, totalInvoices, statusBreakdown, monthlyRevenue] = await Promise.all([
      Client.countDocuments({ userId }),
      Invoice.countDocuments({ userId }),
      Invoice.aggregate([
        { $match: { userId } },
        { $group: { _id: "$status", count: { $sum: 1 }, total: { $sum: "$totalAmount" } } },
      ]),
      Invoice.aggregate([
        { $match: { userId, status: "paid" } },
        { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$totalAmount" } } },
        { $sort: { "_id": 1 } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalClients,
          totalInvoices,
        },
        statusBreakdown,
        monthlyRevenue,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
