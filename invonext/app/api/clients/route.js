import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Client from "@/models/Client";
import { v2 as cloudinary } from "cloudinary";

// 1. Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await req.formData();
    
    // 2. Extract Data & Image File
    const file = data.get("file");
    const email = data.get("email");
    const gstNumber = data.get("gstNumber");
    let profileImageUrl = "";

    // 3. Duplicate Check (Scoped to current user)
    const existingClient = await Client.findOne({ 
      userId, 
      $or: [{ email }, { gstNumber: gstNumber || "N/A" }] 
    });

    if (existingClient && gstNumber && gstNumber !== "") {
      return NextResponse.json(
        { success: false, message: "Client with this Email or GST already exists" },
        { status: 400 }
      );
    }

    // 4. Handle Cloudinary Upload if file exists
    if (file && file !== "null" && typeof file !== "string") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: "mern_crm_clients",
            transformation: [{ width: 500, height: 500, crop: "limit" }] 
          }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      profileImageUrl = uploadResponse.secure_url;
    }

    // 5. Prepare and Save Client Data
    const addressStr = data.get("address");
    const clientData = {
      userId,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      name: data.get("name") || `${data.get("firstName")} ${data.get("lastName")}`,
      email,
      phone: data.get("phone"),
      website: data.get("website"),
      gstNumber,
      companyName: data.get("companyName"),
      address: addressStr ? JSON.parse(addressStr) : {},
      profileImage: profileImageUrl,
    };

    const client = await Client.create(clientData);

    return NextResponse.json({ success: true, data: client }, { status: 201 });

  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    // Fetch only clients created by this specific user
    const clients = await Client.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}