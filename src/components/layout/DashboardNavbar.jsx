import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Bell, Search, User, CreditCard } from 'lucide-react';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg rotate-3 flex items-center justify-center shadow-lg shadow-purple-600/20">
              <span className="text-white font-black italic text-xl">G</span>
            </div>
            <span className="text-white font-black uppercase tracking-tighter text-xl italic hidden md:block">
              Gig<span className="text-purple-500">Campus</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center relative group">
            <Search className="absolute left-4 text-white/20 group-focus-within:text-purple-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search gigs, skills..." 
              className="bg-white/3 border border-white/10 rounded-2xl py-2.5 pl-12 pr-6 text-[11px] text-white w-[300px] focus:outline-none focus:border-purple-500/50 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          
          <div className="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full">
            <CreditCard size={14} className="text-green-500" />
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">₦48,500</span>
          </div>

          <button className="relative p-2 text-white/40 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-dark-bg" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className=" flex-col items-end hidden md:flex">
              <span className="text-[11px] font-black text-white uppercase tracking-tighter italic leading-none">Davaboi</span>
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Verified Student</span>
            </div>
            
            <div className="w-10 h-10 rounded-2xl bg-white/3 border border-white/10 flex items-center justify-center text-purple-500 hover:border-purple-500 transition-all cursor-pointer">
              <User size={20} />
            </div>

            <button 
              onClick={() => navigate('/login')}
              className="p-2 text-white/20 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default DashboardNavbar;