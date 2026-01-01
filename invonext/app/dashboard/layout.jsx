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
          // Professional styling for your SaaS
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#4f46e5", // Indigo-600 to match your theme
              secondary: "#ffffff",
            },
          },
        }}
      />
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
