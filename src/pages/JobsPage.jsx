// src/pages/JobsPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Filter, ArrowUpRight, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { recommendedGigs } from '../utilis/data';

const JobsPage = () => {
  const mainRef = useRef(null);
  const [filteredGigs, setFilteredGigs] = useState(recommendedGigs);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Remote', 'On Campus', 'Tutoring', 'Design', 'Social Media'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.job-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    }, mainRef);
    return () => ctx.revert();
  }, [filteredGigs]);

  useEffect(() => {
    const filtered = recommendedGigs.filter((gig) => {
      const matchesFilter = activeFilter === 'All' || 
                           gig.type === activeFilter.toLowerCase().replace(' ', '-') || 
                           gig.category === activeFilter;
      const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           gig.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredGigs(filtered);
  }, [activeFilter, searchQuery]);

  return (
    <DashboardLayout onSearch={(q) => setSearchQuery(q)}>
      <div ref={mainRef} className="max-w-full overflow-x-hidden p-4 lg:p-8 space-y-6">
        
        <div className="header-section">
          <h1 className="text-2xl lg:text-4xl font-black text-white mb-2 tracking-tight">
            Find Your Next Gig
          </h1>
          <p className="text-white/50 text-sm lg:text-base leading-relaxed max-w-full">
            Browse available tasks and connect with clients looking for talented students like you.
          </p>
        </div>

        <div className="header-section bg-glass-surface border border-white/5 rounded-2xl p-4 lg:p-6 shadow-xl w-full">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={16} className="text-accent-purple" />
            <h2 className="font-bold text-white text-sm uppercase tracking-widest">Filter Jobs</h2>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`
                    shrink-0 text-[10px] font-extrabold uppercase 
                    tracking-wider px-4 py-2.5 rounded-xl transition-all
                    whitespace-nowrap border
                    ${activeFilter === f
                        ? 'bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/20'
                        : 'bg-white/5 text-white/40 border-white/5'
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-1">
          <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">
            Found <span className="text-accent-purple font-black">{filteredGigs.length}</span> jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredGigs.length === 0 ? (
            <div className="col-span-full bg-glass-surface border border-white/5 rounded-2xl p-10 text-center">
              <p className="text-white/40 text-sm font-medium italic">No jobs found.</p>
            </div>
          ) : (
            filteredGigs.map((gig) => (
              <div
                key={gig.id}
                className="
                  job-card bg-glass-surface border border-white/5 rounded-2xl p-5
                  hover:border-accent-purple/30 transition-all duration-300
                  flex flex-col w-full min-w-0
                "
              >
                <div className="min-w-0">
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <h3 className="text-white font-bold text-sm lg:text-base leading-tight truncate">
                          {gig.title}
                        </h3>
                        {gig.urgent && (
                          <span className="text-[7px] font-black bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded uppercase border border-amber-500/20">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider truncate font-medium">{gig.client}</p>
                    </div>
                    <div className="shrink-0">
                      <p className="text-accent-purple font-black text-sm lg:text-lg">
                        ₦{gig.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="bg-white/5 text-white/50 text-[9px] font-bold px-2 py-1 rounded-lg border border-white/5">
                      {gig.category}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] text-white/30 font-medium">
                      <MapPin size={10} />
                      <span className="truncate">{gig.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className={`
                    text-[8px] font-black uppercase px-2 py-1 rounded-md
                    ${gig.type === 'remote'
                        ? 'bg-accent-purple/10 text-accent-purple'
                        : 'bg-white/5 text-white/40'
                    }
                  `}>
                    {gig.type === 'remote' ? 'Remote' : 'On Campus'}
                  </span>

                  <button className="flex items-center gap-1 text-accent-purple text-[10px] font-black uppercase hover:gap-2 transition-all">
                    Apply <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="h-10 lg:h-4" />
      </div>
    </DashboardLayout>
  );
};

export default JobsPage;