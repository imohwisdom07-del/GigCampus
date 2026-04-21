// src/components/dashboard/StatsCards.jsx
import React from 'react';
import { Wallet, CheckCircle, Briefcase, Star, TrendingUp } from 'lucide-react';

const StatsCards = ({ user }) => {
  const stats = [
    {
      title: 'Total Earned',
      value: `₦${user.totalEarned.toLocaleString()}`,
      icon: Wallet,
      trend: '+12% this week',
      color: '#8B5CF6',
    },
    {
      title: 'Completed',
      value: user.completedJobs,
      icon: CheckCircle,
      trend: 'High success rate',
      color: '#A855F7',
    },
    {
      title: 'Active Gigs',
      value: user.activeGigs,
      icon: Briefcase,
      trend: '2 in review',
      color: '#8B5CF6',
    },
    {
      title: 'Avg Rating',
      value: `${user.avgRating}★`,
      icon: Star,
      trend: 'Top Rated',
      color: '#A855F7',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="
            dash-card bg-glass-surface border border-white/5 
            rounded-2xl p-5 hover:border-white/10 
            transition-all duration-300
          "
        >
          <div className="flex justify-between items-start mb-3">
            <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider">
              {stat.title}
            </p>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${stat.color}15` }}
            >
              <stat.icon size={15} style={{ color: stat.color }} />
            </div>
          </div>

          <p className="text-2xl font-black text-white tracking-tight">
            {stat.value}
          </p>

          <p className="text-[10px] font-medium text-white/25 mt-2 flex items-center gap-1">
            <TrendingUp size={10} />
            {stat.trend}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
