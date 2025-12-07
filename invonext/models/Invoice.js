import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  total: Number,
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  items: [ItemSchema],
  subtotal: Number,
  gstType: String,
  gstAmount: Number,
  totalAmount: Number
}, { timestamps: true });

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
