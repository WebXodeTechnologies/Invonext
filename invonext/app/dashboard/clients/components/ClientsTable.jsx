"use client";
import React, { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Added for navigation

const initialClients = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Annaai Agro Tradings",
    email: "contact@annaaiagro.com",
    phone: "+91 98765 43210",
    gstNumber: "27AAEPM1234C1Z5",
    status: "Overdue",
    address: { city: "Mumbai", state: "Maharashtra" },
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "Green Field Exports",
    email: "info@greenfield.com",
    phone: "+91 91234 56789",
    gstNumber: "27AAEPM5678D1Z2",
    status: "Completed",
    address: { city: "Pune", state: "Maharashtra" },
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Blue Sky Traders",
    email: "contact@bluesky.com",
    phone: "+91 99887 66554",
    gstNumber: "27AAEPM9988E1Z3",
    status: "Pending",
    address: { city: "Delhi", state: "Delhi" },
  },
];

const statusColors = {
  Overdue: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
};

export default function ClientsTable() {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients); // Added state to handle deletion locally for now

  // --- Navigation Logic ---

  const handleView = (id) => {
    // Navigates to /clients/1
    router.push(`/clients/${id}`);
  };

  const handleEdit = (id) => {
    // Navigates to /clients/edit/1
    router.push(`/clients/edit/${id}`);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      // For now, filtering the local state. 
      // Later, you will call: await fetch(`/api/clients/${id}`, { method: 'DELETE' })
      setClients(clients.filter((client) => client.id !== id));
      console.log(`Client ${id} deleted`);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 table-fixed lg:table-auto">
          <thead className="bg-gray-50">
            <tr className="text-xs 4xl:text-lg font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-left w-16 4xl:w-24">S.No</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-left">Client</th>
              <th className="hidden md:table-cell px-4 py-4 4xl:px-8 4xl:py-6 text-left">Phone</th>
              <th className="hidden lg:table-cell px-4 py-4 4xl:px-8 4xl:py-6 text-left">GST Number</th>
              <th className="hidden xl:table-cell px-4 py-4 4xl:px-8 4xl:py-6 text-left">Location</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-center">Status</th>
              <th className="px-4 py-4 4xl:px-8 4xl:py-6 text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 bg-white text-sm 4xl:text-xl text-gray-700">
            {clients.map((client, index) => (
              <tr key={client.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-gray-500 font-medium">
                  {index + 1}
                </td>

                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap">
                  <div className="flex items-center gap-3 4xl:gap-6">
                    <div className="relative h-10 w-10 4xl:h-16 4xl:w-16 shrink-0">
                      <Image
                        src={client.avatar}
                        alt={client.name}
                        fill
                        className="rounded-full object-cover shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 truncate max-w-[140px] lg:max-w-full">
                        {client.name}
                      </span>
                      <span className="text-xs 4xl:text-lg text-gray-500 truncate">
                        {client.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-gray-500">
                  {client.phone}
                </td>

                <td className="hidden lg:table-cell px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap">
                  <span className="font-mono text-xs 4xl:text-lg bg-gray-100 px-2 py-1 rounded">
                    {client.gstNumber}
                  </span>
                </td>

                <td className="hidden xl:table-cell px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-gray-600">
                  {client.address.city}, {client.address.state}
                </td>

                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-center">
                  <span className={`inline-flex px-3 py-1 4xl:px-6 4xl:py-2 rounded-full text-xs 4xl:text-lg font-bold shadow-sm ${statusColors[client.status]}`}>
                    {client.status}
                  </span>
                </td>

                <td className="px-4 py-4 4xl:px-8 4xl:py-8 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center gap-2 4xl:gap-4">
                    <button 
                      onClick={() => handleView(client.id)}
                      className="p-2 4xl:p-4 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-all"
                    >
                      <Eye className="h-4 w-4 4xl:h-6 4xl:w-6" />
                    </button>
                    <button 
                      onClick={() => handleEdit(client.id)}
                      className="p-2 4xl:p-4 hover:bg-indigo-50 rounded-full text-indigo-600 transition-all"
                    >
                      <Pencil className="h-4 w-4 4xl:h-6 4xl:w-6" />
                    </button>
                    <button 
                      onClick={() => handleDelete(client.id, client.name)}
                      className="p-2 4xl:p-4 hover:bg-red-50 rounded-full text-red-600 transition-all"
                    >
                      <Trash2 className="h-4 w-4 4xl:h-6 4xl:w-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}