import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Authentication failed. Please check your configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-8 items-center justify-center relative overflow-hidden">
      {/* Background blobs for premium feel */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-white shadow-soft flex items-center justify-center border border-slate-100">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Nirbhaya Nari</h1>
        <p className="text-slate-500 font-medium mb-12">Empowering safety with AI intelligence.</p>

        <div className="space-y-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 glass-panel rounded-2xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-white transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </motion.button>

          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secure Access</span>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-3 text-left">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <Lock className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-0.5">End-to-End Encrypted</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                Your data and location are private and shared only with your emergency network.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-[10px] text-slate-400 font-medium leading-loose">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
}
