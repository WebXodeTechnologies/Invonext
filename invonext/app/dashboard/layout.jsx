"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import Sidebar from "./components/Sidebar";
import Nav from "./components/Navbar";
import Providers from "./Providers";

export default function DashboardLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();

useEffect(() => {
  if (isLoaded && isSignedIn) {
    fetch("/api/user", { credentials: "include" }) // still include cookies
      .then(res => res.json())
      .then(data => console.log("User sync:", data))
      .catch(err => console.error("Error syncing user:", err));
  }
}, [isLoaded, isSignedIn]);


  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Nav />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
