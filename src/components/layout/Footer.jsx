import React from 'react';
import { SOCIAL_LINKS } from '../../utilis/data';

const Footer = () => {
  return (
    <footer className="bg-[#050506] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-black text-2xl text-white uppercase tracking-tighter">
            Gig<span className="text-accent-purple">Campus</span>
          </span>
          <p className="text-white/30 text-[10px] font-bold mt-1 uppercase tracking-[0.3em]">
            Workspace for the Hustle
          </p>
        </div>

        {/* SOCIAL LINKS SECTION */}
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {SOCIAL_LINKS?.map((social, index) => (
            <a 
              key={index} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] font-black text-white/40 hover:text-white transition-all duration-300 uppercase tracking-[0.2em]"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
          <p className="text-white text-[9px] font-bold uppercase tracking-widest text-center md:text-left">
            © 2026 GigCampus Nigeria. All Rights Reserved.
          </p>
          <p className="text-white text-[9px] font-bold uppercase tracking-widest">
            Built by Davaboi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;