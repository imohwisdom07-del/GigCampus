import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import { AuthProvider } from './pages/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

import Home from './pages/Home';
import Schools from './pages/Schools';
import Gigs from './pages/Gigs';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import JobBoard from './pages/JobBoard';

// Placeholder components
const Jobs = () => <JobBoard />;
const MyGigs = () => <JobBoard />;
const Messages = () => <JobBoard />;
const Portfolio = () => <JobBoard />;
const Settings = () => <JobBoard />;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();

  // FIX: Define all routes that should NOT show the landing page Navbar/Footer
  const dashboardRoutes = [
    '/dashboard', 
    '/jobs', 
    '/my-gigs', 
    '/messages', 
    '/portfolio', 
    '/settings'
  ];
  
  const authRoutes = ['/register', '/login'];

  // Check if current path is in either list
  const hideStandardLayout = authRoutes.includes(location.pathname) || dashboardRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#050506] selection:bg-accent-purple selection:text-white font-sans">

      {/* Navbar only shows if NOT an auth page or dashboard page */}
      {!hideStandardLayout && <Navbar />}

      <ScrollToTop />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <JobBoard />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        } />
        <Route path="/my-gigs" element={
          <ProtectedRoute>
            <MyGigs />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideStandardLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;