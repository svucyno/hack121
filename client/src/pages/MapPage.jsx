import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Navigation, Loader2, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { safeZones } from '../data/safeZones';
import L from 'leaflet';

/**
 * A helper component to keep the map centered on the user's location.
 */
function RecenterControl({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

export default function MapPage() {
  const { location, error, loading } = useGeolocation();
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (location) setUserCoords(location);
  }, [location]);

  // Handle errors or initial loading
  if (loading && !userCoords) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-slate-500">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="font-bold">Locating you...</p>
      </div>
    );
  }

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

  // Default to Hyderabad if location fails but we want to show the UI
  const defaultCenter = userCoords || [17.3850, 78.4867];

  return (
    <div className="flex flex-col h-full relative font-sans overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex gap-3">
        <div className="flex-1 glass-panel bg-white/90 backdrop-blur-md p-4 rounded-3xl border-slate-200 shadow-xl flex items-center gap-3">
          <div className="w-1 h-1 bg-primary animate-ping rounded-full" />
          <p className="text-xs font-bold text-slate-700 tracking-tight">Live Protection Active</p>
        </div>
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={14} 
        className="flex-1 w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        
        {/* Recenter Component */}
        {userCoords && <RecenterControl coords={userCoords} />}

        {/* User Marker */}
        {userCoords && (
          <Marker position={userCoords}>
            <Popup className="custom-popup">
              <div className="p-2">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">You Are Here</span>
                <p className="text-[10px] text-slate-500 font-medium mt-1 tracking-tight">Real-time coordinates active.</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Safe Zone Markers */}
        {safeZones.map((zone) => (
          <Marker key={zone.id} position={[zone.lat, zone.lng]}>
            <Popup className="custom-popup">
              <div className="p-3 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-green-50 text-green-600 rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{zone.name}</h4>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mb-3">{zone.address}</p>
                <div className="flex gap-2">
                  <a 
                    href={`tel:${zone.phone}`} 
                    className="flex-1 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold text-slate-700"
                  >
                    <Phone className="w-3 h-3" />
                    Call Agency
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating UI Overlay */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-4">
        <button 
          onClick={() => userCoords && setUserCoords([...userCoords])}
          className="w-14 h-14 bg-white text-primary rounded-full shadow-2xl flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95 transition-all"
        >
          <Navigation className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

