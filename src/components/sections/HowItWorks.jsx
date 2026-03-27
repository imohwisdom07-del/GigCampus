
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { steps } from '../../utilis/data';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  useEffect(() => {
    gsap.fromTo(".step-card", 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".how-it-works",
          start: "top 75%", 
        }
      }
    );
  }, []);

  return (
    <section id="how-it-works" className="how-it-works py-24 px-6 relative overflow-hidden bg-[#050506]">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Three steps to your <span className="text-accent-purple italic underline decoration-white/10 underline-offset-8">first alert.</span>
          </h2>
          <p className="text-muted-slate max-w-xl text-lg font-medium leading-relaxed">
            We built GigCampus to be as fast as a bank transfer. No stress, no scams, just work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="step-card group">
              
              <div className="relative aspect-video mb-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 shadow-2xl">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 p-3 nav-glass rounded-xl border border-white/10 z-20">
                  <step.icon size={20} className="text-accent-purple group-hover:text-white transition-colors" />
                </div>
             
                <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/80 via-transparent to-transparent"></div>
              </div>

              <div className="px-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-white/10">0{step.id}</span>
                  <h3 className="text-2xl font-black text-white tracking-tight">{step.title}</h3>
                </div>

                <p className="text-muted-slate leading-relaxed font-medium text-base lg:text-lg">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;