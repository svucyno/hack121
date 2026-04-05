import React from 'react';
import { ShieldAlert, MapPin, PhoneCall, Radio, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const triggerSOS = () => {
    alert("SOS Feature pending implementation.");
  };

  return (
    <div className="flex flex-col p-6 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-slate-800">Hello, Sarah! 👋</h1>
        <p className="text-slate-500 font-medium">Safety status: <span className="text-accent font-bold">Secure</span></p>
      </div>

      {/* Primary SOS Action Area */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full glass-panel rounded-3xl p-6 mb-8 relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Emergency SOS</h2>
            <p className="text-sm text-slate-600 mb-4 max-w-[200px]">Send immediate alerts to contacts & nearby volunteers.</p>
          </div>
        </div>
        
        <button 
          onClick={triggerSOS}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-wider shadow-glow hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-5 h-5" />
          Trigger SOS Now
        </button>
      </motion.div>

      <h3 className="font-display font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: MapPin, label: "Safe Route", color: "text-blue-500", bg: "bg-blue-50" },
          { icon: PhoneCall, label: "Fake Call", color: "text-purple-500", bg: "bg-purple-50" },
          { icon: Activity, label: "Detect Follower", color: "text-warning", bg: "bg-orange-50" },
          { icon: Radio, label: "Live Audio", color: "text-accent", bg: "bg-green-50" }
        ].map((action, idx) => (
          <motion.button 
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 glass-panel rounded-2xl gap-3 transition-colors hover:border-slate-300"
          >
            <div className={`p-3 rounded-full ${action.bg} ${action.color}`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-slate-700">{action.label}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Mini feed summary */}
      <h3 className="font-display font-bold text-slate-800 mb-4">Local Updates</h3>
      <div className="glass-panel rounded-2xl p-4 flex items-start gap-4">
        <div className="w-2 h-2 mt-2 rounded-full bg-accent animate-pulse"></div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">Safe zone verified nearby</h4>
          <p className="text-xs text-slate-500 mt-1">2 mins ago • Police Station 1.2km away</p>
        </div>
      </div>
    </div>
  );
}
