import React, { useState } from 'react';
import { ShieldCheck, Zap, Banknote, GraduationCap, ChevronRight } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#050506] flex items-center justify-center p-4 md:p-8 lg:p-12">
      {/* MAIN CONTAINER: Split Screen */}
      <div className="max-w-6xl w-full flex flex-col lg:flex-row overflow-hidden rounded-[2.5rem] bg-[#0A0A0C] border border-white/5 shadow-2xl min-h-[750px]">
        
        {/* LEFT SIDE: THE IMAGE ASSET */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-[#0A0A0C] border-r border-white/5 overflow-hidden">
          <img 
            src="/assets/gig-campus-signup.jpeg" 
            alt="GigCampus Student Workspace"
            className="w-full h-full object-cover object-top opacity-90"
          />
          {/* Professional Gradient Overlay to blend with the form side */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0C]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-60" />
          
          {/* Floating Verification Tag */}
          <div className="absolute bottom-10 left-10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">
              Verified Student Network
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: THE FORM STEPS */}
        <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative">
          
          {/* PROGRESS INDICATOR */}
          <div className="absolute top-12 left-8 md:left-16 lg:left-20 flex gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-1 w-8 rounded-full transition-all duration-700 ease-out ${step >= i ? 'bg-accent-purple w-16' : 'bg-white/10'}`} 
              />
            ))}
          </div>

          <div className="max-w-md w-full mx-auto">
            {/* STEP 1: STUDENT VERIFICATION */}
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-accent-purple mb-2">
                    <GraduationCap size={24} strokeWidth={1.5} />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-50">Vetting 01</span>
                  </div>
                  <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase">
                    Get <br/> <span className="text-accent-purple">Access.</span>
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed font-medium max-w-sm">
                    Only for verified .edu.ng students. Enter your campus email to unlock the workspace.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 mb-3 block group-focus-within:text-accent-purple transition-colors">University Email</label>
                    <input 
                      type="email" 
                      placeholder="name@university.edu.ng" 
                      className="w-full bg-white/[0.02] border border-white/10 p-5 rounded-2xl text-white focus:border-accent-purple focus:bg-white/[0.05] outline-none transition-all font-mono text-sm placeholder:text-white/10" 
                    />
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-accent-purple text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                  >
                    Verify Enrollment 
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SKILL SELECTION */}
            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-accent-purple mb-2">
                    <Zap size={24} strokeWidth={1.5} />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-50">Vetting 02</span>
                  </div>
                  <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase">
                    Pick <br/> <span className="text-accent-purple">Skills.</span>
                  </h2>
                  <p className="text-white/40 text-sm font-medium">What kind of gigs are you looking for?</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {['Content', 'Design', 'Data', 'Dev', 'Social', 'VA'].map(skill => (
                    <button key={skill} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 font-bold text-[10px] uppercase tracking-[0.2em] hover:border-accent-purple hover:text-white hover:bg-accent-purple/10 transition-all">
                      {skill}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-5 pt-4">
                  <button 
                    onClick={() => setStep(3)}
                    className="w-full bg-accent-purple text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-[0.98] transition-all"
                  >
                    Confirm Stack
                  </button>
                  <button onClick={() => setStep(1)} className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-colors">Go Back</button>
                </div>
              </div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 text-center">
                <div className="relative inline-block">
                  <div className="w-28 h-28 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto border border-accent-purple/20">
                    <ShieldCheck className="text-accent-purple" size={56} strokeWidth={1} />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Priority</div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase">
                    Vetted <br/> <span className="text-accent-purple">& Ready.</span>
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto font-medium">
                    You're now in the priority queue. You'll receive a notification when gigs matching your stack go live.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 space-y-2">
                   <div className="flex items-center justify-center gap-3">
                      <Banknote size={16} className="text-accent-purple" />
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Payout Logic</span>
                   </div>
                   <p className="text-xs font-bold text-white uppercase tracking-[0.1em]">OPay • PalmPay • Local Bank</p>
                </div>

                <button className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-accent-purple hover:text-white transition-all shadow-2xl">
                  Explore Dashboard
                </button>
              </div>
            )}
          </div>

          {/* FOOTER TEXT */}
          <div className="absolute bottom-10 left-0 w-full text-center">
             <p className="text-[9px] font-black text-white/5 uppercase tracking-[0.6em]">
               GigCampus Digital Workspace Protocol 
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;