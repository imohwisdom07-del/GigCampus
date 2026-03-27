
import React from 'react';
import { SCHOOL_BENEFITS } from '../utilis/data';

const Schools = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050506] min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6">
            Empower your <span className="text-accent-purple">Students.</span>
          </h1>
          <p className="text-muted-slate text-xl max-w-3xl mx-auto">
            Bridge the gap between academic theory and real-world digital income. 
            Partner with GigCampus to verify and track your student's professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCHOOL_BENEFITS.map((benefit, index) => (
            <div key={index} className="nav-glass p-10 rounded-[2.5rem] border border-white/5">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl mb-6 flex items-center justify-center text-accent-purple font-black">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-muted-slate leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[3rem] bg-accent-purple text-center">
          <h2 className="text-3xl font-black text-white mb-4">Become a Partner School</h2>
          <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
            Contact Partnerships
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schools;