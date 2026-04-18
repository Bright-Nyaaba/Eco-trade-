import React from 'react';
import { storage } from '../lib/storage';
import { useAuth } from '../lib/auth';
import { Package, Truck, Factory, Recycle as RecycleIcon, ChevronRight, Clock, MapPin } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const STATUS_ICONS = {
  collected: Package,
  transporting: Truck,
  processing: Factory,
  recycled: RecycleIcon,
};

const STATUS_COLORS = {
  collected: 'text-amber-600 bg-amber-50',
  transporting: 'text-blue-600 bg-blue-50',
  processing: 'text-purple-600 bg-purple-50',
  recycled: 'text-green-600 bg-green-50',
};

export default function History() {
  const { user } = useAuth();
  const transactions = storage.getTransactions()
    .filter(t => t.userId === user?.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Trading History</h1>
        <p className="text-sm text-neutral-500">Track the lifecycle of your waste</p>
      </header>

      {transactions.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <Clock className="w-8 h-8" />
          </div>
          <p className="font-bold text-neutral-400 text-lg">No transactions yet</p>
          <p className="text-sm text-neutral-500">Your recycling journey starts with your first trade.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, idx) => {
            const Icon = STATUS_ICONS[tx.status];
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-neutral-100 p-4 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${STATUS_COLORS[tx.status]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold">{tx.type}</p>
                      <p className="text-xs text-neutral-400">{format(new Date(tx.timestamp), 'MMM d, h:mm a')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(tx.value)}</p>
                    <p className="text-xs text-neutral-400">{tx.weight} kg</p>
                  </div>
                </div>

                {/* Lifecycle Progress */}
                <div className="relative pt-2">
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-neutral-100 z-0 mx-6" />
                  <div className="flex justify-between relative z-10 px-4">
                    {(['collected', 'transporting', 'processing', 'recycled'] as const).map((step, i) => {
                      const StepIcon = STATUS_ICONS[step];
                      const isActive = tx.status === step || tx.lifecycle.some(l => l.status === step);
                      const isUpcoming = !isActive;
                      
                      return (
                        <div key={step} className="flex flex-col items-center gap-1">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isActive ? 'bg-white border-green-500 text-green-500 scale-110' : 'bg-neutral-50 border-neutral-100 text-neutral-300'
                          }`}>
                            <StepIcon className="w-4 h-4" />
                          </div>
                          <span className={`text-[8px] font-bold uppercase tracking-tight ${isActive ? 'text-green-600' : 'text-neutral-300'}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-xl text-[10px] text-neutral-500">
                  <MapPin className="w-3 h-3" />
                  {tx.location.address}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
