import React, { useState } from 'react';
import { Phone, PhoneOff, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FakeCall() {
  const [isRinging, setIsRinging] = useState(true);

  return (
    <div className="flex flex-col h-full bg-slate-900 absolute inset-0 z-50 p-8 items-center text-white">
      <div className="flex-1 flex flex-col items-center justify-center mt-12 w-full">
        <h2 className="text-xl text-slate-300 font-medium tracking-widest uppercase mb-4">Incoming Call</h2>
        <motion.div 
          animate={isRinging ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-32 h-32 bg-slate-800 rounded-full mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] border-4 border-slate-700"
        >
          <User className="w-16 h-16 text-slate-400" />
        </motion.div>
        <h1 className="text-4xl font-display font-semibold mb-2">Dad</h1>
        <p className="text-lg text-slate-400">Mobile 04:20</p>
      </div>

      <div className="flex justify-between w-full max-w-[280px] mb-16">
        <button 
          onClick={() => window.history.back()}
          className="w-16 h-16 rounded-full bg-danger flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        >
          <PhoneOff className="w-8 h-8 fill-white text-white" />
        </button>
        <button 
          onClick={() => setIsRinging(false)}
          className="w-16 h-16 rounded-full bg-accent flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          style={{ animationDelay: '0.2s' }}
        >
          <Phone className="w-8 h-8 fill-white text-white" />
        </button>
      </div>
    </div>
  );
}
