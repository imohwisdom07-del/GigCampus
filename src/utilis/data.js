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
import stepWorkImg from '../assets/step-work.jpeg';
import stepPayImg from '../assets/step-paid.jpeg';

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
  { 
    title: "Verified Talent", 
    desc: "Every student is authenticated via their institutional email (.edu.ng)." 
  },
  { 
    title: "Work-Study Integration", 
    desc: "Sync GigCampus tasks with SIWES or industrial training credits." 
  },
  { 
    title: "Skill Analytics", 
    desc: "Get real-time data on the digital skills your students are mastering." 
  }
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
export const user = {
  name: 'Oluwaseun Adebayo',
  campus: 'University of Lagos',
  verified: true,
  avatar: 'https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Oluwaseun+A',
  totalEarned: 24500,
  completedJobs: 12,
  avgRating: 4.8,
  activeGigs: 2,
};

export const activeGigs = [
  { id: 1, title: 'Flyer for Campus Event', price: 5000, applications: 3, status: 'open' },
  { id: 2, title: 'Social Media Management', price: 15000, applications: 7, status: 'in-progress' },
];

export const recommendedGigs = [
  { id: 3, title: 'Logo Design for Startup', budget: 8000, client: 'TechHub UNILAG', skills: ['Graphic Design'] },
  { id: 4, title: 'Content Writer for Blog', budget: 3000, client: 'CampusPress', skills: ['Content Writing'] },
  { id: 5, title: 'Video Editing for TikTok', budget: 10000, client: 'Influencer Hub', skills: ['Video Editing'] },
];

export const activities = [
  { id: 1, action: 'You applied to "Flyer Design"', time: '2 hours ago', icon: 'check' },
  { id: 2, action: 'New message from Olamide about your gig', time: '5 hours ago', icon: 'message' },
  { id: 3, action: 'Your gig "Logo Design" was viewed 12 times', time: '1 day ago', icon: 'eye' },
];