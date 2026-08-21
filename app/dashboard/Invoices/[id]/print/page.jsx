"use client";

import React, { useEffect, useState, use } from "react";
import {
  Printer,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function formatAddress(address) {
  if (!address) return "";
  if (typeof address === "string") return address;
  return [
    address.fullAddress || address.street,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function PrintInvoicePage({ params }) {
  const resolvedParams = use(params);
  const invoiceId = resolvedParams.id;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active theme state (defaults to purple_corporate)
  const initialTheme = searchParams.get("template") || "purple_corporate";
  const [theme, setTheme] = useState(initialTheme);

  const [invoice, setInvoice] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [invRes, profRes] = await Promise.all([
          fetch(`/api/invoices/${invoiceId}`),
          fetch("/api/profile"),
        ]);
        const [invJson, profJson] = await Promise.all([
          invRes.json(),
          profRes.json(),
        ]);

        if (invJson.success) setInvoice(invJson.data);
        if (profJson.success) setProfile(profJson.data);
      } catch (err) {
        console.error("Print load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [invoiceId]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    router.replace(
      `/dashboard/Invoices/${invoiceId}/print?template=${newTheme}`,
      {
        scroll: false,
      },
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs font-bold">
        Compiling invoice document...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <p className="text-sm font-bold text-slate-700">Invoice not found</p>
        <Link
          href="/dashboard/Invoices"
          className="text-xs text-indigo-600 font-bold underline"
        >
          Return to Invoices
        </Link>
      </div>
    );
  }

  const client = invoice.clientId || {};
  const isCgstSgst =
    invoice.tax?.type === "CGST_SGST" || invoice.tax?.type === "GST_TN";
  const taxRate = Number(invoice.tax?.percent || 18);
  const taxAmount = Number(invoice.tax?.amount || 0);

  const formattedClientAddress = formatAddress(client.address);
  const formattedProfileAddress = formatAddress(profile?.address);
  const printDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Dynamic Theme Preset Configs
  const getThemeStyles = () => {
    switch (theme) {
      case "green_minimalist":
        return {
          wrapper: "border-2 border-emerald-600/40 rounded-3xl shadow-sm",
          headerBg:
            "bg-emerald-50/70 border-b-2 border-emerald-600 p-7 rounded-2xl",
          accentColor: "text-emerald-700",
          accentBg: "bg-emerald-600",
          badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
          tableHead:
            "border-b-2 border-emerald-600 bg-emerald-100/60 text-emerald-950 font-black",
          totalBox: "border-t-2 border-emerald-600 text-emerald-900",
          bankCard: "border border-emerald-200 bg-emerald-50/40",
        };
      case "blue_bordered":
        return {
          wrapper:
            "border-4 border-double border-sky-400 rounded-2xl shadow-none p-10",
          headerBg: "bg-sky-50 border-b-2 border-sky-300 p-6 rounded-xl",
          accentColor: "text-sky-700",
          accentBg: "bg-sky-600",
          badge: "bg-sky-100 text-sky-800 border-sky-300",
          tableHead:
            "border-b-2 border-sky-400 bg-sky-100/70 text-sky-950 font-black",
          totalBox: "border-t-2 border-sky-400 text-sky-950",
          bankCard: "border border-sky-200 bg-sky-50/40",
        };
      case "purple_corporate":
      default:
        return {
          wrapper: "border-2 border-purple-200/80 rounded-3xl shadow-xl",
          headerBg:
            "bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white p-8 rounded-2xl shadow-md",
          accentColor: "text-purple-700",
          accentBg: "bg-purple-600",
          badge: "bg-purple-50 text-purple-700 border-purple-200",
          tableHead:
            "border-b-2 border-purple-600 bg-purple-50 text-purple-950 font-black",
          totalBox: "border-t-2 border-purple-600 text-purple-950",
          bankCard: "border border-purple-200 bg-purple-50/30",
        };
    }
  };

  const currentTheme = getThemeStyles();

  return (
    <div className="min-h-screen bg-slate-100/80 p-4 sm:p-8 print:p-0 print:bg-white text-slate-900 antialiased font-sans">
      {/* Print CSS Rules for Margin & Color Adjust */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `,
        }}
      />

      {/* Floating Action & Theme Switcher Bar (Hidden during print) */}
      <div className="max-w-[210mm] mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <Link
          href={`/dashboard/Invoices/${invoiceId}?mode=view`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-2xs transition"
        >
          <ArrowLeft size={15} /> Back to Invoice
        </Link>

        {/* Live Template Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
          <button
            type="button"
            onClick={() => handleThemeChange("purple_corporate")}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              theme === "purple_corporate"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Purple Corporate
          </button>
          <button
            type="button"
            onClick={() => handleThemeChange("green_minimalist")}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              theme === "green_minimalist"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Emerald Clean
          </button>
          <button
            type="button"
            onClick={() => handleThemeChange("blue_bordered")}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              theme === "blue_bordered"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sky Bordered
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-2xl shadow-md shadow-indigo-200 transition cursor-pointer"
        >
          <Printer size={15} /> Print / Save as PDF
        </button>
      </div>

      {/* ================= A4 INVOICE CONTAINER ================= */}
      <div
        className={`max-w-[210mm] mx-auto bg-white p-8 sm:p-12 print:border-none print:shadow-none print:p-6 print:max-w-none print:rounded-none ${currentTheme.wrapper}`}
      >
        {/* Header Block */}
        <div
          className={`flex items-start justify-between gap-6 ${
            theme === "purple_corporate"
              ? currentTheme.headerBg
              : `${currentTheme.headerBg} border-b pb-6`
          }`}
        >
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-3">
              {profile?.logoUrl ? (
                <img
                  src={profile.logoUrl}
                  alt="Company Logo"
                  className="w-12 h-12 object-contain rounded-xl bg-white p-1 shadow-2xs border border-slate-100"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md ${currentTheme.accentBg}`}
                >
                  {(profile?.businessName || profile?.ownerName || "W").charAt(
                    0,
                  )}
                </div>
              )}
              <div>
                <h1
                  className={`text-xl font-black leading-tight ${
                    theme === "purple_corporate"
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {profile?.businessName ||
                    profile?.ownerName ||
                    "Webxode Technologies"}
                </h1>
                {profile?.tradeName && (
                  <p
                    className={`text-[11px] font-bold ${
                      theme === "purple_corporate"
                        ? "text-purple-200"
                        : "text-slate-900"
                    }`}
                  >
                    {profile.tradeName}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`text-[11px] font-medium space-y-0.5 pt-1 ${
                theme === "purple_corporate"
                  ? "text-slate-300"
                  : "text-slate-900"
              }`}
            >
              {formattedProfileAddress && <p>{formattedProfileAddress}</p>}
              <p>
                GSTIN:{" "}
                <span className="font-mono font-bold">
                  {profile?.gstNumber || "33BBEPA2626Q1ZQ"}
                </span>
              </p>
              <p>Email: {profile?.email || "mail2meak22frcrio@gmail.com"}</p>
              {profile?.phone && <p>Phone: {profile.phone}</p>}
            </div>
          </div>

          <div className="text-right space-y-2">
            <span
              className={`inline-block px-3 py-1 font-black text-xs uppercase tracking-widest rounded-lg border ${currentTheme.badge}`}
            >
              Tax Invoice
            </span>
            <div className="pt-1">
              <p
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  theme === "purple_corporate"
                    ? "text-purple-200"
                    : "text-slate-900"
                }`}
              >
                Invoice Number
              </p>
              <p
                className={`text-lg font-mono font-black ${
                  theme === "purple_corporate"
                    ? "text-white"
                    : currentTheme.accentColor
                }`}
              >
                {invoice.invoiceNumber}
              </p>
            </div>
            <div
              className={`text-[11px] font-medium space-y-0.5 ${
                theme === "purple_corporate"
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              <p>
                <span className="opacity-70 font-bold">Issue Date: </span>
                {new Date(
                  invoice.issueDate || invoice.createdAt,
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="opacity-70 font-bold">Due Date: </span>
                {new Date(invoice.dueDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Client & Billing Info */}
        <div className="grid grid-cols-2 gap-8 py-6 border-b border-slate-200/80">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider block">
              Billed To (Client Entity)
            </span>
            <h2 className="text-sm font-black text-slate-900">
              {client.companyName || client.name || "Client Entity"}
            </h2>
            <div className="text-[11px] text-slate-900 font-medium space-y-0.5">
              {formattedClientAddress && <p>{formattedClientAddress}</p>}
              <p className="font-semibold text-slate-900 pt-0.5">
                GSTIN:{" "}
                <span className="font-mono">
                  {client.gstNumber || "Unregistered Buyer"}
                </span>
              </p>
              {client.email && <p>Email: {client.email}</p>}
              {client.phone && <p>Phone: {client.phone}</p>}
            </div>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider block">
              Place of Supply & Settlement
            </span>
            <p className="text-xs font-bold text-slate-900">
              {profile?.address?.state || "Tamil Nadu"} (Intrastate/Domestic)
            </p>
            <div className="pt-2">
              <span
                className={`inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md border ${
                  invoice.status === "paid"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                Payment: {(invoice.status || "draft").toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized Line Table */}
        <div className="py-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`text-[10px] uppercase tracking-wider ${currentTheme.tableHead}`}
              >
                <th className="p-3 w-8">#</th>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-right w-16">Qty</th>
                <th className="p-3 text-right w-24">Rate (₹)</th>
                <th className="p-3 text-right w-28">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {(invoice.items || []).map((item, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : ""}>
                  <td className="p-3 text-slate-900 font-mono">{idx + 1}</td>
                  <td className="p-3 text-slate-900 font-bold">
                    {item.description}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-900">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-900">
                    {Number(item.rate).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    {Number(item.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Calculation & Bank Section */}
        <div className="grid grid-cols-2 gap-8 border-t border-slate-200/80 pt-6">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider block">
              Settlement & Bank Details
            </span>
            <div
              className={`p-4 rounded-2xl text-[11px] font-medium text-slate-900 space-y-1 ${currentTheme.bankCard}`}
            >
              <p>
                <span className="text-slate-900 font-bold">Bank Name: </span>
                {profile?.bankDetails?.bankName || "Union Bank of India"}
              </p>
              <p>
                <span className="text-slate-900 font-bold">Account No: </span>
                <span className="font-mono font-bold text-slate-900">
                  {profile?.bankDetails?.accountNumber || "216911010000095"}
                </span>
              </p>
              <p>
                <span className="text-slate-900 font-bold">IFSC Code: </span>
                <span className="font-mono font-bold text-slate-900">
                  {profile?.bankDetails?.ifscCode || "UBIN0821691"}
                </span>
              </p>
              {profile?.bankDetails?.upiId && (
                <p>
                  <span className="text-slate-900 font-bold">UPI VPA: </span>
                  <span
                    className={`font-mono font-bold ${currentTheme.accentColor}`}
                  >
                    {profile.bankDetails.upiId}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-900 font-bold">Subtotal:</span>
              <span className="font-mono font-bold text-slate-900">
                ₹
                {Number(invoice.subTotal || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {isCgstSgst ? (
              <>
                <div className="flex justify-between py-1 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-900 font-medium">
                    Central GST (CGST {taxRate / 2}%):
                  </span>
                  <span className="font-mono text-slate-900">
                    ₹
                    {(taxAmount / 2).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-900 font-medium">
                    State GST (SGST {taxRate / 2}%):
                  </span>
                  <span className="font-mono text-slate-900">
                    ₹
                    {(taxAmount / 2).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </>
            ) : invoice.tax?.type === "IGST" ? (
              <div className="flex justify-between py-1 border-b border-slate-100 text-[11px]">
                <span className="text-slate-900 font-medium">
                  Integrated GST (IGST {taxRate}%):
                </span>
                <span className="font-mono text-slate-900">
                  ₹
                  {taxAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            ) : null}

            <div
              className={`flex justify-between py-2.5 text-sm ${currentTheme.totalBox}`}
            >
              <span className="font-black uppercase text-slate-900">
                Total Amount Due:
              </span>
              <span className="font-mono font-black text-base">
                ₹
                {Number(invoice.totalAmount || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Digital Signature with Date & Signatory Block */}
        <div className="grid grid-cols-2 gap-8 border-t border-slate-200/80 pt-8 mt-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider block">
              Notes & Terms
            </span>
            <p className="text-[10px] text-slate-900 font-medium leading-relaxed">
              {invoice.notes ||
                profile?.defaultTerms ||
                "Payment is due within 15 days of invoice date. Thank you for your business!"}
            </p>
          </div>

          <div className="text-right flex flex-col justify-between items-end min-h-[120px]">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">
              For{" "}
              {profile?.businessName ||
                profile?.ownerName ||
                "Webxode Technologies"}
            </span>

            <div className="flex flex-col items-center justify-center space-y-1 pt-2">
              <img
                src={profile?.signatureUrl || "/signature.png"}
                alt="Authorized Signature"
                className="h-14 max-w-[170px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="border-t border-slate-400 w-48 pt-1 text-center">
                <p className="text-[11px] font-bold text-slate-900">
                  {profile?.ownerName || "Akash S M"}
                </p>
                <p className="text-[9px] font-semibold text-slate-900">
                  Authorized Signatory
                </p>
                <p className="text-[9px] font-medium text-slate-900">
                  Date: {printDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
