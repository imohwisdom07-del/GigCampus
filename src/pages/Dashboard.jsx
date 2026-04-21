import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  TrendingUp, MapPin, Clock, Star, 
  CheckCircle, Briefcase, Wallet, 
  ChevronRight, ArrowUpRight, PlusCircle
} from 'lucide-react';

import DashboardLayout from '../components/layout/DashboardLayout';

import {
  user,
  activeGigs,
  recommendedGigs,
  portfolioItems,
  STATUS_COLORS,
} from '../utilis/data';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const mainRef = useRef(null);

  const filters = ['All', 'Remote', 'On Campus', 'Tutoring', 'Design', 'Social Media'];

  const filteredGigs = recommendedGigs.filter(gig => {
    const matchesFilter = activeFilter === 'All' ||
      gig.type === activeFilter.toLowerCase().replace(' ', '-') ||
      gig.category === activeFilter;
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <DashboardLayout onSearch={(q) => setSearchQuery(q)}>
      <div ref={mainRef} className="p-6 lg:p-8 space-y-8 bg-black min-h-screen">
        
        <div className="dash-hero relative h-52 md:h-64 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <video autoPlay loop muted playsInline className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-60" poster="/images/University-campus.jpeg">
            <source src="/videos/Students-walking.mp4" type="video/mp4" />
          </video>
          <img src="/images/University-campus.jpeg" alt="Campus" className="block md:hidden absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center h-full">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-500 mb-2 italic">Student Dashboard</p>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase">
              Welcome back,<br/><span className="text-purple-500">{user.name.split(' ')[0]}.</span>
            </h1>
            <p className="text-white/40 text-sm font-bold max-w-sm">
              Current progress: <span className="text-white">{user.activeGigs} active tasks</span> 
            </p>
          </div>

          <div className="absolute top-8 right-8 bg-white/3backdrop-blur-xl border border-white/10 rounded-2xl p-4 hidden lg:block">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Vault Balance</p>
            <p className="text-2xl font-black text-purple-500 italic">₦{user.totalEarned.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Earned', value: `₦${user.totalEarned.toLocaleString()}`, icon: Wallet, trend: '+12%', color: '#8B5CF6' },
            { title: 'Completed', value: user.completedJobs, icon: CheckCircle, trend: 'Success', color: '#A855F7' },
            { title: 'Active Gigs', value: user.activeGigs, icon: Briefcase, trend: 'In Progress', color: '#8B5CF6' },
            { title: 'Avg Rating', value: `${user.avgRating}★`, icon: Star, trend: 'Top Rated', color: '#A855F7' },
          ].map((stat, i) => (
            <div key={i} className="dash-card bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-purple-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{stat.title}</p>
                <stat.icon size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl font-black text-white italic"> {stat.value} </p>
              <div className="flex items-center gap-1.5 mt-2 text-green-500 font-bold text-[10px] uppercase">
                <TrendingUp size={10} /> {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="dash-card bg-white/3 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black text-white uppercase italic tracking-tighter text-xl">Active Operations</h2>
              <Link to="/my-gigs" className="text-purple-500 text-xs font-bold flex items-center gap-1 hover:brightness-125 transition">
                MANAGE <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {activeGigs.map((gig) => {
                const colors = STATUS_COLORS[gig.status] || { bg: 'bg-white/5', text: 'text-white/50', border: 'border-white/10' };
                return (
                  <div key={gig.id} className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white text-sm font-black uppercase italic">{gig.title}</h3>
                        <p className="text-white/30 text-[10px] font-bold mt-1 tracking-widest uppercase">{gig.client}</p>
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                        {gig.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-purple-500 text-sm font-black">₦{gig.price.toLocaleString()}</span>
                      <span className="text-white/20 text-[9px] font-bold flex items-center gap-1 uppercase">
                        <Clock size={10} /> Deadline: {gig.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dash-card bg-white/3 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black text-white uppercase italic tracking-tighter text-xl">New Matches</h2>
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {filters.slice(0, 3).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`shrink-0 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all ${
                      activeFilter === f ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-white/5 text-white/30 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4 max-h-100 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {filteredGigs.map((gig) => (
                <div key={gig.id} className="p-4 rounded-2xl bg-white/2 border border-white/5 group hover:border-purple-500/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white text-sm font-black uppercase italic">{gig.title}</h3>
                        {gig.urgent && <span className="bg-red-500/20 text-red-500 text-[8px] px-1.5 py-0.5 rounded font-black italic">URGENT</span>}
                      </div>
                      <p className="text-white/30 text-[10px] font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
                        {gig.client} • <MapPin size={10} /> {gig.location}
                      </p>
                    </div>
                    <button className="bg-purple-600 text-white p-2 rounded-xl group-hover:scale-110 transition-all">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-purple-500 text-sm font-black">₦{gig.budget.toLocaleString()}</span>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{gig.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-card bg-white/3 border border-white/5 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-black text-white uppercase italic tracking-tighter text-xl">Portfolio Highlights</h2>
            <Link to="/portfolio" className="bg-white/5 hover:bg-white/10 text-white/50 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all">
              Full Archive
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/5 aspect-video cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-1 rounded italic mb-1 inline-block">{item.earned}</span>
                  <h3 className="text-white font-black text-xs uppercase italic">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;