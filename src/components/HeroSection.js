'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const titleRef = useRef(null);
  const gradientTextRef = useRef(null);
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

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

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

    // Gradient text animation
    gsap.to(gradientTextRef.current, {
      backgroundPosition: "-200% center",
      duration: 3,
      repeat: -1,
      ease: "none"
    });

    // Parallax effect
    gsap.to(containerRef.current, {
      y: "50%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Opacity fade on scroll
    gsap.to(containerRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    // Mouse-following background elements
    if (backgroundOrb1Ref.current && backgroundOrb2Ref.current) {
      gsap.to(backgroundOrb1Ref.current, {
        x: mousePosition.x * 0.1,
        y: mousePosition.y * 0.1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(backgroundOrb2Ref.current, {
        x: mousePosition.x * -0.05,
        y: mousePosition.y * 0.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [mousePosition, isClient]);

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
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 my-8"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          ref={backgroundOrb1Ref}
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <div
          ref={backgroundOrb2Ref}
          className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl top-1/2 right-0"
        />
      </div>

      <div ref={heroContentRef} className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Create{' '}
            <span
              ref={gradientTextRef}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{ backgroundPosition: "200% center" }}
            >
              Stunning
            </span>
            <br />
            ATS-Friendly Resumes
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Build professional resumes that pass ATS systems with our free resume maker. 
          Create your professional, ATS-friendly resume and download instantly.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/cv-builder">
            <button
              onMouseEnter={(e) => handleButtonHover(e.target)}
              onMouseLeave={(e) => handleButtonLeave(e.target)}
              onClick={(e) => {
                handleButtonClick(e.target);
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-16 py-6 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300"
            >
              Start Building Now
            </button>
          </Link>
        </div>

        {/* Floating elements */}
        <div
          ref={floatingElement1Ref}
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        />
        <div
          ref={floatingElement2Ref}
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
        />
      </div>
    </section>
  );
}