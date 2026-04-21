import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Menu, 
  Bell, 
  Search, 
  LayoutDashboard, 
  Briefcase, 
  UserCheck, 
  MessageSquare, 
  FolderOpen, 
  Settings 
} from 'lucide-react'; 
import Sidebar from './Sidebar';
import { user, NAV_ITEMS as navItemsData } from '../../utilis/data';
const iconMap = {
  LayoutDashboard: LayoutDashboard,
  Briefcase: Briefcase,
  UserCheck: UserCheck,
  MessageSquare: MessageSquare,
  FolderOpen: FolderOpen,
  Settings: Settings,
};

const NAV_ITEMS = navItemsData.map(item => ({
  ...item,
  icon: iconMap[item.icon],
}));

const DashboardLayout = ({ children, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gigcampus_user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-black min-h-screen flex font-sans">
      {/* Sidebar */}
      <Sidebar
        navItems={NAV_ITEMS}
        user={user}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuClose={() => setMobileMenuOpen(false)}
      />

      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <header
          ref={headerRef}
          className="
            sticky top-0 z-10 bg-black/80 backdrop-blur-xl 
            border-b border-white/5 px-4 md:px-8 py-4
          "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <button
                className="md:hidden text-white/50 hover:text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={22} />
              </button>

              <div className="relative hidden md:block flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search jobs, gigs, people..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="
                    w-full bg-white/5 border border-white/10 rounded-lg 
                    pl-10 pr-4 py-2 text-white placeholder-white/30
                    focus:outline-none focus:border-purple-500/50
                    transition-colors duration-200
                  "
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-white/50 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
              </button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="
                  w-full bg-white/5 border border-white/10 rounded-lg 
                  pl-10 pr-4 py-2 text-white placeholder-white/30
                  focus:outline-none focus:border-purple-500/50
                  transition-colors duration-200
                "
              />
            </div>
          </div>
        </header>

        <div ref={contentRef} className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;