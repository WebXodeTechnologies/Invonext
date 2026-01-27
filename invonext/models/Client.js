import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

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
    website: { type: String, trim: true },

    gstNumber: {
      type: String,
      uppercase: true,
      index: true,
    },

    companyName: { type: String, trim: true },

    address: {
      fullAddress: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: {
        type: String,
      },
      country: { type: String, default: "India" },
    },
    profileImage: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Overdue", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

// Optional but smart
ClientSchema.index({ userId: 1, email: 1 });
ClientSchema.index({ userId: 1, email: 1 });

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
