// components/Dashboard/RecentInvoicesTable.jsx
export default function RecentInvoicesTable() {
  const invoices = [
    { id: "INV001", client: "Client A", amount: "$500", status: "Paid", due: "2025-12-28" },
    { id: "INV002", client: "Client B", amount: "$700", status: "Unpaid", due: "2025-12-30" },
    { id: "INV003", client: "Client C", amount: "$300", status: "Paid", due: "2025-12-27" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-auto mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Invoice ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Client</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="px-4 py-2">{inv.id}</td>
              <td className="px-4 py-2">{inv.client}</td>
              <td className="px-4 py-2">{inv.amount}</td>
              <td className={`px-4 py-2 font-medium ${inv.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                {inv.status}
              </td>
              <td className="px-4 py-2">{inv.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
