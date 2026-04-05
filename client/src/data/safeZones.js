/**
 * Mock dataset of safe zones for the Nirbhaya Nari hackathon demo.
 * In a real application, these would be fetched from a GIS backend or Google Places API.
 */
export const safeZones = [
  {
    id: 1,
    name: "Central Police Station",
    type: "Police",
    lat: 17.3850, // These are global mock coords (near Hyderabad for demo)
    lng: 78.4867,
    address: "MG Road, Hyderabad",
    phone: "100"
  },
  {
    id: 2,
    name: "City Hospital Emergency",
    type: "Hospital",
    lat: 17.3950,
    lng: 78.4767,
    address: "Banjara Hills, Hyderabad",
    phone: "108"
  },
  {
    id: 3,
    name: "Safety Shelter Hub #4",
    type: "Shelter",
    lat: 17.3750,
    lng: 78.4967,
    address: "Koti, Hyderabad",
    phone: "1091"
  }
];
