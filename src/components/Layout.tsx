import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Recycle, History, MapPin, Users, Trophy, Gift, User } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Recycle, label: 'Trade', path: '/trade' },
  { icon: History, label: 'History', path: '/history' },
  { icon: MapPin, label: 'Centers', path: '/centers' },
  { icon: Users, label: 'Forum', path: '/community' },
  { icon: Trophy, label: 'Ranks', path: '/leaderboard' },
  { icon: Gift, label: 'Rewards', path: '/rewards' },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-50 pb-24 font-sans text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Recycle className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">EcoTrade</span>
        </div>
        <NavLink to="/profile" className="p-2 bg-neutral-100 rounded-full">
          <User className="w-5 h-5 text-neutral-600" />
        </NavLink>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 px-2 pt-2 pb-6 safe-area-bottom">
        <div className="max-w-md mx-auto grid grid-cols-7 gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 p-1 rounded-xl transition-all duration-200",
                  isActive ? "text-green-600 bg-green-50 scale-105" : "text-neutral-400 hover:text-neutral-600"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
