"use client";

import React from "react";

export default function TemplateD({ invoice = {} }) {
  const client = invoice.clientId || {};
  const items = invoice.items || [];
  const company = invoice.company || {
    name: "InvoNxt Enterprise Billing",
    email: "billing@invonext.com",
    phone: "+91 98765 43210",
    address: "Trade Tower, MG Road, Mumbai, Maharashtra 400001",
    gstNo: "27AAAAA0000A1Z5",
  };

  const subTotal = invoice.subTotal || items.reduce((acc, i) => acc + (i.amount || (i.quantity * i.rate) || 0), 0);
  const cgstAmount = (subTotal * 0.09);
  const sgstAmount = (subTotal * 0.09);
  const totalAmount = invoice.totalAmount || (subTotal + cgstAmount + sgstAmount);

  return (
    <div className="w-full bg-white text-slate-900 font-sans p-6 rounded-2xl border-2 border-slate-900 shadow-sm space-y-4 print:border-none">
      {/* Official Tax Invoice Header */}
      <div className="text-center border-b-2 border-slate-900 pb-3">
        <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">FORM GST INV-01: TAX INVOICE</h1>
        <p className="text-xs font-bold text-slate-600">(See Rule 46 of CGST Rules, 2017)</p>
      </div>

      {/* Supplier & Recipient 2-Column Grid */}
      <div className="grid grid-cols-2 gap-4 text-xs border-b-2 border-slate-900 pb-4">
        {/* Supplier */}
        <div className="space-y-1 pr-2 border-r border-slate-300">
          <p className="font-black text-slate-400 uppercase text-[10px]">DETAILS OF SUPPLIER</p>
          <p className="font-extrabold text-slate-900 text-sm">{company.name}</p>
          <p className="text-slate-600">{company.address}</p>
          <p className="font-mono font-bold text-slate-900">GSTIN: {company.gstNo}</p>
          <p className="text-slate-600">State: Maharashtra (Code: 27)</p>
        </div>

        {/* Recipient */}
        <div className="space-y-1 pl-2">
          <p className="font-black text-slate-400 uppercase text-[10px]">DETAILS OF RECIPIENT / BILLED TO</p>
          <p className="font-extrabold text-slate-900 text-sm">{client.name || "Client Business"}</p>
          <p className="text-slate-600">{client.email || "N/A"}</p>
          <p className="font-mono font-bold text-slate-900">GSTIN: {client.gstNumber || "URP (Unregistered Person)"}</p>
          <p className="text-slate-600">Place of Supply: {client.address?.state || "Maharashtra (27)"}</p>
        </div>
      </div>

      {/* Document Details Strip */}
      <div className="grid grid-cols-3 gap-2 text-xs bg-slate-100 p-3 rounded-lg border border-slate-300">
        <div>
          <span className="text-slate-500 font-medium">Invoice Number:</span>
          <p className="font-mono font-bold text-slate-900">{invoice.invoiceNumber || "INV-2026-001"}</p>
        </div>
        <div>
          <span className="text-slate-500 font-medium">Invoice Date:</span>
          <p className="font-bold text-slate-900">{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString("en-IN") : "18/08/2026"}</p>
        </div>
        <div className="text-right">
          <span className="text-slate-500 font-medium">Reverse Charge Applicable:</span>
          <p className="font-bold text-slate-900">NO</p>
        </div>
      </div>

      {/* Itemized Table with HSN & GST Split */}
      <table className="w-full text-left text-xs border-collapse border border-slate-900">
        <thead>
          <tr className="bg-slate-900 text-white font-bold uppercase text-[10px]">
            <th className="p-2 border border-slate-900">#</th>
            <th className="p-2 border border-slate-900">Description of Goods / Services</th>
            <th className="p-2 border border-slate-900 text-center">HSN/SAC</th>
            <th className="p-2 border border-slate-900 text-center">Qty</th>
            <th className="p-2 border border-slate-900 text-right">Rate</th>
            <th className="p-2 border border-slate-900 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-300">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 border border-slate-300 text-center">{idx + 1}</td>
                <td className="p-2 border border-slate-300 font-semibold">{item.name || item.description || "GST Consultancy"}</td>
                <td className="p-2 border border-slate-300 text-center font-mono">998311</td>
                <td className="p-2 border border-slate-300 text-center font-bold">{item.quantity || 1}</td>
                <td className="p-2 border border-slate-300 text-right">₹{item.rate || 0}</td>
                <td className="p-2 border border-slate-300 text-right font-bold">₹{item.amount || (item.quantity * item.rate) || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border border-slate-300 text-center">1</td>
              <td className="p-2 border border-slate-300 font-semibold">IT Consulting & Software Development Services</td>
              <td className="p-2 border border-slate-300 text-center font-mono">998314</td>
              <td className="p-2 border border-slate-300 text-center font-bold">1</td>
              <td className="p-2 border border-slate-300 text-right">₹20,000</td>
              <td className="p-2 border border-slate-300 text-right font-bold">₹20,000</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Tax Breakup Box */}
      <div className="flex justify-between items-start gap-4 pt-2 text-xs">
        <div className="space-y-1 text-slate-600 max-w-sm">
          <p className="font-bold text-slate-900">Declaration & Terms:</p>
          <p>We declare that this invoice shows the actual price of the services described and that all particulars are true and correct.</p>
        </div>

        <div className="w-64 border border-slate-900 rounded-lg p-3 space-y-1 text-right">
          <div className="flex justify-between text-slate-600"><span>Taxable Value:</span> <span className="font-bold">₹{subTotal.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-slate-600"><span>CGST (9%):</span> <span className="font-bold">₹{cgstAmount.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-slate-600"><span>SGST (9%):</span> <span className="font-bold">₹{sgstAmount.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-900 mt-1"><span>Total Invoice Value:</span> <span>₹{totalAmount.toLocaleString("en-IN")}</span></div>
        </div>
      </div>
    </div>
  );
}
