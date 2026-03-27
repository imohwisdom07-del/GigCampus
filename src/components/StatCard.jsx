
import React from 'react';
const StatCard = ({ label, value, icon: Icon, color = "accent-purple" }) => {
  
  
  
  return (
    <div className="bg-[#0A0A0C] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 flex-1 min-w-[200px]">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border bg-white/[0.02] border-white/5`}>
       
        <Icon className={color.startsWith('text-') ? color : `text-accent-purple`} size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <p className="text-xl font-black text-white uppercase tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;