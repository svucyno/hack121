import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute'; // New import
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
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><Helplines /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
            <Route path="/fake-call" element={<ProtectedRoute><FakeCall /></ProtectedRoute>} />
            <Route path="/live-location" element={<ProtectedRoute><LiveLocation /></ProtectedRoute>} />
            <Route path="/evidence" element={<ProtectedRoute><EvidenceCapture /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><ReportIncident /></ProtectedRoute>} />
            <Route path="/safe-route" element={<ProtectedRoute><SafeRoute /></ProtectedRoute>} />
            <Route path="/follower-detector" element={<ProtectedRoute><FollowerDetector /></ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
