
import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto bg-accent-purple rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
       
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            Ready to earn your <br className="hidden md:block" /> first ₦20,000 this week?
          </h2>
          <Link to="/gigs">
            <button className="bg-white text-black px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              Join the Waitlist
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;