import mongoose from "mongoose";

// Delete cached model in development to avoid stale schema validation
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Profile;
}

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    clerkUserId: { type: String, index: true },
    ownerName: { type: String, default: "", trim: true },
    role: { type: String, default: "Software Developer & Founder", trim: true },
    email: { type: String, default: "", lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
    logoUrl: { type: String, default: "" },

    businessName: { type: String, default: "", trim: true },
    tradeName: { type: String, default: "", trim: true },
    gstNumber: { type: String, default: "", uppercase: true, trim: true },
    panNumber: { type: String, default: "", uppercase: true, trim: true },
    msmeNumber: { type: String, default: "", uppercase: true, trim: true },
    currency: { type: String, default: "INR" },

    bankDetails: {
      bankName: { type: String, default: "" },
      accountNumber: { type: String, default: "" },
      ifscCode: { type: String, default: "", uppercase: true },
      upiId: { type: String, default: "" },
    },

    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
