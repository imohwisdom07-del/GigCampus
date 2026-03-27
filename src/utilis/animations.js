import { gsap } from 'gsap';

export const initNavbarAnimation = () => {
  const tl = gsap.timeline();

  gsap.set(".nav-container", { visibility: "visible", opacity: 0 });

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

export const staggerFadeUp = (element) => {
  if (!element) return;
  const children = element.children;
  
  gsap.fromTo(children, 
    { y: 20, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.1, 
      ease: "power3.out",
      clearProps: "all" 
    }
  );
};

export const imageReveal = (element) => {
  if (!element) return;
  gsap.fromTo(element,
    { scale: 1.1, opacity: 0 },
    { scale: 1, opacity: 0.6, duration: 1.2, ease: "expo.out" }
  );
};