import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const PortfolioShowcase = ({ items }) => {
  return (
    <div className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-white">Portfolio Highlights</h2>
        <Link
          to="/portfolio"
          className="text-accent-purple text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="text-white/25 text-sm col-span-full text-center py-8">
            No portfolio items yet. Showcase your work!
          </p>
        ) : (
          items.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Image Container */}
              <div className="h-36 rounded-xl overflow-hidden border border-white/5 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full h-full object-cover 
                    group-hover:scale-105 transition-transform duration-500
                  "
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep-onyx/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-accent-purple text-xs font-extrabold">
                    {item.earned}
                  </span>
                </div>

                <div className="
                  absolute inset-0 flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition-opacity
                ">
                  <div className="
                    bg-accent-purple text-white px-3 py-1.5 rounded-lg 
                    text-[10px] font-extrabold flex items-center gap-1
                  ">
                    View <ArrowUpRight size={10} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-white text-sm font-bold">{item.title}</h3>
                <p className="text-white/30 text-[11px] font-medium mt-0.5">
                  {item.category}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioShowcase;
