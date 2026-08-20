"use client";

import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import ClientSection from "../components/ClientSection";
import ItemSection from "../components/ItemSection";
import TaxSection from "../components/TaxSection";
import SummaryCard from "../components/SummaryCard";
import PaymentSection from "../components/PaymentSection";
import NotesSection from "../components/NotesSection";

export default function CreateInvoicePage() {
  // Global State for Backend
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [taxType, setTaxType] = useState("NO_GST");
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentMode: "",
    status: "unpaid",
    notes: "",
    terms: "Payment is due within 15 days. Thank you!",
    // Bank Details
    bankName: "",
    accountNo: "",
    ifsc: "",
    upiId: "",
  });

  // Rule 4: Tax Calculation Logic (Passed to Summary)
  const totals = useMemo(() => {
    const subTotal = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const gstRate = 0.18;
    const cgst = taxType === "GST_TN" ? (subTotal * gstRate) / 2 : 0;
    const sgst = taxType === "GST_TN" ? (subTotal * gstRate) / 2 : 0;
    const igst = taxType === "IGST" ? subTotal * gstRate : 0;
    return { subTotal, cgst, sgst, igst, total: subTotal + cgst + sgst + igst };
  }, [items, taxType]);

  const handleSave = async (status) => {
    // This is where you connect to your Express.js backend
    const payload = {
      clientId: selectedClient?._id,
      items,
      taxType,
      totals,
      status,
    };
    console.log("Saving to Backend:", payload);
    toast.success(`Invoice saved as ${status}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create New Invoice</h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave("draft")}
            className="px-4 py-2 border rounded-lg font-semibold"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave("sent")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
          >
            Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ClientSection
            onClientSelect={setSelectedClient}
            selectedClient={selectedClient}
            formData={formData}
            setFormData={setFormData}
          />
          <ItemSection items={items} setItems={setItems} />
          <PaymentSection formData={formData} setFormData={setFormData} />
          <NotesSection formData={formData} setFormData={setFormData} />
        </div>
        <div className="space-y-6">
          
          <TaxSection taxType={taxType} setTaxType={setTaxType} />
          <SummaryCard totals={totals} taxType={taxType} />
          
        </div>
      </div>
    </div>
  );
}
