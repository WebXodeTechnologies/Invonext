import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  gstin: String
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
