"use client";

import React, { useState, useEffect } from "react";
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

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const result = await response.json();
      if (result.success) {
        const fetched = result.data || [];
        setClients(fetched);
        applyFilter(fetched, activeFilter, "");
      }
    } catch (error) {
      console.error("🔴 Error fetching clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const applyFilter = (data, filter, search) => {
    let list = [...data];

    if (filter === "gst") {
      list = list.filter((c) => c.gstNumber && c.gstNumber.trim().length > 5);
    }

    if (search && search.trim()) {
      const lower = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(lower) ||
          c.email?.toLowerCase().includes(lower) ||
          c.phone?.toLowerCase().includes(lower) ||
          c.gstNumber?.toLowerCase().includes(lower)
      );
    }

    setFilteredClients(list);
  };

  const handleSearch = (term) => {
    applyFilter(clients, activeFilter, term);
  };

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    applyFilter(clients, filterKey, "");
  };

  const handleLoadDemoClients = async () => {
    toast.loading("Populating live sample clients...", { id: "demo" });
    try {
      const sampleClients = [
        {
          name: "Acme Global Systems Ltd",
          email: "contact@acmeglobal.com",
          phone: "+91 98765 43210",
          gstNumber: "27AAAAA0000A1Z5",
          companyName: "Acme Global Systems",
          city: "Mumbai",
          state: "Maharashtra",
        },
        {
          name: "Stripe Commerce India",
          email: "billing@stripecommerce.in",
          phone: "+91 91234 56789",
          gstNumber: "29BBBBB1111B2Z6",
          companyName: "Stripe Commerce",
          city: "Bengaluru",
          state: "Karnataka",
        },
        {
          name: "Nexus Tech Solutions Pvt Ltd",
          email: "accounts@nexustech.io",
          phone: "+91 99887 76655",
          gstNumber: "07CCCCC2222C3Z7",
          companyName: "Nexus Tech",
          city: "Delhi",
          state: "Delhi",
        },
      ];

      for (const sample of sampleClients) {
        const payload = new FormData();
        payload.append("name", sample.name);
        payload.append("email", sample.email);
        payload.append("phone", sample.phone);
        payload.append("gstNumber", sample.gstNumber);
        payload.append("companyName", sample.companyName);
        payload.append(
          "address",
          JSON.stringify({ city: sample.city, state: sample.state })
        );

        await fetch("/api/clients", {
          method: "POST",
          body: payload,
        });
      }

      toast.success("Loaded 3 live sample clients! 🎉", { id: "demo" });
      fetchClients();
    } catch (err) {
      console.error(err);
      toast.error("Failed to load demo clients", { id: "demo" });
    }
  };

  const handleDeleteClientConfirm = async (id, name) => {
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(`Deleted ${name}`);
        fetchClients();
      } else {
        toast.error("Failed to delete client");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting client");
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white border border-slate-200/60 rounded-3xl">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Client Header */}
      <ClientHeader
        clients={clients}
        onSearch={handleSearch}
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
        onLoadDemoClients={handleLoadDemoClients}
      />

      {/* Clients Table */}
      <ClientsTable
        clients={filteredClients}
        onDelete={(client) => setDeletingClient(client)}
        onLoadDemoClients={handleLoadDemoClients}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingClient)}
        onClose={() => setDeletingClient(null)}
        client={deletingClient}
        onConfirm={handleDeleteClientConfirm}
      />
    </section>
  );
}