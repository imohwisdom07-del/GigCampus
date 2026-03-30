import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  LayoutDashboard, Briefcase, UserCheck, MessageSquare,
  FolderOpen, Settings, LogOut, Bell, PlusCircle,
  CheckCircle, Star, ChevronRight, Award, Wallet,
  Menu, X, TrendingUp, MapPin, Clock, Zap, Search,
  Filter, ArrowUpRight,
} from 'lucide-react';

// ── DATA ─────────────────────────────────────────────────────────────────────
const user = {
  name: 'Wisdom Imoh',
  campus: 'UNILAG',
  verified: true,
  avatar: null,
  totalEarned: 47500,
  completedJobs: 12,
  activeGigs: 3,
  avgRating: 4.8,
};

const activeGigs = [
  { id: 1, title: 'Instagram Management', client: 'FoodieNG Lagos', price: 5000, status: 'In Progress', deadline: '3 days left' },
  { id: 2, title: 'Logo Design', client: 'Mama Tunde Catering', price: 8000, status: 'In Review', deadline: '1 day left' },
  { id: 3, title: 'Data Entry — Excel', client: 'Lagos Startup', price: 2000, status: 'Pending', deadline: '5 days left' },
];

const recommendedGigs = [
  { id: 1, title: 'Maths Tutor — 100 Level', budget: 3000, client: 'Private Student', category: 'Tutoring', location: 'UNILAG', type: 'on-campus', urgent: true },
  { id: 2, title: 'Product Description Writing', budget: 4000, client: 'ShopNG Store', category: 'Writing', location: 'Remote', type: 'remote', urgent: false },
  { id: 3, title: 'Flyer Distribution', budget: 2500, client: 'Campus Event Co.', category: 'Physical', location: 'On Campus', type: 'on-campus', urgent: true },
  { id: 4, title: 'Social Media Content', budget: 6000, client: 'Fashion Brand NG', category: 'Social Media', location: 'Remote', type: 'remote', urgent: false },
];

const portfolioItems = [
  { title: 'Vestige Design', category: 'Graphic Design', image: '/images/Student_designing_sneakers.jpeg', earned: '₦15,000' },
  { title: 'Campus Flyer', category: 'Branding', image: '/images/Student_holding_tech.jpeg', earned: '₦8,000' },
  { title: 'Tech Week', category: 'Video Editing', image: '/images/Student_desk_with_laptop.jpeg', earned: '₦12,000' },
];

