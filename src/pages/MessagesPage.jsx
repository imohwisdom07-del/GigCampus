import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageSquare, Send } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const MessagesPage = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.header-section',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        '.chat-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout>
      <div ref={mainRef} className="p-6 lg:p-8 space-y-6 bg-black min-h-screen">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
            Messages
          </h1>
          <p className="text-white/50">
            Communicate with clients and teams on your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="chat-card bg-white/3 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-150">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h2 className="font-bold text-white uppercase tracking-widest text-xs">Conversations</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 border-b border-white/5 hover:bg-purple-600/10 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-white text-sm group-hover:text-purple-500">Client Name {i}</p>
                    <span className="text-white/20 text-[10px]">2h ago</span>
                  </div>
                  <p className="text-white/40 text-xs mt-1 truncate">I loved the GSAP animations on the landing page!</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-purple-600/20 text-purple-500 rounded text-[9px] font-bold uppercase">Design Project</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-card lg:col-span-2 bg-white/3 border border-white/5 rounded-2xl flex flex-col h-150">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div>
                <h2 className="font-bold text-white text-lg">Client Name</h2>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <p className="text-white/40 text-xs">Active now</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <p className="text-white/40 text-center text-sm py-8 flex flex-col items-center">
                <MessageSquare className="mb-2 text-white/10" size={32} />
                Select a conversation or start a new one to begin.
              </p>
              
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-white text-sm">Hey Wisdom! Can we add a hover effect to the sneakers in the vault?</p>
                  <span className="text-[9px] text-white/20 mt-1 block uppercase">10:45 AM</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-purple-500/50 transition-all">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none"
                />
                <button className="bg-purple-600 text-white p-2.5 rounded-lg font-semibold hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;