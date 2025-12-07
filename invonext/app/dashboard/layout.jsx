"use client";

import Sidebar from "./components/Sidebar";
import Nav from "./components/Navbar";
import Providers from "./Providers"; 

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <div className="flex min-h-screen">
        {/* Sidebar on left */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <Nav />

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
