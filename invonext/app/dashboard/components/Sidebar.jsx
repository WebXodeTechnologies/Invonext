"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";


const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Invoices", href: "/dashboard/Invoices", icon: FileText },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Layout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  

  const isActiveRoute = (href) => pathname === href;

  return (
    <div className="">
      {/* Sidebar */}
       <aside
      className={`
        sticky top-16 h-[calc(100vh-4rem)]
        bg-white border-r border-gray-200
        transition-all duration-300 py-5
        ${collapsed ? "w-20" : "w-80"}
         md:flex flex-col
      `}
    >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
           
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900">InvoNxt</span>
                <span className="text-xs text-gray-500">Invoice Management</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition
                  ${isActive
                    ? "bg-indigo-50 text-indigo-600 shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"}`}
              >
                <Icon
                  size={18}
                  className={`${
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-500 group-hover:text-indigo-500"
                  }`}
                />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 py-4 text-xs text-gray-500 border-t border-gray-200">
            © {new Date().getFullYear()} InvoNxt
            <div className="mt-1">Built for business</div>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <div
        className={`flex-1 ml-${collapsed ? "20" : "64"} transition-all duration-300 flex flex-col`}
      >
        {/* Fixed Navbar */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 flex items-center px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="mt-16 p-6 overflow-auto h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
