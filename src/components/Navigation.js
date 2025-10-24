'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function Navigation() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Initial animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Logo animation
    gsap.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.7)" }
    );

    // Menu items animation
    gsap.fromTo(menuItemsRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.4, stagger: 0.1, ease: "power2.out" }
    );

    // Button animation
    gsap.fromTo(buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, delay: 0.6, ease: "back.out(1.7)" }
    );
  }, [isClient]);

  const handleLogoHover = () => {
    if (!isClient) return;
    gsap.to(logoRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleLogoLeave = () => {
    if (!isClient) return;
    gsap.to(logoRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMenuItemHover = (index) => {
    if (!isClient) return;
    gsap.to(menuItemsRef.current[index], { 
      scale: 1.1, 
      color: "#a855f7", 
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleMenuItemLeave = (index) => {
    if (!isClient) return;
    gsap.to(menuItemsRef.current[index], { 
      scale: 1, 
      color: "rgba(255, 255, 255, 0.8)", 
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonHover = () => {
    if (!isClient) return;
    gsap.to(buttonRef.current, { 
      scale: 1.05, 
      boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonLeave = () => {
    if (!isClient) return;
    gsap.to(buttonRef.current, { 
      scale: 1, 
      boxShadow: "0 0px 0px rgba(168, 85, 247, 0)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonClick = () => {
    if (!isClient) return;
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const handleNavClick = (item) => {
    // For anchor links on the home page, we can let the default behavior handle it
    // Next.js Link will handle internal page navigation
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            ref={logoRef}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            Resumify
          </Link>
          <div className="hidden md:flex gap-8">
            {['Features', 'Pricing', 'Contact'].map((item, index) => (
              <Link
                key={item}
                href={item === 'Pricing' ? '/pricing' : item === 'Contact' ? '/contact' : `/#${item.toLowerCase()}`}
                ref={el => menuItemsRef.current[index] = el}
                onMouseEnter={() => handleMenuItemHover(index)}
                onMouseLeave={() => handleMenuItemLeave(index)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer px-2"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cv-builder">
              <button
                ref={buttonRef}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}