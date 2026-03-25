import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { LucideCommand } from 'lucide-react';
// 1. Import your data
import { NAV_LINKS, ACTION_LINKS } from '../../utilis/data';

const Navbar = () => {

  // 2. GSAP Entrance Animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(".nav-container", {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    .from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.8"); // Starts slightly before the container finishes
  }, []);

  return (
    <nav className="fixed top-6 left-0 w-full z-50 px-6">
      <div className="nav-container max-w-7xl mx-auto bg-dark-surface/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-2">
          <LucideCommand className="text-cyber-green w-8 h-8" />
          <div className="flex flex-col leading-none">
            <span className="font-bold tracking-tighter text-xl text-white">GIGCAMPUS</span>
            <span className="text-[10px] tracking-[0.2em] text-muted-gray uppercase font-medium">Verified Talent</span>
          </div>
        </div>

        {/* CENTER LINKS (Mapped from data.js) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="nav-item text-sm font-medium text-muted-gray hover:text-white transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT ACTIONS (Mapped from ACTION_LINKS) */}
        <div className="flex items-center gap-6">
          <a 
            href={ACTION_LINKS.secondary.href} 
            className="nav-item text-sm font-semibold tracking-wide text-white/70 hover:text-white uppercase transition-colors"
          >
            {ACTION_LINKS.secondary.name}
          </a>
          
          <button className="nav-item bg-cyber-green text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            {ACTION_LINKS.primary.name}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;