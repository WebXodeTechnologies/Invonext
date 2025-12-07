"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "../ThemeSwitcher";

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

// Dummy Notifications
const notifications = [
  { id: 1, text: "New invoice created", link: "/invoice/123" },
  { id: 2, text: "Payment received ₹4,500", link: "/payments" },
  { id: 3, text: "Client updated profile", link: "/clients" },
];

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="w-[90%] md:w-[80%] mx-auto py-4">
      <div className="flex items-center justify-between h-16 px-4 rounded-xl bg-transparent">
        {/* LEFT — BRAND */}
        <div className="flex items-center gap-3">
          <Image
            src="/Logo/blog-svgrepo-com (1).svg"
            width={55}
            height={55}
            alt="logo"
            className="rounded-md"
          />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight italic">
            Invo-Nxt
          </h2>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-6">
          {/* NEW INVOICE */}
          <Link href="/invoice/create">
            <button className="bg-white hover:bg-gray-100 text-black dark:bg-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm">
              + New Invoice
            </button>
          </Link>

          {/* FULLSCREEN */}
          <button
            onClick={() => document.documentElement.requestFullscreen()}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition relative"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* NOTIFICATION DROPDOWN */}
            {openNotif && (
              <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-white shadow-xl rounded-xl p-3 border border-gray-100 dark:border-gray-700 z-40">
                <h3 className="font-semibold mb-2 text-sm text-white dark:text-black">
                  Notifications
                </h3>
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.link}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-black text-sm"
                    >
                      {n.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* THEME SWITCHER */}
          <ThemeSwitcher />

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenProfile(!openProfile);
                setOpenNotif(false);
              }}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-200 transition"
            >
              <Image
                src="/assets/navbar/hacker.png"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full shadow-sm"
              />
              <ChevronDown size={20} />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-200 shadow-xl rounded-xl p-3 border border-gray-100 dark:border-gray-700 z-40 text-white dark:text-black">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <User size={18} /> My Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <Settings size={18} /> Settings
                </Link>

                <hr className="my-2 border-gray-300 dark:border-gray-700" />

                <button className="flex items-center gap-2 w-full px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden block p-2"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileMenu && (
        <div className="md:hidden mt-4 bg-white dark:bg-gray-200 p-4 rounded-xl shadow-lg text-white dark:text-black">
          <Link
            href="/invoice/create"
            className="block px-4 py-2 rounded-lg bg-white text-black font-medium text-center mb-3"
          >
            + New Invoice
          </Link>

          <div className="flex items-center justify-between py-2">
            <span>Theme</span>
            <ThemeSwitcher />
          </div>

          <hr className="my-2" />

          {/* Notifications */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Notifications</h3>

            <div className="space-y-2">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 text-sm"
                >
                  {n.text}
                </Link>
              ))}
            </div>
          </div>

          <hr className="my-2" />

          {/* Profile Actions */}
          <Link
            href="/profile"
            className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200"
          >
            My Profile
          </Link>

          <Link
            href="/settings"
            className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200"
          >
            Settings
          </Link>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mt-2">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
