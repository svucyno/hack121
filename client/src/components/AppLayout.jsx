import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/landing', '/onboarding'];
  const hideNav = hideOnRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden">
      {!hideNav && <Navbar />}
      
      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-md mx-auto h-full ${!hideNav ? 'pt-16 pb-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
