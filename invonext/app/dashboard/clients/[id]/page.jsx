"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { State, City } from "country-state-city";
import { LuUserPlus, LuBuilding, LuMapPin } from "react-icons/lu";
import { RiUploadCloud2Line } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";


const ClientCreationPage = () => {
  const router = useRouter();
  const COUNTRY_CODE = "IN"; // Defaulting to India

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    website: "",
    postalCode: "",
    country: "India",
    state: "",
    stateCode: "",
    city: "",
    address: "",
    notes: "",
    companyName: "",
    profile: null,
    gstin: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load States on Mount
  useEffect(() => {
     
    setStates(State.getStatesOfCountry(COUNTRY_CODE));
  }, []);

  // Sync Cities when State changes
  useEffect(() => {
    if (formData.stateCode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCities(City.getCitiesOfState(COUNTRY_CODE, formData.stateCode));
    } else {
      setCities([]);
    }
  }, [formData.stateCode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormData({ ...formData, profile: files[0] });
    } else if (name === "state") {
      const selectedState = states.find((s) => s.name === value);
      setFormData({
        ...formData,
        state: value,
        stateCode: selectedState?.isoCode || "",
        city: "", // Reset city when state changes
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const data = new FormData();

    // 1. Handle the profile image (Cloudinary trigger)
    // Make sure the key is 'file' to match the backend data.get("file")
    if (formData.profile) {
      data.append("file", formData.profile);
    }

    // 2. Map fields to match your Mongoose Schema
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("name", `${formData.firstName} ${formData.lastName}`);
    data.append("email", formData.email);
    data.append("phone", formData.contact);
    data.append("website", formData.website);
    data.append("gstNumber", formData.gstin);
    data.append("companyName", formData.companyName);
    data.append("notes", formData.notes);

    // 3. Stringify the address object (Crucial for FormData)
    const addressData = {
      fullAddress: formData.address, // Matches your Schema's 'fullAddress'
      city: formData.city,
      state: formData.state,
      pincode: formData.postalCode,
      country: formData.country || "India",
    };
    data.append("address", JSON.stringify(addressData));

    // 4. API Call
    const res = await fetch("/api/clients", {
      method: "POST",
      body: data, // No headers needed, browser handles multipart/form-data
    });

    const result = await res.json();

    if (result.success) {
      router.push("/dashboard/clients");
      router.refresh();
    } else {
      // result.message comes from your API's catch block
      alert(result.message || "Failed to create client");
    }
  } catch (error) {
    console.error("❌ Submission Error:", error);
    alert("An error occurred. Check the console for details.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-4">
            <LuUserPlus className="text-indigo-600" /> Add New Client
          </h1>

          <button
            onClick={() => router.back()}
            className="text-sm font-bold text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
          >
            {/* Icon placed before the text */}
            <IoMdArrowRoundBack size={18} />
            <span>Back</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile & Basics */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-4">
              <label
                htmlFor="profile"
                className="group relative w-32 h-32 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-500 transition-all"
              >
                {formData.profile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(formData.profile)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <RiUploadCloud2Line
                      className="mx-auto text-gray-400 group-hover:text-indigo-500"
                      size={24}
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Upload
                    </span>
                  </div>
                )}
              </label>
              <input
                id="profile"
                type="file"
                name="profile"
                hidden
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                label="Contact Number *"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-4">
              <LuBuilding className="text-indigo-600" /> Business Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
              <InputField
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-4">
              <LuMapPin className="text-indigo-600" /> Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                options={states.map((s) => s.name)}
              />
              <SelectField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                options={cities.map((c) => c.name)}
                disabled={!formData.state}
              />
              <InputField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4 pb-12">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-800 transition shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? "Saving..." : "Save Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Components for Clean Code
const InputField = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </label>
    <select
      {...props}
      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default ClientCreationPage;
