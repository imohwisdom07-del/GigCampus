import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Clock, CheckCircle, AlertCircle, Archive, MessageSquare } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { activeGigs, STATUS_COLORS } from '../utilis/data';

const MyGigsPage = () => {
  const mainRef = useRef(null);
  const [activeTab, setActiveTab] = useState('active');
  const completedGigs = [
    {
      id: 4,
      title: 'Email Newsletter Copy',
      client: 'TechStartup Co.',
      price: 3500,
      status: 'Completed',
      deadline: 'Completed 2 days ago',
      rating: 5,
    },
    {
      id: 5,
      title: 'Social Media Strategy',
      client: 'Fashion Boutique',
      price: 6000,
      status: 'Completed',
      deadline: 'Completed 1 week ago',
      rating: 4.5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gig-card',
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
  }, [activeTab]);

  const tabs = [
    { id: 'active', label: 'Active', icon: Clock },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'archived', label: 'Archived', icon: Archive },
  ];

  const displayGigs =
    activeTab === 'active'
      ? activeGigs
      : activeTab === 'completed'
        ? completedGigs
        : [];

  return (
    <DashboardLayout>
      <div ref={mainRef} className="p-6 lg:p-8 space-y-6">
        <div className="header-section">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
            My Gigs
          </h1>
          <p className="text-white/50 max-w-2xl">
            Track your active, completed, and archived projects in one place.
          </p>
        </div>

        <div className="header-section bg-glass-surface border border-white/5 rounded-2xl p-4">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl 
                    font-semibold text-sm transition-all
                    ${
                      isActive
                        ? 'bg-accent-purple text-white'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          {displayGigs.length === 0 ? (
            <div className="bg-glass-surface border border-white/5 rounded-2xl p-12 text-center">
              <p className="text-white/40 text-base font-medium">
                No {activeTab} gigs yet.
              </p>
            </div>
          ) : (
            displayGigs.map((gig) => {
              const colors = STATUS_COLORS[gig.status] || STATUS_COLORS['Pending'];
              const statusStyle =
                gig.status === 'In Progress'
                  ? {
                      bg: 'bg-accent-purple/10',
                      text: 'text-accent-purple',
                      border: 'border-accent-purple/20',
                    }
                  : gig.status === 'Completed'
                    ? {
                        bg: 'bg-green-500/10',
                        text: 'text-green-400',
                        border: 'border-green-500/20',
                      }
                    : colors;

              return (
                <div
                  key={gig.id}
                  className="
                    gig-card bg-glass-surface border border-white/5 rounded-2xl p-6
                    hover:border-accent-purple/20 transition-all duration-300
                    group
                  "
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left: Title + Client */}
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {gig.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-3">{gig.client}</p>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`
                            text-[9px] font-extrabold uppercase tracking-wider 
                            px-2.5 py-1 rounded-lg border
                            ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
                          `}
                        >
                          {gig.status}
                        </span>
                        <span className="text-white/40 text-[11px] font-medium flex items-center gap-1">
                          <Clock size={11} />
                          {gig.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Right: Price + Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-2xl font-black text-accent-purple">
                        ₦{gig.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        <button className="
                          flex items-center gap-1 px-3 py-1.5 rounded-lg 
                          bg-white/5 text-white/70 hover:bg-white/10 
                          text-xs font-semibold transition-all
                        ">
                          <MessageSquare size={12} />
                          Message
                        </button>

                        {gig.status === 'In Progress' && (
                          <button className="
                            flex items-center gap-1 px-3 py-1.5 rounded-lg 
                            bg-accent-purple/10 text-accent-purple hover:bg-accent-purple 
                            hover:text-white text-xs font-semibold transition-all
                          ">
                            Submit
                          </button>
                        )}

                        {gig.status === 'Completed' && gig.rating && (
                          <div className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-400">
                            ⭐ {gig.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="h-8" />
      </div>
    </DashboardLayout>
  );
};

export default MyGigsPage;
