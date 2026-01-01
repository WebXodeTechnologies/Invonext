"use client";
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const clients = [
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

// Map status to colors
const statusColors = {
  Overdue: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
};

export default function ClientsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-700">
            <th className="px-6 py-3 text-left">S.No</th>
            <th className="px-6 py-3 text-left">Client</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">GST Number</th>
            <th className="px-6 py-3 text-left">City / State</th>
            <th className="px-6 py-3 text-center">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
          {clients.map((client, index) => (
            <tr
              key={client.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="px-6 py-4">{index + 1}</td>

              {/* Client Name + Avatar */}
              <td className="px-6 py-4 flex items-center gap-3">
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {client.name}
                  </span>
                  <span className="text-gray-500 text-sm">{client.email}</span>
                </div>
              </td>

              <td className="px-6 py-4">{client.email}</td>
              <td className="px-6 py-4">{client.phone}</td>
              <td className="px-6 py-4">{client.gstNumber}</td>
              <td className="px-6 py-4">{`${client.address.city}, ${client.address.state}`}</td>

              {/* Status Badge */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[client.status]
                  }`}
                >
                  {client.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded-md transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-md transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-md transition-colors">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
