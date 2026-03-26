// src/pages/JobBoard.jsx
import React from 'react';
import { LayoutGrid, Wallet, CheckCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import JobCard from '../components/JobCard';

const JobBoard = () => {
  const mockJobs = [
    { id: 1, title: "Social Media Manager for Unilag Event", price: "25,000", category: "Social", time: "3 days", company: "Z-Media" },
    { id: 2, title: "React Developer for Startup MVP", price: "120,000", category: "Dev", time: "2 weeks", company: "TechLagos" },
    { id: 3, title: "Content Writing for Fashion Blog", price: "15,000", category: "Content", time: "24 hours", company: "StyleHub" },
  ];

  return (
    <div className="min-h-screen bg-[#050506] p-6 pt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* TOP STATS ROW */}
        <div className="flex flex-wrap gap-4">
          <StatCard label="Available Gigs" value="142" icon={LayoutGrid} />
          <StatCard label="Total Earned" value="₦48,500" icon={Wallet} color="green-500" />
          <StatCard label="Completed" value="12" icon={CheckCircle} />
        </div>

        {/* SECTION HEADER */}
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Recommended <span className="text-[#A855F7]">Gigs.</span></h2>
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Based on your skills</p>
        </div>

        {/* JOB GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map(job => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default JobBoard;