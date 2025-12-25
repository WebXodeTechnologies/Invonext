"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Bell, Maximize2, LogOut, Settings, User, Menu, X, ChevronDown } from "lucide-react";

const ROUTES = {
  dashboard: "/dashboard",
  invoices: "/dashboard/invoices",
  newInvoice: "/dashboard/invoices/new",
  clients: "/dashboard/clients",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",
};

const notifications = [
  { id: 1, text: "New invoice created", link: ROUTES.invoices },
  { id: 2, text: "Payment received ₹4,500", link: ROUTES.invoices },
  { id: 3, text: "Client updated profile", link: ROUTES.clients },
];

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const closeMenus = () => {
    setOpenProfile(false);
    setOpenNotif(false);
    setMobileMenu(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    router.push("/sign-in");
    setLoading(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 px-4 py-4 md:px-8 flex items-center justify-between">
      {/* BRAND */}
      <div className="flex items-center gap-3">
        <Image
          src="/Logo/blog-svgrepo-com (1).svg"
          width={40}
          height={40}
          alt="Invo-Nxt Logo"
        />
        <h2 className="text-xl sm:text-2xl font-semibold italic text-gray-900 md:hidden lg:block">
          InvoNxt
        </h2>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-4">
        <Link href={ROUTES.newInvoice}>
          <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-4 py-2 rounded-lg font-medium shadow-sm transition">
            + New Invoice
          </button>
        </Link>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Maximize2 size={22} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setOpenNotif(!openNotif); setOpenProfile(false); }}
            className="p-2 rounded-lg hover:bg-gray-100 transition relative"
          >
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {openNotif && (
            <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-xl p-3 z-50">
              <h3 className="font-semibold mb-2 text-sm text-gray-900">Notifications</h3>
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link}
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                >
                  {n.text}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setOpenProfile(!openProfile); setOpenNotif(false); }}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <Image
              src="/assets/navbar/hacker.png"
              alt="Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <ChevronDown size={18} />
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl p-3 z-50">
              <Link
                href={ROUTES.profile}
                onClick={closeMenus}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <User size={18} /> My Profile
              </Link>

              <Link
                href={ROUTES.settings}
                onClick={closeMenus}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <Settings size={18} /> Settings
              </Link>

              <hr className="my-2 border-gray-200" />

              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU TOGGLE */}
      <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 z-50">
        {mobileMenu ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE MENU BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenu(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo/blog-svgrepo-com (1).svg"
              width={36}
              height={36}
              alt="Invo-Nxt Logo"
            />
            <span className="font-semibold text-lg text-gray-900">Invo-Nxt</span>
          </div>
          <button onClick={() => setMobileMenu(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-3">
          <Link
            href={ROUTES.newInvoice}
            onClick={() => setMobileMenu(false)}
            className="block text-center bg-indigo-100 text-indigo-600 font-medium py-2 rounded-lg hover:bg-indigo-200"
          >
            + New Invoice
          </Link>
          <hr className="border-gray-200" />
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          {notifications.map((n) => (
            <Link
              key={n.id}
              href={n.link}
              onClick={() => setMobileMenu(false)}
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              {n.text}
            </Link>
          ))}
          <hr className="border-gray-200" />
          <Link
            href={ROUTES.profile}
            onClick={() => setMobileMenu(false)}
            className="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            href={ROUTES.settings}
            onClick={() => setMobileMenu(false)}
            className="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
}
