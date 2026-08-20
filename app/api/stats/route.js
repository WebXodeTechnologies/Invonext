import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import Client from "@/models/Client";
import Task from "@/models/Task";

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

    // Parallel aggregate/queries
    const [
      stats,
      chartRaw,
      recentClients,
      clientCount,
      recentPayments,
      allTasks,
    ] = await Promise.all([
      // 1. Stats Summary
      Invoice.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: {
                $cond: [{ $eq: ["$status", "paid"] }, "$totalAmount", 0],
              },
            },
            pendingAmount: {
              $sum: {
                $cond: [{ $ne: ["$status", "paid"] }, "$totalAmount", 0],
              },
            },
            invoiceCount: { $sum: 1 },
          },
        },
      ]),

      // 2. 6-Month Chart Data
      Invoice.aggregate([
        { $match: { userId, status: "paid" } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: "$totalAmount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // 3. Recent Clients (Selecting companyName & name)
      Client.find({ userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name companyName email gstNumber status createdAt")
        .lean(),

      // 4. Client Count
      Client.countDocuments({ userId }),

      // 5. Recent Payments with Populated Client details
      Invoice.find({ userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("clientId", "name companyName email")
        .select(
          "invoiceNumber totalAmount status createdAt clientId paymentMode",
        )
        .lean(),

      // 6. Tasks
      Task.find({ userId }).sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedChart = chartRaw.map((item) => ({
      month: months[item._id - 1] || `M${item._id}`,
      total: item.total || 0,
    }));

    const statsData = stats[0] || {
      totalRevenue: 0,
      pendingAmount: 0,
      invoiceCount: 0,
    };

    return NextResponse.json(
      {
        success: true,
        data: {
          summary: {
            totalRevenue: Math.round(statsData.totalRevenue || 0),
            pendingAmount: Math.round(statsData.pendingAmount || 0),
            totalInvoices: statsData.invoiceCount || 0,
            totalClients: clientCount || 0,
          },
          chart: formattedChart,
          recentClients,
          recentPayments,
          tasks: allTasks,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Stats API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
