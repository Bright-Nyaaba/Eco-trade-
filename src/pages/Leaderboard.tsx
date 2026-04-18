import React from 'react';
import { useAuth } from '../lib/auth';
import { Trophy, Medal, Crown, TrendingUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LEADERBOARD = [
  { id: '1', name: 'Kwame Jackson', points: 4500, rank: 1, avatar: '👑' },
  { id: '2', name: 'Efua Ansah', points: 3800, rank: 2, avatar: '🥈' },
  { id: '3', name: 'John Doe', points: 3200, rank: 3, avatar: '🥉' },
  { id: '4', name: 'Akua Boateng', points: 2900, rank: 4, avatar: '👤' },
  { id: '5', name: 'Nana Owusu', points: 2600, rank: 5, avatar: '👤' },
];

export default function Leaderboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Top Recyclers</h1>
        <p className="text-sm text-neutral-500">Compete with the community</p>
      </header>

      {/* Podium Simulation */}
      <div className="flex items-end justify-center gap-2 py-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center text-xl">🥈</div>
          <div className="w-20 h-24 bg-neutral-100 rounded-t-2xl flex flex-col justify-end p-2 items-center">
            <span className="font-bold text-xs uppercase text-neutral-400">Efua</span>
            <span className="text-black font-black">2nd</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl border-2 border-yellow-500">🥇</div>
          <div className="w-24 h-32 bg-yellow-500 rounded-t-2xl flex flex-col justify-end p-2 items-center text-white shadow-lg shadow-yellow-100">
            <span className="font-bold text-xs uppercase text-yellow-100 italic">Kwame</span>
            <span className="text-2xl font-black">1st</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">🥉</div>
          <div className="w-20 h-20 bg-orange-50 rounded-t-2xl flex flex-col justify-end p-2 items-center">
            <span className="font-bold text-xs uppercase text-orange-200">John</span>
            <span className="text-orange-900 font-black">3rd</span>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 p-5 rounded-3xl text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
            {user?.name[0]}
          </div>
          <div>
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Your Rank</p>
            <p className="font-bold text-lg">#142 <span className="text-xs text-green-400 font-medium ml-1">Top 5%</span></p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Points</p>
          <p className="font-black text-xl text-green-400">{user?.points}</p>
        </div>
      </div>

      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 font-black text-neutral-300 text-sm italic">{p.rank}</span>
              <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-lg">{p.avatar}</div>
              <span className="font-bold text-sm">{p.name}</span>
            </div>
            <span className="font-black text-sm text-neutral-400">{p.points.toLocaleString()} pts</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
