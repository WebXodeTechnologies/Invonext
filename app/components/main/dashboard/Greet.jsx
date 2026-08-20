"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const quotes = [
  "Streamline your invoicing & boost your revenue today 🚀",
  "Every invoice paid is a milestone in business growth 💰",
  "Effortless GST billing for ambitious enterprises ⚡",
  "Keep track of your clients, payments, and invoices seamlessly 💼",
  "Consistency and clarity build long-term business trust ✨",
];

const Greet = () => {
  const [randomQuote, setRandomQuote] = useState("");
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote);

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        const result = await response.json();
        if (result.success) {
          setDbUser(result.data);
        }
      } catch (error) {
        console.error("Error fetching user from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="w-full rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 animate-pulse shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3.5 w-full max-w-xl">
            <div className="flex gap-2.5">
              <div className="h-6 w-32 bg-slate-100 rounded-full" />
              <div className="h-6 w-28 bg-slate-100 rounded-full" />
            </div>
            <div className="h-8 w-3/4 sm:w-80 bg-slate-100 rounded-2xl" />
            <div className="h-4 w-full sm:w-96 bg-slate-100 rounded-lg" />
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="h-12 w-full lg:w-36 bg-slate-100 rounded-2xl" />
            <div className="h-12 w-full lg:w-32 bg-slate-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const userName = dbUser?.name || "Business Owner";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-sm hover:shadow-md hover:border-indigo-200/80 transition-all duration-300 group">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-linear-to-br from-indigo-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-50/50 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Info Section */}
        <div className="space-y-3 max-w-2xl">
          {/* Metadata Badges */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-indigo-50 to-indigo-100/60 text-indigo-700 text-[11px] sm:text-xs font-bold border border-indigo-200/60 shadow-xs">
              <Zap
                size={13}
                className="text-amber-500 fill-amber-500 shrink-0"
              />
              <span>GST Workspace</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-slate-600 text-[11px] sm:text-xs font-semibold bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
              <Calendar size={13} className="text-indigo-600 shrink-0" />
              <span>{currentDate}</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <TrendingUp size={12} /> Live Active
            </span>
          </div>

          {/* Greeting Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3 flex-wrap">
            <span>Welcome back, {userName}</span>
            <span className="animate-bounce inline-block text-2xl sm:text-3xl origin-bottom-right">
              👋
            </span>
          </h1>

          {/* Inspiring Quote / Subtitle */}
          {randomQuote && (
            <p className="text-slate-500 text-xs sm:text-sm font-medium pt-0.5 flex items-center gap-2 leading-relaxed">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span className="truncate sm:whitespace-normal">
                {randomQuote}
              </span>
            </p>
          )}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
          {/* Primary Action: Create Invoice */}
          <Link href="/dashboard/Invoices/new" className="flex-1 lg:flex-none">
            <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 cursor-pointer group/btn">
              <PlusCircle
                size={18}
                className="shrink-0 group-hover/btn:rotate-90 transition-transform duration-300"
              />
              <span className="whitespace-nowrap">Create Invoice</span>
            </button>
          </Link>

          {/* Secondary Action: Add Client */}
          <Link href="/dashboard/clients" className="flex-1 lg:flex-none">
            <button className="w-full inline-flex items-center justify-center gap-2 px-4.5 py-3.5 bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 active:scale-[0.98] text-slate-700 font-bold rounded-2xl text-xs sm:text-sm transition-all duration-200 border border-slate-200/90 cursor-pointer group/btn2">
              <span className="whitespace-nowrap">Add Client</span>
              <ArrowUpRight
                size={16}
                className="shrink-0 group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Greet;
