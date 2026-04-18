import React from 'react';
import { useAuth } from '../lib/auth';
import { LogOut, User as UserIcon, Settings, Shield, Bell, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-green-100 rounded-[32px] flex items-center justify-center text-green-600 text-3xl font-black shadow-lg shadow-green-50">
          {user.name[0]}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-neutral-400 font-medium">{user.email}</p>
        </div>
        <div className="inline-flex bg-neutral-100 px-4 py-2 rounded-full text-xs font-bold items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Member since {new Date(user.joinDate).getFullYear()}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-neutral-100 text-center">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Points Balance</p>
          <p className="text-xl font-black text-green-600">{user.points}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-neutral-100 text-center">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Level</p>
          <p className="text-xl font-black text-blue-600">{user.level}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest px-2 mb-2">Account Settings</p>
        {[
          { icon: Settings, label: 'Preferences', color: 'text-neutral-600' },
          { icon: Shield, label: 'Privacy & Security', color: 'text-neutral-600' },
          { icon: Bell, label: 'Notifications', color: 'text-neutral-600' },
          { icon: HelpCircle, label: 'Help Center', color: 'text-neutral-600' },
        ].map((item, idx) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-50 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-50 rounded-xl">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="font-bold text-sm text-neutral-700">{item.label}</span>
            </div>
            <div className="w-6 h-6 bg-neutral-50 rounded-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-neutral-300 rotate-45" />
            </div>
          </motion.button>
        ))}
      </div>

      <button 
        onClick={logout}
        className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>

      <div className="p-6 bg-green-50 rounded-3xl text-center space-y-2 border border-green-100">
        <p className="text-xs font-bold text-green-800 italic">“Every piece of plastic you recycle makes Ghana a better place for our children.”</p>
      </div>
    </div>
  );
}
