import React from 'react';

export default function Dashboard() {
  const triggerSOS = () => {
    alert("SOS Button Triggered! (Functionality will be implemented in a future stage)");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center font-sans bg-gray-50">
      <h1 className="text-4xl font-black mb-2 text-gray-800 tracking-tight">DASHBOARD</h1>
      <p className="text-gray-500 mb-12">Architecture initialized. core components in development.</p>

      {/* Placeholder SOS Button */}
      <div className="relative group">
        <div className="absolute -inset-1.5 bg-red-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <button 
          onClick={triggerSOS}
          className="relative w-48 h-48 bg-red-600 rounded-full shadow-2xl flex items-center justify-center border-8 border-red-500 active:scale-95 transition-all"
        >
          <span className="text-white text-4xl font-black tracking-widest uppercase">SOS</span>
        </button>
      </div>

      <p className="mt-8 text-sm font-bold text-red-500 uppercase tracking-widest animate-pulse">
        Emergency System: Initializing...
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400 font-bold italic">
          Map View
        </div>
        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400 font-bold italic">
          Contacts
        </div>
      </div>
    </div>
  );
}
