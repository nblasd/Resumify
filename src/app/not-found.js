'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const floatingElement1Ref = useRef(null);
  const floatingElement2Ref = useRef(null);
  const backgroundOrb1Ref = useRef(null);
  const backgroundOrb2Ref = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Initial animations
    gsap.fromTo(heroContentRef.current, 
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );

    gsap.fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power2.out" }
    );

    // Floating elements animation
    gsap.to(floatingElement1Ref.current, {
      y: -20,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    gsap.to(floatingElement2Ref.current, {
      y: 20,
      rotation: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Background orbs animation
    gsap.to(backgroundOrb1Ref.current, {
      x: 50,
      y: -30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    gsap.to(backgroundOrb2Ref.current, {
      x: -30,
      y: 40,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, [isClient]);

  const handleButtonHover = (buttonRef) => {
    if (!isClient) return;
    gsap.to(buttonRef, { 
      scale: 1.05, 
      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonLeave = (buttonRef) => {
    if (!isClient) return;
    gsap.to(buttonRef, { 
      scale: 1, 
      boxShadow: "0 0px 0px rgba(168, 85, 247, 0)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonClick = (buttonRef) => {
    if (!isClient) return;
    gsap.to(buttonRef, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            ref={backgroundOrb1Ref}
            className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-1/4 left-1/4"
          />
          <div
            ref={backgroundOrb2Ref}
            className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl top-1/2 right-1/4"
          />
        </div>

        <div ref={heroContentRef} className="max-w-4xl mx-auto text-center relative z-10">
          {/* 404 Number with gradient */}
          <div className="mb-8">
            <h1
              ref={titleRef}
              className="text-8xl md:text-9xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </div>

          {/* Error message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              The page you&apos;re looking for seems to have vanished into the digital void. 
              Don&apos;t worry though - let&apos;s get you back on track!
            </p>
          </div>

          {/* Action buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onMouseEnter={(e) => handleButtonHover(e.target)}
              onMouseLeave={(e) => handleButtonLeave(e.target)}
              onClick={(e) => {
                handleButtonClick(e.target);
                window.location.href = '/';
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300"
            >
              🏠 Go Home
            </button>
            <button
              onMouseEnter={(e) => handleButtonHover(e.target)}
              onMouseLeave={(e) => handleButtonLeave(e.target)}
              onClick={(e) => {
                handleButtonClick(e.target);
                window.history.back();
              }}
              className="border-2 border-white/30 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              ← Go Back
            </button>
          </div>


          {/* Floating decorative elements */}
          <div
            ref={floatingElement1Ref}
            className="absolute top-20 left-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"
          />
          <div
            ref={floatingElement2Ref}
            className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
