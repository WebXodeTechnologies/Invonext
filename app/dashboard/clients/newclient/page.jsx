"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  UserPlus,
  Building2,
  Mail,
  Phone,
  Globe,
  FileText,
  MapPin,
  Upload,
  Loader2,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  Building,
  Coins,
  Briefcase,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee (INR)" },
  { code: "USD", symbol: "$", label: "US Dollar (USD)" },
  { code: "EUR", symbol: "€", label: "Euro (EUR)" },
  { code: "GBP", symbol: "£", label: "British Pound (GBP)" },
  { code: "AED", symbol: "AED", label: "UAE Dirham (AED)" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar (SGD)" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar (AUD)" },
];

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "Canada",
  "Australia",
  "France",
  "Japan",
  "Other International",
];

const PAYMENT_TERMS = [
  "Due on Receipt",
  "Net 7",
  "Net 15",
  "Net 30",
  "Net 45",
  "Net 60",
];

export default function AddNewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clientType, setClientType] = useState("domestic"); // "domestic" | "international"
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [sameShipping, setSameShipping] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    tradeName: "",
    contactPerson: "",
    email: "",
    accountsEmail: "",
    phone: "",
    website: "",
    
    // Tax Credentials
    gstNumber: "",
    panNumber: "",
    tanNumber: "",
    msmeNumber: "",
    vatId: "",
    lutNumber: "",
    currency: "INR",
    paymentTerms: "Net 30",
    
    // Banking Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    swiftCode: "",
    
    // Billing Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    
    // Shipping Address
    shippingLine1: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "India",
    shippingPincode: "",
    
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Client Name and Email Address are required");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("firstName", formData.name.split(" ")[0] || formData.name);
      payload.append("lastName", formData.name.split(" ").slice(1).join(" ") || "");
      payload.append("companyName", formData.tradeName || formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("website", formData.website);
      payload.append("gstNumber", formData.gstNumber);
      payload.append("clientType", clientType);

      const addressObj = {
        street: `${formData.addressLine1} ${formData.addressLine2}`.trim(),
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        shipping: sameShipping
          ? {
              street: `${formData.addressLine1} ${formData.addressLine2}`.trim(),
              city: formData.city,
              state: formData.state,
              country: formData.country,
              pincode: formData.pincode,
            }
          : {
              street: formData.shippingLine1,
              city: formData.shippingCity,
              state: formData.shippingState,
              country: formData.shippingCountry,
              pincode: formData.shippingPincode,
            },
      };

      payload.append("address", JSON.stringify(addressObj));

      if (file) {
        payload.append("file", file);
      }

      const res = await fetch("/api/clients", {
        method: "POST",
        body: payload,
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Enterprise Client created successfully! 🎉");
        router.push("/dashboard/clients");
      } else {
        toast.error(json.message || "Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error);
      toast.error("Something went wrong saving client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/clients")}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
        >
          <ArrowLeft size={16} />
          <span>Back to Clients</span>
        </button>

        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100 flex items-center gap-1.5">
          <Sparkles size={13} className="text-indigo-600" /> Enterprise Onboarding Engine
        </span>
      </div>

      {/* 2. Hero Header Box */}
      <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl border border-indigo-100 shrink-0">
              <UserPlus size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Add New Client
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Set up domestic GST billing or international cross-border invoicing details.
              </p>
            </div>
          </div>

          {/* Domestic vs International Toggle Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60 text-xs">
            <button
              type="button"
              onClick={() => {
                setClientType("domestic");
                setFormData((p) => ({ ...p, country: "India", currency: "INR" }));
              }}
              className={`px-4 py-2 rounded-xl font-semibold transition cursor-pointer ${
                clientType === "domestic"
                  ? "bg-white text-indigo-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🇮🇳 Domestic (India GST)
            </button>
            <button
              type="button"
              onClick={() => {
                setClientType("international");
                setFormData((p) => ({ ...p, country: "United States", currency: "USD" }));
              }}
              className={`px-4 py-2 rounded-xl font-semibold transition cursor-pointer ${
                clientType === "international"
                  ? "bg-white text-indigo-700 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🌐 International (Export)
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 3. Section 1: Business Identity & Contact Info */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 size={16} className="text-indigo-600" /> Business Identity & Contact
          </h2>

          {/* Logo Upload Box */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400 shrink-0 shadow-2xs">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Building size={24} />
              )}
            </div>

            <div className="space-y-1">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 cursor-pointer transition shadow-2xs">
                <Upload size={14} />
                <span>Upload Company Logo / Avatar</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              <p className="text-[11px] text-slate-400 font-medium">
                High resolution PNG, JPG or WEBP (Max 2MB)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Legal Company Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={clientType === "domestic" ? "e.g. Acme Global Systems Ltd" : "e.g. Stripe Inc."}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Trade Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Trade / Brand Display Name
              </label>
              <input
                type="text"
                name="tradeName"
                placeholder="e.g. Acme Global"
                value={formData.tradeName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                placeholder="e.g. Rahul Sharma / Accounts Mgr"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Primary Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. billing@acmeglobal.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Accounts / Billing Email CC */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Accounts / Invoicing Email (CC)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="email"
                  name="accountsEmail"
                  placeholder="e.g. finance@acmeglobal.com"
                  value={formData.accountsEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Section 2: Compliance & Tax Identifier */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="flex items-center gap-2">
              <FileText size={16} className="text-indigo-600" /> Tax & Financial Compliance
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {clientType === "domestic" ? "GST & PAN Compliant" : "Export & VAT Compliant"}
            </span>
          </h2>

          {clientType === "domestic" ? (
            /* Domestic India GST Credentials */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GSTIN (15 Digits)
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  placeholder="e.g. 27AAAAA0000A1Z5"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  PAN Number (10 Digits)
                </label>
                <input
                  type="text"
                  name="panNumber"
                  placeholder="e.g. ABCDE1234F"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  TAN Number (TDS Category)
                </label>
                <input
                  type="text"
                  name="tanNumber"
                  placeholder="e.g. MUMA12345B"
                  value={formData.tanNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  MSME / Udyam Reg. No.
                </label>
                <input
                  type="text"
                  name="msmeNumber"
                  placeholder="e.g. UDYAM-MH-00-00000"
                  value={formData.msmeNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>
          ) : (
            /* International VAT / TIN Credentials */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  VAT ID / Tax Reg Number (TIN/EIN)
                </label>
                <input
                  type="text"
                  name="vatId"
                  placeholder="e.g. US123456789 / GB999999999"
                  value={formData.vatId}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Export LUT Number (Zero GST)
                </label>
                <input
                  type="text"
                  name="lutNumber"
                  placeholder="e.g. AD270324000123"
                  value={formData.lutNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Invoicing Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.label} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Payment Terms & Default Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Payment Terms
              </label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              >
                {PAYMENT_TERMS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Settlement Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 5. Section 3: Billing & Shipping Addresses */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin size={16} className="text-indigo-600" /> Billing Address
            </h2>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={sameShipping}
                onChange={(e) => setSameShipping(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Shipping address is same as billing address</span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="e.g. Suite 402, Trade Tower"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="e.g. MG Road, Fort District"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State / Region
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="e.g. Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal / PIN / ZIP
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="e.g. 400001"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6. Section 4: Bank Account & Settlement Details */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard size={16} className="text-indigo-600" /> Settlement & Banking Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                placeholder="e.g. HDFC Bank / Chase"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Account Number / IBAN
              </label>
              <input
                type="text"
                name="accountNumber"
                placeholder="e.g. 501000000000"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                IFSC Code (Domestic)
              </label>
              <input
                type="text"
                name="ifscCode"
                placeholder="e.g. HDFC0001234"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SWIFT / BIC Code (Intl)
              </label>
              <input
                type="text"
                name="swiftCode"
                placeholder="e.g. HDFCINBBXXX"
                value={formData.swiftCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* 7. Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/clients")}
            className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-2xl border border-slate-200/80 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-200 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving Client Profile...
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                <span>Save Client Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
