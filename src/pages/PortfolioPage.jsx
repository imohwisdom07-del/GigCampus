import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { portfolioItems } from '../utilis/data';

const PortfolioPage = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      gsap.fromTo(
        '.header-section',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout>
      <div ref={mainRef} className="p-6 lg:p-8 space-y-6">
        <div className="header-section">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
            My Portfolio
          </h1>
          <p className="text-white/50">
            Showcase your best work and impress potential clients.
          </p>
        </div>

        <div className="header-section">
          <button className="
            flex items-center gap-2 bg-accent-purple text-white 
            px-6 py-2.5 rounded-lg font-semibold 
            hover:bg-accent-purple/90 transition-all
            shadow-lg shadow-accent-purple/20
          ">
            <Plus size={18} />
            Add New Work
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.length === 0 ? (
            <div className="col-span-full bg-glass-surface border border-white/5 rounded-2xl p-12 text-center">
              <p className="text-white/40 text-base font-medium mb-4">
                No portfolio items yet
              </p>
              <button className="
                text-accent-purple font-semibold hover:opacity-80
                transition-opacity
              ">
                Add your first work
              </button>
            </div>
          ) : (
            portfolioItems.map((item, i) => (
              <div
                key={i}
                className="
                  portfolio-card bg-glass-surface border border-white/5 
                  rounded-2xl overflow-hidden hover:border-accent-purple/30 
                  transition-all duration-300 group
                "
              >
                <div className="relative h-48 overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full h-full object-cover 
                      group-hover:scale-110 transition-transform duration-500
                    "
                  />

                  <div className="
                    absolute inset-0 bg-black/40 opacity-0 
                    group-hover:opacity-100 transition-opacity
                    flex items-center justify-center gap-2
                  ">
                    <button className="
                      p-2 bg-accent-purple rounded-lg text-white 
                      hover:bg-accent-purple/80 transition-all
                    ">
                      <Edit2 size={16} />
                    </button>
                    <button className="
                      p-2 bg-red-500/20 rounded-lg text-red-400 
                      hover:bg-red-500/30 transition-all
                    ">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="
                    absolute top-3 right-3 bg-black/60 backdrop-blur-sm 
                    px-3 py-1.5 rounded-lg
                  ">
                    <p className="text-accent-purple text-xs font-extrabold">
                      {item.earned}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-white text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm mb-3">
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[11px] font-medium text-white/40">
                      View Details
                    </span>
                    <span className="text-accent-purple text-xs font-bold">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="h-8" />
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;
