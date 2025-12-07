import { connectDB } from "@/lib/db";
import Client from "@/models/Client";

export async function GET() {
  await connectDB();
  const clients = await Client.find();
  return Response.json(clients);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newClient = await Client.create(data);
  return Response.json(newClient);
}
