import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  LayoutDashboard,
  Briefcase,
  UserCheck,
  MessageSquare,
  FolderOpen,
  Settings,
  LogOut,
  Bell,
  PlusCircle,
  TrendingUp,
  CheckCircle,
  Star,
  Eye,
  ChevronRight,
  Award,
  Wallet,
  Menu,
  X,
} from 'lucide-react';
import { user, activeGigs, recommendedGigs, activities } from '../utilis/data';

const JobBoard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      '.dashboard-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'My Gigs', icon: UserCheck, path: '/my-gigs' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    { name: 'Portfolio', icon: FolderOpen, path: '/portfolio' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];
  
  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link to="/dashboard" className="text-2xl font-serif font-bold text-white">
          Gig<span className="text-accent-purple">Campus</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            <item.icon size={20} className="text-white/50" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-white/50">{user.campus}</span>
              {user.verified && <Award size={12} className="text-accent-purple" />}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors w-full">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-deep-onyx min-h-screen flex">
      <aside className="hidden md:flex w-64 bg-glass-surface border-r border-white/5 flex-col fixed h-full z-10">
        <SidebarContent />
      </aside>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-64 bg-glass-surface border-r border-white/5 flex flex-col z-30 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}

      <main className="flex-1 md:ml-64 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6 md:mb-8 dashboard-content">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-white/70 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-white">
                Welcome back, <span className="text-accent-purple">{user.name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/50 text-sm md:text-base">Your campus hustle dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/5 transition">
              <Bell size={20} className="text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-purple rounded-full"></span>
            </button>
            <button className="bg-accent-purple text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 hover:brightness-110 transition text-sm md:text-base">
              <PlusCircle size={18} />
              <span className="hidden sm:inline">Post a Gig</span>
              <span className="sm:hidden">Post</span>
            </button>
          </div>
        </div>

        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8 dashboard-content">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            poster="/images/University-campus.jpeg"
            preload="none"
          >
            <source src="/videos/Students-walking.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <img
            src="/images/University-campus.jpeg"
            alt="University campus"
            className="md:hidden absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 p-4 md:p-6 flex items-center h-full">
            <div>
              <h1 className="text-lg md:text-2xl font-semibold text-white">
                Welcome back, <span className="text-accent-purple">{user.name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/50 text-sm md:text-base">Your campus hustle dashboard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 dashboard-content">
          <StatCard
            title="Total Earned"
            value={`₦${user.totalEarned.toLocaleString()}`}
            icon={Wallet}
            trend="+12%"
          />
          <StatCard
            title="Completed Jobs"
            value={user.completedJobs}
            icon={CheckCircle}
            trend="+3 this month"
          />
          <StatCard
            title="Active Gigs"
            value={user.activeGigs}
            icon={Briefcase}
            trend="2 open applications"
          />
          <StatCard
            title="Avg Rating"
            value={user.avgRating}
            icon={Star}
            trend="Excellent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 dashboard-content">
 
          <div className="bg-glass-surface border border-white/5 rounded-2xl p-4 md:p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold text-white">Active Gigs</h2>
              <Link to="/my-gigs" className="text-accent-purple text-xs md:text-sm flex items-center gap-1 hover:underline">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            {activeGigs.length > 0 ? (
              <div className="space-y-3">
                {activeGigs.map((gig) => (
                  <div key={gig.id} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium text-sm md:text-base">{gig.title}</h3>
                        <p className="text-white/50 text-xs md:text-sm">₦{gig.price} • {gig.applications} applications</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        gig.status === 'open' ? 'bg-accent-purple/20 text-accent-purple' : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {gig.status === 'open' ? 'Open' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <img src="/images/Unilag.jpeg" alt="No active gigs" className="w-32 h-32 object-contain mb-2" />
                <p className="text-white/50">No active gigs. Post one to start earning!</p>
              </div>
            )}
          </div>

          <div className="bg-glass-surface border border-white/5 rounded-2xl p-4 md:p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold text-white">Recommended for You</h2>
              <Link to="/jobs" className="text-accent-purple text-xs md:text-sm flex items-center gap-1 hover:underline">
                Explore <ChevronRight size={14} />
              </Link>
            </div>
            {recommendedGigs.length > 0 ? (
              <div className="space-y-3">
                {recommendedGigs.map((gig) => (
                  <div key={gig.id} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium text-sm md:text-base">{gig.title}</h3>
                        <p className="text-white/50 text-xs md:text-sm">₦{gig.budget} • {gig.client}</p>
                        <div className="flex gap-1 mt-1">
                          {gig.skills.map((skill) => (
                            <span key={skill} className="text-xs text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="bg-accent-purple/20 text-accent-purple px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm hover:bg-accent-purple hover:text-white transition">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <img src="/images/Lasu.jpeg" alt="No recommendations" className="w-32 h-32 object-contain mb-2" />
                <p className="text-white/50">No recommendations yet. Update your skills!</p>
              </div>
            )}
          </div>

          <div className="bg-glass-surface border border-white/5 rounded-2xl p-4 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-white mb-4">Recent Activity</h2>
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {activity.icon === 'check' && <CheckCircle size={16} className="text-green-500" />}
                      {activity.icon === 'message' && <MessageSquare size={16} className="text-accent-purple" />}
                      {activity.icon === 'eye' && <Eye size={16} className="text-white/50" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm">{activity.action}</p>
                      <span className="text-white/30 text-xs">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/50 text-center py-4">No recent activity.</p>
            )}
          </div>

          <div className="bg-glass-surface border border-white/5 rounded-2xl p-4 md:p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold text-white">Earnings This Week</h2>
              <TrendingUp size={18} className="text-accent-purple" />
            </div>
            <div className="h-32 md:h-40 flex items-end gap-2">
              {[3200, 4500, 2800, 5100, 6800, 4200, 3800].map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-accent-purple/30 rounded-t-lg transition-all"
                    style={{ height: `${(value / 7000) * 100}%` }}
                  ></div>
                  <span className="text-xs text-white/30">{idx + 1}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-accent-purple text-sm border border-white/10 rounded-lg py-2 hover:bg-white/5 transition">
              Withdraw Earnings
            </button>
          </div>

          <div className="bg-glass-surface border border-white/5 rounded-2xl p-4 md:p-5 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold text-white">Your Portfolio Highlights</h2>
              <Link to="/portfolio" className="text-accent-purple text-xs md:text-sm flex items-center gap-1 hover:underline">
                Manage <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <PortfolioItem
                title="Vestige Sneaker Design"
                category="Graphic Design"
                image="/images/Student_designing_sneakers.jpeg"
              />
              <PortfolioItem
                title="Campus Event Flyer"
                category="Graphic Design"
                image="/images/Student_holding_tech.jpeg"
              />
              <PortfolioItem
                title="Tech Week Video"
                category="Video Editing"
                image="/images/Student_desk_with_laptop.jpeg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-glass-surface border border-white/5 rounded-2xl p-3 md:p-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-white/50 text-xs md:text-sm">{title}</p>
        <p className="text-lg md:text-2xl font-semibold text-white mt-1">{value}</p>
      </div>
      <Icon size={18} className="text-accent-purple md:w-5 md:h-5" />
    </div>
    <p className="text-xs text-white/30 mt-2">{trend}</p>
  </div>
);

const PortfolioItem = ({ title, category, image }) => (
  <div className="bg-white/5 rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all">
    <div className="h-32 bg-gradient-to-br from-accent-purple/20 to-white/5 flex items-center justify-center">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-3">
      <h3 className="text-white text-sm font-medium">{title}</h3>
      <p className="text-white/30 text-xs">{category}</p>
    </div>
  </div>
);

export default JobBoard;