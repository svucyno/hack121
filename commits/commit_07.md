# Commit #7: GIS Integration & Location Services

**Title:** `feat: integrate real-time Leaflet mapping and live geolocation`

**Description:**
Implemented the "Live Safe Map" engine to provide users with spatial safety awareness.
- **Mapping Engine**: Integrated `leaflet` and `react-leaflet` for high-performance mobile mapping.
- **Real-Time Tracking**: Developed `useGeolocation.js` custom hook using the Browser Geolocation API (`watchPosition`) to track user movement.
- **Safe Zone Visualization**:
  - Implemented `safeZones.js` mock dataset for demo purposes.
  - Added interactive markers for Police Stations and Hospitals with details and quick-call actions.
- **UI/UX Enhancements**:
  - Added a "Recenter" floating action button.
  - Implemented pulsing user location markers.
  - Added "Live Protection" status indicator overlay on the map.
- **Error Handling**: Graceful fallback for location permission denial and loading states.
