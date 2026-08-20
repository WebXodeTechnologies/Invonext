"use client";

import React, { useState, useEffect, useCallback } from "react";
import ClientHeader from "./components/clientHeader";
import ClientsTable from "./components/ClientsTable";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingClient, setDeletingClient] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const applyFilter = useCallback((data, filter, search) => {
    let list = [...data];

    if (filter === "gst") {
      list = list.filter((c) => c.gstNumber && c.gstNumber.trim().length > 5);
    } else if (filter === "active") {
      list = list.filter(
        (c) =>
          (c.status || "").toLowerCase() === "paid" ||
          (c.status || "").toLowerCase() === "active",
      );
    }

    if (search && search.trim()) {
      const lower = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(lower) ||
          c.companyName?.toLowerCase().includes(lower) ||
          c.email?.toLowerCase().includes(lower) ||
          c.phone?.toLowerCase().includes(lower) ||
          c.gstNumber?.toLowerCase().includes(lower) ||
          c.address?.city?.toLowerCase().includes(lower) ||
          c.address?.state?.toLowerCase().includes(lower),
      );
    }

    setFilteredClients(list);
  }, []);

  const fetchClients = useCallback(async () => {
    try {
      const response = await fetch("/api/clients");
      const result = await response.json();
      if (result.success) {
        const fetched = result.data || [];
        setClients(fetched);
        applyFilter(fetched, activeFilter, searchTerm);
      } else {
        toast.error(result.message || "Failed to load directory");
      }
    } catch (error) {
      console.error("Fetch clients error:", error);
      toast.error("Network error while loading clients");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchTerm, applyFilter]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilter(clients, activeFilter, term);
  };

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    applyFilter(clients, filterKey, searchTerm);
  };

  const handleLoadDemoClients = async () => {
    const toastId = toast.loading("Populating verified sample clients...");
    try {
      const sampleClients = [
        {
          firstName: "Acme",
          lastName: "Global",
          name: "Acme Global Systems Ltd",
          companyName: "Acme Global Systems",
          email: "contact@acmeglobal.com",
          phone: "+91 98765 43210",
          gstNumber: "27AAAAA0000A1Z5",
          address: { city: "Mumbai", state: "Maharashtra", country: "India" },
          status: "Paid",
        },
        {
          firstName: "Stripe",
          lastName: "Commerce",
          name: "Stripe Commerce India",
          companyName: "Stripe Commerce",
          email: "billing@stripecommerce.in",
          phone: "+91 91234 56789",
          gstNumber: "29BBBBB1111B2Z6",
          address: { city: "Bengaluru", state: "Karnataka", country: "India" },
          status: "Pending",
        },
        {
          firstName: "Nexus",
          lastName: "Tech",
          name: "Nexus Tech Solutions Pvt Ltd",
          companyName: "Nexus Tech",
          email: "accounts@nexustech.io",
          phone: "+91 99887 76655",
          gstNumber: "07CCCCC2222C3Z7",
          address: { city: "Delhi", state: "Delhi", country: "India" },
          status: "Paid",
        },
      ];

      await Promise.all(
        sampleClients.map((sample) =>
          fetch("/api/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sample),
          }),
        ),
      );

      toast.success("Loaded 3 enterprise entities! 🎉", { id: toastId });
      fetchClients();
    } catch (err) {
      console.error(err);
      toast.error("Failed to seed demo clients", { id: toastId });
    }
  };

  const handleDeleteClientConfirm = async (id, name) => {
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(`Removed ${name || "entity"} from directory`);
        setDeletingClient(null);
        fetchClients();
      } else {
        toast.error(data.message || "Failed to remove client");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error communicating with directory server");
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white border border-slate-200/80 rounded-3xl shadow-xs">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      <ClientHeader
        clients={clients}
        onSearch={handleSearch}
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
        onLoadDemoClients={handleLoadDemoClients}
      />

      <ClientsTable
        clients={filteredClients}
        onDelete={(client) => setDeletingClient(client)}
        onLoadDemoClients={handleLoadDemoClients}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingClient)}
        onClose={() => setDeletingClient(null)}
        client={deletingClient}
        onConfirm={handleDeleteClientConfirm}
      />
    </section>
  );
}
