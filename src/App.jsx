import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Schools from './pages/Schools';
import Gigs from './pages/Gigs'; 
import Onboarding from './pages/Onboarding'; // 1. Import the Onboarding/Register page

// Scroll Reset Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop /> 
      <div className="min-h-screen bg-[#050506] selection:bg-accent-purple selection:text-white">
        <Navbar />
        
        <Routes>
          {/* Main Landing */}
          <Route path="/" element={<Home />} />
          
          {/* Institutional / Partnerships */}
          <Route path="/schools" element={<Schools />} />
          
          {/* The Hustle / Waitlist */}
          <Route path="/gigs" element={<Gigs />} />

          {/* 2. The Get Started Flow */}
          <Route path="/register" element={<Onboarding />} />
          
          {/* Optional: Add a catch-all redirect to Home if page doesn't exist */}
          <Route path="*" element={<Home />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;