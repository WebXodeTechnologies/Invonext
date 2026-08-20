"use client";

import React from "react";

export default function TemplateE({ invoice = {} }) {
  const client = invoice.clientId || {};
  const items = invoice.items || [];
  const company = invoice.company || {
    name: "InvoNxt Enterprise Billing",
    email: "billing@invonext.com",
    phone: "+91 98765 43210",
    address: "Trade Tower, Mumbai, Maharashtra",
    gstNo: "27AAAAA0000A1Z5",
  };

  const subTotal = invoice.subTotal || items.reduce((acc, i) => acc + (i.amount || (i.quantity * i.rate) || 0), 0);
  const taxAmount = invoice.taxAmount || (subTotal * 0.18);
  const totalAmount = invoice.totalAmount || (subTotal + taxAmount);

  return (
    <div className="w-full bg-white text-slate-900 font-sans p-8 rounded-3xl border border-purple-200/80 shadow-md space-y-6 print:border-none print:shadow-none">
      {/* Top Banner Header */}
      <div className="flex justify-between items-center pb-6 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-md shadow-purple-200">
            I
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{company.name}</h1>
            <p className="text-xs text-purple-600 font-semibold">{company.email}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-full border border-purple-200">
            GST INVOICE
          </span>
          <p className="text-xs font-mono font-bold text-slate-900 mt-1">#{invoice.invoiceNumber || "INV-2026-001"}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 text-xs bg-purple-50/40 p-4 rounded-2xl border border-purple-100">
        <div>
          <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">BILLED TO</p>
          <p className="font-extrabold text-slate-900 text-sm mt-0.5">{client.name || "Client Name"}</p>
          <p className="text-slate-600">{client.email || "N/A"}</p>
          {client.gstNumber && <p className="font-mono text-purple-700 font-bold mt-1">GSTIN: {client.gstNumber}</p>}
        </div>

        <div className="text-right space-y-1">
          <p><span className="text-slate-400 font-medium">Issue Date:</span> <strong className="text-slate-900">{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString("en-IN") : "18/08/2026"}</strong></p>
          <p><span className="text-slate-400 font-medium">Due Date:</span> <strong className="text-slate-900">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-IN") : "01/09/2026"}</strong></p>
          <p><span className="text-slate-400 font-medium">Status:</span> <strong className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">{invoice.status || "PAID"}</strong></p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white font-bold uppercase tracking-wider">
              <th className="p-3 rounded-l-xl">Description</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Rate</th>
              <th className="p-3 text-right rounded-r-xl">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <tr key={idx} className="hover:bg-purple-50/30">
                  <td className="p-3 font-semibold text-slate-900">{item.name || item.description || "Service Particulars"}</td>
                  <td className="p-3 text-center font-bold">{item.quantity || 1}</td>
                  <td className="p-3 text-right">₹{(item.rate || 0).toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-bold text-slate-900">₹{((item.amount || (item.quantity * item.rate) || 0)).toLocaleString("en-IN")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 font-semibold text-slate-900">UI/UX Design & Frontend Development</td>
                <td className="p-3 text-center font-bold">1</td>
                <td className="p-3 text-right">₹18,000</td>
                <td className="p-3 text-right font-bold text-slate-900">₹18,000</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-between items-end pt-4 border-t border-purple-100 text-xs">
        <div className="text-slate-500 space-y-0.5">
          <p className="font-bold text-slate-900">Thank you for your business!</p>
          <p className="text-[11px]">Questions? Contact billing@invonext.com</p>
        </div>

        <div className="w-60 bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-4 rounded-2xl space-y-1 text-right shadow-lg shadow-purple-900/20">
          <p className="flex justify-between text-purple-200"><span>Subtotal:</span> <span>₹{subTotal.toLocaleString("en-IN")}</span></p>
          <p className="flex justify-between text-purple-200"><span>GST (18%):</span> <span>₹{taxAmount.toLocaleString("en-IN")}</span></p>
          <p className="flex justify-between font-black text-sm text-white pt-2 border-t border-purple-700/60 mt-1"><span>Total Amount:</span> <span>₹{totalAmount.toLocaleString("en-IN")}</span></p>
        </div>
      </div>
    </div>
  );
}
