import React, { useState } from 'react';
import { GIG_LIST, GIG_CATEGORIES } from '../utilis/data';
import { Filter, Clock, Banknote, ShieldCheck } from 'lucide-react';

const Gigs = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGigs = activeCategory === 'all' 
    ? GIG_LIST 
    : GIG_LIST.filter(gig => gig.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#050506] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Available <span className="text-accent-purple">Gigs</span>
          </h1>
          <p className="text-white/40 font-medium">Verified tasks from Nigerian startups and brands.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === 'all' ? 'bg-accent-purple text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
          >
            All Gigs
          </button>
          {GIG_CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.slug ? 'bg-accent-purple text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div key={gig.id} className="nav-glass p-6 rounded-[2rem] border border-white/5 hover:border-accent-purple/30 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-accent-purple border border-white/5">
                  {gig.logo}
                </div>
                <span className="text-[10px] font-black px-3 py-1 bg-cyber-green/10 text-cyber-green rounded-full border border-cyber-green/20 uppercase tracking-widest">
                  {gig.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                {gig.title}
              </h3>
              <p className="text-white/40 text-sm mb-6">{gig.company}</p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-white/60">
                  <Banknote size={16} className="text-accent-purple" />
                  <span className="text-sm font-bold">{gig.price}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock size={16} className="text-accent-purple" />
                  <span className="text-sm font-bold">{gig.duration}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-4 bg-white/5 hover:bg-accent-purple text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Gigs;