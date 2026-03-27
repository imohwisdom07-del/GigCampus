import React, { useEffect, useRef } from 'react'; // Added useEffect, useRef
import { GIG_CATEGORIES } from '../../utilis/data';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerFadeUp } from '../../utilis/animations'; // Imported your GSAP tool

const Categories = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    // This makes the categories glide in one-by-one
    staggerFadeUp(gridRef.current);
  }, []);

  return (
    <section id="categories" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-accent-purple text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              The Ecosystem
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">
              Pick your hustle, <br />
              <span className="opacity-20">stack your bags.</span>
            </h3>
          </div>
          <Link to="/gigs" className="group flex items-center gap-3 text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest transition-all">
            Browse all gigs <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* CATEGORIES GRID */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GIG_CATEGORIES.map((cat, index) => (
            <div 
              key={cat.id} 
              className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-accent-purple/30 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* THE "HIDDEN" GHOST NUMBER */}
              <span className="absolute -bottom-4 -right-2 text-9xl font-black text-white/[0.02] group-hover:text-accent-purple/[0.05] transition-colors duration-700 pointer-events-none italic">
                0{index + 1}
              </span>

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* ICON BOX */}
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-purple/20 group-hover:scale-110 transition-all duration-500">
                  <cat.icon size={32} className="text-white/40 group-hover:text-accent-purple" />
                </div>

                {/* TEXT CONTENT */}
                <h4 className="text-2xl font-bold text-white mb-3">{cat.name}</h4>
                <p className="text-white/30 text-sm leading-relaxed mb-8">
                  Get paid for tasks in {cat.name.toLowerCase()}—from startups across Africa.
                </p>

                {/* DYNAMIC PROGRESS BAR */}
                <div className="h-[1px] w-12 bg-white/10 group-hover:w-full group-hover:bg-accent-purple/50 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;