const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Jobs', icon: Briefcase, path: '/jobs' },
  { name: 'My Gigs', icon: UserCheck, path: '/my-gigs' },
  { name: 'Messages', icon: MessageSquare, path: '/messages' },
  { name: 'Portfolio', icon: FolderOpen, path: '/portfolio' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const STATUS_COLORS = {
  'In Progress': { bg: 'bg-[#C8F279]/10', text: 'text-[#C8F279]', border: 'border-[#C8F279]/20' },
  'In Review':   { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  'Pending':     { bg: 'bg-white/5',       text: 'text-white/50',   border: 'border-white/10' },
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const JobBoard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const mainRef = useRef(null);

  const filters = ['All', 'Remote', 'On Campus', 'Tutoring', 'Design', 'Social Media'];

  const filteredGigs = recommendedGigs.filter(gig => {
    const matchesFilter = activeFilter === 'All' ||
      gig.type === activeFilter.toLowerCase().replace(' ', '-') ||
      gig.category === activeFilter;
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-card', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.dash-hero',
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gigcampus_user');
    navigate('/login');
  };

  const initials = user.name.split(' ').map(n => n[0]).join('');

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C8F279] flex items-center justify-center">
            <Zap size={16} className="text-[#080808]" />
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            Gig<span className="text-[#C8F279]">Campus</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = window.location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-[#C8F279]/10 text-[#C8F279] border border-[#C8F279]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-[#C8F279]' : 'text-white/30 group-hover:text-white/70'} />
              <span className="text-sm font-medium">{item.name}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C8F279]" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#C8F279]/20 border border-[#C8F279]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[#C8F279] text-xs font-black">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/40">{user.campus}</span>
              {user.verified && (
                <span className="text-[9px] bg-[#C8F279]/10 text-[#C8F279] px-1.5 py-0.5 rounded font-bold">
                  VERIFIED
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors w-full px-3 py-2 rounded-xl hover:bg-white/5"
        >
          <LogOut size={15} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#080808] min-h-screen flex font-sans">

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 bg-[#0d0d0d] border-r border-white/5 flex-col fixed h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-white/5 flex flex-col z-50 md:hidden">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-5 right-5 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main */}
      <main ref={mainRef} className="flex-1 md:ml-64 min-h-screen">

        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white/50 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white/3 border border-white/8 rounded-xl px-3 py-2 w-64">
              <Search size={14} className="text-white/30" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition border border-white/0 hover:border-white/8">
              <Bell size={18} className="text-white/50" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C8F279] rounded-full" />
            </button>
            <Link
              to="/jobs"
              className="bg-[#C8F279] text-[#080808] px-4 py-2 rounded-xl flex items-center gap-2 hover:brightness-105 transition text-sm font-bold"
            >
              <PlusCircle size={15} />
              <span className="hidden sm:inline">Find Gigs</span>
            </Link>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-8">

          {/* Hero Banner */}
          <div className="dash-hero relative h-52 md:h-64 rounded-2xl overflow-hidden">
            <video
              autoPlay loop muted playsInline
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
              poster="/images/University-campus.jpeg"
              preload="none"
            >
              <source src="/videos/Students-walking.mp4" type="video/mp4" />
            </video>
            <img
              src="/images/University-campus.jpeg"
              alt="University campus"
              className="block md:hidden absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center h-full">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C8F279] mb-2">
                Good day, student
              </p>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none mb-3">
                Welcome back,<br/>
                <span className="text-[#C8F279]">{user.name.split(' ')[0]}.</span>
              </h1>
              <p className="text-white/40 text-sm max-w-xs">
                You have <span className="text-white">{user.activeGigs} active gigs</span> and <span className="text-white">4 new job matches</span> today.
              </p>
            </div>
            {/* Earnings pill */}
            <div className="absolute top-6 right-6 bg-[#080808]/80 backdrop-blur-md border border-[#C8F279]/20 rounded-xl px-4 py-3 hidden md:block">
              <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Total Earned</p>
              <p className="text-xl font-black text-[#C8F279]">₦{user.totalEarned.toLocaleString()}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Total Earned', value: `₦${user.totalEarned.toLocaleString()}`, icon: Wallet, trend: '+12% this week', color: '#C8F279' },
              { title: 'Completed', value: user.completedJobs, icon: CheckCircle, trend: 'High success rate', color: '#C8F279' },
              { title: 'Active Gigs', value: user.activeGigs, icon: Briefcase, trend: '2 in review', color: '#CEB6D8' },
              { title: 'Avg Rating', value: `${user.avgRating}★`, icon: Star, trend: 'Top Rated', color: '#CEB6D8' },
            ].map((stat, i) => (
              <div key={i} className="dash-card bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider">{stat.title}</p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                    <stat.icon size={15} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                <p className="text-[10px] text-white/25 mt-2 flex items-center gap-1">
                  <TrendingUp size={10} />
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Active Gigs + Recommended */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Active Gigs */}
            <div className="dash-card bg-[#111111] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-white">Active Gigs</h2>
                <Link to="/my-gigs" className="text-[#C8F279] text-xs flex items-center gap-1 hover:opacity-80 transition font-medium">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {activeGigs.map((gig) => {
                  const colors = STATUS_COLORS[gig.status] || STATUS_COLORS['Pending'];
                  return (
                    <div key={gig.id} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition group cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-semibold truncate">{gig.title}</h3>
                          <p className="text-white/35 text-[11px] mt-0.5">{gig.client}</p>
                        </div>
                        <span className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded-lg font-bold border ml-2 flex-shrink-0 ${colors.bg} ${colors.text} ${colors.border}`}>
                          {gig.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[#C8F279] text-sm font-bold">₦{gig.price.toLocaleString()}</span>
                        <span className="text-white/25 text-[10px] flex items-center gap-1">
                          <Clock size={10} />
                          {gig.deadline}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="dash-card bg-[#111111] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-white">Recommended</h2>
                <Link to="/jobs" className="text-[#C8F279] text-xs flex items-center gap-1 hover:opacity-80 transition font-medium">
                  Explore <ChevronRight size={12} />
                </Link>
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                      activeFilter === f
                        ? 'bg-[#C8F279] text-[#080808]'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredGigs.length === 0 ? (
                  <p className="text-white/25 text-sm text-center py-6">No jobs match this filter</p>
                ) : filteredGigs.map((gig) => (
                  <div key={gig.id} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-[#C8F279]/20 transition group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white text-sm font-semibold truncate">{gig.title}</h3>
                          {gig.urgent && (
                            <span className="text-[8px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase flex-shrink-0">
                              Urgent
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/35 text-[11px]">{gig.client}</span>
                          <span className="text-white/20 text-[11px] flex items-center gap-1">
                            <MapPin size={9} />
                            {gig.location}
                          </span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 ml-2 bg-[#C8F279]/10 text-[#C8F279] border border-[#C8F279]/20 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-[#C8F279] hover:text-[#080808] transition-all flex items-center gap-1">
                        Apply <ArrowUpRight size={10} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#C8F279] text-sm font-bold">₦{gig.budget.toLocaleString()}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                        gig.type === 'remote'
                          ? 'bg-[#CEB6D8]/10 text-[#CEB6D8]'
                          : 'bg-white/5 text-white/40'
                      }`}>
                        {gig.type === 'remote' ? 'Remote' : 'On Campus'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <div className="dash-card bg-[#111111] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-white">Portfolio Highlights</h2>
              <Link to="/portfolio" className="text-[#C8F279] text-xs flex items-center gap-1 hover:opacity-80 transition font-medium">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {portfolioItems.map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="h-36 rounded-xl overflow-hidden border border-white/5 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[#C8F279] text-xs font-bold">{item.earned}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-[#C8F279] text-[#080808] px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                        View <ArrowUpRight size={10} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white text-sm font-semibold">{item.title}</h3>
                    <p className="text-white/30 text-[11px] mt-0.5">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default JobBoard;
