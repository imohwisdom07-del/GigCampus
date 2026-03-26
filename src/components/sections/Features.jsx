import React from 'react';
import { GIG_CATEGORIES } from '../../utilis/data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section id="categories" className="py-24 bg-[#050506] px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-purple mb-4">
              Explore Opportunities
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              High-income skills, <br />
              <span className="opacity-30">Right on campus.</span>
            </h3>
          </div>
          <Link to="/gigs" className="text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
            View all categories <ArrowRight size={14} />
          </Link>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GIG_CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-accent-purple/50 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-purple/20 transition-all duration-500">
                  <cat.icon size={28} className="text-white/60 group-hover:text-accent-purple transition-colors" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {cat.name}
                </h4>
                <p className="text-white/30 text-sm leading-relaxed mb-6">
                  Earn by completing verified {cat.name.toLowerCase()} tasks from top brands.
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-purple opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Browse Gigs <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;