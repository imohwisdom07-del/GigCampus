import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom'; // 1. Added this import

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-title span", 
      { y: 80, opacity: 0, rotate: 2 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.3 }
    );
    tl.fromTo(".hero-reveal", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }, 
      "-=0.5"
    );
  }, []);

  const headline = "Get paid for what you already know.";

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#050506]">
      
      {/* 1. CINEMATIC BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-40 brightness-[0.7] saturate-[1.4] contrast-[1.1]"
        >
          <source src="/hero-hustle.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#050506] via-transparent to-[#050506]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/60 via-transparent to-[#050506]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-accent-purple/10 via-transparent to-transparent opacity-50 blur-[100px]" />
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto w-full px-6 relative z-10 text-center flex flex-col items-center">
        
        <h1 className="hero-title text-5xl md:text-7xl lg:text-[100px] font-black text-white mb-10 tracking-tighter leading-[0.9] max-w-4xl italic">
          {headline.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-2 md:mr-4 last:mr-0">
              {word === "paid" ? <span className="text-accent-purple drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">{word}</span> : word}
            </span>
          ))}
        </h1>

        <p className="hero-reveal text-lg md:text-2xl text-white/60 max-w-2xl mb-14 font-medium leading-relaxed">
          The first micro-job ecosystem built for <span className="text-white">Nigerian students.</span> High-paying gigs, instant settlements, zero "vawulence."
        </p>

        {/* Action Buttons - UPDATED TO LINKS */}
        <div className="hero-reveal flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-20">
          <Link 
            to="/gigs" 
            className="bg-accent-purple glow-purple text-white px-16 py-6 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_20px_50px_rgba(139,92,246,0.3)]"
          >
            Explore Gigs <ArrowRight size={18} />
          </Link>
          
          <Link 
            to="/register" 
            className="bg-white/5 border border-white/10 text-white px-16 py-6 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-white/10 backdrop-blur-lg transition-all flex items-center justify-center"
          >
            Post a Brief
          </Link>
        </div>

        {/* 3. TRUST BAR */}
        <div className="hero-reveal w-full pt-12 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 font-black text-xs tracking-widest text-white uppercase"><ShieldCheck size={16} className="text-accent-purple"/> UNILAG</div>
           <div className="flex items-center gap-2 font-black text-xs tracking-widest text-white uppercase"><Zap size={16} className="text-accent-purple"/> UNILORIN</div>
           <div className="flex items-center gap-2 font-black text-xs tracking-widest text-white uppercase"><Globe size={16} className="text-accent-purple"/> LASU</div>
           <div className="flex items-center gap-2 font-black text-xs tracking-widest text-white uppercase"><ShieldCheck size={16} className="text-accent-purple"/> UNIBEN</div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/assets/grid-pattern.png')] bg-repeat"></div>
    </section>
  );
};

export default Hero;