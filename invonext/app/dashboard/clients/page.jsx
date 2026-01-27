'use client'
import React, { useEffect, useState} from 'react'
import ClientHeader from './components/clientHeader'
import ClientsTable from './components/ClientsTable'
import { Loader2 } from 'lucide-react';

const page = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [clients, setClients] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetching from your existing GET /api/clients route
        const response = await fetch("/api/clients");
        const result = await response.json();
        
        if (result.success) {
          setClients(result.data);
        }
      } catch (error) {
        console.error("🔴 Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);


 if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }
  return (
    <section className="p-4 md:p-6 space-y-6"> 
      <ClientHeader clients={clients}/>
      <ClientsTable clients={clients}/>
    </section>
  )
}

export default page