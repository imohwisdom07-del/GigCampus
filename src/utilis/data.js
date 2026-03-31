// src/utilis/data.js
import { 
  Search, 
  PenTool, 
  Wallet, 
  Edit3, 
  Palette, 
  Share2, 
  Database, 
  UserCheck, 
  Video 
} from 'lucide-react';

import stepFindImg from '../assets/step-find.jpeg'; 
import stepWorkImg from '../assets/step-Work.jpeg';
import stepPayImg from '../assets/step-paid.jpeg';

// ========== LANDING PAGE / PUBLIC DATA ==========
export const NAV_LINKS = [
  { name: "Find Gigs", href: "/gigs" },
  { name: "How it Works", href: "/#how-it-works" },
  { name: "Categories", href: "/#categories" },     
  { name: "For Schools", href: "/schools" },
];

export const ACTION_LINKS = {
  secondary: { name: "Sign In", href: "/login" },
  primary: { name: "Get Started", href: "/register" }
};

export const GIG_CATEGORIES = [
  { id: 1, name: "Content Writing", slug: "writing", icon: Edit3 },
  { id: 2, name: "Graphic Design", slug: "design", icon: Palette },
  { id: 3, name: "Social Media", slug: "social", icon: Share2 },
  { id: 4, name: "Data Entry", slug: "data", icon: Database },
  { id: 5, name: "Virtual Assistant", slug: "va", icon: UserCheck },
  { id: 6, name: "Video Editing", slug: "video", icon: Video },
];

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com/gigcampus" },
  { name: "LinkedIn", href: "https://linkedin.com/company/gigcampus" },
  { name: "Instagram", href: "https://instagram.com/gigcampus.ng" },
];

export const steps = [
  {
    id: 1,
    icon: Search,
    title: "Find a Gig",
    desc: "Browse verified tasks from startups—Content, Design, or Data Entry. No 10-page CVs needed.",
    image: stepFindImg 
  },
  {
    id: 2,
    icon: PenTool,
    title: "Do the Work",
    desc: "Complete your task in our secure workspace. Our Escrow ensures your pay is locked and safe.",
    image: stepWorkImg 
  },
  {
    id: 3,
    icon: Wallet,
    title: "Get Paid",
    desc: "Once approved, withdraw instantly to OPay, PalmPay, or any Nigerian bank. No delays.",
    image: stepPayImg 
  }
];

export const STATS = [
  { id: 1, label: "Active Students", value: "12,000+" },
  { id: 2, label: "Total Paid Out", value: "₦4.5M+" },
  { id: 3, label: "Gigs Completed", value: "8,500" },
];

export const SCHOOL_BENEFITS = [
  { title: "Verified Talent", desc: "Every student is authenticated via their institutional email (.edu.ng)." },
  { title: "Work-Study Integration", desc: "Sync GigCampus tasks with SIWES or industrial training credits." },
  { title: "Skill Analytics", desc: "Get real-time data on the digital skills your students are mastering." }
];

export const GIG_LIST = [
  {
    id: 1,
    title: "Product Description for E-commerce",
    company: "Zest Stores",
    category: "writing",
    price: "₦5,000",
    duration: "2 Days",
    level: "Beginner",
    logo: "ZS"
  },
  {
    id: 2,
    title: "Instagram Reel Editing (3 Videos)",
    company: "TechBro Media",
    category: "video",
    price: "₦12,000",
    duration: "24 Hours",
    level: "Intermediate",
    logo: "TM"
  },
  {
    id: 3,
    title: "Landing Page Hero Illustration",
    company: "Lagos Creative",
    category: "design",
    price: "₦15,000",
    duration: "3 Days",
    level: "Expert",
    logo: "LC"
  }
];

// ========== DASHBOARD DATA (for JobBoard) ==========
export const user = {
  name: 'Wisdom Imoh',
  campus: 'UNILAG',
  verified: true,
  avatar: null,
  totalEarned: 47500,
  completedJobs: 12,
  activeGigs: 3,
  avgRating: 4.8,
};

export const activeGigs = [
  { id: 1, title: 'Instagram Management', client: 'FoodieNG Lagos', price: 5000, status: 'In Progress', deadline: '3 days left' },
  { id: 2, title: 'Logo Design', client: 'Mama Tunde Catering', price: 8000, status: 'In Review', deadline: '1 day left' },
  { id: 3, title: 'Data Entry — Excel', client: 'Lagos Startup', price: 2000, status: 'Pending', deadline: '5 days left' },
];

export const recommendedGigs = [
  { id: 1, title: 'Maths Tutor — 100 Level', budget: 3000, client: 'Private Student', category: 'Tutoring', location: 'UNILAG', type: 'on-campus', urgent: true },
  { id: 2, title: 'Product Description Writing', budget: 4000, client: 'ShopNG Store', category: 'Writing', location: 'Remote', type: 'remote', urgent: false },
  { id: 3, title: 'Flyer Distribution', budget: 2500, client: 'Campus Event Co.', category: 'Physical', location: 'On Campus', type: 'on-campus', urgent: true },
  { id: 4, title: 'Social Media Content', budget: 6000, client: 'Fashion Brand NG', category: 'Social Media', location: 'Remote', type: 'remote', urgent: false },
];

export const portfolioItems = [
  { title: 'Vestige Design', category: 'Graphic Design', image: '/images/Student_designing_sneakers.jpeg', earned: '₦15,000' },
  { title: 'Campus Flyer', category: 'Branding', image: '/images/Student_holding_tech.jpeg', earned: '₦8,000' },
  { title: 'Tech Week', category: 'Video Editing', image: '/images/Student_desk_with_laptop.jpeg', earned: '₦12,000' },
];

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { name: 'Jobs', icon: 'Briefcase', path: '/jobs' },
  { name: 'My Gigs', icon: 'UserCheck', path: '/my-gigs' },
  { name: 'Messages', icon: 'MessageSquare', path: '/messages' },
  { name: 'Portfolio', icon: 'FolderOpen', path: '/portfolio' },
  { name: 'Settings', icon: 'Settings', path: '/settings' },
];

export const STATUS_COLORS = {
  'In Progress': { bg: 'bg-[#C8F279]/10', text: 'text-[#C8F279]', border: 'border-[#C8F279]/20' },
  'In Review':   { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  'Pending':     { bg: 'bg-white/5',       text: 'text-white/50',   border: 'border-white/10' },
};