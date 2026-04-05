import React from 'react';
import { Map as MapIcon, Navigation } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="flex flex-col h-full rounded-b-3xl overflow-hidden relative">
      <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center p-6 text-center">
        <MapIcon className="w-16 h-16 text-slate-400 mb-4" />
        <h1 className="text-2xl font-display font-bold text-slate-700 mb-2">Live Safe Map</h1>
        <p className="text-slate-500">GIS Engine will be integrated in Stage 7 to display safe routes and live hazard zones.</p>
      </div>
      
      {/* Floating Action for Map */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-slate-50">
        <Navigation className="w-6 h-6" />
      </button>
    </div>
  );
}
