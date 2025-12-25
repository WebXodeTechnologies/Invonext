"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Providers from "./Providers";

export default function DashboardLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetch("/api/user", { credentials: "include" })
        .then((res) => res.json())
        .catch(() => {});
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Providers>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex flex-col flex-1">
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 my-20 px-2 py-4 overflow-scroll">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
