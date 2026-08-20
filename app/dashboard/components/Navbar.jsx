"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Bell,
  Maximize2,
  LogOut,
  User,
  ChevronDown,
  PlusCircle,
  Search,
  Zap,
  Command,
  FileText,
  Users,
  X,
  CheckCheck,
  Receipt,
  Kanban,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";

const ROUTES = {
  dashboard: "/dashboard",
  invoices: "/dashboard/Invoices",
  newInvoice: "/dashboard/Invoices/new",
  clients: "/dashboard/clients",
  profile: "/dashboard/profile",
};

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch Notifications from DB
  const fetchNotifications = async () => {
    try {
      setLoadingNotifs(true);
      const res = await fetch("/api/notifications");
      const json = await res.json();
      if (json.success) {
        setNotifications(json.data || []);
        setUnreadCount(json.unreadCount || 0);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoadingNotifs(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for fresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      await fetch("/api/notifications", {
        method: "PATCH",
        body: JSON.stringify({}),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Mark single notification as read & navigate
  const handleNotificationClick = async (notif) => {
    try {
      if (!notif.isRead) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n)),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
        await fetch("/api/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId: notif._id }),
        });
      }
      setOpenNotif(false);
      router.push(notif.link || ROUTES.dashboard);
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CMD/CTRL + K Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileSearchOpen(true);
        } else {
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "Just now";
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case "invoice":
        return <Receipt size={14} className="text-emerald-600" />;
      case "task":
        return <Kanban size={14} className="text-indigo-600" />;
      case "profile":
        return <Building2 size={14} className="text-purple-600" />;
      case "client":
        return <Users size={14} className="text-blue-600" />;
      default:
        return <Sparkles size={14} className="text-amber-600" />;
    }
  };

  const userAvatar =
    user?.imageUrl ||
    "https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff";
  const userName = user?.fullName || user?.firstName || "Account Owner";
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || "user@invonext.com";

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-30 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-xs">
      {/* 1. BRAND LOGO (Mobile only) */}
      <div className="flex items-center gap-2.5 md:hidden">
        <Link href={ROUTES.dashboard} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Zap size={16} className="fill-white/20 text-white" />
          </div>
          <span className="text-lg font-black text-indigo-600 tracking-tight">
            Invo<span className="text-slate-900">Nxt</span>
          </span>
        </Link>
      </div>

      {/* 2. DESKTOP SEARCH BAR */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md lg:max-w-lg">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search invoices, clients, tax reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-14 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shadow-xs">
              <Command size={10} /> K
            </kbd>
          </div>
        </div>

        <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
          Live
        </span>
      </div>

      {/* 3. RIGHT CONTROLS SECTION */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          aria-label="Open search"
        >
          <Search size={19} />
        </button>

        <Link href={ROUTES.newInvoice}>
          <button className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-200 cursor-pointer">
            <PlusCircle size={16} />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">Invoice</span>
          </button>
        </Link>

        <div className="hidden sm:block h-6 w-px bg-slate-200 mx-0.5" />

        <button
          onClick={toggleFullscreen}
          className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 size={18} />
        </button>

        {/* Dynamic Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setOpenNotif(!openNotif);
              setOpenProfile(false);
              if (!openNotif) fetchNotifications();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {openNotif && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 shadow-2xl rounded-3xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <Bell size={15} className="text-indigo-600" /> Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] text-rose-700 font-extrabold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                      {unreadCount} Unread
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                )}
              </div>

              {/* Notification Stream */}
              <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-700">
                      No activity yet
                    </p>
                    <p className="text-[11px] text-slate-400">
                      All updates and logs will stream here.
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => handleNotificationClick(n)}
                      className={`pt-2 first:pt-0 p-2.5 rounded-2xl transition cursor-pointer flex items-start gap-3 ${
                        !n.isRead
                          ? "bg-indigo-50/40 border border-indigo-100/60"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white border border-slate-200/60 shadow-2xs shrink-0 mt-0.5">
                        {getNotifIcon(n.type)}
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                            <Clock size={10} /> {formatTimeAgo(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                          {n.message}
                        </p>
                      </div>

                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Account Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setOpenProfile(!openProfile);
              setOpenNotif(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <img
              src={userAvatar}
              alt="Avatar"
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-100"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {userName}
              </span>
              <span className="text-[9px] text-indigo-600 font-extrabold uppercase tracking-wider">
                Pro Account
              </span>
            </div>
            <ChevronDown size={14} className="hidden sm:block text-slate-400" />
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/70 rounded-xl mb-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {userName}
                </p>
                <p className="text-[10px] text-slate-500 font-medium truncate">
                  {userEmail}
                </p>
              </div>

              <Link
                href={ROUTES.profile}
                onClick={() => setOpenProfile(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition"
              >
                <User size={15} /> My Profile
              </Link>

              <Link
                href={ROUTES.invoices}
                onClick={() => setOpenProfile(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition"
              >
                <FileText size={15} /> Invoices
              </Link>

              <Link
                href={ROUTES.clients}
                onClick={() => setOpenProfile(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition"
              >
                <Users size={15} /> Clients Directory
              </Link>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. MOBILE SEARCH MODAL */}
      {mobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md p-4 flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                autoFocus
                placeholder="Search clients, invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2.5 bg-slate-100 text-slate-600 rounded-xl cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
