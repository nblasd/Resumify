'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const socialLinksRef = useRef([]);
  const footerLinksRef = useRef([]);

  useEffect(() => {
    // Footer entrance animation
    gsap.fromTo(footerRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social links animation
    gsap.fromTo(socialLinksRef.current,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Footer links animation
    gsap.fromTo(footerLinksRef.current,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.05,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSocialHover = (linkRef) => {
    gsap.to(linkRef, { 
      scale: 1.1, 
      color: "#a855f7",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleSocialLeave = (linkRef) => {
    gsap.to(linkRef, { 
      scale: 1, 
      color: "rgba(255, 255, 255, 0.6)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleLinkHover = (linkRef) => {
    gsap.to(linkRef, { 
      color: "#ffffff",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleLinkLeave = (linkRef) => {
    gsap.to(linkRef, { 
      color: "rgba(255, 255, 255, 0.7)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 mt-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Resumify</h3>
            <p className="text-white/70 mb-4">
              The best free resume maker that helps you create ATS-friendly resumes 
              that land you interviews.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Templates', 'Pricing', 'API'].map((item, index) => (
                <li key={item}>
                  <a 
                    ref={el => footerLinksRef.current[index] = el}
                    href="#" 
                    onMouseEnter={(e) => handleLinkHover(e.target)}
                    onMouseLeave={(e) => handleLinkLeave(e.target)}
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={item}>
                  <a 
                    ref={el => footerLinksRef.current[index + 4] = el}
                    href="#" 
                    onMouseEnter={(e) => handleLinkHover(e.target)}
                    onMouseLeave={(e) => handleLinkLeave(e.target)}
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2024 Resumify. All rights reserved. Made with ❤️ for job seekers.
          </p>
        </div>
      </div>
    </footer>
  );
}