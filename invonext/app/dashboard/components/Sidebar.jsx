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
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import Logo from "@/public/Logo/blog-svgrepo-com.svg";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Invoices", href: "/dashboard/Invoices", icon: FileText },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActiveRoute = (href) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-64 flex-col bg-white px-4 py-4 border-r border-gray-200 shadow-lg">
        {/* Brand */}
        <div className="flex items-center gap-3 h-16 px-6 border-b border-gray-200">
          <Image
            src="/Logo/blog-svgrepo-com (1).svg"
            width={40}
            height={40}
            alt="Invo-Nxt Logo"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">InvoNxt</span>
            <span className="text-xs text-gray-500">Invoice Management</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = isActiveRoute(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 shadow"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-indigo-500" />
                )}
                <Icon
                  size={18}
                  className={`${
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-500 group-hover:text-indigo-500"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} InvoNxt
          <div className="mt-1">Built for business</div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setMobileOpen(true)}
      >
        <ChevronRight size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="InvoNxt" width={32} height={32} />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">
                InvoNxt
              </span>
              <span className="text-xs text-gray-500">Invoice Management</span>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = isActiveRoute(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 shadow"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-indigo-500" />
                )}
                <Icon
                  size={18}
                  className={`${
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-500 group-hover:text-indigo-500"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} InvoNxt
          <div className="mt-1">Built for business</div>
        </div>
      </aside>
    </>
  );
}
