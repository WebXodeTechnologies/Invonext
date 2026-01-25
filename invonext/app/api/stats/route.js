import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import Client from "@/models/Client";
import Task from "@/models/Task"; 

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();

    // Parallel Execution of all 6 Dashboard Functions
    const [stats, chartRaw, recentClients, clientCount, recentPayments, allTasks] = await Promise.all([
      // FUNCTION 2: Stats Cards
      Invoice.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$totalAmount", 0] } },
            pendingAmount: { $sum: { $cond: [{ $ne: ["$status", "paid"] }, "$totalAmount", 0] } },
            invoiceCount: { $sum: 1 },
          },
        },
      ]),

      // FUNCTION 3: Chart Data
      Invoice.aggregate([
        { $match: { userId, status: "paid" } }, 
        { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$totalAmount" } } },
        { $sort: { "_id": 1 } }, 
      ]),

      // FUNCTION 4: Recent Client List
      Client.find({ userId }).sort({ createdAt: -1 }).limit(4).select("name email status"),

      // Global Client Count
      Client.countDocuments({ userId }),

      // FUNCTION 5: Recent Payments
      Invoice.find({ userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("clientId", "name")
        .select("totalAmount status createdAt clientId paymentMode"),
      
      // FUNCTION 6: Task Overview (Added missing comma and lean for performance)
      Task.find({ userId }).sort({ createdAt: -1 }).lean()
    ]);

    // Format Chart
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedChart = chartRaw.map((item) => ({
      month: months[item._id - 1],
      total: item.total,
    }));

    const statsData = stats[0] || { totalRevenue: 0, pendingAmount: 0, invoiceCount: 0 };

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalRevenue: Math.round(statsData.totalRevenue),
          pendingAmount: Math.round(statsData.pendingAmount),
          totalInvoices: statsData.invoiceCount,
          totalClients: clientCount,
        },
        chart: formattedChart,
        recentClients: recentClients,
        recentPayments: recentPayments,
        tasks: allTasks, // Moved outside summary for better access
      },
    });
  } catch (error) {
    console.error("❌ Stats API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}