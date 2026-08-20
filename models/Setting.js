import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Setting;
}

const SettingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    clerkUserId: { type: String, index: true },

    // Invoicing Defaults
    invoicePrefix: { type: String, default: "INV" },
    nextInvoiceNumber: { type: Number, default: 1001 },
    defaultPaymentTerms: { type: String, default: "Net 15" },
    defaultCurrency: { type: String, default: "INR" },
    defaultTaxRate: { type: Number, default: 18 },

    // Notifications & Automation
    enableEmailNotifications: { type: Boolean, default: true },
    autoOverdueReminders: { type: Boolean, default: true },
    reminderDaysBeforeDue: { type: Number, default: 3 },
    attachPdfToEmail: { type: Boolean, default: true },

    // Compliance & Localization
    defaultPlaceOfSupply: { type: String, default: "Tamil Nadu (33)" },
    hsnSacMandatory: { type: Boolean, default: true },
    showSignatureOnInvoice: { type: Boolean, default: true },

    // Default Note Templates
    defaultInvoiceNotes: {
      type: String,
      default:
        "Thank you for partnering with us. Prompt settlement is appreciated.",
    },
    defaultTermsAndConditions: {
      type: String,
      default:
        "Payment is strictly due within the stipulated days of invoice issuance.",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);
