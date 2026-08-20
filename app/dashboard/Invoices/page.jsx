"use client";

import React, { useState, useEffect, useCallback } from "react";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoicesTable from "./components/InvoicesTable";
import { Loader2, AlertTriangle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingInvoice, setDeletingInvoice] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const applyFilters = useCallback((data, filter, search) => {
    let list = [...data];

    if (filter !== "all") {
      list = list.filter(
        (inv) => (inv.status || "").toLowerCase() === filter.toLowerCase(),
      );
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((inv) => {
        const clientName =
          inv.clientId?.companyName ||
          inv.clientId?.name ||
          inv.clientName ||
          "";
        const invNum = inv.invoiceNumber || "";
        const email = inv.clientId?.email || "";
        return (
          clientName.toLowerCase().includes(q) ||
          invNum.toLowerCase().includes(q) ||
          email.toLowerCase().includes(q)
        );
      });
    }

    setFilteredInvoices(list);
  }, []);

  const fetchInvoices = useCallback(async () => {
    try {
      const res = await fetch("/api/invoices");
      const json = await res.json();
      if (json.success) {
        const data = json.data || [];
        setInvoices(data);
        applyFilters(data, activeFilter, searchTerm);
      } else {
        toast.error(json.message || "Failed to load invoices");
      }
    } catch (err) {
      console.error("Invoices fetch error:", err);
      toast.error("Network error loading invoice ledger");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchTerm, applyFilters]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(invoices, activeFilter, term);
  };

  const handleFilterChange = (statusKey) => {
    setActiveFilter(statusKey);
    applyFilters(invoices, statusKey, searchTerm);
  };

  const handleConfirmDelete = async () => {
    if (!deletingInvoice) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/invoices/${deletingInvoice._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Invoice ${deletingInvoice.invoiceNumber || ""} deleted`);
        setDeletingInvoice(null);
        fetchInvoices();
      } else {
        toast.error(json.message || "Failed to delete invoice");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting invoice");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white/95 border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold text-slate-500">
          Loading invoice ledger...
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6 animate-in fade-in duration-300 pb-12">
      <InvoiceHeader
        invoices={invoices}
        onSearch={handleSearch}
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
      />

      <InvoicesTable
        invoices={filteredInvoices}
        onDelete={(inv) => setDeletingInvoice(inv)}
      />

      {/* Delete Confirmation Modal */}
      {deletingInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setDeletingInvoice(null)}
        >
          <div
            className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl border border-rose-100/80 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Delete Invoice Record
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Are you sure you want to delete invoice{" "}
                  <strong className="text-slate-900">
                    {deletingInvoice.invoiceNumber || "this document"}
                  </strong>
                  ? This will reverse recorded stats.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingInvoice(null)}
                disabled={deleteLoading}
                className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition cursor-pointer disabled:opacity-50"
              >
                {deleteLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
