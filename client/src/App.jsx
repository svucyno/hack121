import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Helplines from './pages/Helplines';
import FakeCall from './pages/FakeCall';
import LiveLocation from './pages/LiveLocation';
import EvidenceCapture from './pages/EvidenceCapture';
import MapPage from './pages/MapPage';
import ReportIncident from './pages/ReportIncident';
import SafeRoute from './pages/SafeRoute';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import FollowerDetector from './pages/FollowerDetector';
import Landing from './pages/Landing';
import Blog from './pages/Blog';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help" element={<Helplines />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/fake-call" element={<FakeCall />} />
            <Route path="/live-location" element={<LiveLocation />} />
            <Route path="/evidence" element={<EvidenceCapture />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/safe-route" element={<SafeRoute />} />
            <Route path="/follower-detector" element={<FollowerDetector />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
