'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featureCardsRef = useRef([]);

  const features = [
    {
      icon: "🎯",
      title: "ATS Optimized",
      description: "Our templates are designed to pass Applicant Tracking Systems with flying colors. Get past the robots and reach human recruiters.",
      benefits: ["Keyword optimization", "Clean formatting", "Industry standards"]
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Create your resume in minutes, not hours. Our intuitive interface makes it simple for anyone to build a professional resume.",
      benefits: ["5-minute setup", "Auto-save progress", "One-click export"]
    },
    {
      icon: "🎨",
      title: "Professional Templates",
      description: "Choose from our carefully crafted templates that stand out from the crowd while maintaining professional standards.",
      benefits: ["Modern designs", "Industry-specific", "Customizable layouts"]
    },
    {
      icon: "💾",
      title: "Instant Download",
      description: "Download your resume as PDF instantly. No watermarks, no waiting, no registration required.",
      benefits: ["High-quality PDF", "No watermarks", "Unlimited downloads"]
    },
    {
      icon: "🔒",
      title: "100% Free Forever",
      description: "No hidden costs, no premium features locked behind paywalls. Everything is completely free for everyone.",
      benefits: ["No credit card required", "All features unlocked", "No time limits"]
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Create and edit your resume on any device, anywhere, anytime. Perfect mobile experience guaranteed.",
      benefits: ["Touch-friendly interface", "Offline editing", "Cross-device sync"]
    },
    {
      icon: "🛡️",
      title: "Privacy First",
      description: "Your data stays private. We don't store your personal information or share it with third parties.",
      benefits: ["Local processing", "No data mining", "GDPR compliant"]
    },
    {
      icon: "📊",
      title: "Real-time Preview",
      description: "See exactly how your resume will look as you build it. Make changes and see results instantly.",
      benefits: ["Live preview", "WYSIWYG editing", "Print-ready view"]
    },
    {
      icon: "🎓",
      title: "Expert Guidance",
      description: "Built-in tips and suggestions to help you create the best possible resume for your industry.",
      benefits: ["Industry insights", "Writing tips", "Best practices"]
    }
  ];

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

    // Feature cards animation
    gsap.fromTo(featureCardsRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: featureCardsRef.current[0],
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

  const handleCardHover = (cardRef) => {
    gsap.to(cardRef, { 
      scale: 1.05, 
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleCardLeave = (cardRef) => {
    gsap.to(cardRef, { 
      scale: 1, 
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm my-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Why Choose Resumify?
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            We&apos;ve built the perfect resume maker with everything you need to land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={el => featureCardsRef.current[index] = el}
              onMouseEnter={(e) => handleCardHover(e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">{feature.title}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">{feature.description}</p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center text-sm text-white/70">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Why Resumify Stands Out</h3>
            <p className="text-xl text-white/80">See how we compare to other resume builders</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="pb-4 text-white font-semibold">Features</th>
                    <th className="pb-4 text-center text-purple-300 font-bold">Resumify</th>
                    <th className="pb-4 text-center text-white/60">Others</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {[
                    { feature: "100% Free", resumify: "✅", others: "❌" },
                    { feature: "No Registration", resumify: "✅", others: "❌" },
                    { feature: "No Watermarks", resumify: "✅", others: "❌" },
                    { feature: "ATS Optimized", resumify: "✅", others: "⚠️" },
                    { feature: "Mobile Friendly", resumify: "✅", others: "⚠️" },
                    { feature: "Privacy First", resumify: "✅", others: "❌" },
                    { feature: "Instant Download", resumify: "✅", others: "⚠️" },
                    { feature: "Professional Templates", resumify: "✅", others: "✅" }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-4 text-white/90 font-medium">{row.feature}</td>
                      <td className="py-4 text-center text-2xl">{row.resumify}</td>
                      <td className="py-4 text-center text-2xl">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}