"use client";

import React from "react";

export default function TemplateA({ invoice = {} }) {
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
  const taxAmount = invoice.taxAmount || (subTotal * 0.18);
  const totalAmount = invoice.totalAmount || (subTotal + taxAmount);

  return (
    <div className="w-full bg-white text-slate-900 font-sans p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-indigo-600 gap-4">
        <div>
          <h1 className="text-3xl font-black text-indigo-600 tracking-tight">TAX INVOICE</h1>
          <p className="text-xs text-slate-500 font-mono font-bold mt-1">
            Invoice No: <span className="text-slate-900">{invoice.invoiceNumber || "INV-2026-001"}</span>
          </p>
        </div>
        <div className="text-left sm:text-right text-xs space-y-1">
          <h2 className="font-bold text-slate-900 text-sm">{company.name}</h2>
          <p className="text-slate-500">{company.address}</p>
          <p className="text-slate-500">Email: {company.email} | GSTIN: {company.gstNo}</p>
        </div>
      </div>

      {/* Client & Dates Grid */}
      <div className="grid grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="space-y-1">
          <span className="font-bold text-indigo-600 uppercase text-[10px] tracking-wider">Billed To:</span>
          <p className="font-extrabold text-slate-900 text-sm">{client.name || "Client Name"}</p>
          <p className="text-slate-600">{client.email || "N/A"}</p>
          <p className="text-slate-600">{client.phone || "N/A"}</p>
          {client.gstNumber && (
            <p className="font-mono font-bold text-slate-800 pt-1">GSTIN: {client.gstNumber}</p>
          )}
        </div>

        <div className="space-y-1 text-right">
          <div>
            <span className="text-slate-400 font-medium">Issue Date:</span>
            <span className="font-bold text-slate-900 ml-2">
              {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString("en-IN") : "18/08/2026"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Due Date:</span>
            <span className="font-bold text-slate-900 ml-2">
              {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-IN") : "01/09/2026"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Status:</span>
            <span className="font-bold text-emerald-600 uppercase ml-2 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
              {invoice.status || "PAID"}
            </span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase font-bold tracking-wider">
              <th className="p-3">Description</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Rate</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{item.name || item.description || "Service Rendered"}</td>
                  <td className="p-3 text-center font-bold">{item.quantity || 1}</td>
                  <td className="p-3 text-right">₹{(item.rate || 0).toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    ₹{((item.amount || (item.quantity * item.rate) || 0)).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 font-semibold text-slate-900">Professional Services & GST Consulting</td>
                <td className="p-3 text-center font-bold">1</td>
                <td className="p-3 text-right">₹10,000</td>
                <td className="p-3 text-right font-bold text-slate-900">₹10,000</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Calculation Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-200">
        <div className="text-xs space-y-1 text-slate-500 max-w-xs">
          <p className="font-bold text-slate-900">Bank Settlement Info:</p>
          <p>Bank: HDFC Bank | A/C: 501000000000</p>
          <p>IFSC: HDFC0001234 | Branch: Mumbai Main</p>
        </div>

        <div className="w-full sm:w-64 text-xs space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span className="font-bold">₹{subTotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST Tax (18%):</span>
            <span className="font-bold">₹{taxAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-slate-900 text-sm font-black pt-2 border-t border-slate-200">
            <span>Total Payable:</span>
            <span className="text-indigo-600">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
