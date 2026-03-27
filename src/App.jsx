import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardNavbar from './components/layout/DashboardNavbar';

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
      
      {isDashboard && <DashboardNavbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<JobBoard />} />
        <Route path="*" element={<Home />} />
      </Routes>
      
      {!hideStandardLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop /> 
      <AppContent />
    </Router>
  );
};

export default App;