"use client";

import React from "react";
import { Plus, Trash2, PackagePlus } from "lucide-react";

export default function ItemSection({
  items = [],
  setItems,
  isReadOnly = false,
}) {
  const addItem = () => {
    if (isReadOnly) return;
    setItems([...items, { description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    if (isReadOnly) return;
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    if (isReadOnly) return;
    const next = [...items];
    next[index][field] = value;

    // Auto calculate line amount
    const qty =
      Number(field === "quantity" ? value : next[index].quantity) || 0;
    const rate =
      Number(
        field === "rate" ? value : (next[index].rate ?? next[index].price ?? 0),
      ) || 0;
    next[index].amount = Math.round(qty * rate * 100) / 100;

    setItems(next);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base tracking-tight">
          <PackagePlus className="text-indigo-600" size={18} /> Product &
          Service Line Items
        </h2>
        {!isReadOnly && (
          <button
            type="button"
            onClick={addItem}
            className="text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-indigo-100 cursor-pointer active:scale-95 shadow-xs"
          >
            <Plus size={14} /> Add Item
          </button>
        )}
      </div>

      <div className="space-y-3.5">
        {items.map((item, index) => {
          const currentRate = item.rate ?? item.price ?? 0;
          const lineTotal =
            (Number(item.quantity) || 0) * (Number(currentRate) || 0);

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-end p-4 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:border-slate-300 transition-all duration-200"
            >
              {/* Description */}
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Description / Service Title
                </label>
                <input
                  type="text"
                  value={item.description || ""}
                  disabled={isReadOnly}
                  placeholder="e.g. Cloud Hosting & Maintenance (Monthly)"
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all disabled:bg-slate-100"
                />
              </div>

              {/* Quantity */}
              <div className="w-full md:w-24 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Qty
                </label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  disabled={isReadOnly}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      Math.max(1, Number(e.target.value)),
                    )
                  }
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 transition-all disabled:bg-slate-100"
                />
              </div>

              {/* Unit Rate */}
              <div className="w-full md:w-32 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Rate (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={currentRate}
                  disabled={isReadOnly}
                  onChange={(e) =>
                    updateItem(index, "rate", Number(e.target.value))
                  }
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 transition-all disabled:bg-slate-100"
                />
              </div>

              {/* Line Amount Display */}
              <div className="w-full md:w-28 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Line Total
                </label>
                <div className="p-2.5 bg-slate-100/90 border border-slate-200/80 rounded-xl text-xs font-black text-slate-900 text-right">
                  ₹{lineTotal.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Remove Action */}
              {!isReadOnly && items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-100 cursor-pointer self-end md:self-auto"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
