import React from 'react';
import { STATS } from '../../utilis/data';

const Stats = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {STATS.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`flex flex-col items-center text-center ${
                index !== STATS.length - 1 ? 'md:border-r border-white/5' : ''
              }`}
            >
              <span className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[10px] font-black text-accent-purple uppercase tracking-[0.3em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;