import React, { useState } from 'react';
import { useMediaRecorder } from '../hooks/useMediaRecorder';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, Play, Trash2, Clock, MapPin, Shield, Camera, Download } from 'lucide-react';

export default function EvidenceCapture() {
  const { isRecording, recordings, error, startRecording, stopRecording } = useMediaRecorder();
  const [activeClip, setActiveClip] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 pb-24 font-sans">
      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Evidence Vault</h1>
        <p className="text-slate-500 font-medium text-sm">Stealth-captured proof for your protection.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="glass-panel p-4 rounded-3xl text-center border-primary/10 bg-primary/5">
          <div className="text-primary font-black text-2xl">{recordings.length}</div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Clips</div>
        </div>
        <div className="glass-panel p-4 rounded-3xl text-center border-blue-500/10 bg-blue-50">
          <div className="text-blue-500 font-black text-2xl">{recordings.filter(r => r.type === 'video').length}</div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Video</div>
        </div>
        <div className="glass-panel p-4 rounded-3xl text-center border-accent/10 bg-green-50">
          <div className="text-accent font-black text-2xl">{recordings.filter(r => r.type === 'audio').length}</div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Audio</div>
        </div>
      </div>

      {/* Manual Capture Controls */}
      <div className="glass-panel rounded-[2rem] p-6 mb-8 bg-gradient-to-br from-slate-50 to-white border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-slate-800">Quick Capture</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Record a 10-second evidence burst.</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-danger animate-pulse' : 'bg-slate-200'}`} />
        </div>

        {error && (
          <div className="bg-danger/10 text-danger text-xs font-bold p-3 rounded-2xl mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => startRecording(10000)}
            disabled={isRecording}
            className={`flex-1 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all ${
              isRecording 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-primary text-white shadow-glow hover:bg-primary-dark'
            }`}
          >
            <Camera className="w-4 h-4" />
            {isRecording ? 'Capturing...' : 'Record Evidence'}
          </motion.button>
          {isRecording && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="px-6 py-4 bg-danger text-white rounded-2xl font-bold uppercase text-xs tracking-widest"
            >
              Stop
            </motion.button>
          )}
        </div>
      </div>

      {/* Evidence Gallery */}
      <h3 className="font-display font-bold text-slate-800 mb-4 px-1">Captured Evidence</h3>
      
      {recordings.length === 0 ? (
        <div className="glass-panel rounded-[2rem] p-8 flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-200">
          <Shield className="w-12 h-12 text-slate-200 mb-4" />
          <p className="text-sm font-bold text-slate-400">No evidence captured yet.</p>
          <p className="text-xs text-slate-300 mt-1">Use Quick Capture or trigger an SOS to start.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {recordings.map((clip) => (
              <motion.div
                key={clip.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-panel rounded-3xl p-5 border-slate-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    clip.type === 'video' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                  }`}>
                    {clip.type === 'video' ? <Video className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm">
                      {clip.type === 'video' ? 'Video Evidence' : 'Audio Evidence'}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        <Clock className="w-3 h-3" /> {clip.duration}s
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(clip.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveClip(activeClip === clip.id ? null : clip.id)}
                    className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </div>

                {/* Inline player */}
                <AnimatePresence>
                  {activeClip === clip.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {clip.type === 'video' ? (
                        <video
                          src={clip.url}
                          controls
                          autoPlay
                          className="w-full rounded-2xl bg-black max-h-48"
                        />
                      ) : (
                        <audio src={clip.url} controls autoPlay className="w-full mt-2" />
                      )}
                      <div className="flex gap-2 mt-3">
                        <a
                          href={clip.url}
                          download={`evidence_${clip.id}.webm`}
                          className="flex-1 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600"
                        >
                          <Download className="w-3 h-3" /> Download
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
