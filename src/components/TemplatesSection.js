'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TemplatesSection() {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const templateCardsRef = useRef([]);
  const templateButtonsRef = useRef([]);

  const templates = [
    {
      name: "Professional",
      description: "Clean and modern design perfect for corporate roles",
      color: "from-blue-500 to-purple-600",
      features: ["ATS Optimized", "Clean Layout", "Professional Look"]
    },
    {
      name: "Creative",
      description: "Bold and innovative design for creative professionals",
      color: "from-pink-500 to-orange-500",
      features: ["Eye-catching", "Creative Layout", "Portfolio Ready"]
    },
    {
      name: "Minimalist",
      description: "Simple and elegant design that speaks volumes",
      color: "from-gray-600 to-gray-800",
      features: ["Minimal Design", "Easy to Read", "Timeless"]
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

    // Template cards animation
    gsap.fromTo(templateCardsRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: templateCardsRef.current[0],
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
      boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
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

  const handleButtonHover = (buttonRef) => {
    gsap.to(buttonRef, { 
      scale: 1.05,
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonLeave = (buttonRef) => {
    gsap.to(buttonRef, { 
      scale: 1,
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleButtonClick = (buttonRef) => {
    gsap.to(buttonRef, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 my-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Choose Your Template
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Three carefully crafted templates designed to make you stand out from the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={template.name}
              ref={el => templateCardsRef.current[index] = el}
              onMouseEnter={(e) => handleCardHover(e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-full h-48 bg-gradient-to-br ${template.color} rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-white text-2xl font-bold">{template.name}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{template.name}</h3>
              <p className="text-white/70 mb-6">{template.description}</p>
              <div className="space-y-2 mb-6">
                {template.features.map((feature) => (
                  <div key={feature} className="flex items-center text-white/80">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>
              <button
                ref={el => templateButtonsRef.current[index] = el}
                onMouseEnter={(e) => handleButtonHover(e.target)}
                onMouseLeave={(e) => handleButtonLeave(e.target)}
                onClick={(e) => handleButtonClick(e.target)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Use This Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}