import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const desktopVideoRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-title span", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "expo.out", delay: 0.5 }
    );
    tl.fromTo(".hero-reveal", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 
      "-=0.4"
    );
  }, []);

  const handleTimeUpdate = () => {
    if (desktopVideoRef.current) {
      const currentTime = desktopVideoRef.current.currentTime;
      setShowAlert(currentTime >= 5 && currentTime <= 9.5);
    }
  };

  const headline = "Get paid for what you already know.";

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6 overflow-hidden bg-[#050506]">
      
      {/* MOBILE VIDEO BACKGROUND - UPDATED FOR MAXIMUM GLOW */}
      <div className="absolute inset-0 lg:hidden z-0">
        {/* 1. The Video: Increased visibility and color depth */}
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-50 brightness-110 saturate-150 contrast-110"
        >
          <source src="/hero-hustle-mobile.mp4" type="video/mp4" />
        </video>

        {/* 2. The Purple Glow: This "pushes" the purple light through the video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent-purple/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>

        {/* 3. The Vignette Overlay: Keeps the text sharp while letting the center shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050506] via-transparent to-[#050506] opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center relative z-10">
        
        <div className="flex flex-col items-start text-left">
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.05] max-w-2xl text-balance">
            {headline.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-2 md:mr-4">
                {word === "paid" ? <span className="text-accent-purple drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">{word}</span> : word}
              </span>
            ))}
          </h1>

          <p className="hero-reveal text-lg md:text-xl text-white/50 max-w-lg mb-12 font-medium leading-relaxed">
            GigCampus connects <span className="text-white font-semibold">Nigerian undergraduates</span> to remote micro-jobs that pay instantly. Build your portfolio while you study.
          </p>

          <div className="hero-reveal flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <button className="bg-accent-purple glow-purple text-white px-12 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl shadow-purple-500/40">
              Find a Gig <ArrowRight size={18} />
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
              Post a Brief
            </button>
          </div>
        </div>

        {/* DESKTOP PREVIEW FRAME */}
        <div className="desktop-video-frame hidden lg:flex justify-end relative w-full">
          <div className="nav-glass p-2 rounded-[3rem] shadow-2xl border-white/5 relative overflow-hidden w-full max-w-[480px]">
            <div className="relative overflow-hidden rounded-[2.6rem] aspect-video bg-black/40">
              <video 
                ref={desktopVideoRef}
                onTimeUpdate={handleTimeUpdate}
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover opacity-80"
              >
                <source src="/hero-hustle.mp4" type="video/mp4" />
              </video>
            </div>

            {/* ALERT BOX */}
            {showAlert && (
              <div className="absolute bottom-8 left-8 nav-glass p-4 px-5 rounded-2xl border border-white/10 shadow-3xl z-20 min-w-[200px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-[9px] font-black text-white/40 uppercase mb-1 tracking-widest">Incoming Payment</p>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg font-black text-white">₦15,000</p>
                  <span className="text-green-400 text-[9px] font-black px-2 py-0.5 bg-green-400/10 rounded-md border border-green-400/20 uppercase">Paid</span>
                </div>
              </div>
            )}
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-purple/10 blur-[120px] rounded-full"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;