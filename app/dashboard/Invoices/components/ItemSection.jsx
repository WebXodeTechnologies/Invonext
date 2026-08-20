"use client";

import React from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { RiFileEditFill } from "react-icons/ri";

export default function ItemSection({ items, setItems, disabled = false }) {
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 text-[15px]">
          <RiFileEditFill className="text-indigo-600" size={18} /> Product Details
        </h2>
        <button
          type="button"
          onClick={addItem}
          disabled={disabled}
          className="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 transition-all disabled:opacity-50"
        >
          <LuPlus size={16} /> Add Product
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 items-end animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
              <input
                type="text"
                value={item.description}
                placeholder="Service or Product name"
                onChange={(e) => updateItem(index, "description", e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div className="w-full md:w-24 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Qty</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div className="w-full md:w-32 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</label>
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-0.5 border border-transparent hover:border-red-100"
            >
              <LuTrash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}