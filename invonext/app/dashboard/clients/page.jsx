"use client";
import React, { useEffect, useState } from 'react';
import ClientHeader from './components/clientHeader';
import ClientsTable from './components/ClientsTable';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const result = await response.json();
      if (result.success) {
        setClients(result.data);
        setFilteredClients(result.data);
      }
    } catch (error) {
      console.error("🔴 Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const handleSearch = (term) => {
    const filtered = clients.filter(c => 
      c.name.toLowerCase().includes(term.toLowerCase()) || 
      c.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (res.ok) fetchClients(); 
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <section className="p-4 md:p-6 space-y-6"> 
      <ClientHeader clients={filteredClients} onSearch={handleSearch}/>
      <ClientsTable clients={filteredClients} onDelete={handleDelete}/>
    </section>
  );
}

export default Page;