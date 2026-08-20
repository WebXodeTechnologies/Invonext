"use client";

import React from "react";

export default function TemplateB({ invoice = {} }) {
  const client = invoice.clientId || {};
  const items = invoice.items || [];
  const company = invoice.company || {
    name: "InvoNxt Enterprise Billing",
    email: "billing@invonext.com",
    phone: "+91 98765 43210",
    address: "Trade Tower, MG Road, Mumbai",
    gstNo: "27AAAAA0000A1Z5",
  };

  const subTotal = invoice.subTotal || items.reduce((acc, i) => acc + (i.amount || (i.quantity * i.rate) || 0), 0);
  const taxAmount = invoice.taxAmount || (subTotal * 0.18);
  const totalAmount = invoice.totalAmount || (subTotal + taxAmount);

  return (
    <div className="w-full bg-white text-slate-900 font-mono p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 print:p-0 print:border-none">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-slate-900 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest">INVOICE</h1>
          <p className="text-xs text-slate-500 mt-1">#{invoice.invoiceNumber || "INV-2026-001"}</p>
        </div>
        <div className="text-right text-xs">
          <p className="font-bold">{company.name}</p>
          <p className="text-slate-500">{company.email}</p>
          <p className="text-slate-500">GST: {company.gstNo}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
        <div>
          <p className="text-slate-400 font-bold uppercase text-[10px]">CLIENT</p>
          <p className="font-bold">{client.name || "Client Name"}</p>
          <p className="text-slate-500">{client.email || "N/A"}</p>
          {client.gstNumber && <p className="text-slate-500">GST: {client.gstNumber}</p>}
        </div>

        <div className="text-right">
          <p className="text-slate-400 font-bold uppercase text-[10px]">DATE</p>
          <p>{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString("en-IN") : "18/08/2026"}</p>
          <p className="text-slate-400 font-bold uppercase text-[10px] mt-2">DUE</p>
          <p>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-IN") : "01/09/2026"}</p>
        </div>
      </div>

      {/* Items */}
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-900 text-slate-500 uppercase font-bold text-[10px]">
            <th className="py-2">Item</th>
            <th className="py-2 text-center">Qty</th>
            <th className="py-2 text-right">Price</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-2 font-bold">{item.name || item.description || "Service Item"}</td>
                <td className="py-2 text-center">{item.quantity || 1}</td>
                <td className="py-2 text-right">₹{item.rate || 0}</td>
                <td className="py-2 text-right font-bold">₹{item.amount || (item.quantity * item.rate) || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 font-bold">Software Development & GST Billing</td>
              <td className="py-2 text-center">1</td>
              <td className="py-2 text-right">₹15,000</td>
              <td className="py-2 text-right font-bold">₹15,000</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end pt-4 border-t border-slate-900 text-xs">
        <div className="w-48 space-y-1 text-right">
          <p className="flex justify-between"><span>SUBTOTAL:</span> <span>₹{subTotal.toLocaleString("en-IN")}</span></p>
          <p className="flex justify-between"><span>TAX (18%):</span> <span>₹{taxAmount.toLocaleString("en-IN")}</span></p>
          <p className="flex justify-between font-bold text-sm border-t border-slate-900 pt-1 mt-1"><span>TOTAL:</span> <span>₹{totalAmount.toLocaleString("en-IN")}</span></p>
        </div>
      </div>
    </div>
  );
}
