import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";

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

    let setting = await Setting.findOne({
      $or: [{ userId }, { clerkUserId: userId }],
    }).lean();

    if (!setting) {
      setting = {
        userId,
        clerkUserId: userId,
        invoicePrefix: "INV",
        nextInvoiceNumber: 1001,
        defaultPaymentTerms: "Net 15",
        defaultCurrency: "INR",
        defaultTaxRate: 18,
        enableEmailNotifications: true,
        autoOverdueReminders: true,
        reminderDaysBeforeDue: 3,
        attachPdfToEmail: true,
        defaultPlaceOfSupply: "Tamil Nadu (33)",
        hsnSacMandatory: true,
        showSignatureOnInvoice: true,
        defaultInvoiceNotes: "Thank you for partnering with us.",
        defaultTermsAndConditions:
          "Payment is strictly due within the stipulated terms.",
      };
    }

    return NextResponse.json({ success: true, data: setting }, { status: 200 });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch settings" },
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

    const body = await req.json();
    await connectDB();

    const updatedSetting = await Setting.findOneAndUpdate(
      { $or: [{ userId }, { clerkUserId: userId }] },
      {
        $set: {
          ...body,
          userId,
          clerkUserId: userId,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    return NextResponse.json(
      { success: true, data: updatedSetting },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save settings" },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  return POST(req);
}
