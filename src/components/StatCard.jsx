// src/components/StatCard.jsx
import React from 'react';

// We explicitly list the props we want. 
// Any other props (like isActive) are ignored and won't bleed into the HTML.
const StatCard = ({ label, value, icon: Icon, color = "accent-purple" }) => {
  
  // Define safe color classes for Tailwind
  // Note: Tailwind sometimes struggles with dynamic strings like `bg-${color}/10`. 
  // If the color doesn't show up, pass the full class (e.g., color="text-green-500")
  
  return (
    <div className="bg-[#0A0A0C] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 flex-1 min-w-[200px]">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border bg-white/[0.02] border-white/5`}>
        {/* We apply the color specifically to the Icon */}
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