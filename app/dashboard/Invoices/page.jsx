"use client";

import React, { useState } from 'react';
import InvoiceHeader from './components/InvoiceHeader';
import InvoicesTable from './components/InvoicesTable';

const Page = () => {
  // Centralized data for both Header (Export) and Table
  const [invoices] = useState([
    {
      _id: "1",
      invoiceNumber: "INV-2026-001",
      clientId: { name: "Annaai Agro Tradings", email: "contact@annaaiagro.com" },
      issueDate: new Date("2025-12-20"),
      dueDate: new Date("2026-01-05"),
      subTotal: 12500,
      tax: { amount: 2250 },
      totalAmount: 14750,
      status: "paid",
    },
    {
      _id: "2",
      invoiceNumber: "INV-2026-002",
      clientId: { name: "Green Field Exports", email: "info@greenfield.com" },
      issueDate: new Date("2025-12-22"),
      dueDate: new Date("2026-01-02"),
      subTotal: 45000,
      tax: { amount: 8100 },
      totalAmount: 53100,
      status: "overdue",
    },
    {
      _id: "3",
      invoiceNumber: "INV-2026-003",
      clientId: { name: "Webxode Technologies", email: "webxode@gmail.com" },
      issueDate: new Date("2025-12-22"),
      dueDate: new Date("2026-01-02"),
      subTotal: 18000,
      tax: { amount: 2000 },
      totalAmount: 20000,
      status: "paid",
    },
  ]);

  return (
    <section className="p-4 lg:p-8">
      {/* Pass invoices prop to both */}
      <InvoiceHeader invoices={invoices} />
      <InvoicesTable invoices={invoices} />
    </section>
  );
};

export default Page;