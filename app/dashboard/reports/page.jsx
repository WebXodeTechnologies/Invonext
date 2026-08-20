import React from 'react'
import PaymentStatusTable from './components/PaymentStatusTable'
import RevenueBreakdown from './components/RevenueBreakdown'
import CustomerBalanceTable from './components/CustomerBalanceTable'
import ReportHeader from './components/ReportHeader'

const page = () => {
  const mockPayments = [
  { id: "INV-2026-001", client: "Annaai Agro Tradings", date: "Jan 10, 2026", amount: "₹59,000", status: "paid" },
  { id: "INV-2026-002", client: "Green Field Exports", state: "Maharashtra", date: "Jan 15, 2026", amount: "₹1,18,000", status: "unpaid" },
  { id: "INV-2026-003", client: "Tech Solutions", date: "Jan 20, 2026", amount: "₹25,500", status: "unpaid" },
];

const mockRevenue = [
  { name: "Web Development", count: 12, total: "₹8,50,000", percentage: 70 },
  { name: "SEO & Marketing", count: 5, total: "₹2,20,000", percentage: 45 },
  { name: "Consulting", count: 3, total: "₹1,75,000", percentage: 25 },
];

const mockBalances = [
  { client: "Annaai Agro Tradings", total: "2,50,000", paid: "2,00,000", pending: "50,000" },
  { client: "Green Field Exports", total: "1,18,000", paid: "0", pending: "1,18,000" },
  { client: "Tech Solutions", total: "85,000", paid: "85,000", pending: "0" },
]

  return (
    <div className="p-8 space-y-10">
      <ReportHeader title="Billing & Collections" />
      <div className="flex justify-between items-end">
         <h1 className="text-3xl font-black text-gray-900 uppercase">Reports</h1>
         <div className="text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Generated on {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <PaymentStatusTable data={mockPayments} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueBreakdown data={mockRevenue} />
          <CustomerBalanceTable data={mockBalances} />
        </div>
      </div>
    </div>
  )
}

export default page