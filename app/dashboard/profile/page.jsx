"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Camera,
  Save,
  Loader2,
  Receipt,
  Landmark,
  MapPin,
  Sparkles,
  FileSignature,
  UploadCloud,
  Trash2,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal"); // "personal" | "business" | "banking"
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    role: "Software Developer & Founder",
    email: "",
    phone: "",
    logoUrl: "",
    signatureUrl: "",

    businessName: "",
    tradeName: "",
    gstNumber: "",
    panNumber: "",
    msmeNumber: "",
    currency: "INR",

    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",

    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setProfile({
            name: d.ownerName || d.name || "",
            role: d.role || "Software Developer & Founder",
            email: d.email || "",
            phone: d.phone || "",
            logoUrl: d.logoUrl || "",
            signatureUrl: d.signatureUrl || "",

            businessName: d.businessName || "",
            tradeName: d.tradeName || "",
            gstNumber: d.gstNumber || "",
            panNumber: d.panNumber || "",
            msmeNumber: d.msmeNumber || "",
            currency: d.currency || "INR",

            bankName: d.bankDetails?.bankName || "",
            accountNumber: d.bankDetails?.accountNumber || "",
            ifscCode: d.bankDetails?.ifscCode || "",
            upiId: d.bankDetails?.upiId || "",

            street: d.address?.street || "",
            city: d.address?.city || "",
            state: d.address?.state || "",
            pincode: d.address?.pincode || "",
          });

          if (d.logoUrl) setAvatarPreview(d.logoUrl);
          if (d.signatureUrl) setSignaturePreview(d.signatureUrl);
        }
      } catch (err) {
        console.error("Profile load error:", err);
        toast.error("Failed to load profile record");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleFileUpload = (e, field, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        toast.error("File size must be less than 2.5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setPreview(base64Data);
        setProfile((prev) => ({ ...prev, [field]: base64Data }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, val) => {
    setProfile((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!profile.name || !profile.email) {
      toast.error("Owner Legal Name and Email are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ownerName: profile.name,
        role: profile.role,
        email: profile.email,
        phone: profile.phone,
        logoUrl: profile.logoUrl || avatarPreview || "",
        signatureUrl: profile.signatureUrl || signaturePreview || "",
        businessName: profile.businessName || profile.name,
        tradeName: profile.tradeName,
        gstNumber: profile.gstNumber,
        panNumber: profile.panNumber,
        msmeNumber: profile.msmeNumber,
        currency: profile.currency,
        bankDetails: {
          bankName: profile.bankName,
          accountNumber: profile.accountNumber,
          ifscCode: profile.ifscCode,
          upiId: profile.upiId,
        },
        address: {
          street: profile.street,
          city: profile.city,
          state: profile.state,
          pincode: profile.pincode,
        },
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Profile & Signature committed successfully! 🎉");
      } else {
        toast.error(json.message || "Failed to commit profile updates");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white/95 border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold text-slate-500">
          Loading user profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Banner & Avatar Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-7 sm:p-9 border border-slate-200/80 shadow-xs">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-linear-to-br from-indigo-100/60 to-purple-50/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar / Logo Slot */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Company Logo or Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-3xl uppercase">
                  {profile.name ? profile.name.charAt(0) : "U"}
                </div>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 active:scale-90 p-2.5 rounded-2xl text-white cursor-pointer transition shadow-md shadow-indigo-200">
              <Camera size={16} />
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  handleFileUpload(e, "logoUrl", setAvatarPreview)
                }
                accept="image/*"
              />
            </label>
          </div>

          {/* User Bio Strip */}
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {profile.businessName || profile.name || "Business Account"}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100/80">
                <ShieldCheck size={13} /> Verified Organization
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              {profile.role}
            </p>
            <p className="text-xs text-slate-500 font-medium max-w-md">
              Manage your company identity, GST compliance parameters,
              settlement bank coordinates, and official signature.
            </p>
          </div>

          {/* Direct Save Action Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{saving ? "Saving..." : "Save Profile"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 w-fit text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === "personal"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <User size={14} /> Personal Identity
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("business")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === "business"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Receipt size={14} /> Business & GST
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("banking")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === "banking"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Landmark size={14} /> Banking & Signature
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Personal Identity */}
        {activeTab === "personal" && (
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 animate-in fade-in">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <User size={17} className="text-indigo-600" /> Account Owner
              Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileInput
                label="Full Legal Name *"
                icon={<User size={15} />}
                value={profile.name}
                onChange={(val) => handleInputChange("name", val)}
                placeholder="e.g. Akash S M"
              />
              <ProfileInput
                label="Professional Designation"
                icon={<Sparkles size={15} />}
                value={profile.role}
                onChange={(val) => handleInputChange("role", val)}
                placeholder="e.g. MERN Stack Developer & Founder"
              />
              <ProfileInput
                label="Email Address *"
                icon={<Mail size={15} />}
                value={profile.email}
                onChange={(val) => handleInputChange("email", val)}
                placeholder="e.g. akash@example.com"
                type="email"
              />
              <ProfileInput
                label="Phone Number"
                icon={<Phone size={15} />}
                value={profile.phone}
                onChange={(val) => handleInputChange("phone", val)}
                placeholder="e.g. +91 98765 43210"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Business & GST */}
        {activeTab === "business" && (
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 animate-in fade-in">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 size={17} className="text-indigo-600" /> Enterprise &
              Compliance Identifiers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileInput
                label="Legal Business Name"
                icon={<Building2 size={15} />}
                value={profile.businessName}
                onChange={(val) => handleInputChange("businessName", val)}
                placeholder="e.g. Webxode Technologies"
              />
              <ProfileInput
                label="Trade / Brand Name"
                icon={<Building2 size={15} />}
                value={profile.tradeName}
                onChange={(val) => handleInputChange("tradeName", val)}
                placeholder="e.g. Webxode"
              />
              <ProfileInput
                label="GSTIN Identifier"
                icon={<Receipt size={15} />}
                value={profile.gstNumber}
                onChange={(val) =>
                  handleInputChange("gstNumber", val.toUpperCase())
                }
                placeholder="e.g. 33AAAAA0000A1Z5"
              />
              <ProfileInput
                label="Permanent Account # (PAN)"
                icon={<Receipt size={15} />}
                value={profile.panNumber}
                onChange={(val) =>
                  handleInputChange("panNumber", val.toUpperCase())
                }
                placeholder="e.g. ABCDE1234F"
              />
              <ProfileInput
                label="Street Address"
                icon={<MapPin size={15} />}
                value={profile.street}
                onChange={(val) => handleInputChange("street", val)}
                placeholder="e.g. 402, Ring Road"
              />
              <ProfileInput
                label="City & State"
                icon={<MapPin size={15} />}
                value={profile.city}
                onChange={(val) => handleInputChange("city", val)}
                placeholder="e.g. Chennai, Tamil Nadu"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Banking & Digital Signature */}
        {activeTab === "banking" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Digital Signature Uploader */}
            <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <FileSignature size={17} className="text-indigo-600" />{" "}
                  Authorized Digital Signature (PNG)
                </h2>
                {signaturePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setSignaturePreview(null);
                      setProfile((prev) => ({ ...prev, signatureUrl: "" }));
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-48 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                  {signaturePreview ? (
                    <img
                      src={signaturePreview}
                      alt="Digital Signature"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400">
                      No Signature Loaded
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-xl cursor-pointer transition">
                    <UploadCloud size={15} /> Upload Transparent PNG Signature
                    <input
                      type="file"
                      className="hidden"
                      accept="image/png,image/webp"
                      onChange={(e) =>
                        handleFileUpload(e, "signatureUrl", setSignaturePreview)
                      }
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    Attach a transparent signature PNG. It will appear with an
                    automated date stamp across all generated tax invoices.
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Coordinates */}
            <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Landmark size={17} className="text-indigo-600" /> Settlement &
                UPI Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProfileInput
                  label="Bank Name"
                  icon={<Landmark size={15} />}
                  value={profile.bankName}
                  onChange={(val) => handleInputChange("bankName", val)}
                  placeholder="e.g. HDFC Bank"
                />
                <ProfileInput
                  label="Account Number"
                  icon={<Landmark size={15} />}
                  value={profile.accountNumber}
                  onChange={(val) => handleInputChange("accountNumber", val)}
                  placeholder="e.g. 50200012345678"
                />
                <ProfileInput
                  label="IFSC Code"
                  icon={<Landmark size={15} />}
                  value={profile.ifscCode}
                  onChange={(val) =>
                    handleInputChange("ifscCode", val.toUpperCase())
                  }
                  placeholder="e.g. HDFC0000123"
                />
                <ProfileInput
                  label="UPI ID / VPA"
                  icon={<Sparkles size={15} />}
                  value={profile.upiId}
                  onChange={(val) => handleInputChange("upiId", val)}
                  placeholder="e.g. akash@okhdfcbank"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function ProfileInput({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
