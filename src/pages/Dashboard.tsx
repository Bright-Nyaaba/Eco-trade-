import React from 'react';
import { useAuth } from '../lib/auth';
import { TrendingUp, Leaf, Award, ArrowUpRight, ChevronRight, Recycle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';

const mockChartData = [
  { name: 'Mon', kg: 2 },
  { name: 'Tue', kg: 5 },
  { name: 'Wed', kg: 3 },
  { name: 'Thu', kg: 8 },
  { name: 'Fri', kg: 6 },
  { name: 'Sat', kg: 12 },
  { name: 'Sun', kg: 4 },
];

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome & Stats Overview */}
      <section className="space-y-1">
        <p className="text-neutral-500 text-sm font-medium">Hello, {user.name} 👋</p>
        <h1 className="text-2xl font-bold tracking-tight">Your Impact Today</h1>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-green-600 p-4 rounded-3xl text-white shadow-lg shadow-green-200"
        >
          <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mb-3">
            <Leaf className="w-4 h-4" />
          </div>
          <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Carbon Saved</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold">{user.carbonSaved.toFixed(1)}</span>
            <span className="text-xs font-medium">kg CO2</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-sky-600 p-4 rounded-3xl text-white shadow-lg shadow-sky-200"
        >
          <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mb-3">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Earned</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold">{formatCurrency(user.points / 10).replace('GH₵', '')}</span>
            <span className="text-xs font-medium">GH₵</span>
          </div>
        </motion.div>
      </div>

      {/* Goal Progress */}
      <section className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold flex items-center gap-2">
            Weekly Goal
            <span className="bg-green-100 text-green-700 text-[10px] py-1 px-2 rounded-full font-bold">ACTIVE</span>
          </h2>
          <span className="text-xs text-neutral-400">12 / 20 kg</span>
        </div>
        <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            className="h-full bg-green-500"
          />
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">
          You're doing great! Complete 8kg more to earn a <span className="text-green-600 font-bold">50-point bonus</span>.
        </p>
      </section>

      {/* Activity Chart */}
      <section className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Waste Contribution</h2>
          <div className="flex items-center text-green-600 text-xs font-bold gap-1 bg-green-50 px-2 py-1 rounded-lg">
            <TrendingUp className="w-3 h-3" />
            +12% vs last week
          </div>
        </div>
        <div className="h-40 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="kg" 
                stroke="#22c55e" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorKg)" 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Actions / Community Teaser */}
      <section className="grid grid-cols-2 gap-3">
        <Link to="/trade" className="bg-neutral-900 p-5 rounded-3xl text-white flex flex-col justify-between h-32 group">
          <div className="flex justify-between items-start">
            < Recycle className="w-6 h-6 text-green-400" />
            <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-bold leading-tight">Trade Plastic Waste</span>
        </Link>
        <Link to="/community" className="bg-white border border-neutral-100 p-5 rounded-3xl flex flex-col justify-between h-32 group">
          <div className="flex justify-between items-start">
            <Users className="w-6 h-6 text-blue-500" />
            <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
          </div>
          <div>
            <span className="font-bold block text-sm">Community</span>
            <span className="text-xs text-neutral-400 leading-none">Share tips & stories</span>
          </div>
        </Link>
      </section>

      {/* Educational Content Preview */}
      <section className="bg-neutral-100 p-6 rounded-3xl space-y-3">
        <h2 className="font-bold text-lg">Did you know?</h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Recycling one PET bottle saves enough energy to power a lightbulb for 3 hours. 
          Your effort today keeps Accra cleaner!
        </p>
        <Link to="/educational" className="text-green-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 mt-2">
          Learn more about sustainability <ChevronRight className="w-3 h-3" />
        </Link>
      </section>
    </div>
  );
}
