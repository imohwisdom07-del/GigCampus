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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();

  const isAuthPage = ['/register', '/login'].includes(location.pathname);
  const isDashboard = location.pathname === '/dashboard';
  const hideStandardLayout = isAuthPage || isDashboard;

  return (
    <div className="min-h-screen bg-[#050506] selection:bg-accent-purple selection:text-white font-sans">

      {!hideStandardLayout && <Navbar />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route — must be logged in */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <JobBoard />
          </ProtectedRoute>
        } />

        {/* Catch all */}
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
