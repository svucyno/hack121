import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, Bell, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on specific routes
  const hideOnRoutes = ['/login', '/landing', '/onboarding'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass-panel z-40 flex items-center justify-between px-4">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <span className="font-display font-bold text-lg text-secondary">
          Nirbhaya <span className="text-primary">Nari</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors relative">
          <Bell className="w-5 h-5 text-text-muted" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary shadow-glow"></span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm"
        >
          <div className="w-full h-full flex flex-col items-center justify-end bg-slate-300">
            <User className="w-6 h-6 text-slate-500 mb-[-2px]" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
