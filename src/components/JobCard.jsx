
import React from 'react';
import { Clock, Banknote, ShieldCheck } from 'lucide-react';

const JobCard = ({ title, price, category, time, company }) => (
  <div className="bg-[#0A0A0C] border border-white/5 p-6 rounded-[2.5rem] hover:border-[#A855F7]/40 transition-all group relative overflow-hidden">
  
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A855F7]/5 blur-[80px] group-hover:bg-[#A855F7]/10 transition-all" />
    
    <div className="flex justify-between items-start mb-6">
      <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] font-black text-[#A855F7] uppercase tracking-widest">
        {category}
      </div>
      <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-bold">
        <Clock size={12} /> {time}
      </div>
    </div>

    <h3 className="text-white text-lg font-black uppercase tracking-tight mb-2 leading-tight">
      {title}
    </h3>
    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
       <ShieldCheck size={12} className="text-green-500" /> {company} • Verified Client
    </p>

    <div className="flex items-center justify-between pt-6 border-t border-white/5">
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Budget</span>
        <div className="flex items-center gap-1.5 text-white font-black text-sm">
          <Banknote size={14} className="text-green-500" /> ₦{price}
        </div>
      </div>
      <button className="bg-white text-black h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#A855F7] hover:text-white transition-all active:scale-95">
        Apply Now
      </button>
    </div>
  </div>
);

export default JobCard;