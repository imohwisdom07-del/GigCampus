// src/pages/Dashboard.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCards from '../components/dashboard/StatsCards';
import ActiveGigsList from '../components/dashboard/ActiveGigsList';
import RecommendedJobs from '../components/dashboard/RecommendedJobs';
import PortfolioShowcase from '../components/dashboard/PortfolioShowcase';
import {
  user,
  activeGigs,
  recommendedGigs,
  portfolioItems,
} from '../utilis/data';

const filters = ['All', 'Remote', 'On Campus', 'Tutoring', 'Design', 'Social Media'];

const Dashboard = () => {
  const mainRef = useRef(null);

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dash-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
      
      gsap.fromTo(
        '.dash-hero',
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout>
      <div ref={mainRef} className="p-6 lg:p-8 space-y-6">
        <div className="dash-hero">
          <div className="bg-linear-to-r from-accent-purple/10 to-accent-purple/5 border border-accent-purple/20 rounded-2xl p-6 lg:p-8">
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/50 text-sm lg:text-base max-w-lg">
              You're on fire this week! Keep up the momentum and earn more by taking on new gigs.
            </p>
          </div>
        </div>

        <div className="dash-hero">
          <div className="bg-glass-surface border border-white/5 rounded-2xl p-6 lg:p-8">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-2">
              Your Balance
            </p>
            <p className="text-4xl lg:text-5xl font-black text-accent-purple">
              ₦{user.totalEarned.toLocaleString()}
            </p>
            <p className="text-[11px] font-medium text-white/30 mt-3">
              +₦5,000 from 2 completed gigs this week
            </p>
          </div>
        </div>

        <StatsCards user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveGigsList gigs={activeGigs} />
          <RecommendedJobs jobs={recommendedGigs} filters={filters} />
        </div>

        <PortfolioShowcase items={portfolioItems} />

        <div className="h-8" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
