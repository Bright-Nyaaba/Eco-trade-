import React from 'react';
import { storage } from '../lib/storage';
import { MapPin, Navigation, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Centers() {
  const locations = storage.getLocations();

  return (
    <div className="space-y-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Recycling Centers</h1>
        <p className="text-sm text-neutral-500">Find drop-off points near you</p>
      </header>

      {/* Simulated Map View */}
      <div className="h-48 bg-neutral-200 rounded-3xl relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-0.187,5.6037,12/400x200?access_token=pk.xxx')] bg-cover" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold mt-2 shadow-sm">YOU ARE HERE</span>
        </div>
      </div>

      <div className="space-y-4">
        {locations.map((loc, idx) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm flex items-start gap-4 hover:border-green-100 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
              <MapPin className="text-neutral-400 group-hover:text-green-500 transition-colors" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-bold text-sm leading-none">{loc.name}</h3>
              <p className="text-xs text-neutral-500">{loc.address}</p>
              <div className="flex gap-2 pt-1">
                {loc.types.map(t => (
                  <span key={t} className="text-[9px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="p-2 bg-neutral-900 text-white rounded-xl shadow-sm">
                <Navigation className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-bold text-neutral-400">2.4km</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-sky-50 border border-sky-100 p-5 rounded-3xl space-y-2">
        <h4 className="font-bold text-sky-900 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Hard-to-Recycle Items
        </h4>
        <p className="text-xs text-sky-700 leading-relaxed">
          Need to drop off e-waste or car batteries? Select <strong>Tema Waste Partners</strong> as they specialize in hazardous materials handling.
        </p>
      </div>
    </div>
  );
}
