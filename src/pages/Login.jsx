import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Lock, Mail, ArrowLeft } from 'lucide-react';
import gigCampusImg from '../assets/gig-campus-signup.jpeg'; 

const Login = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-[#050506] flex items-start justify-center p-6 pt-20 md:pt-32 relative">
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/20 hover:text-white transition-colors flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] z-50 group cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit
      </button>

      <div className="max-w-3xl w-full flex flex-col md:flex-row bg-[#0A0A0C] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[550px] relative z-10">
        
  
        <div className="w-full md:w-1/2 relative min-h-[200px] md:min-h-auto bg-[#111114]">
          <img 
            src={gigCampusImg} 
            alt="GigCampus Login"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#0A0A0C]" />
          <div className="absolute bottom-10 left-10 hidden md:block text-left">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
              Welcome <br /> <span className="text-accent-purple">Back.</span>
            </h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0A0A0C]">
          <div className="space-y-8">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Login</h2>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">Enter your campus credentials</p>
            </div>

            <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
           
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                <input 
                  type="email" 
                  placeholder="name@unilag.edu.ng" 
                  className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" 
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]" 
                />
              </div>

              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-accent-purple/20"
              >
                Sign In <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex flex-col gap-3 pt-4">
                <p className="text-center text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                  Forgot Password?
                </p>
                
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  New to the campus?{" "}
                  <Link 
                    to="/register" 
                    className="text-white hover:text-accent-purple transition-all underline underline-offset-4 decoration-white/10 font-black"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;