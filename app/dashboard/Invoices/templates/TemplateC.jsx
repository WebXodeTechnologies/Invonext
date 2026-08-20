"use client";

import React from "react";

export default function TemplateC({ invoice = {} }) {
  const client = invoice.clientId || {};
  const items = invoice.items || [];
  const company = invoice.company || {
    name: "InvoNxt Enterprise Billing",
    email: "billing@invonext.com",
    phone: "+91 98765 43210",
    address: "Trade Tower, Mumbai, Maharashtra 400001",
    gstNo: "27AAAAA0000A1Z5",
  };

  const subTotal = invoice.subTotal || items.reduce((acc, i) => acc + (i.amount || (i.quantity * i.rate) || 0), 0);
  const taxAmount = invoice.taxAmount || (subTotal * 0.18);
  const totalAmount = invoice.totalAmount || (subTotal + taxAmount);

  return (
    <div className="w-full bg-white text-slate-900 font-sans p-0 rounded-2xl border border-slate-300 overflow-hidden shadow-sm space-y-0 print:border-none">
      {/* Top Navy Banner Header */}
      <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-wide text-amber-400">OFFICIAL INVOICE</h1>
          <p className="text-xs text-slate-300 font-mono mt-0.5">#{invoice.invoiceNumber || "INV-2026-001"}</p>
        </div>
        <div className="text-right text-xs">
          <p className="font-extrabold text-sm">{company.name}</p>
          <p className="text-slate-300">{company.email}</p>
          <p className="text-slate-300">GSTIN: {company.gstNo}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Client & Date Info */}
        <div className="grid grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <p className="font-bold text-slate-400 uppercase text-[10px]">CUSTOMER DETAILS</p>
            <p className="font-extrabold text-slate-900 text-sm">{client.name || "Client Entity"}</p>
            <p className="text-slate-600">{client.email || "N/A"}</p>
            {client.gstNumber && <p className="font-mono text-slate-800 font-bold mt-1">GSTIN: {client.gstNumber}</p>}
          </div>

          <div className="text-right space-y-1">
            <p><span className="text-slate-400 font-medium">Issue Date:</span> <strong className="text-slate-900">{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString("en-IN") : "18/08/2026"}</strong></p>
            <p><span className="text-slate-400 font-medium">Payment Due:</span> <strong className="text-slate-900">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-IN") : "01/09/2026"}</strong></p>
            <p><span className="text-slate-400 font-medium">Status:</span> <strong className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">{invoice.status || "PAID"}</strong></p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <th className="p-3">Item Particulars</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Unit Price</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-semibold">{item.name || item.description || "Service Item"}</td>
                  <td className="p-3 text-center font-bold">{item.quantity || 1}</td>
                  <td className="p-3 text-right">₹{item.rate || 0}</td>
                  <td className="p-3 text-right font-bold">₹{item.amount || (item.quantity * item.rate) || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 font-semibold">Enterprise SaaS Subscription & Cloud Setup</td>
                <td className="p-3 text-center font-bold">1</td>
                <td className="p-3 text-right">₹25,000</td>
                <td className="p-3 text-right font-bold">₹25,000</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total Summary */}
        <div className="flex justify-between items-end pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            <p className="font-bold text-slate-900">Payment Terms:</p>
            <p>Net 30 Days. Direct Bank Transfer / UPI Supported.</p>
          </div>

          <div className="w-60 bg-slate-900 text-white p-4 rounded-xl space-y-1 text-xs text-right shadow-md">
            <p className="flex justify-between text-slate-300"><span>Subtotal:</span> <span>₹{subTotal.toLocaleString("en-IN")}</span></p>
            <p className="flex justify-between text-slate-300"><span>GST (18%):</span> <span>₹{taxAmount.toLocaleString("en-IN")}</span></p>
            <p className="flex justify-between font-black text-sm text-amber-400 pt-2 border-t border-slate-700 mt-1"><span>Total Due:</span> <span>₹{totalAmount.toLocaleString("en-IN")}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
