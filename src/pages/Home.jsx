// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Stats from '../components/sections/Stats';
import Categories from '../components/sections/Categories';

const Home = () => {
  return (
    <main className="bg-[#050506] selection:bg-accent-purple selection:text-white">
      {/* 1. Hero: The Hook */}
      <Hero />
      
      {/* 2. Steps: The Process */}
      <HowItWorks />

      {/* 3. Social Proof: The Trust (₦4.5M+ Paid) */}
      <Stats />

      {/* 4. Discovery: The Categories */}
      <Categories />

      {/* 5. Future: FeaturedGigs or CTA Section */}
    </main>
  );
};

export default Home;