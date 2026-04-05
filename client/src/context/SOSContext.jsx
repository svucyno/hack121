import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { vibrateSOS, vibrateCancel } from "../utils/vibration";
import { useAuth } from "./AuthContext";

const SOSContext = createContext();

export function useSOS() {
  return useContext(SOSContext);
}

export function SOSProvider({ children }) {
  const { userData } = useAuth();
  const [isEmergency, setIsEmergency] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isDispatched, setIsDispatched] = useState(false);
  const timerRef = useRef(null);

  // Trigger SOS flow
  const triggerSOS = () => {
    if (isEmergency) return;
    setIsEmergency(true);
    setCountdown(5);
    setIsDispatched(false);
    vibrateSOS();
  };

  // Cancel SOS flow
  const cancelSOS = () => {
    setIsEmergency(false);
    setCountdown(5);
    setIsDispatched(false);
    if (timerRef.current) clearInterval(timerRef.current);
    vibrateCancel();
  };

  // Finalize SOS (send alerts)
  const finalizeSOS = async (contacts, userName) => {
    setIsDispatched(true);
    
    // Get last known location for the SMS
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const response = await fetch('http://localhost:5000/api/sos/send-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contacts: contacts || [],
            userName: userName || 'Nari',
            location: [latitude, longitude]
          })
        });
        const data = await response.json();
        console.log("SOS Alert Dispatch Result:", data);
      } catch (err) {
        console.error("SOS API Error:", err);
      }
    }, (err) => {
      console.error("Location Error during SOS:", err);
    });
  };

  useEffect(() => {
    if (isEmergency && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // This is just a placeholder, real finalize will be called with dynamic data
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isEmergency]);

  const value = {
    isEmergency,
    countdown,
    isDispatched,
    triggerSOS,
    cancelSOS
  };

  return (
    <SOSContext.Provider value={value}>
      {children}
    </SOSContext.Provider>
  );
}
