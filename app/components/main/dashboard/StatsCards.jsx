"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Clock,
  FileText,
  Users,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json?.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Stats Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-40 rounded-3xl bg-white border border-slate-200/80 p-5 space-y-4 animate-pulse shadow-xs"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-slate-100 rounded-md" />
              <div className="h-10 w-10 bg-slate-100 rounded-2xl" />
            </div>
            <div className="h-8 w-36 bg-slate-100 rounded-xl" />
            <div className="h-4 w-full bg-slate-100 rounded-md pt-2" />
          </div>
        ))}
      </div>
    );
  }

  const summary = stats?.summary || {
    totalRevenue: 0,
    pendingAmount: 0,
    totalInvoices: 0,
    totalClients: 0,
  };

  const cards = [
    {
      title: "Total Paid Revenue",
      emoji: "💰",
      value: summary.totalRevenue,
      isCurrency: true,
      icon: TrendingUp,
      topGradient: "from-emerald-500 via-teal-500 to-emerald-600",
      iconBg:
        "bg-emerald-50 text-emerald-600 border border-emerald-100/80 group-hover:bg-emerald-600 group-hover:text-white",
      glowBg: "from-emerald-100/40 to-transparent",
      badge: "+14.2% Growth",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    },
    {
      title: "Pending Collections",
      emoji: "⏳",
      value: summary.pendingAmount,
      isCurrency: true,
      icon: Clock,
      topGradient: "from-amber-500 via-orange-500 to-amber-600",
      iconBg:
        "bg-amber-50 text-amber-600 border border-amber-100/80 group-hover:bg-amber-600 group-hover:text-white",
      glowBg: "from-amber-100/40 to-transparent",
      badge: "Action Needed",
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/70",
    },
    {
      title: "Total Invoices Created",
      emoji: "🧾",
      value: summary.totalInvoices,
      isCurrency: false,
      icon: FileText,
      topGradient: "from-indigo-600 via-blue-600 to-indigo-700",
      iconBg:
        "bg-indigo-50 text-indigo-600 border border-indigo-100/80 group-hover:bg-indigo-600 group-hover:text-white",
      glowBg: "from-indigo-100/40 to-transparent",
      badge: "Live Billing",
      badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200/70",
    },
    {
      title: "Active Client Base",
      emoji: "👥",
      value: summary.totalClients,
      isCurrency: false,
      icon: Users,
      topGradient: "from-purple-600 via-violet-600 to-purple-700",
      iconBg:
        "bg-purple-50 text-purple-600 border border-purple-100/80 group-hover:bg-purple-600 group-hover:text-white",
      glowBg: "from-purple-100/40 to-transparent",
      badge: "Verified Base",
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200/70",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const formattedValue = card.isCurrency
          ? `₹${Number(card.value || 0).toLocaleString("en-IN")}`
          : Number(card.value || 0).toLocaleString("en-IN");

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:shadow-indigo-900/5 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Top Border Accent */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${card.topGradient}`}
            />

            {/* Subtle Hover Ambient Glow */}
            <div
              className={`absolute -top-16 -right-16 w-36 h-36 bg-linear-to-br ${card.glowBg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none`}
            />

            {/* Header: Title & Icon */}
            <div className="relative z-10 flex items-start justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 leading-snug">
                <span className="text-sm">{card.emoji}</span> {card.title}
              </span>
              <div
                className={`p-2.5 rounded-2xl ${card.iconBg} shrink-0 transition-all duration-300 shadow-xs`}
              >
                <Icon
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Metrics & Status Footer */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-[1.75rem] font-black text-slate-900 tracking-tight truncate">
                {formattedValue}
              </h3>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100/90 text-xs">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border transition-colors ${card.badgeStyle}`}
                >
                  {card.badge} <ArrowUpRight size={12} className="shrink-0" />
                </span>

                <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold inline-flex items-center gap-1 shrink-0">
                  <ShieldCheck size={13} className="text-emerald-500" /> Synced
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
