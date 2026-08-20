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

export async function GET(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );

    const { id } = await params;
    await connectDB();

    const client = await Client.findOne({ _id: id, userId }).lean();
    if (!client)
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 },
      );

    return NextResponse.json({ success: true, data: client }, { status: 200 });
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
    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );

    const { id } = await params;
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let body = {};

    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await req.formData();
      const file = formData.get("file");

      // Optional image upload on edit
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
          body.profileImage = uploadResponse?.secure_url || "";
        } catch (uploadErr) {
          console.warn("⚠️ Cloudinary upload warning:", uploadErr.message);
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

    // Sync composite name if individual parts are changed
    if (body.firstName || body.lastName) {
      const existing = await Client.findOne({ _id: id, userId }).select(
        "firstName lastName",
      );
      if (existing) {
        const fn = body.firstName || existing.firstName;
        const ln = body.lastName || existing.lastName;
        body.name = `${fn} ${ln}`.trim();
      }
    }

    const updatedClient = await Client.findOneAndUpdate(
      { _id: id, userId },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updatedClient) {
      return NextResponse.json(
        { success: false, message: "Client record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedClient },
      { status: 200 },
    );
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
    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );

    const { id } = await params;
    await connectDB();

    const deletedClient = await Client.findOneAndDelete({ _id: id, userId });
    if (!deletedClient) {
      return NextResponse.json(
        { success: false, message: "Client record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Client removed from directory" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
