import React from "react";
import { useSOS } from "../context/SOSContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X, Radio, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

export default function SOSOverlay() {
  const { isEmergency, countdown, isDispatched, cancelSOS } = useSOS();

  if (!isEmergency) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-8 overflow-hidden"
      >
        {/* Animated Siren Background */}
        <div className="absolute inset-0 z-[-1] animate-siren"></div>
        <style>
          {`
            @keyframes pulse-siren {
              0% { background-color: rgba(239, 68, 68, 1); }
              50% { background-color: rgba(59, 130, 246, 1); }
              100% { background-color: rgba(239, 68, 68, 1); }
            }
            .animate-siren {
              animation: pulse-siren 0.8s infinite ease-in-out;
            }
          `}
        </style>

        {/* SOS Header */}
        <div className="w-full flex flex-col items-center mt-12 bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20">
          <ShieldAlert className="w-16 h-16 text-white mb-4 animate-bounce" />
          <h1 className="text-3xl font-display font-black text-white tracking-widest uppercase">Emergency SOS</h1>
          <p className="text-white/80 font-bold text-sm text-center mt-2">
            Disruptive Alert Mode Active
          </p>
        </div>

        {/* SOS Countdown or Dispatched Status */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {!isDispatched ? (
            <div className="relative">
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[12rem] font-black text-white drop-shadow-2xl leading-none"
              >
                {countdown}
              </motion.div>
              <p className="text-white text-xl font-bold text-center tracking-widest uppercase mt-4">
                Seconds to Dispatch
              </p>
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur-xl p-8 rounded-[3rem] border border-white/30 flex flex-col items-center gap-4 shadow-2xl scale-110">
              <CheckCircle className="w-20 h-20 text-green-400" />
              <div className="text-center">
                <h3 className="text-2xl font-black text-white">Alerts Sent!</h3>
                <p className="text-white/80 text-sm font-bold uppercase tracking-widest mt-1">Your Circle is Notified</p>
              </div>
            </div>
          )}
        </div>

        {/* SOS Progress Trackers */}
        <div className="w-full space-y-4 mb-4">
          {[
            { icon: MapPin, label: "GPS Coordinates Locked", active: true },
            { icon: Send, label: isDispatched ? "SMS Dispatched to Hub" : "Ready to Broadcast", active: isDispatched }
          ].map((status, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className={`p-2 rounded-xl bg-white/20 ${status.active ? 'text-green-400' : 'text-white'}`}>
                {status.active ? <CheckCircle className="w-4 h-4" /> : <status.icon className="w-4 h-4" />}
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-widest">{status.label}</span>
            </div>
          ))}
        </div>

        {/* SOS Cancel Button */}
        <button
          onClick={cancelSOS}
          className="w-full py-6 bg-white text-danger rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <X className="w-8 h-8" />
          Cancel Alert
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
