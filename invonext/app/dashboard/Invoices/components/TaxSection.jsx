"use client";

export default function TaxSection({ taxType, setTaxType }) {
  const options = [
    { id: "NO_GST", label: "No GST" },
    { id: "GST_TN", label: "Tamil Nadu (CGST + SGST)" },
    { id: "IGST", label: "Out of State (IGST)" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="font-bold text-gray-800 mb-4">Tax Settings</h2>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.id} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${taxType === opt.id ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-gray-50'}`}>
            <input 
              type="radio" 
              name="taxType" 
              checked={taxType === opt.id} 
              onChange={() => setTaxType(opt.id)} 
              className="hidden" 
            />
            <span className={`text-sm font-semibold ${taxType === opt.id ? 'text-indigo-600' : 'text-gray-600'}`}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}