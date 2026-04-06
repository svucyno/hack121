import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, Eye, Wifi, Volume2, Vibrate, CheckCircle, AlertTriangle, Radio } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';

/**
 * Simulated threat analysis engine for hackathon demo.
 * In production, this would use accelerometer, gyroscope, and ML models.
 */
const THREAT_SENSORS = [
  { id: 'motion', label: 'Motion Pattern', icon: Activity, description: 'Detects unusual movement patterns behind you' },
  { id: 'audio', label: 'Audio Anomaly', icon: Volume2, description: 'Listens for footsteps or approaching vehicles' },
  { id: 'proximity', label: 'Proximity Alert', icon: Wifi, description: 'Monitors nearby Bluetooth/Wi-Fi device persistence' },
  { id: 'route', label: 'Route Deviation', icon: Eye, description: 'Flags if someone mirrors your path changes' },
];

export default function FollowerDetector() {
  const { location } = useGeolocation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatLevel, setThreatLevel] = useState(null); // null | 'safe' | 'caution' | 'danger'
  const [sensorResults, setSensorResults] = useState({});
  const intervalRef = useRef(null);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setThreatLevel(null);
    setSensorResults({});

    let progress = 0;
    const sensorKeys = THREAT_SENSORS.map(s => s.id);
    let sensorIdx = 0;

    intervalRef.current = setInterval(() => {
      progress += 2;
      setScanProgress(progress);

      // Simulate sensor completion at intervals
      if (progress % 25 === 0 && sensorIdx < sensorKeys.length) {
        const key = sensorKeys[sensorIdx];
        // Randomize result for demo (80% safe)
        const isSafe = Math.random() > 0.2;
        setSensorResults(prev => ({ ...prev, [key]: isSafe ? 'safe' : 'caution' }));
        sensorIdx++;
      }

      if (progress >= 100) {
        clearInterval(intervalRef.current);
        setIsScanning(false);

        // Determine overall threat
        setTimeout(() => {
          setSensorResults(prev => {
            const hasCaution = Object.values(prev).includes('caution');
            setThreatLevel(hasCaution ? 'caution' : 'safe');
            return prev;
          });
        }, 300);
      }
    }, 80);
  };

  const cancelScan = () => {
    clearInterval(intervalRef.current);
    setIsScanning(false);
    setScanProgress(0);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const getThreatColor = () => {
    if (threatLevel === 'safe') return { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' };
    if (threatLevel === 'caution') return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' };
    return { bg: 'bg-slate-50', text: 'text-slate-400', border: 'border-slate-100' };
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 pb-24 font-sans">
      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Threat Scanner</h1>
        <p className="text-slate-500 font-medium text-sm">AI-powered anomaly detection for your safety.</p>
      </div>

      {/* Scan Visualization */}
      <div className="glass-panel rounded-[2rem] p-6 mb-8 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Environment Scanner</h3>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                {isScanning ? 'Scanning...' : threatLevel ? `Result: ${threatLevel.toUpperCase()}` : 'Ready'}
              </p>
            </div>
          </div>
          {isScanning && (
            <div className="text-white/80 font-black text-xl">{scanProgress}%</div>
          )}
        </div>

        {/* Progress Ring */}
        <div className="flex items-center justify-center py-8">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={threatLevel === 'safe' ? '#2D6A4F' : threatLevel === 'caution' ? '#F77F00' : '#E63946'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${scanProgress * 2.64} 264`}
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isScanning ? (
                <Activity className="w-10 h-10 text-primary animate-pulse" />
              ) : threatLevel === 'safe' ? (
                <CheckCircle className="w-10 h-10 text-accent" />
              ) : threatLevel === 'caution' ? (
                <AlertTriangle className="w-10 h-10 text-warning" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-white/30" />
              )}
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-2">
                {isScanning ? 'Analyzing' : threatLevel || 'Idle'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={isScanning ? cancelScan : startScan}
          className={`w-full py-4 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${
            isScanning
              ? 'bg-white/10 text-white border border-white/20'
              : 'bg-primary text-white shadow-glow'
          }`}
        >
          {isScanning ? (
            <><Activity className="w-4 h-4 animate-spin" /> Cancel Scan</>
          ) : (
            <><Eye className="w-4 h-4" /> Start Deep Scan</>
          )}
        </motion.button>
      </div>

      {/* Sensor Results */}
      <h3 className="font-display font-bold text-slate-800 mb-4 px-1">Sensor Grid</h3>
      <div className="space-y-3">
        {THREAT_SENSORS.map((sensor) => {
          const result = sensorResults[sensor.id];
          const isActive = isScanning && !result;

          return (
            <motion.div
              key={sensor.id}
              layout
              className={`glass-panel rounded-2xl p-4 flex items-center gap-4 transition-all ${
                result === 'safe' ? 'border-accent/20 bg-accent/5' :
                result === 'caution' ? 'border-warning/20 bg-warning/5' :
                'border-slate-100'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all ${
                result === 'safe' ? 'bg-accent/10 text-accent' :
                result === 'caution' ? 'bg-warning/10 text-warning' :
                isActive ? 'bg-primary/10 text-primary animate-pulse' :
                'bg-slate-50 text-slate-300'
              }`}>
                <sensor.icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">{sensor.label}</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{sensor.description}</p>
              </div>

              <div className="text-right">
                {result === 'safe' && <span className="text-[10px] font-black text-accent uppercase tracking-widest">Clear</span>}
                {result === 'caution' && <span className="text-[10px] font-black text-warning uppercase tracking-widest">Alert</span>}
                {isActive && <span className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">...</span>}
                {!result && !isActive && <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Idle</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Threat Summary */}
      <AnimatePresence>
        {threatLevel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel rounded-[2rem] p-6 mt-8 ${getThreatColor().bg} ${getThreatColor().border}`}
          >
            <div className="flex items-center gap-4">
              {threatLevel === 'safe' ? (
                <CheckCircle className="w-8 h-8 text-accent" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-warning" />
              )}
              <div>
                <h3 className={`font-display font-bold ${getThreatColor().text}`}>
                  {threatLevel === 'safe' ? 'Area is Secure' : 'Stay Alert'}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {threatLevel === 'safe'
                    ? 'No anomalous patterns detected in your vicinity.'
                    : 'Unusual activity detected. Consider changing your route or triggering SOS.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
