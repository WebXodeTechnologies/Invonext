"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Loader2,
  Calendar,
  FileSpreadsheet,
  FileText,
  Download,
  Sparkles,
  Filter,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

import ReportHeader from "./components/ReportHeader";
import PaymentStatusTable from "./components/PaymentStatusTable";
import RevenueBreakdown from "./components/RevenueBreakdown";
import CustomerBalanceTable from "./components/CustomerBalanceTable";

export default function ReportsPage() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");

  useEffect(() => {
    async function loadReportData() {
      try {
        const [invRes, clientRes] = await Promise.all([
          fetch("/api/invoices"),
          fetch("/api/clients"),
        ]);
        const [invJson, clientJson] = await Promise.all([
          invRes.json(),
          clientRes.json(),
        ]);

        if (invJson.success) setInvoices(invJson.data || []);
        if (clientJson.success) setClients(clientJson.data || []);
      } catch (err) {
        console.error("Reports loading error:", err);
        toast.error("Failed to load live ledger data");
      } finally {
        setLoading(false);
      }
    }
    loadReportData();
  }, []);

  const filteredInvoices = useMemo(() => {
    if (timeRange === "all") return invoices;
    const now = new Date();
    const days = Number(timeRange);
    return invoices.filter((inv) => {
      const d = new Date(inv.issueDate || inv.createdAt);
      return (now - d) / (1000 * 60 * 60 * 24) <= days;
    });
  }, [invoices, timeRange]);

  const revenueBreakdownData = useMemo(() => {
    const map = {};
    let grandTotal = 0;

    filteredInvoices.forEach((inv) => {
      (inv.items || []).forEach((item) => {
        const desc = item.description || "General Services";
        const amt = Number(item.amount || item.quantity * item.rate || 0);
        grandTotal += amt;
        if (!map[desc]) map[desc] = { count: 0, total: 0 };
        map[desc].count += Number(item.quantity || 1);
        map[desc].total += amt;
      });
    });

    return Object.entries(map)
      .map(([name, stat]) => ({
        name,
        count: stat.count,
        total: stat.total,
        percentage:
          grandTotal > 0 ? Math.round((stat.total / grandTotal) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [filteredInvoices]);

  const customerBalanceData = useMemo(() => {
    const clientMap = {};

    filteredInvoices.forEach((inv) => {
      const cId = inv.clientId?._id || inv.clientId?.id || "unassigned";
      const cName =
        inv.clientId?.companyName ||
        inv.clientId?.name ||
        inv.clientName ||
        "Direct Client";
      const total = Number(inv.totalAmount || 0);
      const isPaid = (inv.status || "").toLowerCase() === "paid";

      if (!clientMap[cId]) {
        clientMap[cId] = { client: cName, total: 0, paid: 0, pending: 0 };
      }

      clientMap[cId].total += total;
      if (isPaid) {
        clientMap[cId].paid += total;
      } else {
        clientMap[cId].pending += total;
      }
    });

    return Object.values(clientMap).sort((a, b) => b.total - a.total);
  }, [filteredInvoices]);

  const handleExport = (format) => {
    if (!filteredInvoices.length) {
      toast.error("No invoice records to export");
      return;
    }

    const data = filteredInvoices.map((inv, idx) => ({
      "S.No": idx + 1,
      "Invoice #": inv.invoiceNumber,
      Client: inv.clientId?.companyName || inv.clientId?.name || "N/A",
      "Issue Date": inv.issueDate
        ? new Date(inv.issueDate).toLocaleDateString("en-IN")
        : "N/A",
      "Due Date": inv.dueDate
        ? new Date(inv.dueDate).toLocaleDateString("en-IN")
        : "N/A",
      "Sub Total (₹)": inv.subTotal || 0,
      "Tax Amount (₹)": inv.tax?.amount || 0,
      "Total Amount (₹)": inv.totalAmount || 0,
      Status: (inv.status || "draft").toUpperCase(),
      "Payment Mode": inv.paymentMode || "Bank Transfer",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Financial_Report");

    const fileName = `Financial_Report_${Date.now()}`;
    if (format === "excel") {
      const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
      toast.success("Excel report exported!");
    } else {
      const buf = XLSX.write(wb, { bookType: "csv", type: "array" });
      saveAs(new Blob([buf]), `${fileName}.csv`);
      toast.success("CSV report exported!");
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xs space-y-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-100 border-t-indigo-600 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-slate-500 tracking-wide">
          Compiling financial intelligence ledger...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header with Live Dynamic Summary KPIs */}
      <ReportHeader
        invoices={filteredInvoices}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        onExport={handleExport}
      />

      {/* 2. Primary Payment Status Table */}
      <PaymentStatusTable invoices={filteredInvoices} />

      {/* 3. Dual Grid: Revenue Breakdown & Customer Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <RevenueBreakdown data={revenueBreakdownData} />
        </div>
        <div className="lg:col-span-7">
          <CustomerBalanceTable data={customerBalanceData} />
        </div>
      </div>
    </div>
  );
}
