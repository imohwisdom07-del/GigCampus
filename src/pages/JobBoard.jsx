// src/pages/JobBoard.jsx (slightly bolder text)
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  LayoutDashboard, Briefcase, UserCheck, MessageSquare,
  FolderOpen, Settings, LogOut, Bell, PlusCircle,
  CheckCircle, Star, ChevronRight, Wallet,
  Menu, X, TrendingUp, MapPin, Clock, Zap, Search,
  ArrowUpRight,
} from 'lucide-react';

import {
  user,
  activeGigs,
  recommendedGigs,
  portfolioItems,
  NAV_ITEMS as navItemsData,
  STATUS_COLORS,
} from '../utilis/data';

const iconMap = {
  LayoutDashboard, Briefcase, UserCheck, MessageSquare,
  FolderOpen, Settings,
};

const NAV_ITEMS = navItemsData.map(item => ({
  ...item,
  icon: iconMap[item.icon],
}));

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
      <div className="p-6 border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">
            Gig<span className="text-accent-purple">Campus</span>
          </span>
        </Link>
      </div>
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
                  ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-accent-purple' : 'text-white/30 group-hover:text-white/70'} />
              <span className="text-sm font-semibold">{item.name}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-purple" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 mb-3">
          <div className="w-9 h-9 rounded-full bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center flex-shrink-0">
            <span className="text-accent-purple text-xs font-extrabold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-white/40">{user.campus}</span>
              {user.verified && (
                <span className="text-[9px] font-extrabold bg-accent-purple/10 text-accent-purple px-1.5 py-0.5 rounded">
                  VERIFIED
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors w-full px-3 py-2 rounded-xl hover:bg-white/5"
        >
          <LogOut size={15} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-deep-onyx min-h-screen flex font-sans">
      <aside className="hidden md:flex w-64 bg-glass-surface border-r border-white/5 flex-col fixed h-full z-20">
        <SidebarContent />
      </aside>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="fixed top-0 left-0 h-full w-64 bg-glass-surface border-r border-white/5 flex flex-col z-50 md:hidden">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-5 right-5 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}

      <main ref={mainRef} className="flex-1 md:ml-64 min-h-screen">
        <div className="sticky top-0 z-10 bg-deep-onyx/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
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
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent-purple rounded-full" />
            </button>
            <Link to="/jobs" className="bg-accent-purple text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:brightness-110 transition text-sm font-bold">
              <PlusCircle size={15} />
              <span className="hidden sm:inline">Find Gigs</span>
            </Link>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-8">
          {/* Hero Banner */}
          <div className="dash-hero relative h-52 md:h-64 rounded-2xl overflow-hidden">
            <video autoPlay loop muted playsInline className="hidden md:block absolute inset-0 w-full h-full object-cover" poster="/images/University-campus.jpeg" preload="none">
              <source src="/videos/Students-walking.mp4" type="video/mp4" />
            </video>
            <img src="/images/University-campus.jpeg" alt="University campus" className="block md:hidden absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-onyx via-deep-onyx/70 to-transparent" />
            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center h-full">
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-accent-purple mb-2">Good day, student</p>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none mb-3">
                Welcome back,<br/><span className="text-accent-purple">{user.name.split(' ')[0]}.</span>
              </h1>
              <p className="text-white/40 text-sm font-medium max-w-xs">You have <span className="text-white font-bold">{user.activeGigs} active gigs</span> and <span className="text-white font-bold">4 new job matches</span> today.</p>
            </div>
            <div className="absolute top-6 right-6 bg-deep-onyx/80 backdrop-blur-md border border-accent-purple/20 rounded-xl px-4 py-3 hidden md:block">
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1">Total Earned</p>
              <p className="text-xl font-black text-accent-purple">₦{user.totalEarned.toLocaleString()}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Total Earned', value: `₦${user.totalEarned.toLocaleString()}`, icon: Wallet, trend: '+12% this week', color: '#8B5CF6' },
              { title: 'Completed', value: user.completedJobs, icon: CheckCircle, trend: 'High success rate', color: '#A855F7' },
              { title: 'Active Gigs', value: user.activeGigs, icon: Briefcase, trend: '2 in review', color: '#8B5CF6' },
              { title: 'Avg Rating', value: `${user.avgRating}★`, icon: Star, trend: 'Top Rated', color: '#A855F7' },
            ].map((stat, i) => (
              <div key={i} className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider">{stat.title}</p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                    <stat.icon size={15} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-medium text-white/25 mt-2 flex items-center gap-1"><TrendingUp size={10} />{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Balanced Active Gigs + Recommended */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Gigs */}
            <div className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-white text-base">Active Gigs</h2>
                <Link to="/my-gigs" className="text-accent-purple text-xs font-semibold flex items-center gap-1 hover:opacity-80">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {activeGigs.map((gig) => {
                  const colors = STATUS_COLORS[gig.status] || STATUS_COLORS['Pending'];
                  const statusStyle = gig.status === 'In Progress' 
                    ? { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/20' }
                    : colors;
                  return (
                    <div key={gig.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent-purple/20 transition cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-bold truncate">{gig.title}</h3>
                          <p className="text-white/35 text-[11px] font-medium mt-0.5">{gig.client}</p>
                        </div>
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-lg border ml-2 flex-shrink-0 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                          {gig.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-accent-purple text-sm font-extrabold">₦{gig.price.toLocaleString()}</span>
                        <span className="text-white/25 text-[9px] font-medium flex items-center gap-1">
                          <Clock size={9} />
                          {gig.deadline}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-white text-base">Recommended</h2>
                <Link to="/jobs" className="text-accent-purple text-xs font-semibold flex items-center gap-1 hover:opacity-80">
                  Explore <ChevronRight size={12} />
                </Link>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex-shrink-0 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                      activeFilter === f ? 'bg-accent-purple text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {filteredGigs.length === 0 ? (
                  <p className="text-white/25 text-sm font-medium text-center py-6">No jobs match this filter</p>
                ) : filteredGigs.map((gig) => (
                  <div key={gig.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent-purple/20 transition cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white text-sm font-bold truncate">{gig.title}</h3>
                          {gig.urgent && <span className="text-[8px] font-extrabold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded uppercase">Urgent</span>}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/35 text-[11px] font-medium">{gig.client}</span>
                          <span className="text-white/20 text-[11px] font-medium flex items-center gap-1">
                            <MapPin size={9} />
                            {gig.location}
                          </span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 ml-2 bg-accent-purple/10 text-accent-purple border border-accent-purple/20 px-2.5 py-1 rounded-lg text-[9px] font-extrabold hover:bg-accent-purple hover:text-white transition-all flex items-center gap-1">
                        Apply <ArrowUpRight size={9} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-accent-purple text-sm font-extrabold">₦{gig.budget.toLocaleString()}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        gig.type === 'remote' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-white/5 text-white/40'
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
          <div className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-white">Portfolio Highlights</h2>
              <Link to="/portfolio" className="text-accent-purple text-xs font-semibold flex items-center gap-1 hover:opacity-80">View all <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {portfolioItems.map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="h-36 rounded-xl overflow-hidden border border-white/5 relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-onyx/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3"><span className="text-accent-purple text-xs font-extrabold">{item.earned}</span></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-accent-purple text-white px-3 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1">View <ArrowUpRight size={10} /></div>
                    </div>
                  </div>
                  <div className="mt-3"><h3 className="text-white text-sm font-bold">{item.title}</h3><p className="text-white/30 text-[11px] font-medium mt-0.5">{item.category}</p></div>
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