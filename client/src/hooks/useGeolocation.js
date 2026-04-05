import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to track real-time geolocation of the user.
 * @returns {object} - { location: [lat, lng], error: string, loading: boolean }
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchId = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation([latitude, longitude]);
      setLoading(false);
      setError(null);
    };

    const handleError = (err) => {
      setError(err.message);
      setLoading(false);
    };

    // Watch the user's position for real-time updates
    watchId.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return { location, error, loading };
};
