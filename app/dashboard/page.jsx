import React from "react";
import Greet from "../components/main/dashboard/Greet";
import StatsCards from "../components/main/dashboard/StatsCards";
import ClientOverview from "../components/main/dashboard/ClientOverview";
import TaskOverview from "../components/main/dashboard/TaskOverview";
import ClientPaymentTable from "../components/main/dashboard/ClientPaymentTable";

export const metadata = {
  title: "Dashboard — InvoNext Premium Invoicing",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto pb-6">
      <Greet />
      <StatsCards />
      <ClientOverview />
      <ClientPaymentTable />
      <TaskOverview />
    </div>
  );
}
