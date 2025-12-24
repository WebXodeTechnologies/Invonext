"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import { useClerk } from "@clerk/nextjs";
import {
  Bell,
  Maximize2,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

/* ---------------- ROUTES (single source) ---------------- */

const ROUTES = {
  dashboard: "/dashboard",
  invoices: "/dashboard/invoices",
  newInvoice: "/dashboard/invoices/new",
  clients: "/dashboard/clients",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",
};

/* ---------------- DUMMY NOTIFICATIONS ---------------- */

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

  /* ---------------- HANDLERS ---------------- */

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
    await signOut({ redirectUrl: "/sign-in" });
  };

  /* ---------------- UI ---------------- */

  return (
    <header className="w-[90%] md:w-[80%] mx-auto py-4">
      <div className="flex items-center justify-between h-16 px-4 rounded-xl">
        {/* BRAND */}
        <div className="flex items-center gap-3">
          <Image
            src="/Logo/blog-svgrepo-com (1).svg"
            width={50}
            height={50}
            alt="Invo-Nxt Logo"
            className="rounded-md"
          />
          <h2 className="text-2xl md:text-3xl font-semibold italic">
            Invo-Nxt
          </h2>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={ROUTES.newInvoice}>
            <button className="bg-white hover:bg-gray-100 dark:text-black px-5 py-2 rounded-lg font-medium shadow-sm">
              + New Invoice
            </button>
          </Link>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg cursor-pointer"
          >
            <Maximize2 size={22} />
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenNotif(!openNotif);
                setOpenProfile(false);
              }}
              className="p-2 rounded-lg relative cursor-pointer"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-3 w-72 bg-white dark:text-black shadow-xl rounded-xl p-3 z-40">
                <h3 className="font-semibold mb-2 text-sm">Notifications</h3>
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.link}
                      onClick={closeMenus}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                    >
                      {n.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ThemeSwitcher />

          {/* PROFILE */}
          <div className="relative ">
            <button
              onClick={() => {
                setOpenProfile(!openProfile);
                setOpenNotif(false);
              }}
              className="flex items-center gap-2 p-1 rounded-full cursor-pointer"
            >
              <Image
                src="/assets/navbar/hacker.png"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <ChevronDown size={20} />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:text-black shadow-xl rounded-xl p-3 z-40">
                <Link
                  href={ROUTES.profile}
                  onClick={closeMenus}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
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

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden mt-4 bg-white dark:text-black p-4 rounded-xl shadow-lg space-y-3">
          <Link
            href={ROUTES.newInvoice}
            onClick={closeMenus}
            className="block px-4 py-2 rounded-lg bg-gray-100 text-center font-medium"
          >
            + New Invoice
          </Link>

          <div className="flex items-center justify-between py-2">
            <span>Theme</span>
            <ThemeSwitcher />
          </div>

          <hr />

          <h3 className="font-semibold text-sm dark:text-black">Notifications</h3>
          {notifications.map((n) => (
            <Link
              key={n.id}
              href={n.link}
              onClick={closeMenus}
              className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            >
              {n.text}
            </Link>
          ))}

          <hr />

          <Link
            href={ROUTES.profile}
            onClick={closeMenus}
            className="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            My Profile
          </Link>

          <Link
            href={ROUTES.settings}
            onClick={closeMenus}
            className="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
