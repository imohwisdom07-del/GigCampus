// src/pages/SettingsPage.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight, Bell, Lock, CreditCard, User } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const SettingsPage = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.settings-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      gsap.fromTo(
        '.header-section',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const settings = [
    {
      title: 'Profile Settings',
      description: 'Update your name, email, bio, and profile picture',
      icon: User,
    },
    {
      title: 'Payment Methods',
      description: 'Manage your bank accounts and payment information',
      icon: CreditCard,
    },
    {
      title: 'Notifications',
      description: 'Control how you receive job alerts and messages',
      icon: Bell,
    },
    {
      title: 'Privacy & Security',
      description: 'Manage passwords, two-factor auth, and account security',
      icon: Lock,
    },
  ];

  return (
    <DashboardLayout>
      <div ref={mainRef} className="p-6 lg:p-8 space-y-6 max-w-3xl">
        <div className="header-section">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
            Settings
          </h1>
          <p className="text-white/50">
            Manage your account and preferences.
          </p>
        </div>

        <div className="space-y-3">
          {settings.map((section, i) => {
            const Icon = section.icon;

            return (
              <div
                key={i}
                className="
                  settings-card bg-glass-surface border border-white/5 
                  rounded-2xl p-6 hover:border-accent-purple/20 
                  transition-all duration-300 cursor-pointer group
                "
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="
                      w-10 h-10 rounded-lg bg-accent-purple/10 
                      border border-accent-purple/20 flex items-center 
                      justify-center shrink-0 group-hover:bg-accent-purple/20 
                      transition-all
                    ">
                      <Icon size={18} className="text-accent-purple" />
                    </div>

                    <div>
                      <h2 className="font-bold text-white text-base mb-1">
                        {section.title}
                      </h2>
                      <p className="text-white/40 text-sm">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="
                    text-white/20 group-hover:text-accent-purple 
                    transition-colors shrink-0 mt-1
                  " />
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-6">
          <h2 className="font-bold text-white text-lg mb-3">Danger Zone</h2>

          <div className="settings-card bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-red-400 text-base mb-1">
                  Delete Account
                </h3>
                <p className="text-red-300/60 text-sm">
                  Permanently delete your account and all associated data.
                </p>
              </div>

              <button className="
                px-4 py-2 rounded-lg text-red-400 border border-red-500/20 
                hover:bg-red-500/10 transition-all shrink-0 font-semibold 
                text-sm
              ">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="h-8" />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
