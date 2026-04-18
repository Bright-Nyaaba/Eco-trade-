import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { storage } from '../lib/storage';
import { Camera, MapPin, Scale, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../lib/utils';

const WASTE_TYPES = [
  { id: 'pet', name: 'PET Bottles', rate: 1.5, icon: '🧴' },
  { id: 'hdpe', name: 'HDPE Containers', rate: 2.0, icon: '📦' },
  { id: 'mixed', name: 'Mixed Plastic', rate: 0.8, icon: '♻️' },
];

export default function Trade() {
  const { user, updateUserStats } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<typeof WASTE_TYPES[0] | null>(null);
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number, lng: number, address: string } | null>(null);

  const handleSimulateLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation({
        lat: 5.6037,
        lng: -0.187,
        address: 'Oxford Street, Osu, Accra'
      });
      setIsLocating(false);
    }, 1500);
  };

  const handleSimulateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedType || !weight || !user) return;

    const kg = parseFloat(weight);
    const value = kg * selectedType.rate;
    const points = Math.floor(kg * 10);

    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      type: selectedType.name,
      weight: kg,
      images: image ? [image] : [],
      location: location || { lat: 0, lng: 0, address: 'Unknown' },
      status: 'collected' as const,
      value,
      timestamp: new Date().toISOString(),
      lifecycle: [
        {
          status: 'collected' as const,
          timestamp: new Date().toISOString(),
          description: 'Waste successfully handed over at collection point.'
        }
      ]
    };

    storage.addTransaction(transaction);
    updateUserStats(kg, points);
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#fbbf24']
    });

    setStep(4);
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Trade Waste</h1>
        <p className="text-sm text-neutral-500">Exchange your plastic for money & points</p>
      </header>

      {/* Stepper */}
      <div className="flex justify-between px-4">
        {[1, 2, 3].map(i => (
          <div 
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              step >= i ? 'bg-green-600 text-white' : 'bg-neutral-200 text-neutral-400'
            }`}
          >
            {i}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="font-bold text-lg">Select Waste Type</h2>
            <div className="space-y-3">
              {WASTE_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedType?.id === type.id 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-neutral-100 bg-white hover:border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <p className="font-bold">{type.name}</p>
                        <p className="text-xs text-neutral-500">Rate: GH₵ {type.rate.toFixed(1)}/kg</p>
                      </div>
                    </div>
                    {selectedType?.id === type.id && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  </div>
                </button>
              ))}
            </div>
            <button
              disabled={!selectedType}
              onClick={() => setStep(2)}
              className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-lg">Details & Weight</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-1">
                <Scale className="w-3 h-3" />
                Weight (kg)
              </label>
              <input
                type="number"
                placeholder="0.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full text-4xl font-bold p-6 bg-white border border-neutral-100 rounded-3xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-1">
                <Camera className="w-3 h-3" />
                Proof Image
              </label>
              <div className="relative h-48 bg-neutral-100 rounded-3xl border-2 border-dashed border-neutral-200 flex items-center justify-center overflow-hidden">
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      <Camera className="w-6 h-6 text-neutral-400" />
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">Capture or Upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleSimulateImage} />
                  </label>
                )}
              </div>
            </div>

            <button
              disabled={!weight || !image}
              onClick={() => setStep(3)}
              className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold disabled:opacity-50 transition-opacity"
            >
              Next: Location
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-lg">Tag Location</h2>
            
            <div 
              className={`p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center text-center gap-4 transition-all ${
                location ? 'border-green-100 bg-green-50' : ''
              }`}
            >
              <div className={`p-4 rounded-full ${location ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-400'}`}>
                <MapPin className={`w-8 h-8 ${isLocating ? 'animate-bounce' : ''}`} />
              </div>
              
              {location ? (
                <div className="space-y-1">
                  <p className="font-bold text-green-800">Location Tagged!</p>
                  <p className="text-sm text-green-600">{location.address}</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-bold">Where are you?</p>
                  <p className="text-sm text-neutral-500">Tagging your location helps us track the collection process efficiently.</p>
                </div>
              )}

              {!location && (
                <button
                  onClick={handleSimulateLocation}
                  disabled={isLocating}
                  className="mt-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-xl transition-all active:scale-95"
                >
                  {isLocating ? 'Locating...' : 'Search Nearby'}
                </button>
              )}
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Selected:</span>
                <span className="font-bold">{selectedType?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Weight:</span>
                <span className="font-bold">{weight} kg</span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between">
                <span className="font-bold">Total Earnings:</span>
                <span className="font-bold text-green-600">{formatCurrency(parseFloat(weight || '0') * (selectedType?.rate || 0))}</span>
              </div>
            </div>

            <button
              disabled={!location}
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 disabled:opacity-50"
            >
              Confirm & Trade
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 flex flex-col items-center text-center gap-6"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Awesome Job!</h2>
              <p className="text-neutral-500">Your trade has been registered and is waiting for pick-up. You've earned {(parseFloat(weight) * 10).toFixed(0)} points!</p>
            </div>
            <button
              onClick={() => navigate('/history')}
              className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              Track Lifecycle <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-neutral-500 font-bold text-sm"
            >
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
