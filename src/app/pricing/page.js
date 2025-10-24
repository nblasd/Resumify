'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const freeCardRef = useRef(null);
  const featuresRef = useRef([]);
  const comparisonRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Hero section animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );

    // Free card animation
    gsap.fromTo(freeCardRef.current,
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        delay: 0.6, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: freeCardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Features animation
    gsap.fromTo(featuresRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Comparison animation
    gsap.fromTo(comparisonRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  const freeFeatures = [
    "Unlimited resume downloads",
    "All professional templates",
    "ATS optimization",
    "Mobile-responsive design",
    "No watermarks",
    "No registration required",
    "Privacy-first approach",
    "Real-time preview",
    "Instant PDF generation",
    "Cross-device compatibility"
  ];

  const competitorPricing = [
    { name: "Resume.io", price: "$24.95", period: "per month" },
    { name: "Zety", price: "$5.99", period: "per week" },
    { name: "Novoresume", price: "$8", period: "per month" },
    { name: "Canva", price: "$12.99", period: "per month" },
    { name: "Resumify", price: "FREE", period: "forever" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
            The Best Things in Life Are
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> FREE</span>
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
            Yes, you read that right. This entire professional resume builder is completely free. 
            No hidden costs, no premium features, no catch.
          </p>
        </div>
      </section>

      {/* Free Forever Card */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={freeCardRef}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                FREE FOREVER
              </h2>
              <p className="text-2xl text-purple-200 mb-8">
                $0.00 / month
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Everything you need to create professional resumes. No credit card required, 
                no trial periods, no premium upgrades. Just pure, unlimited access to all features.
              </p>
              <Link href="/cv-builder">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  Start Building Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Everything You Get for FREE</h3>
            <p className="text-xl text-white/80">No limits, no restrictions, no fine print</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeFeatures.map((feature, index) => (
              <div
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex items-center space-x-4 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">✓</span>
                </div>
                <span className="text-white text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison with Competitors */}
      <section ref={comparisonRef} className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">How Much Others Charge</h3>
            <p className="text-xl text-white/80">See what you&apos;re saving by choosing Resumify</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="pb-6 text-left text-white font-semibold text-xl">Platform</th>
                    <th className="pb-6 text-center text-white font-semibold text-xl">Monthly Cost</th>
                    <th className="pb-6 text-center text-white font-semibold text-xl">Annual Cost</th>
                    <th className="pb-6 text-center text-white font-semibold text-xl">Features</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorPricing.map((platform, index) => (
                    <tr key={index} className={`border-b border-white/10 ${platform.name === 'Resumify' ? 'bg-purple-500/10' : ''}`}>
                      <td className="py-6 text-white font-medium text-lg">{platform.name}</td>
                      <td className="py-6 text-center text-2xl font-bold">
                        <span className={platform.name === 'Resumify' ? 'text-green-400' : 'text-white'}>
                          {platform.price}
                        </span>
                      </td>
                      <td className="py-6 text-center text-xl text-white/80">
                        {platform.name === 'Resumify' ? 'FREE' : `$${parseFloat(platform.price.replace('$', '')) * 12}`}
                      </td>
                      <td className="py-6 text-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          platform.name === 'Resumify' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {platform.name === 'Resumify' ? 'All Features' : 'Limited'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free? */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-8">Why Is Resumify Free?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">💝</div>
              <h4 className="text-xl font-semibold text-white mb-4">We Believe in Access</h4>
              <p className="text-white/80">Everyone deserves access to professional tools, regardless of their financial situation.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">🚀</div>
              <h4 className="text-xl font-semibold text-white mb-4">Open Source Spirit</h4>
              <p className="text-white/80">We&apos;re building tools that empower people, not extract money from them.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold text-white mb-4">Focus on Value</h4>
              <p className="text-white/80">We&apos;d rather help you land your dream job than charge you for basic features.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
