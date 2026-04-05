# Nirbhaya Nari - AI-Powered Women's Safety Platform
**Team: Dream Coders**

## 📝 Abstract
**Nirbhaya Nari** is an AI-powered women's safety mobile application. The application addresses a single, critical failure of every existing safety tool — they are reactive, not intelligent. Nirbhaya Nari changes that.

At its core is a **Smart Emergency Decision Agent** — an AI that thinks the moment you can't. When an SOS is triggered via button press, phone shake, or voice scream, it reads the situation instantly: what time is it, how dangerous is this location, how far away is the nearest police station, how close is family. In seconds, it decides who to alert, in what order, and with what urgency.

A live crime heatmap overlays the user's map with community-reported danger zones, while a Safe Route Suggester recommends the safest path to any destination. Unsafe Zone Alerts notify the user the moment they enter a high-risk area. A Journey Tracker monitors the user's trip and raises an alert if they stop unexpectedly. The Safe Spot Finder locates the nearest police station, hospital, or verified safe café in real time and guides the way to it when a woman is in danger.

Nirbhaya Nari is not another app with a red button. It is the first women's safety platform that thinks — because in a genuine emergency, thinking is exactly what a woman in panic cannot afford to do alone.

---

## 🚩 Problem Statement and Its Relevance
According to the National Crime Records Bureau (NCRB) 2023 report, a total of 4,48,211 crimes against women were reported in India. That is roughly **one crime every 70 seconds**. The Thomson Reuters Foundation ranked India as the most dangerous country in the world for women in terms of sexual violence and human trafficking.

But here is what no report captures: it doesn't record the silent calculation every woman makes before stepping out after dark — which route is busiest, which road has streetlights, which way has people. 

We have built rockets that leave the atmosphere and supercomputers in every pocket, yet the best tool we have handed women in moments of terror is a button that just sends a simple text message. Not a system that thinks. Not a tool that understands that 11 PM in an unfamiliar neighbourhood is not the same as 2 PM outside her office building. Nirbhaya Nari recognises panic, reasons through chaos, and responds with the precision that a life-or-death moment demands.

---

## 💡 Proposed Solution and Approach

### 1. Smart Emergency Decision AI Agent
When an SOS is triggered via button, shake, or scream, a 10-second cancellation countdown begins. Once confirmed, the AI agent analyses the user's time, location risk score, distance to police, and distance to trusted contacts — and decides who to alert first. Simultaneously, the app silently records audio and video and uploads it to the cloud in real time. The Quick Navigate feature activates immediately, giving voice-guided directions to the nearest safe location.

### 2. Contextual Safety Awareness
Nirbhaya Nari overlays a live crime heatmap on the user's map — green for safe, yellow for moderate, red for high-risk — built from community reports and public crime data. The Safe Route Suggester recommends paths that avoid danger zones, and the Unsafe Zone Alert notifies the user the moment she enters a flagged area.

### 3. Community, Resources, and Accessibility
Nearby registered SafeStep volunteers are automatically alerted during an SOS — a volunteer 200 metres away can respond faster than family 5 kilometres away. Users can anonymously report incidents and view a live Community Safety Feed. A Helpline Directory provides one-tap access to national helplines. The app supports Telugu, Hindi, and English.

### 4. Suspicious Behaviour Detection
Nirbhaya Nari monitors two silent background signals. The GPS layer tracks movement patterns to detect if someone is mirroring the user's route. The Bluetooth layer scans for device IDs to see if the same device keeps appearing near the user. When both layers confirm a threat, the user receives a discreet vibration alert: "Someone may be following you," and is offered silent options to reroute or trigger a silent SOS.

---

## 🛠️ Tech Stack
- **🛡️ Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Firebase SDK
- **⚙️ Backend**: Node.js, Express.js
- **🛰️ Real-Time & Database**: Firebase Firestore, Firebase Authentication, Firebase Storage
- **📱 APIs & Hardware**: Geolocation API, MediaRecorder API, Web Speech API, Accelerometer API, Service Workers (PWA), Twilio API
- **🌐 Deployment**: Vercel, GitHub

---

## 🏗️ Basic Workflow
1. **Safe Navigation**: Live crime heatmap loads. Safe Route Suggester avoids red zones. Community reports feed the map.
2. **Trigger**: Button press, 3x phone shake, or voice scream.
3. **AI Decision**: Smart Decision Agent analyses context and dispatches alerts sequentially.
4. **Escape**: Quick Navigate guides the user to the nearest safety point via voice.
5. **Evidence**: App records video/audio and uploads to the cloud instantly.
6. **Network**: Nearby volunteers are alerted and navigated to the user's location.

---

## 🚀 How to Run Locally
1. `npm install` in both `client` and `server` folders.
2. Run `npm run dev` in the `client` folder.
3. Run `npm start` in the `server` folder.
