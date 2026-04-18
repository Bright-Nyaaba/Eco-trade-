import React from 'react';
import { storage } from '../lib/storage';
import { useAuth } from '../lib/auth';
import { Gift, Wallet, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Rewards() {
  const { user } = useAuth();
  const rewards = storage.getRewards();

  return (
    <div className="space-y-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Earn Rewards</h1>
        <p className="text-sm text-neutral-500">Redeem your points for prizes</p>
      </header>

      <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-3xl text-white shadow-lg overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Available Balance</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black">{user?.points}</span>
                <span className="text-sm font-medium text-white/80">POINTS</span>
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-white/60 leading-tight">
            Keep recycling to unlock premium rewards and exclusive mobile money bonuses!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {rewards.map((reward, idx) => {
          const isLocked = (user?.points || 0) < reward.cost;
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white border rounded-3xl p-4 flex gap-4 transition-all ${
                isLocked ? 'border-neutral-100 opacity-80' : 'border-green-100 shadow-sm'
              }`}
            >
              <img src={reward.image} alt={reward.title} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm">{reward.title}</h3>
                  <p className="text-[10px] text-neutral-400 line-clamp-1">{reward.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black ${isLocked ? 'text-neutral-300' : 'text-green-600'}`}>
                    {reward.cost} PTS
                  </span>
                  <button 
                    disabled={isLocked}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                      isLocked 
                        ? 'bg-neutral-100 text-neutral-300 flex items-center gap-1' 
                        : 'bg-green-600 text-white shadow-md shadow-green-100'
                    }`}
                  >
                    {isLocked ? <><Lock className="w-3 h-3" /> Locked</> : 'Redeem'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-neutral-900 p-6 rounded-3xl text-white space-y-4 overflow-hidden relative">
        <Gift className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 rotate-12" />
        <h3 className="font-bold relative z-10">Refer a Friend</h3>
        <p className="text-xs text-white/60 leading-relaxed relative z-10">
          Invite your friends to EcoTrade and earn 100 points for every first trade they complete. 
          Building a greener Ghana together!
        </p>
        <button className="bg-white text-black px-6 py-2 rounded-xl text-xs font-black relative z-10">
          SHARE LINK
        </button>
      </div>
    </div>
  );
}
