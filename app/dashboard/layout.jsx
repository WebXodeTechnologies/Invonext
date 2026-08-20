"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#4f46e5",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Container */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Navbar />

          {/* Page Body */}
          <main className="flex-1 pt-20 pb-8 px-4 md:px-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
