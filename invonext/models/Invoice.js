import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],

    subTotal: {
      type: Number,
      required: true,
    },
    
    tax: {
      type: {
        type: String,
        enum: ["NONE", "CGST_SGST", "IGST"],
        default: "CGST_SGST",
      },
      percent: Number,
      amount: Number,
    },
    
    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "sent", "paid", "overdue"],
      default: "draft",
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
