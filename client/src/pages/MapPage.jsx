import React, { useState, useEffect, useRef } from 'react';
import { Navigation, Loader2, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { safeZones } from '../data/safeZones';

export default function MapPage() {
  const { location, error, loading } = useGeolocation();
  const [userCoords, setUserCoords] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (location) setUserCoords(location);
  }, [location]);

  // Initialize map once we have coords and the container is ready
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current || mapInstanceRef.current) return;

    const center = userCoords || [17.3850, 78.4867];
    const map = L.map(mapRef.current, { zoomControl: false }).setView(center, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    }).addTo(map);

    // Add safe zone markers
    safeZones.forEach((zone) => {
      const marker = L.marker([zone.lat, zone.lng]).addTo(map);
      marker.bindPopup(`
        <div style="padding:8px;min-width:180px;">
          <h4 style="margin:0 0 4px;font-weight:700;font-size:14px;">${zone.name}</h4>
          <p style="margin:0 0 8px;font-size:11px;color:#64748b;">${zone.address}</p>
          <a href="tel:${zone.phone}" style="display:inline-flex;align-items:center;gap:4px;padding:6px 12px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;font-size:11px;font-weight:600;color:#334155;text-decoration:none;">
            📞 Call ${zone.phone}
          </a>
        </div>
      `);
    });

    mapInstanceRef.current = map;

    // Force a resize after mount to fix tile rendering
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [userCoords]);

  // Update user marker when coords change
  useEffect(() => {
    const L = window.L;
    if (!L || !mapInstanceRef.current || !userCoords) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userCoords);
    } else {
      const pulsingIcon = L.divIcon({
        className: '',
        html: `<div style="width:18px;height:18px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.3);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      userMarkerRef.current = L.marker(userCoords, { icon: pulsingIcon }).addTo(mapInstanceRef.current);
      userMarkerRef.current.bindPopup(`
        <div style="padding:6px;">
          <span style="font-size:11px;font-weight:700;color:#E63946;text-transform:uppercase;letter-spacing:1px;">You Are Here</span>
          <p style="font-size:10px;color:#64748b;margin:4px 0 0;">Real-time coordinates active.</p>
        </div>
      `);
    }
  }, [userCoords]);

  const handleRecenter = () => {
    if (mapInstanceRef.current && userCoords) {
      mapInstanceRef.current.setView(userCoords, 15, { animate: true });
    }
  };

  // Loading state
  if (loading && !userCoords) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-slate-500">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="font-bold">Locating you...</p>
      </div>
    );
  }

  // Error state
  if (error && !userCoords) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-8 text-center">
        <ShieldCheck className="w-16 h-16 text-danger mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Location Required</h2>
        <p className="text-sm text-slate-500 mb-6">Please enable GPS to view nearby safe zones and track your route.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative font-sans overflow-hidden">
      {/* Map Header Overlay */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex gap-3">
        <div className="flex-1 glass-panel bg-white/90 backdrop-blur-md p-4 rounded-3xl border-slate-200 shadow-xl flex items-center gap-3">
          <div className="w-2 h-2 bg-primary animate-ping rounded-full" />
          <p className="text-xs font-bold text-slate-700 tracking-tight">Live Protection Active</p>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="flex-1 w-full h-full z-0" />

      {/* Floating Recenter Button */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-4">
        <button
          onClick={handleRecenter}
          className="w-14 h-14 bg-white text-primary rounded-full shadow-2xl flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95 transition-all"
        >
          <Navigation className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
