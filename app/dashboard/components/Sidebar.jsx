"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  CheckCheck,
  Settings,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  {
    label: "Invoices",
    href: "/dashboard/Invoices",
    icon: FileText,
    badge: "New",
  },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckCheck },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActiveRoute = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const userAvatar =
    user?.imageUrl ||
    "https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff";
  const userName = user?.fullName || user?.firstName || "Akash";
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || "user@invonext.com";

  return (
    <>
      {/* 1. MOBILE TOP HEADER (Fixed on mobile screens) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 flex items-center justify-between z-40">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Zap size={18} className="fill-white/20 text-white" />
          </div>
          <span className="text-lg font-black text-indigo-600 tracking-tight">
            Invo<span className="text-slate-900">Nxt</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors active:scale-95"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* 2. MOBILE FULLSCREEN OVERLAY DRAWER */}
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-out Panel */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm bg-white z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Zap size={18} className="fill-white/20 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-indigo-600 tracking-tight leading-none">
                Invo<span className="text-slate-900">Nxt</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Smart Invoicing
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-700 active:scale-[0.98]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    size={20}
                    className={isActive ? "text-white" : "text-slate-500"}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer Account Profile Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={userAvatar}
                alt="Avatar"
                className="w-9 h-9 rounded-lg object-cover ring-2 ring-indigo-100 shrink-0"
              />
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-slate-900 truncate leading-tight">
                  {userName}
                </span>
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {userEmail}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => signOut()}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. DESKTOP SIDEBAR (Visible on >= md screens) */}
      <aside
        className={`relative top-0 h-screen bg-white border-r border-slate-200/80 transition-all duration-300 flex-col z-30 ${
          collapsed ? "w-20" : "w-64"
        } hidden md:flex select-none shrink-0`}
      >
        {/* Header */}
        <div
          className={`h-16 px-4 flex items-center border-b border-slate-100 ${
            collapsed ? "justify-center relative" : "justify-between"
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-3 overflow-hidden group"
            title={collapsed ? "InvoNxt" : ""}
          >
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Zap size={19} className="fill-white/20 text-white" />
            </div>

            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xl font-semibold text-indigo-600 tracking-tight leading-none">
                  Invo<span className="text-slate-900">Nxt</span>
                </span>
                <span className="text-[12px] font-semibold text-slate-900 tracking-normal mt-0.5">
                  Smart Invoicing
                </span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl text-slate-400 transition-colors cursor-pointer shrink-0 ${
              collapsed
                ? "absolute -right-3 top-5 bg-white border border-slate-200 shadow-sm z-50 hover:border-indigo-200"
                : ""
            }`}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Desktop Navigation Items */}
        <nav
          className={`flex-1 overflow-y-auto py-6 space-y-1 ${
            collapsed ? "px-2.5" : "px-3"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                title={collapsed ? item.label : ""}
                className={`group relative flex items-center rounded-xl text-sm font-bold transition-all duration-150 ${
                  collapsed
                    ? "justify-center p-3"
                    : "justify-between px-3.5 py-2.5"
                } ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <div
                  className={`flex items-center gap-3 truncate ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <Icon
                    size={19}
                    className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-white"
                        : "text-slate-700 group-hover:text-indigo-600"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Footer Profile */}
        <div
          className={`p-3 border-t border-slate-100 bg-slate-50/50 ${
            collapsed ? "flex justify-center" : ""
          }`}
        >
          <div
            className={`flex items-center rounded-xl bg-white border border-slate-200/70 shadow-sm ${
              collapsed ? "p-1.5 justify-center" : "p-2 justify-between"
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={userAvatar}
                alt="Avatar"
                title={collapsed ? `${userName} (${userEmail})` : ""}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-100 shrink-0"
              />
              {!collapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-slate-900 truncate leading-tight">
                    {userName}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold truncate">
                    {userEmail}
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                type="button"
                onClick={() => signOut()}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
