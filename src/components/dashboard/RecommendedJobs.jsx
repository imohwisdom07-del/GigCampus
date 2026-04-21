import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, ArrowUpRight } from 'lucide-react';

const RecommendedJobs = ({ jobs, filters }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGigs = jobs.filter((gig) => {
    const matchesFilter =
      activeFilter === 'All' ||
      gig.type === activeFilter.toLowerCase().replace(' ', '-') ||
      gig.category === activeFilter;
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-base">Recommended</h2>
        <Link
          to="/jobs"
          className="text-accent-purple text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          Explore <ChevronRight size={12} />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`
              shrink-0 text-[10px] font-extrabold uppercase 
              tracking-wider px-3 py-1.5 rounded-lg transition-all
              ${
                activeFilter === f
                  ? 'bg-accent-purple text-white'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-3 max-h-90 overflow-y-auto pr-1">
        {filteredGigs.length === 0 ? (
          <p className="text-white/25 text-sm font-medium text-center py-6">
            No jobs match this filter
          </p>
        ) : (
          filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="
                p-3 rounded-xl bg-white/5 border border-white/5 
                hover:border-accent-purple/20 transition cursor-pointer
                group
              "
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm font-bold truncate">
                      {gig.title}
                    </h3>
                    {gig.urgent && (
                      <span className="text-[8px] font-extrabold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded uppercase shrink-0">
                        Urgent
                      </span>
                    )}
                  </div>

                  {/* Client + Location */}
                  <div className="flex items-center gap-3">
                    <span className="text-white/35 text-[11px] font-medium">
                      {gig.client}
                    </span>
                    <span className="text-white/20 text-[11px] font-medium flex items-center gap-1">
                      <MapPin size={9} />
                      {gig.location}
                    </span>
                  </div>
                </div>

                <button className="
                  shrink-0 ml-2 bg-accent-purple/10 text-accent-purple 
                  border border-accent-purple/20 px-2.5 py-1 rounded-lg 
                  text-[9px] font-extrabold hover:bg-accent-purple hover:text-white 
                  transition-all flex items-center gap-1
                ">
                  Apply <ArrowUpRight size={9} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-accent-purple text-sm font-extrabold">
                  ₦{gig.budget.toLocaleString()}
                </span>
                <span
                  className={`
                    text-[9px] font-bold px-2 py-0.5 rounded-full
                    ${
                      gig.type === 'remote'
                        ? 'bg-accent-purple/10 text-accent-purple'
                        : 'bg-white/5 text-white/40'
                    }
                  `}
                >
                  {gig.type === 'remote' ? 'Remote' : 'On Campus'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
