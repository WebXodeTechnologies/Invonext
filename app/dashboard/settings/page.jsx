"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Bell,
  Receipt,
  FileText,
  Save,
  Loader2,
  CheckCircle2,
  ShieldAlert,
  Percent,
  Calendar,
  Hash,
  Globe,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const CURRENCIES = [
  { code: "INR", label: "Indian Rupee (₹)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "British Pound (£)" },
  { code: "AED", label: "UAE Dirham (AED)" },
  { code: "SGD", label: "Singapore Dollar (S$)" },
];

const PAYMENT_TERMS = [
  "Due on Receipt",
  "Net 7",
  "Net 15",
  "Net 30",
  "Net 45",
  "Net 60",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("invoicing"); // "invoicing" | "automation" | "templates"
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    invoicePrefix: "INV",
    nextInvoiceNumber: 1001,
    defaultPaymentTerms: "Net 15",
    defaultCurrency: "INR",
    defaultTaxRate: 18,
    enableEmailNotifications: true,
    autoOverdueReminders: true,
    reminderDaysBeforeDue: 3,
    attachPdfToEmail: true,
    defaultPlaceOfSupply: "Tamil Nadu (33)",
    hsnSacMandatory: true,
    showSignatureOnInvoice: true,
    defaultInvoiceNotes: "Thank you for your business!",
    defaultTermsAndConditions: "Payment is due within 15 days of invoice date.",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.data) {
          setSettings((prev) => ({ ...prev, ...json.data }));
        }
      } catch (err) {
        console.error("Settings load error:", err);
        toast.error("Failed to load settings preferences");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleInputChange = (field, val) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = await res.json();

      if (json.success) {
        toast.success("System configurations updated! 🎉");
      } else {
        toast.error(json.message || "Failed to commit settings updates");
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
          Loading system parameters...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-7 sm:p-9 text-slate-900 shadow-xs border border-slate-200/80">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-indigo-100/60 to-purple-50/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 w-60 h-60 bg-gradient-to-tr from-blue-50/50 to-emerald-50/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100/80 shadow-xs">
                <Sliders size={13} className="text-indigo-600" /> Global
                Preferences
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                Workspace Scope
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Settings & Invoicing Rules
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Configure billing defaults, automated follow-up triggers, and
              standard contract templates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{saving ? "Saving..." : "Save Preferences"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 w-fit text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("invoicing")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === "invoicing"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Receipt size={14} /> Invoicing & Tax Defaults
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("automation")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === "automation"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bell size={14} /> Reminders & Delivery
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("templates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === "templates"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText size={14} /> Note & Clause Templates
        </button>
      </div>

      {/* Form Panels */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Invoicing & Tax Defaults */}
        {activeTab === "invoicing" && (
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Receipt size={17} className="text-indigo-600" /> Invoice Sequence
              & Tax Numbering
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Invoice Number Prefix
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500 font-mono text-xs font-black">
                    #
                  </span>
                  <input
                    type="text"
                    value={settings.invoicePrefix}
                    onChange={(e) =>
                      handleInputChange(
                        "invoicePrefix",
                        e.target.value.toUpperCase(),
                      )
                    }
                    placeholder="INV"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-mono font-bold uppercase text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Next Starting Sequence #
                </label>
                <div className="relative">
                  <Hash
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    value={settings.nextInvoiceNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "nextInvoiceNumber",
                        Number(e.target.value),
                      )
                    }
                    placeholder="1001"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Default Payment Terms
                </label>
                <div className="relative">
                  <Calendar
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={settings.defaultPaymentTerms}
                    onChange={(e) =>
                      handleInputChange("defaultPaymentTerms", e.target.value)
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
                  >
                    {PAYMENT_TERMS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Default Billing Currency
                </label>
                <div className="relative">
                  <Globe
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={settings.defaultCurrency}
                    onChange={(e) =>
                      handleInputChange("defaultCurrency", e.target.value)
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Standard GST Tax Bracket (%)
                </label>
                <div className="relative">
                  <Percent
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={settings.defaultTaxRate}
                    onChange={(e) =>
                      handleInputChange(
                        "defaultTaxRate",
                        Number(e.target.value),
                      )
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value={18}>18% (Standard GST)</option>
                    <option value={12}>12% (Reduced Rate)</option>
                    <option value={5}>5% (Concessional)</option>
                    <option value={28}>28% (Luxury Tier)</option>
                    <option value={0}>0% (Exempt / Nil-Rated)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Default Place of Supply
                </label>
                <input
                  type="text"
                  value={settings.defaultPlaceOfSupply}
                  onChange={(e) =>
                    handleInputChange("defaultPlaceOfSupply", e.target.value)
                  }
                  placeholder="Tamil Nadu (33)"
                  className="w-full p-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reminders & Delivery Automation */}
        {activeTab === "automation" && (
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Bell size={17} className="text-indigo-600" /> Automated Delivery
              & Reminder Triggers
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 transition cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    Automatic Settlement Reminders
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Trigger payment alerts before and on the scheduled invoice
                    due date.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoOverdueReminders}
                  onChange={(e) =>
                    handleInputChange("autoOverdueReminders", e.target.checked)
                  }
                  className="w-4 h-4 text-indigo-600 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 transition cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    Attach PDF to Client Email
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Automatically generate and attach a printable tax invoice
                    PDF upon sending.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.attachPdfToEmail}
                  onChange={(e) =>
                    handleInputChange("attachPdfToEmail", e.target.checked)
                  }
                  className="w-4 h-4 text-indigo-600 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 transition cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    Enforce Mandatory HSN/SAC Codes
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Block draft finalization if item lines lack a GST tariff
                    identification code.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.hsnSacMandatory}
                  onChange={(e) =>
                    handleInputChange("hsnSacMandatory", e.target.checked)
                  }
                  className="w-4 h-4 text-indigo-600 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 3: Note & Clause Templates */}
        {activeTab === "templates" && (
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText size={17} className="text-indigo-600" /> Default Memo &
              Legal Terms
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Default Invoice Memo / Thank You Note
                </label>
                <textarea
                  rows={3}
                  value={settings.defaultInvoiceNotes}
                  onChange={(e) =>
                    handleInputChange("defaultInvoiceNotes", e.target.value)
                  }
                  placeholder="Thank you for partnering with us..."
                  className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Standard Contractual Terms & Payment Instructions
                </label>
                <textarea
                  rows={4}
                  value={settings.defaultTermsAndConditions}
                  onChange={(e) =>
                    handleInputChange(
                      "defaultTermsAndConditions",
                      e.target.value,
                    )
                  }
                  placeholder="Payment is strictly due within 15 days of invoice date..."
                  className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
