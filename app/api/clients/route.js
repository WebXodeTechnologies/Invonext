import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Client from "@/models/Client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const clients = await Client.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: clients }, { status: 200 });
  } catch (error) {
    console.error("GET /api/clients Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch clients" },
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
    const contentType = req.headers.get("content-type") || "";
    let body = {};
    let profileImageUrl = "";

    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await req.formData();
      const file = formData.get("file");

      // Optional Cloudinary Upload
      if (file && typeof file !== "string" && file.size > 0) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "invonxt_clients",
                  transformation: [{ width: 500, height: 500, crop: "limit" }],
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                },
              )
              .end(buffer);
          });
          profileImageUrl = uploadResponse?.secure_url || "";
        } catch (uploadErr) {
          console.warn("⚠️ Cloudinary Upload Warning:", uploadErr.message);
        }
      }

      formData.forEach((value, key) => {
        if (key !== "file") {
          if (key === "address") {
            try {
              body[key] = JSON.parse(value);
            } catch {
              body[key] = { fullAddress: value };
            }
          } else {
            body[key] = value;
          }
        }
      });
    } else {
      body = await req.json();
    }

    const email = (body.email || "").trim().toLowerCase();
    const gstNumber = (body.gstNumber || body.taxId || "").trim().toUpperCase();

    // Duplicate Check Scoped to User
    if (email || (gstNumber && gstNumber !== "N/A")) {
      const orConditions = [];
      if (email) orConditions.push({ email });
      if (gstNumber && gstNumber !== "N/A") orConditions.push({ gstNumber });

      if (orConditions.length > 0) {
        const existingClient = await Client.findOne({
          userId,
          $or: orConditions,
        });

        if (existingClient) {
          return NextResponse.json(
            {
              success: false,
              message: "A client with this Email or GST number already exists.",
            },
            { status: 400 },
          );
        }
      }
    }

    // Name & Schema Normalization
    const rawName = (body.name || body.companyName || "New Client").trim();
    const nameParts = rawName.split(" ");
    const firstName = (body.firstName || nameParts[0] || "Client").trim();
    const lastName = (
      body.lastName ||
      nameParts.slice(1).join(" ") ||
      "Entity"
    ).trim();
    const companyName = (body.companyName || rawName).trim();

    const clientDoc = await Client.create({
      userId,
      firstName,
      lastName,
      name: rawName,
      companyName,
      email,
      phone: (body.phone || body.contact || "").trim(),
      website: (body.website || "").trim(),
      gstNumber,
      profileImage: profileImageUrl || body.profileImage || "",
      address: {
        fullAddress: body.address?.fullAddress || body.addressLine1 || "",
        city: body.address?.city || body.city || "",
        state: body.address?.state || body.state || "",
        pincode: body.address?.pincode || body.pincode || "",
        country: body.address?.country || body.country || "India",
      },
      status: body.status || "Pending",
    });

    return NextResponse.json(
      { success: true, data: clientDoc },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/clients Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create client entity",
      },
      { status: 500 },
    );
  }
}
