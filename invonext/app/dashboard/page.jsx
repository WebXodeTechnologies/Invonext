import React from "react";
import Greet from "../components/main/dashboard/Greet";
import StatsCards from "../components/main/dashboard/StatsCards";
import ClientOverview from "../components/main/dashboard/ClientOverview";
import TaskOverview from "../components/main/dashboard/TaskOverview";
import ClientPaymentTable from "../components/main/dashboard/ClientPaymentTable";

export default function DashboardPage() {
  const userName = "Akash";

  return (
    <div className="flex-1 flex flex-col">
      <Greet userName={userName} />
      <StatsCards />
      <ClientOverview />
      <ClientPaymentTable />
      <TaskOverview />
    </div>
  );
}
