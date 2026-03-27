
import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Stats from '../components/sections/Stats';
import Categories from '../components/sections/Categories';

const Home = () => {
  return (
    <main className="bg-[#050506] selection:bg-accent-purple selection:text-white">
    
      <Hero />
      <HowItWorks />
            <Stats />
      <Categories />
    </main>
  );
};

export default Home;