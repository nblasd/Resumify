'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Section entrance animation
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: 0.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: 0.4,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Buttons animation
    gsap.fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: 0.6,
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  const handleButton1Hover = () => {
    gsap.to(button1Ref.current, { 
      scale: 1.05, 
      boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButton1Leave = () => {
    gsap.to(button1Ref.current, { 
      scale: 1, 
      boxShadow: "0 0px 0px rgba(255,255,255,0)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButton1Click = () => {
    gsap.to(button1Ref.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const handleButton2Hover = () => {
    gsap.to(button2Ref.current, { 
      scale: 1.05,
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButton2Leave = () => {
    gsap.to(button2Ref.current, { 
      scale: 1,
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButton2Click = () => {
    gsap.to(button2Ref.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 my-12"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Ready to Land Your Dream Job?
        </h2>
        <p
          ref={subtitleRef}
          className="text-xl text-white/90 mb-8"
        >
          Join thousands of professionals who have already created their perfect resume with Resumify.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            ref={button1Ref}
            onMouseEnter={handleButton1Hover}
            onMouseLeave={handleButton1Leave}
            onClick={handleButton1Click}
            className="bg-white text-purple-600 px-16 py-6 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300"
          >
            Create Resume Now
          </button>
          <button
            ref={button2Ref}
            onMouseEnter={handleButton2Hover}
            onMouseLeave={handleButton2Leave}
            onClick={handleButton2Click}
            className="border-2 border-white text-white px-16 py-6 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}