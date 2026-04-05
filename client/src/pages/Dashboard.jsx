import React, { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, PhoneCall, Radio, Activity, ShieldCheck, Bell, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userData, currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // 🟢 GUEST MODE: Commenting out the onboarding redirect for the hackathon preview
    /*
    if (!loading && currentUser && (!userData || !userData.onboardingComplete)) {
      navigate('/onboarding');
    }
    */
  }, [userData, currentUser, loading, navigate]);

  const toggleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const triggerSOS = () => {
    alert("Emergency SOS Activated! (Simulation)");
  };

  if (loading) return null;

  return (
    <div className="flex flex-col p-6 font-sans pb-24">
      {/* Header with Profile & Notifications */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">
            Hello, {userData?.profile?.fullName?.split(' ')[0] || currentUser?.displayName?.split(' ')[0] || 'Nari'}! 👋
          </h1>
          <motion.div 
            onClick={toggleScan}
            className="flex items-center gap-2 mt-1 cursor-pointer"
          >
            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-primary animate-ping' : 'bg-accent'}`}></div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              {isScanning ? 'AI Scanning Environment...' : 'Safety status: Secure'}
            </p>
          </motion.div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl shadow-soft text-slate-400 hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Primary SOS Action Area */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full glass-panel rounded-[2rem] p-6 mb-8 relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-glow-sm"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white rounded-2xl border border-primary/10">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
          <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Active Protection</span>
        </div>
        
        <h2 className="text-xl font-display font-bold text-slate-800 mb-1">One-Touch SOS</h2>
        <p className="text-sm text-slate-500 mb-6 font-medium">Alert your entire emergency hub instantly.</p>
        
        <button 
          onClick={triggerSOS}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-3"
        >
          <Radio className="w-5 h-5 animate-pulse" />
          Dispatch SOS
        </button>
      </motion.div>

      <h3 className="font-display font-bold text-slate-800 mb-4 px-1">Quick Assist Tools</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: Navigation, label: "Safe Route", path: "/safe-route", color: "text-blue-500", bg: "bg-blue-50" },
          { icon: PhoneCall, label: "Fake Call", path: "/fake-call", color: "text-purple-500", bg: "bg-purple-50" },
          { icon: ShieldCheck, label: "Follower Det.", path: "/follower-detector", color: "text-warning", bg: "bg-orange-50" },
          { icon: MapPin, label: "Area Map", path: "/map", color: "text-accent", bg: "bg-green-50" }
        ].map((action, idx) => (
          <motion.button 
            key={idx}
            whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center p-5 glass-panel rounded-3xl gap-4 transition-all hover:border-slate-300 group"
          >
            <div className={`p-4 rounded-2xl transition-all group-hover:scale-110 ${action.bg} ${action.color}`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-700 tracking-tight">{action.label}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Mini feed summary */}
      <h3 className="font-display font-bold text-slate-800 mb-4 px-1">Recent Safety Activity</h3>
      <div className="space-y-4">
        {[
          { icon: MapPin, title: "Police Station nearby", desc: "1.2km • 4 min drive", time: "2m ago", color: "text-accent" },
          { icon: Activity, title: "Safe zone scanning", desc: "Your location is verified", time: "Now", color: "text-blue-500" }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-4 flex items-center gap-4 border-slate-100">
            <div className={`p-2 rounded-xl bg-slate-50 ${item.color}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.time}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 tracking-tight">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

