import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, User, Mail, Sparkles, CheckCircle2, ArrowLeft, Lock, Smartphone } from 'lucide-react';
import { staggerFadeUp, imageReveal } from '../utilis/animations';
import { useAuth } from './AuthContext';

import step1Img from '../assets/gig-campus-signup.jpeg';
import step2Img from '../assets/gigcampus-step2.jpeg';
import step3Img from '../assets/gigcampus-step3.jpeg';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signUp, resendConfirmation } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skill: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resending, setResending] = useState(false);
  
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    staggerFadeUp(formRef.current);
    imageReveal(imageRef.current);
  }, [step]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    setError('');
    setResendMessage('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in your name, email, and password before continuing.');
      return;
    }

    setLoading(true);
    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      nextStep();
    } catch (err) {
      const message = err?.message || 'Signup failed. Please try again.';
      if (message.toLowerCase().includes('rate limit')) {
        setError('Too many confirmation emails were requested. Please check your inbox or wait a few minutes before trying again.');
      } else if (message.toLowerCase().includes('already registered')) {
        setError('This email is already registered. Check your inbox for the confirmation email or use login/reset password.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      setResendMessage('Please provide your email before resending confirmation.');
      return;
    }
    setResendMessage('');
    setResending(true);
    try {
      await resendConfirmation(formData.email);
      setResendMessage('Confirmation email resent. Check your inbox again.');
    } catch (err) {
      setResendMessage(err.message || 'Unable to resend confirmation email.');
    } finally {
      setResending(false);
    }
  };

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
    <div className="min-h-screen bg-dark-bg flex items-start justify-center p-6 pt-20 md:pt-32 relative">
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/20 hover:text-white transition-colors flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] z-50 group cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit
      </button>

      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-dark-surface border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-150 relative z-10">
        
        <div className="w-full md:w-1/2 relative min-h-75 md:min-h-auto bg-[#111114] overflow-hidden">
          <img 
            ref={imageRef} 
            src={sideImages[step]} 
            alt={`Step ${step}`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-transparent to-dark-surface" />
          <div className="absolute bottom-10 left-10 hidden md:block text-left">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
              {sideText[step].title} <br /> <span className="text-accent-purple">{sideText[step].span}</span>
            </h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-dark-surface">
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
                    <input 
                      type="text" 
                      placeholder="FULL NAME" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" 
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input 
                      type="email" 
                      placeholder="CAMPUS .EDU EMAIL" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" 
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input 
                      type="password" 
                      placeholder="PASSWORD" 
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" 
                    />
                  </div>
                  <div className="relative group">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input 
                      type="tel" 
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" 
                    />
                  </div>
                  {error && <p className="text-red-400 text-[11px] font-medium">{error}</p>}
                  <button 
                    onClick={handleSignUp} 
                    disabled={loading}
                    className="w-full bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Continue'} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="relative group">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <select 
                      value={formData.skill}
                      onChange={(e) => handleInputChange('skill', e.target.value)}
                      className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none appearance-none font-mono text-[11px]"
                    >
                      <option className="bg-dark-surface" value="">SELECT YOUR PRIMARY SKILL</option>
                      <option className="bg-dark-surface" value="GRAPHIC DESIGN">GRAPHIC DESIGN</option>
                      <option className="bg-dark-surface" value="CONTENT WRITING">CONTENT WRITING</option>
                      <option className="bg-dark-surface" value="VIDEO EDITING">VIDEO EDITING</option>
                      <option className="bg-dark-surface" value="DATA ENTRY">DATA ENTRY</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="TELL US MORE ABOUT WHAT YOU CAN DO..." 
                    rows="3"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px] resize-none"
                  />
                  <div className="flex gap-3">
                    <button onClick={prevStep} className="flex-1 border border-white/10 text-white/40 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:text-white transition-all">Back</button>
                    <button onClick={nextStep} className="flex-2 bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2">Next <ChevronRight size={14} /></button>
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
                    <h2 className="text-2xl font-black text-white uppercase italic">Confirm your email</h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                      A confirmation link has been sent to <span className="text-accent-purple">{formData.email}</span>.
                      Please open that email and confirm your address before logging in.
                    </p>
                  </div>
                  {resendMessage && (
                    <p className="text-[11px] text-green-400 font-medium">{resendMessage}</p>
                  )}
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleResendConfirmation}
                      disabled={resending}
                      className="w-full bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:brightness-110 active:scale-[0.97] transition-all shadow-xl shadow-white/5 disabled:opacity-50"
                    >
                      {resending ? 'Resending...' : 'Resend confirmation email'}
                    </button>
                    <button 
                      onClick={() => navigate('/login')}
                      className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-accent-purple hover:text-white transition-all shadow-xl shadow-white/5"
                    >
                      Back to login
                    </button>
                  </div>
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