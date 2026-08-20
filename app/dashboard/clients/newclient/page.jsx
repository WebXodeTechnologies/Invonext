"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  UserPlus,
  Building2,
  Mail,
  Phone,
  FileText,
  MapPin,
  Upload,
  Loader2,
  CheckCircle,
  Building,
  Sparkles,
  Pencil,
  Eye,
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

function ClientFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("id");
  const modeParam = searchParams.get("mode") || "new";

  const [mode, setMode] = useState(modeParam);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(clientId));
  const [clientType, setClientType] = useState("domestic");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [sameShipping, setSameShipping] = useState(true);

  // Sync mode whenever URL search param changes
  useEffect(() => {
    setMode(searchParams.get("mode") || "new");
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: "",
    tradeName: "",
    contactPerson: "",
    email: "",
    accountsEmail: "",
    phone: "",
    website: "",

    gstNumber: "",
    panNumber: "",
    tanNumber: "",
    msmeNumber: "",
    vatId: "",
    lutNumber: "",
    currency: "INR",
    paymentTerms: "Net 30",

    bankName: "",
    accountNumber: "",
    ifscCode: "",
    swiftCode: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",

    shippingLine1: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "India",
    shippingPincode: "",

    notes: "",
  });

  const isReadOnly = mode === "view";

  useEffect(() => {
    if (!clientId) return;

    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${clientId}`);
        const result = await res.json();
        if (result.success && result.data) {
          const c = result.data;
          setFormData({
            name: c.name || "",
            tradeName: c.companyName || "",
            contactPerson: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
            email: c.email || "",
            accountsEmail: c.accountsEmail || "",
            phone: c.phone || "",
            website: c.website || "",

            gstNumber: c.gstNumber || "",
            panNumber: c.panNumber || "",
            tanNumber: c.tanNumber || "",
            msmeNumber: c.msmeNumber || "",
            vatId: c.vatId || "",
            lutNumber: c.lutNumber || "",
            currency: c.currency || "INR",
            paymentTerms: c.paymentTerms || "Net 30",

            bankName: c.bankName || "",
            accountNumber: c.accountNumber || "",
            ifscCode: c.ifscCode || "",
            swiftCode: c.swiftCode || "",

            addressLine1: c.address?.fullAddress || c.address?.street || "",
            addressLine2: c.address?.addressLine2 || "",
            city: c.address?.city || "",
            state: c.address?.state || "",
            country: c.address?.country || "India",
            pincode: c.address?.pincode || "",

            shippingLine1: c.address?.shipping?.street || "",
            shippingCity: c.address?.shipping?.city || "",
            shippingState: c.address?.shipping?.state || "",
            shippingCountry: c.address?.shipping?.country || "India",
            shippingPincode: c.address?.shipping?.pincode || "",

            notes: c.notes || "",
          });

          if (c.profileImage) {
            setImagePreview(c.profileImage);
          }

          if (c.country && c.country !== "India") {
            setClientType("international");
          }
        } else {
          toast.error(result.message || "Failed to load client record");
          router.push("/dashboard/clients");
        }
      } catch (err) {
        console.error("Fetch client error:", err);
        toast.error("Network error while retrieving client");
      } finally {
        setFetching(false);
      }
    };

    fetchClient();
  }, [clientId, router]);

  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (isReadOnly) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReadOnly) return;

    if (!formData.name || !formData.email) {
      toast.error("Client Name and Email Address are required");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("firstName", formData.name.split(" ")[0] || formData.name);
      payload.append(
        "lastName",
        formData.name.split(" ").slice(1).join(" ") || "Entity",
      );
      payload.append("companyName", formData.tradeName || formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("website", formData.website);
      payload.append("gstNumber", formData.gstNumber);
      payload.append("clientType", clientType);

      const addressObj = {
        fullAddress: `${formData.addressLine1} ${formData.addressLine2}`.trim(),
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        shipping: sameShipping
          ? {
              street:
                `${formData.addressLine1} ${formData.addressLine2}`.trim(),
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

      const url = mode === "edit" ? `/api/clients/${clientId}` : "/api/clients";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: payload,
      });

      const json = await res.json();
      if (json.success) {
        toast.success(
          mode === "edit"
            ? "Client record updated successfully! 🔄"
            : "Enterprise Client created successfully! 🎉",
        );
        router.push("/dashboard/clients");
      } else {
        toast.error(json.message || "Failed to save client details");
      }
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Something went wrong saving client");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold text-slate-500">
          Retrieving client record...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard/clients")}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition cursor-pointer shadow-xs"
        >
          <ArrowLeft size={16} />
          <span>Back to Clients</span>
        </button>

        <div className="flex items-center gap-2">
          {mode === "view" && (
            <button
              type="button"
              onClick={() => {
                setMode("edit");
                router.push(
                  `/dashboard/clients/newclient?id=${clientId}&mode=edit`,
                );
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200/80 transition active:scale-95 cursor-pointer"
            >
              <Pencil size={13} /> Edit Record
            </button>
          )}

          <span className="text-xs font-bold text-indigo-700 bg-indigo-50/90 px-3.5 py-1.5 rounded-full border border-indigo-100/90 flex items-center gap-1.5 shadow-xs">
            <Sparkles size={13} className="text-indigo-600" />
            {mode === "view"
              ? "Client Profile View"
              : mode === "edit"
                ? "Edit Mode"
                : "Onboarding Engine"}
          </span>
        </div>
      </div>

      {/* 2. Hero Header Overview Card */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl border border-indigo-100 shrink-0 shadow-xs">
              {mode === "view" ? (
                <Eye size={22} />
              ) : mode === "edit" ? (
                <Pencil size={22} />
              ) : (
                <UserPlus size={22} />
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {mode === "view"
                  ? formData.name || "Client Overview"
                  : mode === "edit"
                    ? `Edit: ${formData.name || "Client Details"}`
                    : "Add New Client"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {mode === "view"
                  ? "Verified entity data, billing address, and compliance identification."
                  : "Set up domestic GST billing or international cross-border invoicing details."}
              </p>
            </div>
          </div>

          {!isReadOnly && (
            <div className="flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs">
              <button
                type="button"
                onClick={() => {
                  setClientType("domestic");
                  setFormData((p) => ({
                    ...p,
                    country: "India",
                    currency: "INR",
                  }));
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  clientType === "domestic"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇮🇳 Domestic (GST)
              </button>
              <button
                type="button"
                onClick={() => {
                  setClientType("international");
                  setFormData((p) => ({
                    ...p,
                    country: "United States",
                    currency: "USD",
                  }));
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  clientType === "international"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🌐 International
              </button>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Business Identity & Contact */}
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 size={16} className="text-indigo-600" /> Business
            Identity & Contact
          </h2>

          <div className="flex items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400 shrink-0 shadow-xs">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building size={24} />
              )}
            </div>

            <div className="space-y-1">
              {!isReadOnly && (
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/80 cursor-pointer transition shadow-xs">
                  <Upload size={14} />
                  <span>Upload Entity Logo / Avatar</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-[11px] text-slate-400 font-medium">
                High resolution PNG, JPG, or WEBP (Max 2MB)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Legal Company Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isReadOnly}
                  placeholder={
                    clientType === "domestic"
                      ? "e.g. Acme Global Systems Ltd"
                      : "e.g. Stripe Inc."
                  }
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100 disabled:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Trade / Brand Display Name
              </label>
              <input
                type="text"
                name="tradeName"
                disabled={isReadOnly}
                placeholder="e.g. Acme Global"
                value={formData.tradeName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isReadOnly}
                  placeholder="e.g. billing@acmeglobal.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100 disabled:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  disabled={isReadOnly}
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100 disabled:text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Tax & Financial Compliance */}
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="flex items-center gap-2">
              <FileText size={16} className="text-indigo-600" /> Tax & Financial
              Compliance
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {clientType === "domestic"
                ? "GST & PAN Compliant"
                : "Export & LUT Compliant"}
            </span>
          </h2>

          {clientType === "domestic" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  GSTIN (15 Digits)
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  disabled={isReadOnly}
                  placeholder="e.g. 27AAAAA0000A1Z5"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Settlement Currency
                </label>
                <select
                  name="currency"
                  disabled={isReadOnly}
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.label} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Terms
                </label>
                <select
                  name="paymentTerms"
                  disabled={isReadOnly}
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
                >
                  {PAYMENT_TERMS.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  PAN Identifier
                </label>
                <input
                  type="text"
                  name="panNumber"
                  disabled={isReadOnly}
                  placeholder="e.g. ABCDE1234F"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono disabled:bg-slate-100"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  VAT / Tax ID (TIN/EIN)
                </label>
                <input
                  type="text"
                  name="vatId"
                  disabled={isReadOnly}
                  placeholder="e.g. US123456789"
                  value={formData.vatId}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Export LUT Number
                </label>
                <input
                  type="text"
                  name="lutNumber"
                  disabled={isReadOnly}
                  placeholder="e.g. AD270324000123"
                  value={formData.lutNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold uppercase text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Invoicing Currency
                </label>
                <select
                  name="currency"
                  disabled={isReadOnly}
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
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
        </div>

        {/* Section 3: Billing & Physical Address */}
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin size={16} className="text-indigo-600" /> Physical
            Jurisdiction & Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Street Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                disabled={isReadOnly}
                placeholder="e.g. Suite 402, Trade Tower"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Street Address Line 2 (Optional)
              </label>
              <input
                type="text"
                name="addressLine2"
                disabled={isReadOnly}
                placeholder="e.g. MG Road, Central District"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                disabled={isReadOnly}
                placeholder="e.g. Mumbai"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State / Region
              </label>
              <input
                type="text"
                name="state"
                disabled={isReadOnly}
                placeholder="e.g. Maharashtra"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Country
              </label>
              <select
                name="country"
                disabled={isReadOnly}
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Postal / PIN Code
              </label>
              <input
                type="text"
                name="pincode"
                disabled={isReadOnly}
                placeholder="e.g. 400001"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:bg-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/clients")}
            className="px-5 py-3 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200/80 transition cursor-pointer shadow-xs"
          >
            {isReadOnly ? "Close Profile" : "Cancel"}
          </button>

          {!isReadOnly && (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving
                  Profile...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>
                    {mode === "edit"
                      ? "Update Client Profile"
                      : "Save Client Profile"}
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ClientFormPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-xs font-bold text-slate-500">
            Loading client form...
          </p>
        </div>
      }
    >
      <ClientFormContent />
    </Suspense>
  );
}
