import React, { useEffect, useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, ACTION_LINKS } from '../../utilis/data';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".nav-container", 
      { y: -100, opacity: 0, scale: 0.98 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(".mobile-menu", 
        { x: "100%", opacity: 0 }, 
        { x: "0%", opacity: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-0 w-full z-[9999] px-4 md:px-6 flex justify-center">
        <div className="nav-container nav-glass w-full max-w-6xl rounded-2xl md:rounded-full px-5 py-2.5 flex items-center justify-between opacity-0 shadow-xl shadow-indigo-900/5">
          <NavHashLink smooth to="/#" className="flex items-center gap-3 group cursor-pointer no-underline">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-accent-purple/20 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="relative w-6 h-6 flex items-center justify-center text-white font-black">
                G
              </div>
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-black tracking-tight text-lg md:text-xl text-white uppercase">
                Gig<span className="text-accent-purple">Campus</span>
              </span>
              <div className="flex items-center gap-1">
                <span className="h-[1px] w-3 bg-accent-purple"></span>
                <span className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">
                  Workspace
                </span>
              </div>
            </div>
          </NavHashLink>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS?.map((link, index) => (
              <NavHashLink 
                smooth 
                key={index} 
                to={link.href} 
                className="relative text-sm font-bold text-white/60 hover:text-white transition-all duration-300 group/link"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-purple transition-all duration-300 group-hover/link:w-full"></span>
              </NavHashLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NavHashLink to="/register">
              <button className="bg-accent-purple hover:bg-white hover:text-black transition-all duration-300 text-white px-7 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95">
                {ACTION_LINKS?.primary?.name || "Start"}
              </button>
            </NavHashLink>
          </div>
          <button 
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-[10000] lg:hidden bg-[#050506]/95 backdrop-blur-xl flex flex-col p-8">
          <div className="flex items-center justify-between mb-12">
             <span className="font-black text-xl text-white uppercase tracking-tighter">Gig<span className="text-accent-purple">Campus</span></span>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full">
               <X size={32} className="text-white" />
             </button>
          </div>

          <div className="flex flex-col gap-8">
            {NAV_LINKS?.map((link, index) => (
              <NavHashLink 
                smooth
                key={index} 
                to={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-3xl font-black text-white hover:text-accent-purple transition-colors"
              >
                {link.name}
              </NavHashLink>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <NavHashLink to="/register" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full bg-accent-purple text-white py-5 rounded-2xl font-black text-lg uppercase shadow-2xl shadow-purple-600/20 active:scale-95 transition-transform">
                {ACTION_LINKS?.primary?.name}
              </button>
            </NavHashLink>
            
            <NavHashLink to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full text-white/40 font-bold py-2 text-sm uppercase tracking-widest italic">Already vetted? Sign In</button>
            </NavHashLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;