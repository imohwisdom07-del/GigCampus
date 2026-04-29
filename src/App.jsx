import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import { AuthProvider } from './pages/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

// Landing Pages
import Home from './pages/Home';
import Schools from './pages/Schools';
import Gigs from './pages/Gigs';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import JobsPage from './pages/JobsPage';
import MyGigsPage from './pages/MyGigsPage';
import MessagesPage from './pages/MessagesPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const dashboardRoutes = [
    '/dashboard',
    '/jobs',
    '/my-gigs',
    '/messages',
    '/portfolio',
    '/settings',
  ];

  const authRoutes = ['/register', '/login', '/auth/callback'];

  // Check if current path should hide standard layout
  const hideStandardLayout =
    authRoutes.includes(location.pathname) ||
    dashboardRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-accent-purple selection:text-white font-sans">
      {!hideStandardLayout && <Navbar />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-gigs"
          element={
            <ProtectedRoute>
              <MyGigsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <PortfolioPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

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
