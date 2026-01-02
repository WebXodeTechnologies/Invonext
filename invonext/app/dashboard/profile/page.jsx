"use client";
import React, { useState } from "react";
import { LuUser, LuMail, LuPhone, LuShieldCheck, LuCamera, LuSave } from "react-icons/lu";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Akash S M",
    role: "MERN Stack Developer",
    email: "akash@example.com",
    phone: "+91 98765 43210",
    avatar: null
  });

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setProfile({ ...profile, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 shadow-xl bg-gray-100">
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-indigo-300">
                <LuUser size={60} />
              </div>
            )}
          </div>
          <label className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full text-white cursor-pointer hover:bg-indigo-700 transition-all shadow-lg">
            <LuCamera size={18} />
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          </label>
        </div>

        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{profile.name}</h1>
          <p className="text-indigo-600 font-bold uppercase text-xs tracking-[0.2em]">{profile.role}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
            <LuShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase">Verified Developer</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <ProfileInput label="Full Name" icon={<LuUser />} value={profile.name} />
        <ProfileInput label="Email Address" icon={<LuMail />} value={profile.email} />
        <ProfileInput label="Phone Number" icon={<LuPhone />} value={profile.phone} />
        
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Security</label>
          <button className="text-left p-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-all">
            Change Password
          </button>
        </div>

        <div className="md:col-span-2 pt-6 flex justify-center items-center">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-900 transition-all shadow-xl shadow-gray-200">
            <LuSave size={18} /> Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Clean UI Component
const ProfileInput = ({ label, icon, value }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">{icon}</span>
      <input 
        defaultValue={value}
        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
      />
    </div>
  </div>
);

export default ProfilePage;