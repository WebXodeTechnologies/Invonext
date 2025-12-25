// app/api/user/route.js
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function GET(req) {
  try {
    await connectDB();

    const clerkUser = await currentUser(); // ✅ reads user from session automatically
    if (!clerkUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Check if user exists
    let user = await User.findOne({ clerkUserId: clerkUser.id });
    if (!user) {
      user = await User.create({
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName || "",
      });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    console.error("Error in /api/user:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
