"use client";

import React, { useState, useEffect, useMemo, useCallback, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Loader2,
  CheckCircle,
  FileText,
  Sparkles,
  Pencil,
  Eye,
  Printer,
} from "lucide-react";

import ClientSection from "../components/ClientSection";
import ItemSection from "../components/ItemSection";
import TaxSection from "../components/TaxSection";
import SummaryCard from "../components/SummaryCard";
import PaymentSection from "../components/PaymentSection";
import NotesSection from "../components/NotesSection";
import NoClientModal from "../components/NoClientModal";
import TemplateSelectorModal from "../components/TemplateSelectorModal";

export default function InvoiceDynamicPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resolvedParams = use(params);
  // Support both /dashboard/Invoices/[id] and /dashboard/Invoices/new?id=...
  const queryId = searchParams.get("id");
  const rawId = resolvedParams?.id !== "new" ? resolvedParams?.id : queryId;
  const isNew = !rawId || rawId === "new" || rawId === "create";

  const modeParam = searchParams.get("mode") || (isNew ? "new" : "view");
  const [mode, setMode] = useState(modeParam);
  const isReadOnly = mode === "view";

  useEffect(() => {
    setMode(searchParams.get("mode") || (isNew ? "new" : "view"));
  }, [searchParams, isNew]);

  const [fetching, setFetching] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [showNoClientModal, setShowNoClientModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [clientCount, setClientCount] = useState(null);

  const [items, setItems] = useState([
    { description: "", quantity: 1, rate: 0, amount: 0 },
  ]);
  const [taxType, setTaxType] = useState("NONE");
  const [selectedClient, setSelectedClient] = useState(null);

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
    paymentMode: "Bank Transfer / UPI",
    status: "draft",
    notes: "",
    terms: "Payment is due within 15 days.",
  });

  useEffect(() => {
    if (isNew) {
      setFormData((prev) => ({
        ...prev,
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dueDate: new Date(Date.now() + 15 * 86400000)
          .toISOString()
          .split("T")[0],
      }));
      setFetching(false);
      return;
    }

    const fetchInvoiceData = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/invoices/${rawId}`);
        const result = await res.json();

        if (result.success && result.data) {
          const inv = result.data;

          setFormData({
            invoiceNumber: inv.invoiceNumber || "",
            issueDate: inv.issueDate
              ? new Date(inv.issueDate).toISOString().split("T")[0]
              : "",
            dueDate: inv.dueDate
              ? new Date(inv.dueDate).toISOString().split("T")[0]
              : "",
            paymentMode: inv.paymentMode || "Bank Transfer / UPI",
            status: inv.status || "draft",
            notes: inv.notes || "",
            terms: inv.terms || "Payment is due within 15 days.",
          });

          if (inv.clientId) {
            setSelectedClient(inv.clientId);
          }

          if (Array.isArray(inv.items) && inv.items.length > 0) {
            setItems(
              inv.items.map((it) => ({
                description: it.description || "",
                quantity: Number(it.quantity) || 1,
                rate: Number(it.rate ?? it.price ?? 0),
                amount:
                  (Number(it.quantity) || 1) * Number(it.rate ?? it.price ?? 0),
              })),
            );
          }

          if (inv.tax?.type) {
            setTaxType(inv.tax.type);
          }
        } else {
          toast.error(result.message || "Failed to load invoice");
          router.push("/dashboard/Invoices");
        }
      } catch (err) {
        console.error("Fetch Invoice Error:", err);
        toast.error("Network error retrieving invoice record");
      } finally {
        setFetching(false);
      }
    };

    fetchInvoiceData();
  }, [rawId, isNew, router]);

  const handleClientsLoaded = useCallback(
    (list) => {
      setClientCount(list.length);
      if (list.length === 0 && isNew) {
        setShowNoClientModal(true);
      }
    },
    [isNew],
  );

  const totals = useMemo(() => {
    const subTotal = items.reduce((acc, item) => {
      const q = Number(item.quantity) || 0;
      const r = Number(item.rate ?? item.price ?? 0);
      return acc + q * r;
    }, 0);

    const isTaxExempt = taxType === "NONE" || taxType === "NO_GST";
    const gstRate = isTaxExempt ? 0 : 0.18;
    const taxAmount = subTotal * gstRate;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (taxType === "CGST_SGST" || taxType === "GST_TN") {
      cgst = taxAmount / 2;
      sgst = taxAmount / 2;
    } else if (taxType === "IGST") {
      igst = taxAmount;
    }

    return {
      subTotal: Math.round(subTotal * 100) / 100,
      taxPercent: isTaxExempt ? 0 : 18,
      taxAmount: Math.round(taxAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      total: Math.round((subTotal + taxAmount) * 100) / 100,
    };
  }, [items, taxType]);

  const handleSave = async (overrideStatus) => {
    if (clientCount === 0 || !selectedClient?._id) {
      setShowNoClientModal(true);
      return;
    }

    const payload = {
      clientId: selectedClient._id || selectedClient.id,
      invoiceNumber: formData.invoiceNumber,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      paymentMode: formData.paymentMode,
      items: items.map((it) => ({
        description: it.description || "Service item",
        quantity: Number(it.quantity) || 1,
        rate: Number(it.rate ?? it.price ?? 0),
        amount: (Number(it.quantity) || 1) * Number(it.rate ?? it.price ?? 0),
      })),
      subTotal: totals.subTotal,
      tax: {
        type: taxType,
        percent: totals.taxPercent,
        amount: totals.taxAmount,
      },
      totalAmount: totals.total,
      status: (overrideStatus || formData.status || "draft").toLowerCase(),
      notes: formData.notes,
      terms: formData.terms,
    };

    setSaving(true);
    try {
      const url = isNew ? "/api/invoices" : `/api/invoices/${rawId}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(
          isNew
            ? "Invoice created successfully! 🎉"
            : "Invoice updated successfully! 🔄",
        );
        router.push("/dashboard/Invoices");
      } else {
        toast.error(result.message || "Failed to commit invoice");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error saving invoice");
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white/95 border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold text-slate-500">
          Retrieving tax invoice details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard/Invoices")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition shadow-xs w-fit cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Invoices</span>
        </button>

        <div className="flex items-center gap-2.5">
          {isReadOnly ? (
            <>
              {/* Trigger Template Selector Modal */}
              <button
                type="button"
                onClick={() => setShowTemplateModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition shadow-xs cursor-pointer"
              >
                <Printer size={14} /> Print / PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("edit");
                  router.push(`/dashboard/Invoices/${rawId}?mode=edit`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl text-xs font-bold border border-indigo-200/80 transition active:scale-95 cursor-pointer"
              >
                <Pencil size={14} /> Edit Invoice
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="px-4.5 py-2.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200/90 transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSave(formData.status === "paid" ? "paid" : "sent")
                }
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-200 transition disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <CheckCircle size={15} />
                )}
                <span>{isNew ? "Create Invoice" : "Save Changes"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. Top Title Card */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl border border-indigo-100 shrink-0">
              {isReadOnly ? (
                <Eye size={22} />
              ) : isNew ? (
                <FileText size={22} />
              ) : (
                <Pencil size={22} />
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isReadOnly
                  ? `Invoice: ${formData.invoiceNumber}`
                  : isNew
                    ? "Create New Tax Invoice"
                    : `Editing Invoice #${formData.invoiceNumber}`}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {isReadOnly
                  ? "Audit-ready document summary with tax breakdowns."
                  : "Issue an itemized GST invoice with automated compliance."}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-indigo-700 bg-indigo-50/90 px-3.5 py-1.5 rounded-full border border-indigo-100 flex items-center gap-1.5 shadow-xs w-fit">
            <Sparkles size={13} className="text-indigo-600" />
            {isReadOnly
              ? "View Document"
              : isNew
                ? "New Generation"
                : "Revision Mode"}
          </span>
        </div>
      </div>

      {/* 3. Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <ClientSection
            onClientSelect={setSelectedClient}
            selectedClient={selectedClient}
            formData={formData}
            setFormData={setFormData}
            isReadOnly={isReadOnly}
            onClientsLoaded={handleClientsLoaded}
          />

          <ItemSection
            items={items}
            setItems={setItems}
            isReadOnly={isReadOnly}
          />
          <PaymentSection
            formData={formData}
            setFormData={setFormData}
            isReadOnly={isReadOnly}
          />
          <NotesSection
            formData={formData}
            setFormData={setFormData}
            isReadOnly={isReadOnly}
          />
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <TaxSection
            taxType={taxType}
            setTaxType={setTaxType}
            isReadOnly={isReadOnly}
          />
          <SummaryCard totals={totals} taxType={taxType} />
        </div>
      </div>

      {/* No Client Modal */}
      <NoClientModal
        isOpen={showNoClientModal}
        onClose={() => setShowNoClientModal(false)}
      />

      {/* Template Selector Modal */}
      <TemplateSelectorModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        invoiceId={rawId}
      />
    </div>
  );
}
