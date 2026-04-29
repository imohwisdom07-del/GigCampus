// src/pages/JobsPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Filter, ArrowUpRight, MapPin, Plus } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { jobsService } from '../utils/jobsService';
import { useAuth } from './AuthContext';

const JobsPage = () => {
  const mainRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    description: '',
    pay_rate: '',
    category: '',
    deadline: '',
    is_remote: false,
    location: ''
  });
  const [posting, setPosting] = useState(false);
  const { user } = useAuth();

  const filters = ['All', 'Remote', 'On Campus', 'Tutoring', 'Design', 'Social Media'];

  useEffect(() => {
    fetchJobs();
    const subscription = jobsService.subscribeToJobs((payload) => {
      setJobs(prev => [payload.new, ...prev]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.job-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    }, mainRef);
    return () => ctx.revert();
  }, [filteredJobs]);

  useEffect(() => {
    filterJobs();
  }, [jobs, activeFilter, searchQuery]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsService.fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      await jobsService.createJob({
        ...postForm,
        pay_rate: Number(postForm.pay_rate),
      });
      setShowPostModal(false);
      setPostForm({
        title: '',
        description: '',
        pay_rate: '',
        category: '',
        deadline: '',
        is_remote: false,
        location: ''
      });
      // Jobs will update via real-time subscription
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <DashboardLayout onSearch={(q) => setSearchQuery(q)}>
      <div ref={mainRef} className="max-w-full overflow-x-hidden p-4 lg:p-8 space-y-6">
        
        <div className="header-section">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                Find Your Next Gig
              </h1>
              <p className="text-white/50 text-sm lg:text-base leading-relaxed max-w-full">
                Browse available tasks and connect with clients looking for talented students like you.
              </p>
            </div>
            {user && (
              <button
                onClick={() => setShowPostModal(true)}
                className="bg-accent-purple text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-accent-purple/20"
              >
                <Plus size={16} /> Post Job
              </button>
            )}
          </div>
        </div>

        <div className="header-section bg-glass-surface border border-white/5 rounded-2xl p-4 lg:p-6 shadow-xl w-full">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={16} className="text-accent-purple" />
            <h2 className="font-bold text-white text-sm uppercase tracking-widest">Filter Jobs</h2>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`
                    shrink-0 text-[10px] font-extrabold uppercase 
                    tracking-wider px-4 py-2.5 rounded-xl transition-all
                    whitespace-nowrap border
                    ${activeFilter === f
                        ? 'bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/20'
                        : 'bg-white/5 text-white/40 border-white/5'
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-1">
          <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">
            Found <span className="text-accent-purple font-black">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {loading && (
          <div className="col-span-full bg-glass-surface border border-white/5 rounded-2xl p-10 text-center">
            <p className="text-white/40 text-sm font-medium italic">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="col-span-full bg-glass-surface border border-red-500/20 rounded-2xl p-10 text-center">
            <p className="text-red-400 text-sm font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full bg-glass-surface border border-white/5 rounded-2xl p-10 text-center">
                <p className="text-white/40 text-sm font-medium italic">No jobs found.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="
                    job-card bg-glass-surface border border-white/5 rounded-2xl p-5
                    hover:border-accent-purple/30 transition-all duration-300
                    flex flex-col w-full min-w-0
                  "
                >
                  <div className="min-w-0">
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <h3 className="text-white font-bold text-sm lg:text-base leading-tight truncate">
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-white/40 text-[10px] uppercase tracking-wider truncate font-medium">
                          Posted by User {job.user_id.slice(0, 8)}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <p className="text-accent-purple font-black text-sm lg:text-lg">
                          ₦{job.pay_rate.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="bg-white/5 text-white/50 text-[9px] font-bold px-2 py-1 rounded-lg border border-white/5">
                        {job.category}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] text-white/30 font-medium">
                        <MapPin size={10} />
                        <span className="truncate">{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className={`
                      text-[8px] font-black uppercase px-2 py-1 rounded-md
                      ${job.is_remote
                          ? 'bg-accent-purple/10 text-accent-purple'
                          : 'bg-white/5 text-white/40'
                      }
                    `}>
                      {job.is_remote ? 'Remote' : 'On Campus'}
                    </span>

                    <button className="flex items-center gap-1 text-accent-purple text-[10px] font-black uppercase hover:gap-2 transition-all">
                      Apply <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="h-10 lg:h-4" />
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-surface border border-white/5 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Post New Job</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={postForm.title}
                  onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Pay Rate (₦)"
                  value={postForm.pay_rate}
                  onChange={(e) => setPostForm(prev => ({ ...prev, pay_rate: e.target.value }))}
                  className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-sm"
                  required
                />
              </div>

              <select
                value={postForm.category}
                onChange={(e) => setPostForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-sm"
                required
              >
                <option value="" className="bg-dark-surface">Select Category</option>
                <option value="Tutoring" className="bg-dark-surface">Tutoring</option>
                <option value="Design" className="bg-dark-surface">Design</option>
                <option value="Social Media" className="bg-dark-surface">Social Media</option>
                <option value="Writing" className="bg-dark-surface">Writing</option>
                <option value="Other" className="bg-dark-surface">Other</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={postForm.deadline}
                  onChange={(e) => setPostForm(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={postForm.location}
                  onChange={(e) => setPostForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-sm"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_remote"
                  checked={postForm.is_remote}
                  onChange={(e) => setPostForm(prev => ({ ...prev, is_remote: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="is_remote" className="text-white text-sm font-medium">Remote work</label>
              </div>

              <textarea
                placeholder="Job Description"
                value={postForm.description}
                onChange={(e) => setPostForm(prev => ({ ...prev, description: e.target.value }))}
                rows="4"
                className="w-full bg-white/3 border border-white/10 p-4 rounded-2xl text-white focus:border-accent-purple outline-none transition-all font-mono text-sm resize-none"
                required
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 border border-white/10 text-white/40 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={posting}
                  className="flex-1 bg-accent-purple text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {posting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobsPage;