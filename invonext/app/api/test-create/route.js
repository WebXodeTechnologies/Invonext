import { connectDB } from "../../../lib/db";
import Client from "../../../models/Client.js";

export async function GET() {
  await connectDB();

  const test = await Client.create({
    name: "Test User",
    email: "test@example.com"
  });

  return Response.json(test);
}
