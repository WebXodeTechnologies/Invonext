import React from 'react'
import ClientHeader from './components/clientHeader'
import ClientsTable from './components/ClientsTable'

const page = () => {
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

  return (
    <section>
      <ClientHeader clients={clients}/>
      <ClientsTable/>
    </section>
  )
}

export default page