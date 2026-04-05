import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, Radio, Users, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on specific routes
  const hideOnRoutes = ['/login', '/landing', '/onboarding'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  const navItems = [
    { id: 'dashboard', path: '/', icon: Home, label: 'Home' },
    { id: 'map', path: '/map', icon: Map, label: 'Map' },
    { id: 'sos', path: '/fake-call', icon: Phone, label: 'SOS', isFab: true },
    { id: 'feed', path: '/feed', icon: Radio, label: 'Feed' },
    { id: 'contacts', path: '/contacts', icon: Users, label: 'Contacts' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 glass-panel border-t border-slate-200 z-50 px-6 pb-safe">
      <div className="flex items-center justify-between h-full relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isFab) {
            return (
              <div key={item.id} className="relative -top-8 flex flex-col items-center justify-center">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(item.path)}
                  className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow border-4 border-white"
                >
                  <Icon className="w-8 h-8 text-white fill-white" />
                </motion.button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center w-12 gap-1 relative"
            >
              <Icon 
                strokeWidth={isActive ? 2.5 : 2}
                className={`w-6 h-6 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-slate-400'
                }`} 
              />
              <span className={`text-[10px] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary font-semibold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
