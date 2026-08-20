import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import { createNotification } from "@/lib/createNotification";

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

    let profile = await Profile.findOne({
      $or: [{ userId }, { clerkUserId: userId }],
    }).lean();

    if (!profile) {
      const clerkUser = await currentUser();
      const primaryEmail =
        clerkUser?.emailAddresses?.find(
          (e) => e.id === clerkUser.primaryEmailAddressId,
        )?.emailAddress ||
        clerkUser?.emailAddresses?.[0]?.emailAddress ||
        "";

      const fullName =
        `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() ||
        clerkUser?.username ||
        "Akash";

      profile = {
        userId,
        clerkUserId: userId,
        ownerName: fullName,
        email: primaryEmail,
        logoUrl: clerkUser?.imageUrl || "",
        businessName: fullName,
        role: "Software Developer & Founder",
        currency: "INR",
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifscCode: "",
          upiId: "",
        },
        address: { street: "", city: "", state: "", pincode: "" },
      };
    }

    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch profile" },
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

    const updatedProfile = await Profile.findOneAndUpdate(
      { $or: [{ userId }, { clerkUserId: userId }] },
      {
        $set: {
          userId,
          clerkUserId: userId,
          ownerName: body.ownerName || "",
          role: body.role || "Software Developer",
          email: body.email || "",
          phone: body.phone || "",
          logoUrl: body.logoUrl || "",
          businessName: body.businessName || body.ownerName || "",
          tradeName: body.tradeName || "",
          gstNumber: body.gstNumber || "",
          panNumber: body.panNumber || "",
          msmeNumber: body.msmeNumber || "",
          currency: body.currency || "INR",
          bankDetails: {
            bankName: body.bankDetails?.bankName || "",
            accountNumber: body.bankDetails?.accountNumber || "",
            ifscCode: body.bankDetails?.ifscCode || "",
            upiId: body.bankDetails?.upiId || "",
          },
          address: {
            street: body.address?.street || "",
            city: body.address?.city || "",
            state: body.address?.state || "",
            pincode: body.address?.pincode || "",
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    // Trigger notification
    await createNotification({
      userId,
      title: "Organization Profile Updated",
      message:
        "Your business credentials, GST identifiers, and banking coordinates have been synchronized.",
      type: "profile",
      link: "/dashboard/profile",
    });

    return NextResponse.json(
      { success: true, data: updatedProfile },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/profile error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save profile" },
      { status: 500 },
    );
  }
}
