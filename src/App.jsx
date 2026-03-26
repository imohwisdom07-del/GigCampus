import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardNavbar from './components/layout/DashboardNavbar'; // 1. New Import

// Pages
import Home from './pages/Home';
import Schools from './pages/Schools';
import Gigs from './pages/Gigs'; 
import Onboarding from './pages/Onboarding'; 
import Login from './pages/Login';      
import JobBoard from './pages/JobBoard'; 

// Scroll Reset Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  
  // Logic to determine which layout to show
  const isAuthPage = ['/register', '/login'].includes(location.pathname);
  const isDashboard = location.pathname === '/dashboard';
  const hideStandardLayout = isAuthPage || isDashboard;

  return (
    <div className="min-h-screen bg-[#050506] selection:bg-accent-purple selection:text-white font-sans">
      
      {/* 2. Show Standard Navbar ONLY on Landing Pages */}
      {!hideStandardLayout && <Navbar />}
      
      {/* 3. Show Dashboard Navbar ONLY on the Dashboard */}
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
      
      {/* Hide Footer on Dashboard and Auth Pages */}
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