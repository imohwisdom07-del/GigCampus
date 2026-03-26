import { gsap } from 'gsap';

export const initNavbarAnimation = () => {
  const tl = gsap.timeline();

  // 1. Reset the state (Ensures it's hidden before start)
  gsap.set(".nav-container", { visibility: "visible", opacity: 0 });

  // 2. The Entrance Sequence
  tl.fromTo(".nav-container", 
    { 
      y: -50, 
      opacity: 0,
      scale: 0.95
    }, 
    { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      duration: 1.2, 
      ease: "expo.out",
      delay: 0.3 
    }
  );

  return tl;
};