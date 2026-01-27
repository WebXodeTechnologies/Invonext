"use client";
import React from "react";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const statusColors = {
  Overdue: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-700",
  Paid: "bg-green-100 text-green-700", // Added for DB consistency
};

export default function ClientsTable({ clients, onDelete }) {
  const router = useRouter();

  if (!clients.length) {
    return (
      <div className="w-full p-10 bg-white rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
        No clients found.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-4 py-4 text-left w-16">S.No</th>
              <th className="px-4 py-4 text-left">Client</th>
              <th className="hidden md:table-cell px-4 py-4 text-left">
                Phone
              </th>
              <th className="hidden lg:table-cell px-4 py-4 text-left">
                GST Number
              </th>
              <th className="hidden xl:table-cell px-4 py-4 text-left">
                Location
              </th>
              <th className="px-4 py-4 text-center">Status</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
            {clients.map((client, index) => (
              <tr
                key={client._id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-4 py-4 whitespace-nowrap text-gray-500 font-medium">
                  {index + 1}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src={
                          client.profileImage ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=random&color=fff`
                        }
                        alt={client.name}
                        width={40} // 40px matches h-10 (10 * 4 = 40)
                        height={40} // Added height to fix the error
                        className="w-full h-full object-cover"
                        // Optional: add unoptimized if you want Cloudinary to handle the compression instead of Next.js
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 truncate max-w-[150px]">
                        {client.name}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {client.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell px-4 py-4 text-gray-500">
                  {client.phone}
                </td>

                <td className="hidden lg:table-cell px-4 py-4">
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {client.gstNumber || "N/A"}
                  </span>
                </td>

                <td className="hidden xl:table-cell px-4 py-4 text-gray-600">
                  {client.address?.city}, {client.address?.state}
                </td>

                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${statusColors[client.status] || "bg-gray-100"}`}
                  >
                    {client.status}
                  </span>
                </td>

                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/clients/${client._id}`)
                      }
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/dashboard/clients/edit/${client._id}`)
                      }
                      className="p-2 hover:bg-indigo-50 rounded-full text-indigo-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(client._id, client.name)}
                      className="p-2 hover:bg-red-50 rounded-full text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
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
