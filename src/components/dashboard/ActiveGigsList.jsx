import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { STATUS_COLORS } from '../../utilis/data';

const ActiveGigsList = ({ gigs }) => {
  return (
    <div className="dash-card bg-glass-surface border border-white/5 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-base">Active Gigs</h2>
        <Link
          to="/my-gigs"
          className="text-accent-purple text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>

      <div className="space-y-3">
        {gigs.length === 0 ? (
          <p className="text-white/25 text-sm text-center py-6">
            No active gigs yet. Start exploring!
          </p>
        ) : (
          gigs.map((gig) => {
            const colors = STATUS_COLORS[gig.status] || STATUS_COLORS['Pending'];
            const statusStyle =
              gig.status === 'In Progress'
                ? {
                    bg: 'bg-accent-purple/10',
                    text: 'text-accent-purple',
                    border: 'border-accent-purple/20',
                  }
                : colors;

            return (
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
                    <h3 className="text-white text-sm font-bold truncate">
                      {gig.title}
                    </h3>
                    <p className="text-white/35 text-[11px] font-medium mt-0.5">
                      {gig.client}
                    </p>
                  </div>
                  <span
                    className={`
                      text-[9px] font-extrabold uppercase tracking-wider 
                      px-2 py-1 rounded-lg border ml-2 shrink-0
                      ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
                    `}
                  >
                    {gig.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-accent-purple text-sm font-extrabold">
                    ₦{gig.price.toLocaleString()}
                  </span>
                  <span className="text-white/25 text-[9px] font-medium flex items-center gap-1">
                    <Clock size={9} />
                    {gig.deadline}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActiveGigsList;
