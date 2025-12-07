import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ status: "connected" });
  } catch (error) {
    return Response.json({ status: "error", message: error.message });
  }
}