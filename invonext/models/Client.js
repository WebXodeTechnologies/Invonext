import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      match: /^[6-9]\d{9}$/,
    },

    gstNumber: {
      type: String,
      uppercase: true,
      index: true,
    },

    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: {
        type: String,
        required: true,
        match: /^\d{6}$/,
      },
      country: { type: String, default: "India" },
    },
  },
  { timestamps: true }
);

// Optional but smart
ClientSchema.index({ userId: 1, email: 1 });

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);
