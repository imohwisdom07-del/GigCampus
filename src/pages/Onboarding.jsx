import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, User, Mail, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { staggerFadeUp, imageReveal } from '../utilis/animations';

import step1Img from '../assets/gig-campus-signup.jpeg';
import step2Img from '../assets/gigcampus-step2.jpeg';
import step3Img from '../assets/gigcampus-step3.jpeg';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    staggerFadeUp(formRef.current);
    imageReveal(imageRef.current);
  }, [step]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const sideImages = {
    1: step1Img,
    2: step2Img,
    3: step3Img
  };

  const sideText = {
    1: { title: "Start", span: "Earning." },
    2: { title: "Pick Your", span: "Hustle." },
    3: { title: "You Are", span: "Verified." }
  };

  return (
    <div className="min-h-screen bg-[#050506] flex items-start justify-center p-6 pt-20 md:pt-32 relative">
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/20 hover:text-white transition-colors flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] z-50 group cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit
      </button>

      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-[#0A0A0C] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[600px] relative z-10">
        
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-auto bg-[#111114] overflow-hidden">
          <img 
            ref={imageRef} 
            src={sideImages[step]} 
            alt={`Step ${step}`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#0A0A0C]" />
          <div className="absolute bottom-10 left-10 hidden md:block text-left">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
              {sideText[step].title} <br /> <span className="text-accent-purple">{sideText[step].span}</span>
            </h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0A0A0C]">
          <div className="space-y-8">
            <div className="space-y-2 text-left">
              <span className="text-accent-purple font-black text-[10px] uppercase tracking-[0.3em]">Step 0{step} of 03</span>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Create Account</h2>
            </div>

            <div ref={formRef} className="space-y-4 text-left">
              
              {step === 1 && (
                <>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input type="text" placeholder="FULL NAME" className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input type="email" placeholder="CAMPUS .EDU EMAIL" className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" />
                  </div>
                  <button onClick={nextStep} className="w-full bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group">
                    Continue <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="relative group">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <select className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none appearance-none font-mono text-[11px]">
                      <option className="bg-[#0A0A0C]">SELECT YOUR PRIMARY SKILL</option>
                      <option className="bg-[#0A0A0C]">GRAPHIC DESIGN</option>
                      <option className="bg-[#0A0A0C]">CONTENT WRITING</option>
                      <option className="bg-[#0A0A0C]">VIDEO EDITING</option>
                      <option className="bg-[#0A0A0C]">DATA ENTRY</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="TELL US MORE ABOUT WHAT YOU CAN DO..." 
                    rows="3"
                    className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px] resize-none"
                  />
                  <div className="flex gap-3">
                    <button onClick={prevStep} className="flex-1 border border-white/10 text-white/40 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:text-white transition-all">Back</button>
                    <button onClick={nextStep} className="flex-[2] bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2">Next <ChevronRight size={14} /></button>
                  </div>
                </>
              )}
              {step === 3 && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-accent-purple/10 rounded-full flex items-center justify-center border border-accent-purple/20">
                      <CheckCircle2 size={40} className="text-accent-purple" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white uppercase italic">Registration Complete</h2>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">Your student profile is now live.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-accent-purple hover:text-white transition-all shadow-xl shadow-white/5"
                  >
                    Enter Workspace
                  </button>
                </div>
              )}

              <div className="pt-4 text-center">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  Already registered?{" "}
                  <Link to="/login" className="text-white hover:text-accent-purple transition-all underline underline-offset-4 decoration-white/10 font-black">
                    Login
                  </Link>
                </p>
              </div>

            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;