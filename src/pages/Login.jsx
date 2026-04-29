import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, Mail, Smartphone } from 'lucide-react';
import { useAuth } from './AuthContext';
import gigCampusImg from '../assets/gig-campus-signup.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithOtp } = useAuth();
  const [authMode, setAuthMode] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (authMode === 'email') {
      if (!email || !password) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }

      try {
        await signIn(email, password);
        navigate('/dashboard');
      } catch (err) {
        const message = err.message || 'Login failed';
        setError(message);
        if (message.toLowerCase().includes('confirm')) {
          setMessage('Please confirm your email using the link sent to your inbox before logging in.')
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (authMode === 'phone') {
      if (!phone) {
        setError('Please enter your phone number.');
        setLoading(false);
        return;
      }

      try {
        await signInWithOtp(phone);
        setMessage('If your phone number is valid, you will receive an OTP shortly.');
      } catch (err) {
        setError(err.message || 'Phone login failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign in failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] flex items-start justify-center p-6 pt-20 md:pt-32">
      <div className="max-w-3xl w-full flex flex-col md:flex-row bg-[#0A0A0C] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[550px]">

        {/* Image panel */}
        <div className="w-full md:w-1/2 relative min-h-[200px] md:min-h-auto bg-[#111114]">
          <img
            src={gigCampusImg}
            alt="GigCampus Login"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-transparent to-dark-surface" />
          <div className="absolute bottom-10 left-10 hidden md:block">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
              Welcome <br /> <span className="text-accent-purple">Back.</span>
            </h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-dark-surface">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Login</h2>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">Enter your campus credentials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('email')
                    setError('')
                    setMessage('')
                  }}
                  className={`flex-1 py-3 rounded-2xl text-sm font-black uppercase tracking-[0.18em] transition-all ${authMode === 'email' ? 'bg-accent-purple text-black' : 'bg-white/5 text-white/50 hover:text-white'}`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('phone')
                    setError('')
                    setMessage('')
                  }}
                  className={`flex-1 py-3 rounded-2xl text-sm font-black uppercase tracking-[0.18em] transition-all ${authMode === 'phone' ? 'bg-accent-purple text-black' : 'bg-white/5 text-white/50 hover:text-white'}`}
                >
                  Phone
                </button>
              </div>

              {authMode === 'email' ? (
                <> 
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input
                      type="email"
                      placeholder="name@unilag.edu.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]"
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]"
                    />
                  </div>
                </>
              ) : (
                <div className="relative group">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={16} />
                  <input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/3 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-[11px]"
                  />
                </div>
              )}

              {error && (
                <p className="text-red-400 text-[11px] font-medium text-center">{error}</p>
              )}
              {message && (
                <p className="text-green-400 text-[11px] font-medium text-center">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-purple text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-accent-purple/20 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-dark-surface px-2 text-white/20 font-bold tracking-widest">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-white/10 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                Continue with Google
              </button>
              <p className="text-[10px] text-white/30 text-center mt-2">If you already confirmed your email, return to login and sign in again.</p>

              <div className="flex flex-col gap-3 pt-4">
                <p className="text-center text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                  Forgot Password?
                </p>
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  New to the campus?{' '}
                  <span
                    onClick={() => navigate('/register')}
                    className="text-white hover:text-accent-purple cursor-pointer transition-colors"
                  >
                    Create Account
                  </span>
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
